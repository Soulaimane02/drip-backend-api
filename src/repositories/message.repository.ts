import mongoose from "mongoose";
import Repository from "../config/repository";
import Message from "../models/entities/message/message";
import MessageDatabaseSchema from "../schemas/database/message.database.schema";
import OfferStatus from "../models/enums/offer.status";

class MessageRepository implements Repository<Message> {
  private readonly messageModel;

  constructor() {
    this.messageModel = mongoose.model<Message>("Message", MessageDatabaseSchema);
  }

  async getAll(): Promise<Message[]> {
    const messages = await this.messageModel.find();
    return messages.map((message) => message.toObject());
  }
  
  async get(id: String): Promise<Message> {
    const message = await this.messageModel.findById(id);
    if(!message) {
      throw new Error("Message not found !");
    }
    return message?.toObject();
  }

  async getByConversationId(conversationId: string): Promise<Message[]> {
    const messages = await this.messageModel.find({ conversationId });
    return messages.map((message) => message.toObject());
  }
  
  async add(messageToAdd: Message): Promise<Message> {
    const message = await new this.messageModel(messageToAdd).save();
    return message.toObject();
  }
  
  async put(id: String, newMessage: Message): Promise<Message> {
    const message = await this.messageModel.findByIdAndUpdate(id, newMessage, {new: true});
    if(!message) {
      throw new Error("Message not found !");
    }
    return message?.toObject();
  }

  async updateIsUpdated(messageId: string, isUpdated: boolean = true): Promise<void> {
    const message = await this.messageModel.findByIdAndUpdate(messageId, { isUpdated }, { new: true });
    if(!message) {
      throw new Error("Message not found !");
    }
  }

  async updateOfferStatus(messageId: string, isAccepted: boolean): Promise<Message> {
    const message = await this.messageModel.findById(messageId);
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
  
  async delete(id: String): Promise<void> {
    const message = await this.messageModel.findByIdAndDelete(id);
    if(!message) {
      throw new Error("Message not found !");
    }
  }
}

export default MessageRepository;
