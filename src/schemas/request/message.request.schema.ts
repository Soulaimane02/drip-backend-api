import joi from "joi";
import Message from "../../models/entities/message/message";

const MessageRequestSchema = joi.object<Message>({
  content: joi.string().min(1).required(),
  isUpdated: joi.boolean().default(false).optional(),
  isOffer: joi.boolean().required(),
  userId: joi.string().hex().length(24).required(),
  conversationId: joi.string().hex().length(24).required(),
  articleId: joi.string().hex().length(24).optional()
});

export default MessageRequestSchema;
