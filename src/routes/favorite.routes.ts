import express from "express";
import FavoriteController from "../controllers/favorite.controller";
import { isSignedInMiddleware } from "../middlewares/base.middlewares";

const favoriteRoutes = () => {
  const router = express.Router();
  const favoriteController = new FavoriteController();

  router.get("/", isSignedInMiddleware(), favoriteController.getAllFavorites.bind(favoriteController));
  router.get("/user/:id", isSignedInMiddleware(), favoriteController.getFavoritesByUserId.bind(favoriteController));
  router.get("/article/:id", isSignedInMiddleware(), favoriteController.getFavoritesByArticleId.bind(favoriteController));
  router.post("/", isSignedInMiddleware(), favoriteController.addFavorite.bind(favoriteController));
  router.delete("/:id", isSignedInMiddleware(), favoriteController.deleteFavorite.bind(favoriteController));

  return router;
}

export default favoriteRoutes;
