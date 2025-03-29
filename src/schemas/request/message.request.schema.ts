import joi from "joi";
import Message from "../../models/entities/message/message";
import Offer from "../../models/entities/offer/offer";

const MessageRequestSchema = joi.object<Message>({
  content: joi.string().min(1).required(),
  isUpdated: joi.boolean().default(false).optional(),
  isOffer: joi.boolean().required(),
  userId: joi.string().hex().length(24).required(),
  conversationId: joi.string().hex().length(24).required(),
  pictures: joi.array().items(joi.string().uri()).min(1).optional(),
  offer: joi.object<Offer>().optional()
});

export default MessageRequestSchema;
