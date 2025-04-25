import { Request, Response, NextFunction } from "express";
import MessageService from "../services/message.service";
import MessageRequestSchema from "../schemas/request/message.request.schema";
import { Server } from "socket.io";
import MessageRequestDTO from "../models/entities/message/dto/message.request.dto";
import dotenv from "dotenv";
import { deleteOldPictures } from "../utils/files";

dotenv.config();
const BASE_URL = process.env.BASE_URL as string;

class MessageController {
  private readonly messageService: MessageService;

  constructor(io: Server) {
    this.messageService = new MessageService(io);
  }

  async getAllMessages(req: Request, res: Response, next: NextFunction) {
    try {
      const messages = await this.messageService.getAllMessages();
      return res.status(200).json(messages);
    }
    catch(err) {
      next(err);
    }
  }

  async getMessageById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const message = await this.messageService.getMessageById(id);
      return res.status(200).json(message);
    }
    catch(err) {
      next(err);
    }
  }

  async getMessagesByConversationId(req: Request, res: Response, next: NextFunction) {
    try {
      const conversationId = req.params.id;
      const messages = await this.messageService.getMessagesByConversationId(conversationId);
      return res.status(200).json(messages);
    }
    catch(err) {
      next(err);
    }
  }

  async sendMessage(req: Request, res: Response, next: NextFunction) {
    try {
      if(req.files) {
        req.body.pictures = (req.files as Express.Multer.File[]).map((file) => `${BASE_URL}/uploads/message-pictures/${file.filename}`);
      }

      const { error, value } = MessageRequestSchema.validate(req.body);
      if(error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const message: MessageRequestDTO = value;
      const sentMessage = await this.messageService.createMessage(message);
      return res.status(201).json(sentMessage);
    }
    catch(err) {
      next(err);
    }
  }

  async updateMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const existingMessage = await this.messageService.getMessageById(id);

      if(req.files) {
        deleteOldPictures(existingMessage.pictures as string[], "message-pictures");
        req.body.pictures = (req.files as Express.Multer.File[]).map((file) => `${BASE_URL}/uploads/message-pictures/${file.filename}`);
      }

      const messageDto: MessageRequestDTO = req.body;
      const updatedMessage = await this.messageService.updateMessage(id, messageDto);
      return res.status(200).json(updatedMessage);
    }
    catch(err) {
      next(err);
    }
  }

  async respondOffer(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const isAccepted = req.body.isAccepted;
      const updatedMessage = await this.messageService.respondOffer(id, isAccepted);
      return res.status(200).json(updatedMessage);
    }
    catch(err) {
      next(err);
    }
  }

  async deleteMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await this.messageService.deleteMessage(id);
      return res.status(200).json({ message: "Message deleted successfully" });
    }
    catch(err) {
      next(err);
    }
  }
}

export default MessageController;
