import { Request, Response, NextFunction } from "express";
import { getUserByToken } from "../utils/token";
import PaymentRepository from "../repositories/payment.repository";
import Role from "../models/enums/role";

const paymentRepository = new PaymentRepository();

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
