import express from "express";
import ConversationController from "../controllers/conversation.controller";
import { isSignedInMiddleware } from "../middlewares/base.middlewares";

const conversationRoutes = () => {
  const router = express.Router();
  const conversationController = new ConversationController();

  router.get("/", isSignedInMiddleware(), conversationController.getAllConversations.bind(conversationController));
  router.get("/:id", isSignedInMiddleware(), conversationController.getConversationById.bind(conversationController));
  router.get("/user/:id", isSignedInMiddleware(), conversationController.getConversationsByUserId.bind(conversationController));
  router.post("/", isSignedInMiddleware(), conversationController.startConversation.bind(conversationController));
  router.delete("/:id", isSignedInMiddleware(), conversationController.deleteConversation.bind(conversationController));

  return router;
};

export default conversationRoutes;
