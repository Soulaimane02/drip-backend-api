import express from "express";
import ArticleController from "../controllers/article.controller";
import { uploadArticleConfig } from "../config/uploads";
import { authorisationMiddleware, isSignedInMiddleware } from "../middlewares/base.middlewares";
import Role from "../models/enums/role";

const articleRoutes = () => {
  const router = express.Router();
  const articleController = new ArticleController();

  router.get("/", authorisationMiddleware([Role.Admin, Role.Seller, Role.User]), articleController.getAllArticles.bind(articleController));
  router.get("/:id", isSignedInMiddleware(), authorisationMiddleware([Role.Admin, Role.Seller, Role.User]), articleController.getArticleById.bind(articleController));
  router.get("/category/:id", authorisationMiddleware([Role.Admin, Role.Seller, Role.User]), articleController.getArticlesByCategory.bind(articleController));
  router.get("/categories/trees/:id", authorisationMiddleware([Role.Admin, Role.Seller, Role.User]), articleController.getCategoryTreesOfArticle.bind(articleController));
  router.post("/", isSignedInMiddleware(), authorisationMiddleware([Role.Seller]), uploadArticleConfig, articleController.addArticle.bind(articleController));
  router.put("/:id", isSignedInMiddleware(), authorisationMiddleware([Role.Admin, Role.Seller]), uploadArticleConfig, articleController.updateArticle.bind(articleController));
  router.delete("/:id", isSignedInMiddleware(), authorisationMiddleware([Role.Admin, Role.Seller]), articleController.deleteArticle.bind(articleController));

  return router;
}

export default articleRoutes;
