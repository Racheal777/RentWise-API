import { Router } from "express";
import { createPayments, getTenantPayments, getDuePayments, initializePayment, verifyPayment}  from "../controllers/payment_controller.js";

export const paymentRouter = Router();

paymentRouter.get("/payments", getTenantPayments)
paymentRouter.get('/payments/due', getDuePayments)
paymentRouter.post('/payments', createPayments)
paymentRouter.post("/payments/verify", verifyPayment);
paymentRouter.post("/init-payment", initializePayment);
