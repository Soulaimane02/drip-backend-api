import mongoose from "mongoose";
import Conversation from "../models/entities/conversation/conversation";
import ConversationDatabaseSchema from "../schemas/database/conversation.database.schema";
import BaseRepository from "./base.repository";

class ConversationRepository extends BaseRepository<Conversation> {
  constructor() {
    super(mongoose.model<Conversation>("Conversation", ConversationDatabaseSchema));
  }

  async getByUserId(userId: string): Promise<Conversation[]> {
    const conversations = await this.model.find({
      $or: [{ firstUserId: userId }, { secondUserId: userId }]
    });
    return conversations.map((conversation) => conversation.toObject());
  }
}

export default ConversationRepository;
