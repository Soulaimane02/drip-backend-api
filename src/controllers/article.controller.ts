import { Request, Response } from "express";
import ArticleService from "../services/article.service";

class ArticleController {
  private readonly articleService: ArticleService;

  constructor() {
    this.articleService = new ArticleService();
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
}

export default ArticleController;
