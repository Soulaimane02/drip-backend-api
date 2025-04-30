import { Request, Response, NextFunction } from "express";
import { getUserByToken } from "../utils/token";
import MessageRepository from "../repositories/message.repository";
import ConversationRepository from "../repositories/conversation.repository";

const messageRepository = new MessageRepository();
const conversationRepository = new ConversationRepository();

export const verifyMessageOwnershipMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const user = await getUserByToken(token as string);
      const messageId = req.params.id;
      const message = await messageRepository.get(messageId);
      const conversation = await conversationRepository.get(message.conversationId);

      if(message.userId !== user.id && conversation.firstUserId !== user.id && conversation.secondUserId !== user.id) {
        return res.status(403).json({ error: "You do not have permission for this message" });
      }

      next();
    }
    catch(err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };
};

export const verifyMessageOwnershipCriticalMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const user = await getUserByToken(token as string);
      const messageId = req.params.id;
      const message = await messageRepository.get(messageId);

      if(message.userId !== user.id) {
        return res.status(403).json({ error: "You do not have permission for this message" });
      }

      next();
    }
    catch(err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };
};

export const verifyMessageOwnershipByConversationIdMiddleware = () => {
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

export const verifyMessageSenderOwnershipMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const user = await getUserByToken(token as string);
      const userId = req.body.userId;

      if(userId !== user.id) {
        return res.status(403).json({ error: "You do not have permission to send this message" });
      }

      next();
    }
    catch(err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };
};

export const verifyMessageRespondOfferOwnershipMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const user = await getUserByToken(token as string);
      const messageId = req.params.id;
      const message = await messageRepository.get(messageId);
      const conversationId = message.conversationId;
      const conversation = await conversationRepository.get(conversationId);

      if(conversation.firstUserId !== user.id && conversation.secondUserId !== user.id) {
        return res.status(403).json({ error: "You do not have permission to respond to this offer" });
      }
      if(message.userId === user.id) {
        return res.status(403).json({ error: "You cannot respond to your own offer" });
      }

      next();
    }
    catch(err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };
}
