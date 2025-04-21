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
        console.log("Request Body:", req.body); // Affiche les données reçues pour diagnostic

        // Récupérer l'utilisateur existant depuis la base de données
        const existingUser = await this.userService.getUserById(id);
        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }

        // Gérer l'upload de l'image si nécessaire
        if (req.file) {
            deleteOldPicture(existingUser.profilePicture, "profile-pictures");
            req.body.profilePicture = `${BASE_URL}/uploads/profile-pictures/${req.file.filename}`;
        }

        // Ne pas inclure de mot de passe ou autre logique qui pourrait poser problème
        const { password, ...updatedData } = req.body;

        // Effectuer la mise à jour de l'utilisateur
        const updatedUser = await this.userService.updateUser(id, updatedData);

        return res.status(200).json(updatedUser); // Retourner la réponse avec l'utilisateur mis à jour
    } catch (err) {
        console.error("Error during update:", err);
        return res.status(500).json({ error: 'Internal Server Error' });
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
