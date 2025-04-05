import express from "express";
import ReviewController from "../controllers/review.controller";

const reviewRoutes = () => {
  const router = express.Router();
  const reviewController = new ReviewController();

  router.get("/", reviewController.getAllReviews.bind(reviewController));
  router.get("/:id", reviewController.getReviewById.bind(reviewController));

  return router;
}

export default reviewRoutes;
