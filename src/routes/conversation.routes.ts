import express from "express";
import ConversationController from "../controllers/conversation.controller";

const router = express.Router();
const conversationController = new ConversationController();

router.get("/", conversationController.getAllConversations.bind(conversationController));
router.get("/:id", conversationController.getConversationById.bind(conversationController));
router.post("/", conversationController.startConversation.bind(conversationController));
router.delete("/:id", conversationController.deleteConversation.bind(conversationController));

export default router;
