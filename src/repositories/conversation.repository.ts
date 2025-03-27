import mongoose from "mongoose";
import Repository from "../config/repository";
import Conversation from "../models/entities/conversation/conversation";
import ConversationDatabaseSchema from "../schemas/database/conversation.database.schema";

class ConversationRepository implements Repository<Conversation> {
  private readonly conversationModel;

  constructor() {
    this.conversationModel = mongoose.model<Conversation>("Conversation", ConversationDatabaseSchema);
  }

  async getAll(): Promise<Conversation[]> {
    const conversations = await this.conversationModel.find();
    return conversations.map((conversation) => conversation.toObject());
  }
  
  async get(id: String): Promise<Conversation> {
    const conversation = await this.conversationModel.findById(id);
    if(!conversation) {
      throw new Error("Conversation not found !");
    }
    return conversation?.toObject();
  }

  async add(conversationToAdd: Conversation): Promise<Conversation> {
    const conversation = await new this.conversationModel(conversationToAdd).save();
    return conversation.toObject();
  }
  
  async put(id: String, newConversation: Conversation): Promise<Conversation> {
    const conversation = await this.conversationModel.findByIdAndUpdate(id, newConversation, {new: true});
    if(!conversation) {
      throw new Error("Conversation not found !");
    }
    return conversation?.toObject();
  }
  
  async delete(id: String): Promise<void> {
    const conversation = await this.conversationModel.findByIdAndDelete(id);
    if(!conversation) {
      throw new Error("Conversation not found !");
    }
  }
}

export default ConversationRepository;
