import PaymentRepository from "../repositories/payment.repository";
import Payment from "../models/entities/payment/payment";
import PaymentRequestDTO from "../models/entities/payment/dto/payment.request.dto";
import PaymentResponseDTO from "../models/entities/payment/dto/payment.response.dto";
import PaymentMapper from "../mappers/payment.mapper";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const STRIPE_API_KEY = process.env.STRIPE_API_KEY as string;

class PaymentService {
  private readonly paymentRepository: PaymentRepository;
  private readonly paymentMapper: PaymentMapper;
  private readonly stripeService: Stripe

  constructor() {
    this.paymentRepository = new PaymentRepository();
    this.paymentMapper = new PaymentMapper();
    this.stripeService = new Stripe(STRIPE_API_KEY);
  }

  async getAllPayments(): Promise<PaymentResponseDTO[]> {
    const payments = await this.paymentRepository.getAll();
    return payments.map((payment) => this.paymentMapper.toResponseDTO(payment));
  }

  async getPaymentById(id: string): Promise<PaymentResponseDTO> {
    const payment = await this.paymentRepository.get(id);
    return this.paymentMapper.toResponseDTO(payment);
  }

  async createPayment(paymentDto: PaymentRequestDTO): Promise<PaymentResponseDTO> {
    const paymentIntent = await this.stripeService.paymentIntents.create({
      amount: paymentDto.amount,
      currency: "usd",
      description: `Paiement pour l'article ${paymentDto.articleId}`,
    });

    const paymentToSave: Payment = this.paymentMapper.toEntity(paymentDto);
    paymentToSave.id = paymentIntent.id;
    const savedPayment = await this.paymentRepository.add(paymentToSave);
    return this.paymentMapper.toResponseDTO(savedPayment);
  }

  async deletePayment(id: string): Promise<void> {
    await this.paymentRepository.delete(id);
  }
}

export default PaymentService;
