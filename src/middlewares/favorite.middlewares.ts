import { Request, Response, NextFunction } from "express";
import { getUserByToken } from "../utils/token";
import FavoriteRepository from "../repositories/favorite.repository";
import ArticleRepository from "../repositories/article.repository";

const favoriteRepository = new FavoriteRepository();
const articleRepository = new ArticleRepository();

export const verifyFavoriteOwnershipMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const user = await getUserByToken(token as string);
      const userId = req.body.userId;
      
      if(userId !== user.id) {
        return res.status(403).json({ error: "You can only add favorites for yourself" });
      }

      next();
    }
    catch(err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };
};

export const verifyFavoriteOwnershipByFavoriteIdMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const user = await getUserByToken(token as string);
      const favoriteId = req.params.id;
      const favorite = await favoriteRepository.get(favoriteId);

      if(favorite.userId !== user.id) {
        return res.status(403).json({ error: "You do not have permission to delete this favorite" });
      }

      next();
    }
    catch(err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };
};

export const verifyFavoriteOwnershipByArticleIdMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const user = await getUserByToken(token as string);
      const articleId = req.params.id;
      const article = await articleRepository.get(articleId);

      if(article.userId !== user.id) {
        return res.status(403).json({ error: "You do not have permission to get favorites for this article" });
      }

      next();
    }
    catch(err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };
};

export const verifyFavoriteOwnershipByUserIdMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const user = await getUserByToken(token as string);
      const userId = req.params.id;

      if(userId !== user.id) {
        return res.status(403).json({ error: "You do not have permission to get favorites for this user" });
      }

      next();
    }
    catch(err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };
};
