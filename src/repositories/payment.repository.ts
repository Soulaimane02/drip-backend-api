import mongoose from "mongoose";
import Repository from "./repository";
import Payment from "../models/entities/payment/payment";
import PaymentDatabaseSchema from "../schemas/database/payment.database.schema";

class PaymentRepository implements Repository<Payment> {
  private readonly paymentModel;

  constructor() {
    this.paymentModel = mongoose.model<Payment>("Payment", PaymentDatabaseSchema);
  }

  async getAll(): Promise<Payment[]> {
    const payments = await this.paymentModel.find();
    return payments.map((payment) => payment.toObject());
  }
  
  async get(id: String): Promise<Payment> {
    const payment = await this.paymentModel.findById(id);
    if(!payment) {
      throw new Error("Payment not found !");
    }
    return payment?.toObject();
  }

  async getByUserId(userId: string): Promise<Payment[]> {
    const payments = await this.paymentModel.find({ userId });
    return payments.map((payment) => payment.toObject());
  }

  async getByArticleId(articleId: string): Promise<Payment[]> {
    const payments = await this.paymentModel.find({ articleId });
    return payments.map((payment) => payment.toObject());
  }

  async add(paymentToAdd: Payment): Promise<Payment> {
    const payment = await new this.paymentModel(paymentToAdd).save();
    return payment.toObject();
  }
  
  async put(id: String, newPayment: Payment): Promise<Payment> {
    const payment = await this.paymentModel.findByIdAndUpdate(id, newPayment, {new: true});
    if(!payment) {
      throw new Error("Payment not found !");
    }
    return payment?.toObject();
  }
  
  async delete(id: String): Promise<void> {
    const payment = await this.paymentModel.findByIdAndDelete(id);
    if(!payment) {
      throw new Error("Payment not found !");
    }
  }
}

export default PaymentRepository;
