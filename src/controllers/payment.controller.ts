import { Request, Response } from "express";
import PaymentService from "../services/payment.service";

class PaymentController {
  private readonly paymentService: PaymentService;

  constructor() {
    this.paymentService = new PaymentService();
  }

  async getAllPayments(req: Request, res: Response) {
    try {
      const payments = await this.paymentService.getAllPayments();
      return res.status(200).json(payments);
    }
    catch(err: any) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default PaymentController;
