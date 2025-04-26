import express from "express";
import FavoriteController from "../controllers/favorite.controller";

const favoriteRoutes = () => {
  const router = express.Router();
  const favoriteController = new FavoriteController();

  router.get("/", favoriteController.getAllFavorites.bind(favoriteController));
  router.get("/user/:id", favoriteController.getFavoriteByUserId.bind(favoriteController));
  router.post("/", favoriteController.addFavorite.bind(favoriteController));
  router.delete("/:id", favoriteController.deleteFavorite.bind(favoriteController));

  return router;
}

export default favoriteRoutes;
