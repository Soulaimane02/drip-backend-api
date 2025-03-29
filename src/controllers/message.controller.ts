import { Request, Response } from "express";
import MessageService from "../services/message.service";
import MessageRequestSchema from "../schemas/request/message.request.schema";
import { Server } from "socket.io";
import MessageRequestDTO from "../models/entities/message/dto/message.request.dto";

class MessageController {
  private readonly messageService: MessageService;

  constructor(io: Server) {
    this.messageService = new MessageService(io);
  }

  getAllMessages(req: Request, res: Response) {
    try {
      const messages = this.messageService.getAllMessages();
      return res.status(200).json(messages);
    }
    catch(err: any) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  getMessageById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const message = this.messageService.getMessageById(id);
      return res.status(200).json(message);
    }
    catch(err: any) {
      if(err.message === "Message not found !") {
        return res.status(404).json({ error: "Message not found" });
      }
      else if(err.name === "CastError") {
        return res.status(400).json({ error: "Invalid ID format" });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async sendMessage(req: Request, res: Response) {
    try {
      const { error, value } = MessageRequestSchema.validate(req.body);
      if(error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const message: MessageRequestDTO = value;
      const sentMessage = await this.messageService.createMessage(message);
      return res.status(201).json(sentMessage);
    }
    catch(err: any) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default MessageController;
