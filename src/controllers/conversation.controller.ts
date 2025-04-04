import { Request, Response, NextFunction } from "express";
import ConversationService from "../services/conversation.service";
import ConversationRequestSchema from "../schemas/request/conversation.request.schema";
import ConversationRequestDTO from "../models/entities/conversation/dto/conversation.request.dto";

class ConversationController {
  private readonly conversationService: ConversationService;

  constructor() {
    this.conversationService = new ConversationService();
  }

  async getAllConversations(req: Request, res: Response, next: NextFunction) {
    try {
      const conversations = await this.conversationService.getAllConversations();
      return res.status(200).json(conversations);
    }
    catch(err) {
      next(err);
    }
  } 

  async getConversationById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const conversation = await this.conversationService.getConversationById(id);
      return res.status(200).json(conversation);
    }
    catch(err) {
      next(err);
    }
  }

  async getConversationsByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const conversations = await this.conversationService.getConversationsByUserId(id);
      return res.status(200).json(conversations);
    }
    catch(err) {
      next(err);
    }
  }

  async startConversation(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = ConversationRequestSchema.validate(req.body);
      if(error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const conversation: ConversationRequestDTO = value;
      const addedConversation = await this.conversationService.createConversation(conversation);
      return res.status(200).json(addedConversation);
    }
    catch(err: any) {
      next(err);
    }
  }

  async deleteConversation(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await this.conversationService.deleteConversation(id);
      return res.status(200).json({ message: "Conversation deleted successfully" });
    }
    catch(err: any) {
      next(err);
    }
  }
}

export default ConversationController;
