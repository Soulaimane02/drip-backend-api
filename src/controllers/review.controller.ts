import { Response, Request, NextFunction } from "express";
import ReviewService from "../services/review.service";
import ReviewRequestSchema from "../schemas/request/review.request.schema";
import ReviewRequestDTO from "../models/entities/review/dto/review.request.dto";

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

  async addReview(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = ReviewRequestSchema.validate(req.body);
      if(error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const review: ReviewRequestDTO = value;
      const addedReview = await this.reviewService.createReview(review);
      return res.status(201).json(addedReview);
    }
    catch(err) {
      next(err);
    }
  }
}

export default ReviewController;
