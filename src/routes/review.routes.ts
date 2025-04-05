import express from "express";
import ReviewController from "../controllers/review.controller";

const reviewRoutes = () => {
  const router = express.Router();
  const reviewController = new ReviewController();

  router.get("/", reviewController.getAllReviews.bind(reviewController));
  router.get("/:id", reviewController.getReviewById.bind(reviewController));
  router.get("/user/:id", reviewController.getReviewsByUserId.bind(reviewController));
  router.get("/article/:id", reviewController.getReviewsByArticleId.bind(reviewController));

  return router;
}

export default reviewRoutes;
