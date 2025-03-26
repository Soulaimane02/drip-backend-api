import express from "express";
import PaymentController from "../controllers/payment.controller";

const router = express.Router();
const paymentController = new PaymentController();

router.get("/", paymentController.getAllPayments.bind(paymentController));
router.get("/:id", paymentController.getPaymentById.bind(paymentController));
router.post("/pay", paymentController.pay.bind(paymentController));

export default router;
