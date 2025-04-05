import joi from "joi";
import Review from "../../models/entities/review/review";

const ReviewRequestSchema = joi.object<Review>({
  rating: joi.number().min(0.5).max(5).required(),
  comment: joi.string().min(3).max(1000).required(),
  userId: joi.string().hex().length(24).required(),
  articleId: joi.string().hex().length(24).required(),
  pictures: joi.array().items(joi.string().uri()).optional()
});

export default ReviewRequestSchema;
