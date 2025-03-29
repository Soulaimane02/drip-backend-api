import express from "express";
import MessageController from "../controllers/message.controller";
import { Server } from "socket.io";

const messageRoutes = (io: Server) => {
  const router = express.Router();
  const messageController = new MessageController(io);

  router.get("/", messageController.getAllMessages.bind(messageController));
  router.get("/:id", messageController.getMessageById.bind(messageController));
  router.post("/", messageController.sendMessage.bind(messageController));
  router.put("/:id", messageController.updateMessage.bind(messageController));

  return router;
};

export default messageRoutes;
