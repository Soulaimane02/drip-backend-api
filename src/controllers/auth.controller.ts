import { Request, Response, NextFunction } from "express";
import AuthService from "../services/auth.service";
import UserRequestSchema from "../schemas/request/user.request.schema";
import UserRequestDTO from "../models/entities/user/dto/user.request.dto";
import dotenv from "dotenv";

dotenv.config();
const BASE_URL = process.env.BASE_URL as string;

class AuthController {
  private readonly authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      if(req.file) {
        req.body.profilePicture = `${BASE_URL}/uploads/profile-pictures/${req.file.filename}`;
      }

      const { error, value } = UserRequestSchema.validate(req.body);
      if(error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const userDto: UserRequestDTO = value;
      const token = await this.authService.register(userDto, req.body.password);
      return res.status(200).json({ token: token });
    }
    catch(err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      if(!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }

      const token = await this.authService.login(email, password);
      return res.status(200).json({ token });
    }
    catch(err) {
      next(err);
    }
  }

  async decodeToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if(!token) {
        return res.status(404).json({ error: "Token not provided" });
      }

      const user = await this.authService.decodeToken(token);
      return res.status(200).json(user);
    }
    catch(err) {
      next(err);
    }
  }
}

export default AuthController;
