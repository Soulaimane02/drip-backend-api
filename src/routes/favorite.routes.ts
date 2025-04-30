import express from "express";
import FavoriteController from "../controllers/favorite.controller";
import { authorisationMiddleware, isSignedInMiddleware } from "../middlewares/base.middlewares";
import Role from "../models/enums/role";
import { verifyFavoriteOwnershipByArticleIdMiddleware, verifyFavoriteOwnershipByFavoriteIdMiddleware, verifyFavoriteOwnershipMiddleware } from "../middlewares/favorite.middlewares";

const favoriteRoutes = () => {
  const router = express.Router();
  const favoriteController = new FavoriteController();

  router.get("/", isSignedInMiddleware(), authorisationMiddleware([Role.Admin]), favoriteController.getAllFavorites.bind(favoriteController));
  router.get("/user/:id", isSignedInMiddleware(), authorisationMiddleware([Role.Admin, Role.Seller, Role.User]), favoriteController.getFavoritesByUserId.bind(favoriteController));
  router.get("/article/:id", isSignedInMiddleware(), authorisationMiddleware([Role.Admin, Role.Seller]), verifyFavoriteOwnershipByArticleIdMiddleware(), favoriteController.getFavoritesByArticleId.bind(favoriteController));
  router.post("/", isSignedInMiddleware(), authorisationMiddleware([Role.Admin, Role.Seller, Role.User]), verifyFavoriteOwnershipMiddleware(), favoriteController.addFavorite.bind(favoriteController));
  router.delete("/:id", isSignedInMiddleware(), authorisationMiddleware([Role.Admin, Role.Seller, Role.User]), verifyFavoriteOwnershipByFavoriteIdMiddleware(), favoriteController.deleteFavorite.bind(favoriteController));

  return router;
}

export default favoriteRoutes;
