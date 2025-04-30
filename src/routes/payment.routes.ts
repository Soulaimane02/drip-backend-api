import express from "express";
import PaymentController from "../controllers/payment.controller";
import { authorisationMiddleware, isSignedInMiddleware } from "../middlewares/base.middlewares";
import Role from "../models/enums/role";
import { verifyPaymentOwnershipByArticleIdMiddleware, verifyPaymentOwnershipByUserIdMiddleware, verifyPaymentOwnershipMiddleware, verifyPaymentPayOwnershipMiddleware } from "../middlewares/payment.middlewares";

const paymentRoutes = () => {
  const router = express.Router();
  const paymentController = new PaymentController();

  router.get("/", isSignedInMiddleware(), authorisationMiddleware([Role.Admin]), paymentController.getAllPayments.bind(paymentController));
  router.get("/:id", isSignedInMiddleware(), authorisationMiddleware([Role.Admin, Role.Seller, Role.User]), verifyPaymentOwnershipMiddleware(), paymentController.getPaymentById.bind(paymentController));
  router.get("/user/:id", isSignedInMiddleware(), authorisationMiddleware([Role.Admin, Role.Seller, Role.User]), verifyPaymentOwnershipByUserIdMiddleware(), paymentController.getPaymentsByUserId.bind(paymentController));
  router.get("/article/:id", isSignedInMiddleware(), authorisationMiddleware([Role.Admin, Role.Seller]), verifyPaymentOwnershipByArticleIdMiddleware(), paymentController.getPaymentsByArticleId.bind(paymentController));
  router.post("/pay", isSignedInMiddleware(), authorisationMiddleware([Role.Admin, Role.Seller, Role.User]), verifyPaymentPayOwnershipMiddleware(), paymentController.pay.bind(paymentController));

  return router;
}

export default paymentRoutes;
