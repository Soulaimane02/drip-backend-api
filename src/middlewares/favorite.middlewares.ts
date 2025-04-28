import { Request, Response, NextFunction } from "express";
import { getUserByToken } from "../utils/token";
import FavoriteRepository from "../repositories/favorite.repository";

const favoriteRepository = new FavoriteRepository();

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
