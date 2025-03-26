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

  async getPaymentById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const payment = await this.paymentService.getPaymentById(id);
      return res.status(200).json(payment);
    }
    catch(err: any) {
      if(err.message === "User not found !") {
        return res.status(404).json({ error: "User not found" });
      }
      else if(err.name === "CastError") {
        return res.status(400).json({ error: "Invalid ID format" });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default PaymentController;
