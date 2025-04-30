import express from "express";
import ReviewController from "../controllers/review.controller";
import { authorisationMiddleware, isSignedInMiddleware } from "../middlewares/base.middlewares";
import Role from "../models/enums/role";
import { verifyReviewOwnershipFromBodyMiddleware } from "../middlewares/review.middlewares";

const reviewRoutes = () => {
  const router = express.Router();
  const reviewController = new ReviewController();

  router.get("/", isSignedInMiddleware(), authorisationMiddleware([Role.Admin]), reviewController.getAllReviews.bind(reviewController));
  router.get("/:id", isSignedInMiddleware(), authorisationMiddleware([Role.Admin, Role.Seller, Role.User]), reviewController.getReviewById.bind(reviewController));
  router.get("/user/:id", isSignedInMiddleware(), authorisationMiddleware([Role.Admin, Role.Seller, Role.User]), reviewController.getReviewsByUserId.bind(reviewController));
  router.get("/article/:id", isSignedInMiddleware(), authorisationMiddleware([Role.Admin, Role.Seller, Role.User]), reviewController.getReviewsByArticleId.bind(reviewController));
  router.post("/", isSignedInMiddleware(), authorisationMiddleware([Role.Admin, Role.Seller, Role.User]), verifyReviewOwnershipFromBodyMiddleware(), reviewController.addReview.bind(reviewController));
  router.put("/:id", isSignedInMiddleware(), authorisationMiddleware([Role.Admin, Role.Seller, Role.User]), reviewController.updateReview.bind(reviewController));
  router.delete("/:id", isSignedInMiddleware(), authorisationMiddleware([Role.Admin, Role.Seller, Role.User]), reviewController.deleteReview.bind(reviewController));

  return router;
}

export default reviewRoutes;
