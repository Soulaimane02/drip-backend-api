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
}

export default ArticleController;
