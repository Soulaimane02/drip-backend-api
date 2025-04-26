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

  async getFavoriteByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const favorite = await this.favoriteService.getByUserId(id);
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
}

export default FavoriteController;