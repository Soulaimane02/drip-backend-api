import Mapper from "../config/mapper";
import MessageRequestDTO from "../models/entities/message/dto/message.request.dto";
import MessageResponseDTO from "../models/entities/message/dto/message.response.dto";
import Message from "../models/entities/message/message";

class MessageMapper implements Mapper<Message, MessageRequestDTO, MessageResponseDTO> {
  toEntity(dto: MessageRequestDTO): Message {
    return {
      id: "",
      content: dto.content,
      isUpdated: dto.isUpdated,
      isOffer: dto.isOffer,
      createdAt: new Date(),
      userId: dto.userId,
      conversationId: dto.conversationId,
      articleId: dto.articleId
    }
  }

  toRequestDTO(entity: Message): MessageRequestDTO {
    return {
      content: entity.content,
      isUpdated: entity.isUpdated,
      isOffer: entity.isOffer,
      userId: entity.userId,
      conversationId: entity.conversationId,
      articleId: entity.articleId
    }
  }

  toResponseDTO(entity: Message): MessageResponseDTO {
    return {
      id: entity.id,
      content: entity.content,
      isUpdated: entity.isUpdated,
      isOffer: entity.isOffer,
      createdAt: entity.createdAt,
      userId: entity.userId,
      conversationId: entity.conversationId,
      articleId: entity.articleId
    }
  }
}

export default MessageMapper;
