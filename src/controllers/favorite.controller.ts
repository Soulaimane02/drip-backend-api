import { Request, Response, NextFunction } from "express";
import FavoriteService from "../services/favorite.service";
import FavoriteRequestSchema from "../schemas/request/favorite.request.schema";
import FavoriteRequestDTO from "../models/entities/favorite/dto/favorite.request.dto";

class FavoriteController {
  private readonly favoriteService: FavoriteService;

  constructor() {
    this.favoriteService = new FavoriteService();
  }

  async getAllFavorites(req: Request, res: Response, next: NextFunction) {
    try {
      const favorites = await this.favoriteService.getAllFavorites();
      return res.status(200).json(favorites);
    }
    catch(err) {
      next(err);
    }
  }

  async getFavoritesByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const favorite = await this.favoriteService.getByUserId(id);
      return res.status(200).json(favorite);
    }
    catch(err) {
      next(err);
    }
  }

  async getFavoritesByArticleId(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const favorite = await this.favoriteService.getByArticleId(id);
      return res.status(200).json(favorite);
    }
    catch(err) {
      next(err);
    }
  }

  async addFavorite(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = FavoriteRequestSchema.validate(req.body);
      if(error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const favorite: FavoriteRequestDTO = value;
      const addedFavorite = await this.favoriteService.addFavorite(favorite);
      return res.status(201).json(addedFavorite);
    }
    catch(err) {
      next(err);
    }
  }

  async deleteFavorite(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await this.favoriteService.deleteFavorite(id);
      return res.status(200).json({ message: "Favorite deleted successfully" });
    }
    catch(err) {
      next(err);
    }
  }
}

export default FavoriteController;