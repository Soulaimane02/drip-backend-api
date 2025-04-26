import { Request, Response, NextFunction } from "express";
import ArticleService from "../services/article.service";
import ArticleRequestSchema from "../schemas/request/article.request.schema";
import ArticleRequestDTO from "../models/entities/article/dto/article.request.dto";
import CategoryService from "../services/category.service";
import dotenv from "dotenv";
import { deleteOldPictures } from "../utils/files";

dotenv.config();
const BASE_URL = process.env.BASE_URL as string;

class ArticleController {
  private readonly articleService: ArticleService;
  private readonly categoryService: CategoryService;

  constructor() {
    this.articleService = new ArticleService();
    this.categoryService = new CategoryService();
  }

  async getAllArticles(req: Request, res: Response, next: NextFunction) {
    try {
      const articles = await this.articleService.getAllArticles();
      return res.status(200).json(articles);
    }
    catch(err) {
      next(err);
    }
  }

  async getArticleById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const article = await this.articleService.getArticleById(id);
      return res.status(200).json(article);
    }
    catch(err) {
      next(err);
    }
  }

  async getArticlesByCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryId = req.params.id;
      const articles = await this.articleService.getArticlesByCategory(categoryId);
      return res.status(200).json(articles);
    }
    catch(err) {
      next(err);
    }
  }

  async getCategoryTreesOfArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const article = await this.articleService.getArticleById(id);

      const treePromises = article.categories.map(async (category) => {
        return await this.categoryService.getCategoryTree(category);
      });

      const trees = await Promise.all(treePromises);
      return res.status(200).json({ trees: trees });
    }
    catch(err) {
      next(err);
    }
  }

  async addArticle(req: Request, res: Response, next: NextFunction) {
    try {
      if(req.files) {
        req.body.pictures = (req.files as Express.Multer.File[]).map((file) => `${BASE_URL}/uploads/article-pictures/${file.filename}`);
      }

      const { error, value } = ArticleRequestSchema.validate(req.body);
      if(error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const articleDto: ArticleRequestDTO = value;
      const addedArticle = await this.articleService.addArticle(articleDto);
      return res.status(201).json(addedArticle);
    }
    catch(err) {
      next(err);
    }
  }

  async updateArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const existingArticle = await this.articleService.getArticleById(id);

      if(req.files) {
        deleteOldPictures(existingArticle.pictures, "article-pictures");
        req.body.pictures = (req.files as Express.Multer.File[]).map((file) => `${BASE_URL}/uploads/article-pictures/${file.filename}`);
      }

      const schema = ArticleRequestSchema.fork(Object.keys(ArticleRequestSchema.describe().keys), (schema) => schema.optional());
      const { error, value } = schema.validate(req.body);
      if(error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const articleDto: ArticleRequestDTO = value;
      const updatedArticle = await this.articleService.updateArticle(id, articleDto);
      return res.status(201).json(updatedArticle);
    }
    catch(err) {
      next(err);
    }
  }

  async deleteArticle(req: Request, res: Response, next: NextFunction) { 
    try {
      const id = req.params.id;
      await this.articleService.deleteArticle(id);
      return res.status(200).json({ message: "Article deleted successfully" });
    }
    catch(err) {
      next(err);
    }
  }
}

export default ArticleController;
