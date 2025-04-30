import { Request, Response, NextFunction } from "express";
import { getUserByToken } from "../utils/token";
import ReviewRepository from "../repositories/review.repository";
import Role from "../models/enums/role";

const reviewRepository = new ReviewRepository();

export const verifyReviewOwnershipFromBodyMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const user = await getUserByToken(token as string);
      const userId = req.body.userId;

      if(userId !== user.id) {
        return res.status(403).json({ error: "You can only create reviews for yourself" });
      }

      next();
    }
    catch(err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };
};

export const verifyReviewOwnershipByIdMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const user = await getUserByToken(token as string);
      const reviewId = req.params.id;
      const review = await reviewRepository.get(reviewId);

      if(user.role !== Role.Admin && review.userId !== user.id) {
        return res.status(403).json({ error: "You do not have permission in this review" });
      }

      next();
    }
    catch(err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };
};
