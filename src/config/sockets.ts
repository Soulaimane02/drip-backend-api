import { Express } from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import ConversationService from "../services/conversation.service";
import MessageService from "../services/message.service";

dotenv.config();
const IP_ADRESS = process.env.IP_ADRESS as string;

const initSockets = (app: Express) => {
  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: IP_ADRESS,
      methods: ["GET", "POST", "PUT", "DELETE"],
    }
  });

  const conversationService = new ConversationService(io);
  const messageService = new MessageService(io);
  
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    conversationService.setupSocketListeners(socket);
    messageService.setupSocketListeners(socket);
  
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  return { server, io };
}

export default initSockets;
