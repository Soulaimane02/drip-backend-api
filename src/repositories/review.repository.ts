import mongoose from "mongoose";
import Review from "../models/entities/review/review";
import ReviewDatabaseSchema from "../schemas/database/review.database.schema";
import BaseRepository from "./base.repository";

class ReviewRepository extends BaseRepository<Review> {
  constructor() {
    super(mongoose.model<Review>("Review", ReviewDatabaseSchema));
  }

  async getByUserId(userId: string): Promise<Review[]> {
    const reviews = await this.model.find({ userId });
    return reviews.map((review) => review.toObject());
  }

  async getByArticleId(articleId: string): Promise<Review[]> {
    const reviews = await this.model.find({ articleId });
    return reviews.map((review) => review.toObject());
  }
}

export default ReviewRepository;
