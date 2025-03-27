import mongoose from "mongoose";
import Repository from "../config/repository";
import Message from "../models/entities/message/message";
import MessageDatabaseSchema from "../schemas/database/message.database.schema";

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
  
  async delete(id: String): Promise<void> {
    const message = await this.messageModel.findByIdAndDelete(id);
    if(!message) {
      throw new Error("Message not found !");
    }
  }
}

export default MessageRepository;
