import express from "express";
import PaymentController from "../controllers/payment.controller";

const router = express.Router();
const paymentController = new PaymentController();

router.get("/", paymentController.getAllPayments.bind(paymentController));

export default router;
