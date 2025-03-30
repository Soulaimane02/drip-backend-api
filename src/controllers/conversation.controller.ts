import { Request, Response } from "express";
import ConversationService from "../services/conversation.service";
import ConversationRequestSchema from "../schemas/request/conversation.request.schema";
import ConversationRequestDTO from "../models/entities/conversation/dto/conversation.request.dto";

class ConversationController {
  private readonly conversationService: ConversationService;

  constructor() {
    this.conversationService = new ConversationService();
  }

  async getAllConversations(req: Request, res: Response) {
    try {
      const conversations = await this.conversationService.getAllConversations();
      return res.status(200).json(conversations);
    }
    catch(err: any) {
      return res.status(500).json({ error: "Internal server error" });
    }
  } 

  async getConversationById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const conversation = await this.conversationService.getConversationById(id);
      return res.status(200).json(conversation);
    }
    catch(err: any) {
      if(err.message === "Conversation not found !") {
        return res.status(404).json({ error: "Conversation not found" });
      }
      else if(err.name === "CastError") {
        return res.status(400).json({ error: "Invalid ID format" });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getConversationsByUserId(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const conversations = await this.conversationService.getConversationsByUserId(id);
      return res.status(200).json(conversations);
    }
    catch(err: any) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async startConversation(req: Request, res: Response) {
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
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteConversation(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await this.conversationService.deleteConversation(id);
      return res.status(200).json({ message: "Conversation deleted successfully" });
    }
    catch(err: any) {
      if(err.message === "Conversation not found !") {
        return res.status(404).json({ error: "Conversation not found" });
      }
      else if(err.name === "CastError") {
        return res.status(400).json({ error: "Invalid ID format" });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default ConversationController;
