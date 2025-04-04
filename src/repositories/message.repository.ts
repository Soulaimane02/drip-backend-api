import mongoose from "mongoose";
import Message from "../models/entities/message/message";
import MessageDatabaseSchema from "../schemas/database/message.database.schema";
import OfferStatus from "../models/enums/offer.status";
import BaseRepository from "./base.repository";

class MessageRepository extends BaseRepository<Message> {
  constructor() {
    super(mongoose.model<Message>("Message", MessageDatabaseSchema));
  }

  async getByConversationId(conversationId: string): Promise<Message[]> {
    const messages = await this.model.find({ conversationId });
    return messages.map((message) => message.toObject());
  }

  async updateIsUpdated(messageId: string, isUpdated: boolean = true): Promise<void> {
    const message = await this.model.findByIdAndUpdate(messageId, { isUpdated }, { new: true });
    if(!message) {
      throw new Error("Message not found !");
    }
  }

  async updateOfferStatus(messageId: string, isAccepted: boolean): Promise<Message> {
    const message = await this.model.findById(messageId);
    if(!message) {
      throw new Error("Message not found !");
    }
    if(!message.offer) {
      throw new Error("No offer associated with this message !");
    }
  
    message.offer.status = isAccepted ? OfferStatus.ACCEPTED : OfferStatus.REJECTED;
    const updatedMessage = await message.save();
    return updatedMessage.toObject();
  }
}

export default MessageRepository;
