import Mapper from "./mapper";
import Conversation from "../models/entities/conversation/conversation";
import ConversationRequestDTO from "../models/entities/conversation/dto/conversation.request.dto";
import ConversationResponseDTO from "../models/entities/conversation/dto/conversation.response.dto";

class ConversationMapper implements Mapper<Conversation, ConversationRequestDTO, ConversationResponseDTO> {
  toEntity(dto: ConversationRequestDTO): Conversation {
    return {
      id: "",
      firstUserId: dto.firstUserId,
      secondUserId: dto.secondUserId
    }
  }

  toRequestDTO(entity: Conversation): ConversationRequestDTO {
    return {
      firstUserId: entity.firstUserId,
      secondUserId: entity.secondUserId
    }
  }

  toResponseDTO(entity: Conversation): ConversationResponseDTO {
    return {
      id: entity.id,
      firstUserId: entity.firstUserId,
      secondUserId: entity.secondUserId
    }
  }
}

export default ConversationMapper;
