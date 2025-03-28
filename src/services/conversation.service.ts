import { Server, Socket } from "socket.io";
import ConversationMapper from "../mappers/conversation.mapper";
import ConversationRequestDTO from "../models/entities/conversation/dto/conversation.request.dto";
import ConversationResponseDTO from "../models/entities/conversation/dto/conversation.response.dto";
import ConversationRepository from "../repositories/conversation.repository";

class ConversationService {
  private readonly conversationRepository: ConversationRepository;
  private readonly conversationMapper: ConversationMapper;
  private readonly io: Server;

  constructor(io: Server) {
    this.conversationRepository = new ConversationRepository();
    this.conversationMapper = new ConversationMapper();
    this.io = io;
  }

  async getAllConversations(): Promise<ConversationResponseDTO[]> {
    const conversations = await this.conversationRepository.getAll();
    return conversations.map((conversation) => this.conversationMapper.toResponseDTO(conversation));
  }

  async getConversationsByUserId(userId: string): Promise<ConversationResponseDTO[]> {
    const conversations = await this.conversationRepository.getByUserId(userId);
    return conversations.map((conversation) => this.conversationMapper.toResponseDTO(conversation));
  }

  async getConversationById(id: string): Promise<ConversationResponseDTO> {
    const conversation = await this.conversationRepository.get(id);
    return this.conversationMapper.toResponseDTO(conversation);
  }

  async createConversation(conversationDto: ConversationRequestDTO): Promise<ConversationResponseDTO> {
    const conversation = this.conversationMapper.toEntity(conversationDto);
    const addedConversation = await this.conversationRepository.add(conversation);
    const responseDto = this.conversationMapper.toResponseDTO(addedConversation);
    const conversationRoom = responseDto.id;

    this.io.sockets.sockets.forEach((socket) => {
      if(socket.id === conversationDto.firstUserId || socket.id === conversationDto.secondUserId) {
        socket.join(conversationRoom);
      }
    });

    this.io.to(conversationRoom).emit("conversationCreated", responseDto);
    return responseDto;
}

  async deleteConversation(id: string): Promise<void> {
    return this.conversationRepository.delete(id);
  }

  setupSocketListeners(socket: Socket): void {
    socket.on("joinConversation", (conversationId) => {
      socket.join(conversationId);
    });

    socket.on("leaveConversation", (conversationId) => {
      socket.leave(conversationId);
    });
  }
}

export default ConversationService;
