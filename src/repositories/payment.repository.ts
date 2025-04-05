import mongoose from "mongoose";
import Payment from "../models/entities/payment/payment";
import PaymentDatabaseSchema from "../schemas/database/payment.database.schema";
import BaseRepository from "./base.repository";

class PaymentRepository extends BaseRepository<Payment> {
  constructor() {
    super(mongoose.model<Payment>("Payment", PaymentDatabaseSchema));
  }

  async getByUserId(userId: string): Promise<Payment[]> {
    const payments = await this.model.find({ userId });
    return payments.map((payment) => payment.toObject());
  }
  
  async getByArticleId(articleId: string): Promise<Payment[]> {
    const payments = await this.model.find({ articleId });
    return payments.map((payment) => payment.toObject());
  }
}

export default PaymentRepository;
