import { Request, Response, NextFunction } from "express";
import { getUserByToken } from "../utils/token";
import Role from "../models/enums/role";
import ArticleService from "../services/article.service";

const articleService = new ArticleService();

export const authorizeArticleAccessMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const user = await getUserByToken(token as string);

      if(user.role !== Role.Admin) {
        const id = req.params.id;
        const article = await articleService.getArticleById(id);

        if(article.userId !== user.id) {
          return res.status(403).json({ error: "You are not the owner of this article" });
        }
      }

      next();
    }
    catch(err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };
};
