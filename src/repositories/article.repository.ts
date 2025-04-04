import mongoose from "mongoose";
import Article from "../models/entities/article/article";
import ArticleDatabaseSchema from "../schemas/database/article.database.schema";
import BaseRepository from "./base.repository";

class ArticleRepository extends BaseRepository<Article> {
  constructor() {
    super(mongoose.model<Article>("Article", ArticleDatabaseSchema));
  }

  async getByCategory(categoryId: string): Promise<Article[]> {
    const articles = await this.model.find({ categories: categoryId });
    return articles.map((article) => article.toObject());
  }
}

export default ArticleRepository;
