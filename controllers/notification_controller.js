import { Payment } from '../models/payment_model.js';
//Define the Rent Reminder Function
 const notifyRentDue = async (req, res) => {
  try {

    const currentMonth = new Date().toISOString().slice(0, 7); // "2025-06"

    const payments = await Payment.find({
      status: 'unpaid',
      month: currentMonth
    }).populate('tenantId');

    if (!payments.length) {
      console.log("No unpaid rents found.");
      return res.status(200).json({ message: "No unpaid rents." });
    }

    payments.forEach(payment => {
      const tenant = payment.tenantId;
      console.log(`Hello ${tenant.name}, your rent of GHS ${payment.amount} for ${payment.month} is unpaid. Please pay immediately.`);
    });

    res.status(200).json({ message: "Rent reminders sent successfully." });
  } catch (error) {
    console.error("Error sending rent reminders:", error);
    res.status(500).json({ error: "Failed to send rent reminders." });
  }
};
export default notifyRentDue;