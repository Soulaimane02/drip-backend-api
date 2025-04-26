import { Request, Response, NextFunction } from "express";
import FavoriteService from "../services/favorite.service";

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
}

export default FavoriteController;
