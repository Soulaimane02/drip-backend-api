import { Request, Response } from "express";
import ArticleService from "../services/article.service";
import ArticleRequestSchema from "../schemas/request/article.request.schema";
import ArticleRequestDTO from "../models/entities/article/dto/article.request.dto";
import CategoryService from "../services/category.service";

class ArticleController {
  private readonly articleService: ArticleService;
  private readonly categoryService: CategoryService;

  constructor() {
    this.articleService = new ArticleService();
    this.categoryService = new CategoryService();
  }

  async getAllArticles(req: Request, res: Response) {
    try {
      const articles = await this.articleService.getAllArticles();
      return res.status(200).json(articles);
    }
    catch(err: any) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getArticleById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const article = await this.articleService.getArticleById(id);
      return res.status(200).json(article);
    }
    catch(err: any) {
      if(err.message === "Article not found !") {
        return res.status(404).json({ error: "Article not found" });
      }
      else if(err.name === "CastError") {
        return res.status(400).json({ error: "Invalid ID format" });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getCategoryTreesOfArticle(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const article = await this.articleService.getArticleById(id);
      let trees: string[] = [];

      article.categories.forEach(async (category) => {
        const tree = await this.categoryService.getCategoryTree(category);
        trees.push(tree);
      });

      return res.status(200).json({ trees: trees });
    }
    catch(err: any) {
      if(err.message === "Article not found !") {
        return res.status(404).json({ error: "Article not found" });
      }
      else if(err.name === "CastError") {
        return res.status(400).json({ error: "Invalid ID format" });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async addArticle(req: Request, res: Response) {
    try {
      const { error, value } = ArticleRequestSchema.validate(req.body);
      if(error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const articleDto: ArticleRequestDTO = value;
      const addedArticle = await this.articleService.addArticle(articleDto);
      return res.status(201).json(addedArticle);
    }
    catch(err: any) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateArticle(req: Request, res: Response) {
    try {
      const { error, value } = ArticleRequestSchema.validate(req.body);
      if(error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const id = req.params.id;
      const articleDto: ArticleRequestDTO = value;
      const updatedArticle = await this.articleService.updateArticle(id, articleDto);
      return res.status(201).json(updatedArticle);
    }
    catch(err: any) {
      if(err.message === "Article not found !") {
        return res.status(404).json({ error: "Article not found" });
      }
      else if(err.name === "CastError") {
        return res.status(400).json({ error: "Invalid ID format" });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteArticle(req: Request, res: Response) { 
    try {
      const id = req.params.id;
      await this.articleService.deleteArticle(id);
      return res.status(200).json({ message: "Article deleted successfully" });
    }
    catch(err: any) {
      if(err.message === "Article not found !") {
        return res.status(404).json({ error: "Article not found" });
      }
      else if(err.name === "CastError") {
        return res.status(400).json({ error: "Invalid ID format" });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default ArticleController;
