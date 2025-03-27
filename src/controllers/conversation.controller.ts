import { Request, Response } from "express";
import ConversationService from "../services/conversation.service";

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
}

export default ConversationController;
