import { Request, Response } from "express";
import UserService from "../services/user.service";

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
}

export default UserController;
