import express from "express";
import PaymentController from "../controllers/payment.controller";

const router = express.Router();
const paymentController = new PaymentController();

router.get("/", paymentController.getAllPayments.bind(paymentController));
router.get("/:id", paymentController.getPaymentById.bind(paymentController));
router.get("/user/:id", paymentController.getPaymentsByUserId.bind(paymentController));
router.get("/article/:id", paymentController.getPaymentsByArticleId.bind(paymentController));
router.post("/pay", paymentController.pay.bind(paymentController));

export default router;
