import { Request, Response, NextFunction } from "express";
import { getUserByToken } from "../utils/token";

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
