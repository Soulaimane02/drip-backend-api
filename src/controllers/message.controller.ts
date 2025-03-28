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
}

export default MessageController;
