import joi from "joi";
import Payment from "../../models/entities/payment/payment";

const PaymentRequestSchema = joi.object<Payment>({
  amount: joi.number().min(0).required(),
  userId: joi.string().hex().length(24).required(),
  articleId: joi.string().hex().length(24).required()
});

export default PaymentRequestSchema;
