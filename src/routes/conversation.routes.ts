import express from "express";
import ConversationController from "../controllers/conversation.controller";
import { Server } from "socket.io";

const conversationRoutes = (io: Server) => {
  const router = express.Router();
  const conversationController = new ConversationController(io);

  router.get("/", conversationController.getAllConversations.bind(conversationController));
  router.get("/:id", conversationController.getConversationById.bind(conversationController));
  router.get("/user/:id", conversationController.getConversationsByUserId.bind(conversationController));
  router.post("/", conversationController.startConversation.bind(conversationController));
  router.delete("/:id", conversationController.deleteConversation.bind(conversationController));

  return router;
};

export default conversationRoutes;
