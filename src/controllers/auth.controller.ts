import { Request, Response } from "express";
import AuthService from "../services/auth.service";
import UserRequestSchema from "../schemas/request/user.request.schema";
import UserRequestDTO from "../models/dto/user.request.dto";

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
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  /*async login(req: Request, res: Response) {
    try {

    }
    catch(err: any) {

    }
  }*/
}

export default AuthController;
