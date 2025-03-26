import { Request, Response } from "express";
import PaymentService from "../services/payment.service";
import PaymentRequestSchema from "../schemas/request/payment.request.schema";
import PaymentRequestDTO from "../models/entities/payment/dto/payment.request.dto";

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
      if(err.message === "Payment not found !") {
        return res.status(404).json({ error: "Payment not found" });
      }
      else if(err.name === "CastError") {
        return res.status(400).json({ error: "Invalid ID format" });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getPaymentsByUserId(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const payments = await this.paymentService.getPaymentsByUserId(id);
      return res.status(200).json(payments);
    }
    catch(err: any) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getPaymentsByArticleId(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const payments = await this.paymentService.getPaymentsByArticleId(id);
      return res.status(200).json(payments);
    }
    catch(err: any) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async pay(req: Request, res: Response) {
    try {
      const { error, value } = PaymentRequestSchema.validate(req.body);
      if(error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const payment: PaymentRequestDTO = value;
      const savedPayment = await this.paymentService.createPayment(payment);
      return res.status(200).json(savedPayment);
    }
    catch(err: any) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default PaymentController;
