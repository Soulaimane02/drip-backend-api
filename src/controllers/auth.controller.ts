import { Request, Response } from "express";
import AuthService from "../services/auth.service";
import UserRequestSchema from "../schemas/request/user.request.schema";
import UserRequestDTO from "../models/entities/user/dto/user.request.dto";

class AuthController {
  private readonly authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(req: Request, res: Response) {
    try {
      const { error, value } = UserRequestSchema.validate(req.body);
      if(error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const userDto: UserRequestDTO = value;

      const token = await this.authService.register(userDto, req.body.password);
      return res.status(200).json({ token: token });
    }
    catch(err: any) {
      if(err.message === "Email already exists") {
        return res.status(409).json({ error: "Email already exists" });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if(!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }

      const token = await this.authService.login(email, password);
      return res.status(200).json({ token });
    }
    catch(err: any) {
      if(err.message === "User not found") {
        return res.status(401).json({ error: "Invalid email" });
      }
      else if(err.message === "Invalid password") {
        return res.status(401).json({ error: "Invalid password" });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default AuthController;
