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

  async getReviewById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const review = await this.reviewService.getReviewById(id);
      return res.status(200).json(review);
    }
    catch(err) {
      next(err);
    }
  }

  async getReviewsByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const reviews = await this.reviewService.getReviewsByUserId(id);
      return res.status(200).json(reviews);
    }
    catch(err) {
      next(err);
    }
  }

  async getReviewsByArticleId(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const reviews = await this.reviewService.getReviewsByArticleId(id);
      return res.status(200).json(reviews);
    }
    catch(err) {
      next(err);
    }
  }
}

export default ReviewController;
