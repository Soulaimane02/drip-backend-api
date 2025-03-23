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
}

export default UserController;
