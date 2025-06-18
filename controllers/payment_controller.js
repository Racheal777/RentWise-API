// controllers/paymentController.js
import axios from "axios";
import { Payment } from "../models/payment_model.js";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

// 1️ INITIATE PAYMENT
export const initializePayment = async (req, res) => {
  const { email, amount, tenantId, unitId, month } = req.body;

  if (!email || !amount || !tenantId || !unitId || !month) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amount * 100, // Paystack expects amount in kobo
        metadata: {
          tenantId,
          unitId,
          month,
        }
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const { authorization_url, reference } = response.data.data;

    res.status(200).json({ authorization_url, reference });

  } catch (err) {
    console.error("Error initializing payment:", err.message);
    res.status(500).json({ error: "Payment initialization failed" });
  }
};


// VERIFY PAYMENT
export const verifyPayment = async (req, res) => {
  const { reference } = req.body;

  if (!reference) {
    return res.status(400).json({ error: "Reference is required" });
  }

  try {
    const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
      }
    });

    const data = response.data.data;

    if (data.status !== "success") {
      return res.status(400).json({ error: "Transaction not successful" });
    }

    // Prevent duplicate entries
    const exists = await Payment.findOne({
      tenantId: data.metadata.tenantId,
      month: data.metadata.month
    });

    if (exists) {
      return res.status(409).json({ message: "Payment already recorded" });
    }

    const payment = new Payment({
      tenantId: data.metadata.tenantId,
      unitId: data.metadata.unitId,
      amount: data.amount / 100, // convert from kobo
      month: data.metadata.month,
      status: "paid",
      paidAt: data.paid_at
    });

    await payment.save();
    res.status(200).json({ message: "Payment verified and recorded", payment });

  } catch (err) {
    console.error("Verification failed:", err.message);
    res.status(500).json({ error: "Could not verify payment" });
  }
};



// GET PAYMENTS FOR TENANT

export const getTenantPayments = async (req, res) => {
  const { tenantId } = req.query;

  if (!tenantId) {
    return res.status(400).json({ error: "tenantId query param is required" });
  }

  try {
    const payments = await Payment.find({ tenantId }).sort({ createdAt: -1 });
    res.status(200).json({ payments });
  } catch (error) {
    console.error("Error fetching tenant payments:", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
};






export const getDuePayments = async (req, res) => {
  try {
    const duePayments = await Payment.find({ status: "unpaid" }).sort({ month: 1 });

    res.status(200).json({ duePayments });
  } catch (error) {
    console.error("Error fetching due payments:", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
};



export const createPayments = async (req, res) => {
  const { tenantId, unitId, amount, month, status, paidAt } = req.body;

  if (!tenantId || !unitId || !amount || !month || !status) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const exists = await Payment.findOne({ tenantId, month });

    if (exists) {
      return res.status(409).json({ message: "Payment already recorded for this month" });
    }

    const payment = new Payment({
      tenantId,
      unitId,
      amount,
      month,
      status,
      paidAt: paidAt || new Date()
    });

    await payment.save();
    res.status(201).json({ message: "Payment created manually", payment });

  } catch (err) {
    console.error("Create payment error:", err.message);
    res.status(500).json({ error: "Failed to create payment" });
  }
};