import { Request, Response, NextFunction } from "express";
import { getUserByToken } from "../utils/token";
import ConversationRepository from "../repositories/conversation.repository";

const conversationRepository = new ConversationRepository(); 

export const verifyConversationOwnershipMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const user = await getUserByToken(token as string);
      const conversationId = req.params.id;
      const conversation = await conversationRepository.get(conversationId);

      if(conversation.firstUserId !== user.id && conversation.secondUserId !== user.id) {
        return res.status(403).json({ error: "You do not have permission in this conversation" });
      }

      next();
    }
    catch(err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };
};

export const verifyConversationOwnershipFromBodyMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const user = await getUserByToken(token as string);
      const firstUserId = req.body.firstUserId;
      const secondUserId = req.body.secondUserId;

      if(firstUserId !== user.id && secondUserId !== user.id) {
        return res.status(403).json({ error: "You do not have permission to start this conversation" });
      }

      next();
    }
    catch(err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };
};
