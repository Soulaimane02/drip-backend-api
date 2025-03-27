import express from "express";
import ConversationController from "../controllers/conversation.controller";

const router = express.Router();
const conversationController = new ConversationController();

router.get("/", conversationController.getAllConversations.bind(conversationController));

export default router;
