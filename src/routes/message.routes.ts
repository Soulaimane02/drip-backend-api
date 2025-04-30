import express from "express";
import MessageController from "../controllers/message.controller";
import { Server } from "socket.io";
import { authorisationMiddleware, isSignedInMiddleware } from "../middlewares/base.middlewares";
import Role from "../models/enums/role";
import { verifyMessageOwnershipByConversationIdMiddleware, verifyMessageOwnershipCriticalMiddleware, verifyMessageOwnershipMiddleware, verifyMessageSenderOwnershipMiddleware } from "../middlewares/message.middlewares";

const messageRoutes = (io: Server) => {
  const router = express.Router();
  const messageController = new MessageController(io);

  router.get("/", isSignedInMiddleware(), authorisationMiddleware([Role.Admin]), messageController.getAllMessages.bind(messageController));
  router.get("/:id", isSignedInMiddleware(), authorisationMiddleware([Role.Admin, Role.Seller, Role.User]), verifyMessageOwnershipMiddleware(), messageController.getMessageById.bind(messageController));
  router.get("/conversation/:id", isSignedInMiddleware(), authorisationMiddleware([Role.Admin, Role.Seller, Role.User]), verifyMessageOwnershipByConversationIdMiddleware(), messageController.getMessagesByConversationId.bind(messageController));
  router.post("/", isSignedInMiddleware(), authorisationMiddleware([Role.Admin, Role.Seller, Role.User]), verifyMessageSenderOwnershipMiddleware(), messageController.sendMessage.bind(messageController));
  router.put("/:id", isSignedInMiddleware(), authorisationMiddleware([Role.Admin, Role.Seller, Role.User]), verifyMessageOwnershipCriticalMiddleware(), messageController.updateMessage.bind(messageController));
  router.put("/respond/:id", isSignedInMiddleware(), authorisationMiddleware([Role.Admin, Role.Seller, Role.User]), messageController.respondOffer.bind(messageController));
  router.delete("/:id", isSignedInMiddleware(), authorisationMiddleware([Role.Admin, Role.Seller, Role.User]), verifyMessageOwnershipCriticalMiddleware(), messageController.deleteMessage.bind(messageController));

  return router;
};

export default messageRoutes;
