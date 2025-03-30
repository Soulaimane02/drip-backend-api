import Mapper from "./mapper";
import Payment from "../models/entities/payment/payment";
import PaymentRequestDTO from "../models/entities/payment/dto/payment.request.dto";
import PaymentResponseDTO from "../models/entities/payment/dto/payment.response.dto";

class PaymentMapper implements Mapper<Payment, PaymentRequestDTO, PaymentResponseDTO> {
  toEntity(dto: PaymentRequestDTO): Payment {
    return {
      id: "",
      amount: 0,
      description: "",
      userId: dto.userId,
      articleId: dto.articleId,
      stripeId: "",
      createdAt: new Date()
    };
  }

  toRequestDTO(entity: Payment): PaymentRequestDTO {
    return {
      userId: entity.userId,
      articleId: entity.articleId
    };
  }

  toResponseDTO(entity: Payment): PaymentResponseDTO {
    return {
      id: entity.id,
      description: entity.description,
      userId: entity.userId,
      articleId: entity.articleId,
      stripeId: entity.stripeId,
      createdAt: entity.createdAt
    };
  }
}

export default PaymentMapper;
