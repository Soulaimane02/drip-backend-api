import mongoose from "mongoose";
import User from "../models/entities/user/user";
import UserDatabaseSchema from "../schemas/database/user.database.schema";
import BaseRepository from "./base.repository";

class UserRepository extends BaseRepository<User> {
  constructor() {
    super(mongoose.model<User>("User", UserDatabaseSchema));
  }

  async getByEmail(email: String): Promise<User | null> {
    const user = await this.model.findOne({ email });
    return user?.toObject() ?? null;
  }
}

export default UserRepository;
