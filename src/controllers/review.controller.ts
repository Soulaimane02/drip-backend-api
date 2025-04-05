import { Response, Request, NextFunction } from "express";
import ReviewService from "../services/review.service";
import ReviewRequestSchema from "../schemas/request/review.request.schema";
import ReviewRequestDTO from "../models/entities/review/dto/review.request.dto";
import dotenv from "dotenv";
import { deleteOldPictures } from "../utils/files";

dotenv.config();
const BASE_URL = process.env.BASE_URL as string;

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
      if(req.files) {
        req.body.pictures = (req.files as Express.Multer.File[]).map((file) => `${BASE_URL}/uploads/review-pictures/${file.filename}`);
      }

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

  async updateReview(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const existingReview = await this.reviewService.getReviewById(id);

      if(req.files) {
        deleteOldPictures(existingReview.pictures as string[], "review-pictures");
        req.body.pictures = (req.files as Express.Multer.File[]).map((file) => `${BASE_URL}/uploads/review-pictures/${file.filename}`);
      }

      const { error, value } = ReviewRequestSchema.validate(req.body);
      if(error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const review: ReviewRequestDTO = value;
      const updatedReview = await this.reviewService.updateReview(id, review);
      return res.status(200).json(updatedReview);
    }
    catch(err) {
      next(err);
    }
  }

  async deleteReview(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await this.reviewService.deleteReview(id);
      return res.status(200).json({ message: "Review deleted successfully" });
    }
    catch(err) {
      next(err);
    }
  }
}

export default ReviewController;
