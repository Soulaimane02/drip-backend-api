import express from "express";
import ReviewController from "../controllers/review.controller";
import { isSignedInMiddleware } from "../middlewares/base.middlewares";

const reviewRoutes = () => {
  const router = express.Router();
  const reviewController = new ReviewController();

  router.get("/", isSignedInMiddleware(), reviewController.getAllReviews.bind(reviewController));
  router.get("/:id", reviewController.getReviewById.bind(reviewController));
  router.get("/user/:id", reviewController.getReviewsByUserId.bind(reviewController));
  router.get("/article/:id", reviewController.getReviewsByArticleId.bind(reviewController));
  router.post("/", isSignedInMiddleware(), reviewController.addReview.bind(reviewController));
  router.put("/:id", isSignedInMiddleware(), reviewController.updateReview.bind(reviewController));
  router.delete("/:id", isSignedInMiddleware(), reviewController.deleteReview.bind(reviewController));

  return router;
}

export default reviewRoutes;
