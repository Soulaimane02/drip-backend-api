import ConversationMapper from "../mappers/conversation.mapper";
import ConversationRequestDTO from "../models/entities/conversation/dto/conversation.request.dto";
import ConversationResponseDTO from "../models/entities/conversation/dto/conversation.response.dto";
import ConversationRepository from "../repositories/conversation.repository";

class ConversationService {
  private readonly conversationRepository: ConversationRepository;
  private readonly conversationMapper: ConversationMapper;

  constructor() {
    this.conversationRepository = new ConversationRepository();
    this.conversationMapper = new ConversationMapper();
  }

  async getAllConversations(): Promise<ConversationResponseDTO[]> {
    const conversations = await this.conversationRepository.getAll();
    return conversations.map((conversation) => this.conversationMapper.toResponseDTO(conversation));
  }

  async getConversationById(id: string): Promise<ConversationResponseDTO> {
    const conversation = await this.conversationRepository.get(id);
    return this.conversationMapper.toResponseDTO(conversation);
  }

  async addConversation(conversationDto: ConversationRequestDTO): Promise<ConversationResponseDTO> {
    const conversation = this.conversationMapper.toEntity(conversationDto);
    const addedConversation = await this.conversationRepository.add(conversation);
    return this.conversationMapper.toResponseDTO(addedConversation);
  }

  async deleteConversation(id: string): Promise<void> {
    return this.conversationRepository.delete(id);
  }
}

export default ConversationService;
