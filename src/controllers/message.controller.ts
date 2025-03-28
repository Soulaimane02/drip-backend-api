import { Request, Response } from "express";
import MessageService from "../services/message.service";
import { Server } from "socket.io";

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
}

export default MessageController;
