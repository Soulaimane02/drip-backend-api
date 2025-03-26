import PaymentRepository from "../repositories/payment.repository";
import Payment from "../models/entities/payment/payment";
import PaymentRequestDTO from "../models/entities/payment/dto/payment.request.dto";
import PaymentResponseDTO from "../models/entities/payment/dto/payment.response.dto";
import ArticleRepository from "../repositories/article.repository";
import PaymentMapper from "../mappers/payment.mapper";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const STRIPE_API_KEY = process.env.STRIPE_API_KEY as string;

class PaymentService {
  private readonly paymentRepository: PaymentRepository;
  private readonly paymentMapper: PaymentMapper;
  private readonly articleRepository: ArticleRepository;
  private readonly stripeService: Stripe

  constructor() {
    this.paymentRepository = new PaymentRepository();
    this.paymentMapper = new PaymentMapper();
    this.articleRepository = new ArticleRepository();
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

  async getPaymentsByUserId(userId: string): Promise<PaymentResponseDTO[]> {
    const payments = await this.paymentRepository.getByUserId(userId);
    return payments.map((payment) => this.paymentMapper.toResponseDTO(payment));
  }

  async getPaymentsByArticleId(articleId: string): Promise<PaymentResponseDTO[]> {
    const payments = await this.paymentRepository.getByArticleId(articleId);
    return payments.map((payment) => this.paymentMapper.toResponseDTO(payment));
  }

  async createPayment(paymentDto: PaymentRequestDTO): Promise<PaymentResponseDTO> {
    const article = await this.articleRepository.get(paymentDto.articleId);

    const paymentIntent = await this.stripeService.paymentIntents.create({
      amount: article.price * 100,
      currency: "eur",
      description: `Payment for article ${paymentDto.articleId} by user ${paymentDto.userId}`,
    });

    const payment: Payment = this.paymentMapper.toEntity(paymentDto);
    payment.stripeId = paymentIntent.id;
    payment.amount = paymentIntent.amount / 100;
    payment.description = paymentIntent.description!;
    const savedPayment = await this.paymentRepository.add(payment);
    return this.paymentMapper.toResponseDTO(savedPayment);
  }

  async deletePayment(id: string): Promise<void> {
    await this.paymentRepository.delete(id);
  }
}

export default PaymentService;
