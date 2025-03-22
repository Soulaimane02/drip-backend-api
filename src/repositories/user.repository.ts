import Repository from "../config/repository";
import User from "../models/user";
import mongoose from "mongoose";
import UserDatabaseSchema from "../schemas/database/user.database.schema";

class UserRepository implements Repository<User> {
  private readonly userModel;
  
  constructor() {
    this.userModel = mongoose.model<User>("User", UserDatabaseSchema); 
  }

  async getAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users.map((user) => user.toObject());
  }
  
  async get(id: String): Promise<User> {
    const user = await this.userModel.findById(id);
    if(!user) {
      throw new Error("User not found !");
    }
    return user?.toObject();
  }
  
  async getByEmail(email: String): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if(!user) {
      throw new Error("User not found !");
    }
    return user.toObject();
  }
  
  async add(userToAdd: User): Promise<User> {
    const user = await new this.userModel(userToAdd).save();
    return user.toObject();
  }
  
  async put(id: String, newUser: User): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(id, newUser, {new: true});
    if(!user) {
      throw new Error("User not found !");
    }
    return user?.toObject();
  }
  
  async delete(id: String): Promise<void> {
    const user = await this.userModel.findByIdAndDelete(id);
    if(!user) {
      throw new Error("User not found !");
    }
  }
}

export default UserRepository;
