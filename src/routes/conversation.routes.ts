import express from "express";
import ConversationController from "../controllers/conversation.controller";
import { authorisationMiddleware, isSignedInMiddleware } from "../middlewares/base.middlewares";
import Role from "../models/enums/role";

const conversationRoutes = () => {
  const router = express.Router();
  const conversationController = new ConversationController();

  router.get("/", isSignedInMiddleware(), authorisationMiddleware([Role.Admin, Role.Seller, Role.User]), conversationController.getAllConversations.bind(conversationController));
  router.get("/:id", isSignedInMiddleware(), authorisationMiddleware([Role.Admin, Role.Seller, Role.User]), conversationController.getConversationById.bind(conversationController));
  router.get("/user/:id", isSignedInMiddleware(), authorisationMiddleware([Role.Admin, Role.Seller, Role.User]), conversationController.getConversationsByUserId.bind(conversationController));
  router.post("/", isSignedInMiddleware(), authorisationMiddleware([Role.Admin, Role.Seller, Role.User]), conversationController.startConversation.bind(conversationController));
  router.delete("/:id", isSignedInMiddleware(), authorisationMiddleware([Role.Admin, Role.Seller, Role.User]), conversationController.deleteConversation.bind(conversationController));

  return router;
};

export default conversationRoutes;
