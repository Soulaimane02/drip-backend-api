import mongoose from "mongoose";
import Repository from "../config/repository";
import Article from "../models/entities/article/article";
import ArticleDatabaseSchema from "../schemas/database/article.database.schema";

class ArticleRepository implements Repository<Article> {
  private readonly articleModel;

  constructor() {
    this.articleModel = mongoose.model<Article>("Article", ArticleDatabaseSchema);
  }

  async getAll(): Promise<Article[]> {
    const articles = await this.articleModel.find();
    return articles.map((article) => article.toObject());
  }
  
  async get(id: String): Promise<Article> {
    const article = await this.articleModel.findById(id);
    if(!article) {
      throw new Error("Article not found !");
    }
    return article?.toObject();
  }
  
  async add(articleToAdd: Article): Promise<Article> {
    const article = await new this.articleModel(articleToAdd).save();
    return article.toObject();
  }
  
  async put(id: String, newArticle: Article): Promise<Article> {
    const article = await this.articleModel.findByIdAndUpdate(id, newArticle, {new: true});
    if(!article) {
      throw new Error("Article not found !");
    }
    return article?.toObject();
  }
  
  async delete(id: String): Promise<void> {
    const article = await this.articleModel.findByIdAndDelete(id);
    if(!article) {
      throw new Error("Article not found !");
    }
  }
}

export default ArticleRepository;
