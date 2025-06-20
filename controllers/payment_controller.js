// controllers/paymentController.js
import axios from "axios";
import { Payment } from "../models/payment_model.js";
import { paymentSchema } from "../schemas/payment_schema.js";
import Joi from "joi";
import mongoose from "mongoose";
import 'dotenv/config'

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

// 1️ INITIATE PAYMENT

export const initializePayment = async (req, res) => {
  // Extend the existing paymentSchema with email validation
  const schema = paymentSchema.keys({
    email: Joi.string().email().required()
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { email, expectedAmount, amountPaid, tenantId, unitId, month } = value;

  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amountPaid * 100, // Paystack expects amount in kobo
        metadata: {
          tenantId,
          unitId,
          month,
          amount: expectedAmount, // expected rent (used during verification)
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
  // Validate the reference using Joi
  const schema = Joi.object({
    reference: Joi.string().required().messages({
      "any.required": "Reference is required",
      "string.empty": "Reference cannot be empty"
    })
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const response = await axios.get(`https://api.paystack.co/transaction/verify/${value.reference}`, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
      }
    });

    const data = response.data.data;

    if (data.status !== "success") {
      return res.status(400).json({ error: "Transaction not successful" });
    }

    const { tenantId, unitId, month, amount: expectedAmount } = data.metadata;
    const amountPaid = data.amount / 100;
    const amountDue = expectedAmount - amountPaid;

    const exists = await Payment.findOne({ tenantId, month });
    if (exists) {
      return res.status(409).json({ message: "Payment already recorded" });
    }

    const payment = new Payment({
      tenantId,
      unitId,
      referenceId: data.reference,  // Save the reference
      expectedAmount,
      amountPaid,
      amountDue: amountDue > 0 ? amountDue : 0,
      month,
      status: amountPaid >= expectedAmount ? "paid" : "partial",
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
  const schema = Joi.object({
    tenantId: Joi.string()
      .custom((value, helpers) => {
        return mongoose.Types.ObjectId.isValid(value)
          ? value
          : helpers.message("Invalid tenantId");
      })
      .required()
  });

  const { error, value } = schema.validate(req.query);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const payments = await Payment.find({ tenantId: value.tenantId }).sort({ createdAt: -1 });
    res.status(200).json({ payments });
  } catch (error) {
    console.error("Error fetching tenant payments:", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
};




// get due payments
export const getDuePayments = async (req, res) => {
  try {
    const duePayments = await Payment.find({
      status: { $in: ["unpaid", "partial"] }
    }).sort({ month: 1 });

    res.status(200).json({ duePayments });
  } catch (error) {
    console.error("Error fetching due payments:", error.message);
    res.status(500).json({ error: "Failed to fetch due payments" });
  }
};




// manual payments
// export const createPayments = async (req, res) => {

//   const { error, value } = paymentSchema.validate(req.body);
//   if (error) {
//     return res.status(400).json({ error: error.details[0].message });
//   }

//   const { tenantId, unitId, amount, amountPaid = 0, month, paidAt } = value;

//   try {
//     const exists = await Payment.findOne({ tenantId, month });
//     if (exists) {
//       return res.status(409).json({ message: "Payment already recorded for this month" });
//     }

//     const amountDue = amount - amountPaid;
//     const status =
//       amountPaid >= amount ? "paid" : amountPaid > 0 ? "partial" : "unpaid";

//     const payment = new Payment({
//       tenantId,
//       unitId,
//       amount,
//       amountPaid,
//       amountDue: amountDue > 0 ? amountDue : 0,
//       month,
//       status,
//       paidAt: status === "unpaid" ? null : paidAt || new Date()
//     });

//     await payment.save();
//     res.status(201).json({ message: "Payment created manually", payment });

//   } catch (err) {
//     console.error("Create payment error:", err.message);
//     res.status(500).json({ error: "Failed to create payment" });
//   }
// };

