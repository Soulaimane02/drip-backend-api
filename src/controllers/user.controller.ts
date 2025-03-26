import { Request, Response } from "express";
import UserService from "../services/user.service";
import UserRequestSchema from "../schemas/request/user.request.schema";
import UserRequestDTO from "../models/entities/user/dto/user.request.dto";
import dotenv from "dotenv";
import { deleteOldPicture } from "../utils/files";

dotenv.config();
const BASE_URL = process.env.BASE_URL as string;

class UserController {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getAllUsers();
      return res.status(200).json(users);
    }
    catch(err: any) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const user = await this.userService.getUserById(id);
      return res.status(200).json(user);
    }
    catch(err: any) {
      if(err.message === "User not found !") {
        return res.status(404).json({ error: "User not found" });
      }
      else if(err.name === "CastError") {
        return res.status(400).json({ error: "Invalid ID format" });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const existingUser = await this.userService.getUserById(id);

      if(req.file) {
        deleteOldPicture(existingUser.profilePicture, "profile-pictures");
        req.body.profilePicture = `${BASE_URL}/uploads/profile-pictures/${req.file.filename}`;
      }

      const { error, value } = UserRequestSchema.validate(req.body);
      if(error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const userDto: UserRequestDTO = value;
      const updatedUser = await this.userService.updateUser(id, userDto);
      return res.status(201).json(updatedUser);
    }
    catch(err: any) {
      if(err.message === "User not found !") {
        return res.status(404).json({ error: "User not found" });
      }
      else if(err.name === "CastError") {
        return res.status(400).json({ error: "Invalid ID format" });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteUser(req: Request, res: Response) { 
    try {
      const id = req.params.id;
      await this.userService.deleteUser(id);
      return res.status(200).json({ message: "User deleted successfully" });
    }
    catch(err: any) {
      if(err.message === "User not found !") {
        return res.status(404).json({ error: "User not found" });
      }
      else if(err.name === "CastError") {
        return res.status(400).json({ error: "Invalid ID format" });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default UserController;
