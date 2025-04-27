import express from "express";
import PaymentController from "../controllers/payment.controller";
import { isSignedInMiddleware } from "../middlewares/base.middlewares";

const paymentRoutes = () => {
  const router = express.Router();
  const paymentController = new PaymentController();

  router.get("/", isSignedInMiddleware(), paymentController.getAllPayments.bind(paymentController));
  router.get("/:id", isSignedInMiddleware(), paymentController.getPaymentById.bind(paymentController));
  router.get("/user/:id", isSignedInMiddleware(), paymentController.getPaymentsByUserId.bind(paymentController));
  router.get("/article/:id", isSignedInMiddleware(), paymentController.getPaymentsByArticleId.bind(paymentController));
  router.post("/pay", isSignedInMiddleware(), paymentController.pay.bind(paymentController));

  return router;
}

export default paymentRoutes;
