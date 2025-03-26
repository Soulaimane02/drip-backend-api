import joi from "joi";
import Conversation from "../../models/entities/conversation/conversation";

const ConversationRequestSchema = joi.object<Conversation>({
  firstUserId: joi.string().hex().length(24).required(),
  secondUserId: joi.string().hex().length(24).required()
});

export default ConversationRequestSchema;
