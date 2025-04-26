import mongoose from "mongoose";
import Favorite from "../models/entities/favorite/favorite";
import FavoriteDatabaseSchema from "../schemas/database/favorite.database.schema";
import BaseRepository from "./base.repository";

class FavoriteRepository extends BaseRepository<Favorite> {
  constructor() {
    super(mongoose.model<Favorite>("Favorite", FavoriteDatabaseSchema));
  }

  async getByUserId(userId: string): Promise<Favorite[]> {
    const favorites = await this.model.find({ userId });
    return favorites.map((favorite) => favorite.toObject());
  }

  async getByArticleId(articleId: string): Promise<Favorite[]> {
    const favorites = await this.model.find({ articleId });
    return favorites.map((favorite) => favorite.toObject());
  }
}

export default FavoriteRepository;
