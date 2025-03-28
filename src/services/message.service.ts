import { Server, Socket } from "socket.io";
import MessageRepository from "../repositories/message.repository";
import MessageResponseDTO from "../models/entities/message/dto/message.response.dto";
import MessageMapper from "../mappers/message.mapper";
import MessageRequestDTO from "../models/entities/message/dto/message.request.dto";

class MessageService {
  private readonly messageRepository: MessageRepository;
  private readonly messageMapper: MessageMapper;
  private readonly io: Server;

  constructor(io: Server) {
    this.messageRepository = new MessageRepository();
    this.messageMapper = new MessageMapper();
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
    this.io.to(messageDto.conversationId).emit("mesageSent", messageResponse);
    return messageResponse;
  }

  async updateMessage(id: string, messageDto: MessageRequestDTO): Promise<MessageResponseDTO> {
    const message = this.messageMapper.toEntity(messageDto);
    const updatedMessage = await this.messageRepository.put(id, message);
    const messageResponse = this.messageMapper.toResponseDTO(updatedMessage);
    this.io.to(messageDto.conversationId).emit("messageUpdated", messageResponse);
    return messageResponse;
  }

  async deleteMessage(id: string): Promise<void> {
    const message = await this.messageRepository.get(id);
    const conversationId = message.conversationId;
    await this.messageRepository.delete(id);
    this.io.to(conversationId).emit("messageDeleted", id);
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
