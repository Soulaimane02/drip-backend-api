import { Request, Response, NextFunction } from "express";
import { getUserByToken } from "../utils/token";
import PaymentRepository from "../repositories/payment.repository";

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
