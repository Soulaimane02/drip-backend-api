import { Server, Socket } from "socket.io";
import MessageRepository from "../repositories/message.repository";
import MessageResponseDTO from "../models/entities/message/dto/message.response.dto";
import MessageMapper from "../mappers/message.mapper";
import MessageRequestDTO from "../models/entities/message/dto/message.request.dto";
import ConversationRepository from "../repositories/conversation.repository";

class MessageService {
  private readonly messageRepository: MessageRepository;
  private readonly messageMapper: MessageMapper;
  private readonly conversationRepository: ConversationRepository;
  private readonly io: Server;

  constructor(io: Server) {
    this.messageRepository = new MessageRepository();
    this.messageMapper = new MessageMapper();
    this.conversationRepository = new ConversationRepository();
    this.io = io;
  }

  async getAllMessages(): Promise<MessageResponseDTO[]> {
    const messages = await this.messageRepository.getAll();
    return messages.map((message) => this.messageMapper.toResponseDTO(message));
  }

  async getMessageById(id: string): Promise<MessageResponseDTO> {
    const message = await this.messageRepository.get(id);
    return this.messageMapper.toResponseDTO(message);
  }

  async createMessage(messageDto: MessageRequestDTO): Promise<MessageResponseDTO> {
    const message = this.messageMapper.toEntity(messageDto);
    const newMessage = await this.messageRepository.add(message);
    const messageResponse = this.messageMapper.toResponseDTO(newMessage);

    const conversation = await this.conversationRepository.get(messageDto.conversationId);
    this.io.to(conversation.firstUserId).emit("messageSent", messageResponse);
    this.io.to(conversation.secondUserId).emit("messageSent", messageResponse);

    return messageResponse;
  }

  async updateMessage(id: string, messageDto: MessageRequestDTO): Promise<MessageResponseDTO> {
    const message = this.messageMapper.toEntity(messageDto);
    const updatedMessage = await this.messageRepository.put(id, message);
    const messageResponse = this.messageMapper.toResponseDTO(updatedMessage);

    const conversation = await this.conversationRepository.get(messageDto.conversationId);
    this.io.to(conversation.firstUserId).emit("messageUpdated", messageResponse);
    this.io.to(conversation.secondUserId).emit("messageUpdated", messageResponse);

    return messageResponse;
  }

  async deleteMessage(id: string): Promise<void> {
    const message = await this.messageRepository.get(id);
    const conversation = await this.conversationRepository.get(message.conversationId);
    await this.messageRepository.delete(id);

    this.io.to(conversation.firstUserId).emit("messageDeleted", id);
    this.io.to(conversation.secondUserId).emit("messageDeleted", id);
  }

  setupSocketListeners(socket: Socket): void {
    socket.on("messageSent", async (message) => {
      await this.createMessage(message);
    });
  
    socket.on("messageUpdated", async ({ id, messageDto }) => {
      await this.updateMessage(id, messageDto);
    });

    socket.on("messageDeleted", async (id) => {
      await this.deleteMessage(id);
    });
  }
}

export default MessageService;
