import { Request, Response, NextFunction } from "express";
import PaymentService from "../services/payment.service";
import PaymentRequestSchema from "../schemas/request/payment.request.schema";
import PaymentRequestDTO from "../models/entities/payment/dto/payment.request.dto";

class PaymentController {
  private readonly paymentService: PaymentService;

  constructor() {
    this.paymentService = new PaymentService();
  }

  async getAllPayments(req: Request, res: Response, next: NextFunction) {
    try {
      const payments = await this.paymentService.getAllPayments();
      return res.status(200).json(payments);
    }
    catch(err) {
      next(err);
    }
  }

  async getPaymentById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const payment = await this.paymentService.getPaymentById(id);
      return res.status(200).json(payment);
    }
    catch(err) {
      next(err);
    }
  }

  async getPaymentsByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const payments = await this.paymentService.getPaymentsByUserId(id);
      return res.status(200).json(payments);
    }
    catch(err) {
      next(err);
    }
  }

  async getPaymentsByArticleId(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const payments = await this.paymentService.getPaymentsByArticleId(id);
      return res.status(200).json(payments);
    }
    catch(err) {
      next(err);
    }
  }

  async pay(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = PaymentRequestSchema.validate(req.body);
      if(error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const payment: PaymentRequestDTO = value;
      const token = req.body.token;
      if(!token) {
        return res.status(400).json({ error: "Token is required" });
      }
      
      const savedPayment = await this.paymentService.createPayment(token, payment);
      return res.status(200).json(savedPayment);
    }
    catch(err: any) {
      next(err);
    }
  }
}

export default PaymentController;
