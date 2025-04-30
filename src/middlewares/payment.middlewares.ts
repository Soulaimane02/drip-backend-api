import { Request, Response, NextFunction } from "express";
import { getUserByToken } from "../utils/token";
import PaymentRepository from "../repositories/payment.repository";
import Role from "../models/enums/role";
import ArticleRepository from "../repositories/article.repository";

const paymentRepository = new PaymentRepository();
const articleRepository = new ArticleRepository();

export const verifyPaymentOwnershipMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const user = await getUserByToken(token as string);
      const paymentId = req.params.id;
      const payment = await paymentRepository.get(paymentId);

      if(payment.userId !== user.id) {
        return res.status(403).json({ error: "You do not have permission for this payment" });
      }

      next();
    }
    catch(err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };
};

export const verifyPaymentOwnershipByUserIdMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const user = await getUserByToken(token as string);
      const userId = req.params.id;

      if(user.role !== Role.Admin && userId !== user.id) {
        return res.status(403).json({ error: "You do not have permission to access payments of this user" });
      }

      next();
    }
    catch(err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };
};

export const verifyPaymentOwnershipByArticleIdMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const user = await getUserByToken(token as string);
      const articleId = req.params.id;
      const article = await articleRepository.get(articleId);

      if(user.role !== Role.Admin && article.userId !== user.id) {
        return res.status(403).json({ error: "You do not have permission to access payments of this article" });
      }

      next();
    }
    catch(err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };
};
