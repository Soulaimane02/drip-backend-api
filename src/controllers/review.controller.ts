import { Response, Request, NextFunction } from "express";
import ReviewService from "../services/review.service";

class ReviewController {
  private readonly reviewService: ReviewService;

  constructor() {
    this.reviewService = new ReviewService();
  }

  async getAllReviews(req: Request, res: Response, next: NextFunction) {
    try {
      const reviews = await this.reviewService.getAllReviews();
      return res.status(200).json(reviews);
    }
    catch(err) {
      next(err);
    }
  }
}

export default ReviewController;
