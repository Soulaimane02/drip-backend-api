import { Request, Response, NextFunction } from "express";
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

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.getAllUsers();
      return res.status(200).json(users);
    }
    catch(err) {
      next(err);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const user = await this.userService.getUserById(id);
      return res.status(200).json(user);
    }
    catch(err) {
      next(err);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
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
      const updatedUser = await this.userService.updateUser(id, userDto, req.body.password);
      return res.status(201).json(updatedUser);
    }
    catch(err) {
      next(err);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) { 
    try {
      const id = req.params.id;
      await this.userService.deleteUser(id);
      return res.status(200).json({ message: "User deleted successfully" });
    }
    catch(err: any) {
      next(err);
    }
  }
}

export default UserController;
