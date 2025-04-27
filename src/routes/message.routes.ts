import express from "express";
import MessageController from "../controllers/message.controller";
import { Server } from "socket.io";
import { isSignedInMiddleware } from "../middlewares/base.middlewares";

const messageRoutes = (io: Server) => {
  const router = express.Router();
  const messageController = new MessageController(io);

  router.get("/", isSignedInMiddleware(), messageController.getAllMessages.bind(messageController));
  router.get("/:id", isSignedInMiddleware(), messageController.getMessageById.bind(messageController));
  router.get("/conversation/:id", isSignedInMiddleware(), messageController.getMessagesByConversationId.bind(messageController));
  router.post("/", isSignedInMiddleware(), messageController.sendMessage.bind(messageController));
  router.put("/:id", isSignedInMiddleware(), messageController.updateMessage.bind(messageController));
  router.put("/respond/:id", isSignedInMiddleware(), messageController.respondOffer.bind(messageController));
  router.delete("/:id", isSignedInMiddleware(), messageController.deleteMessage.bind(messageController));

  return router;
};

export default messageRoutes;
