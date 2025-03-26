import Mapper from "../config/mapper";
import Payment from "../models/entities/payment/payment";
import PaymentRequestDTO from "../models/entities/payment/dto/payment.request.dto";
import PaymentResponseDTO from "../models/entities/payment/dto/payment.response.dto";

class PaymentMapper implements Mapper<Payment, PaymentRequestDTO, PaymentResponseDTO> {
  toEntity(dto: PaymentRequestDTO): Payment {
    return {
      id: "",
      amount: dto.amount,
      userId: dto.userId,
      articleId: dto.articleId,
    };
  }

  toRequestDTO(entity: Payment): PaymentRequestDTO {
    return {
      amount: entity.amount,
      userId: entity.userId,
      articleId: entity.articleId,
    };
  }

  toResponseDTO(entity: Payment): PaymentResponseDTO {
    return {
      id: entity.id,
      amount: entity.amount,
      userId: entity.userId,
      articleId: entity.articleId,
    };
  }
}

export default PaymentMapper;
