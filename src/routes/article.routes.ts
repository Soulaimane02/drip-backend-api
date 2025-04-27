import express from "express";
import ArticleController from "../controllers/article.controller";
import { uploadArticleConfig } from "../config/uploads";
import { isSignedInMiddleware } from "../middlewares/base.middlewares";

const articleRoutes = () => {
  const router = express.Router();
  const articleController = new ArticleController();

  router.get("/", articleController.getAllArticles.bind(articleController));
  router.get("/:id", isSignedInMiddleware(), articleController.getArticleById.bind(articleController));
  router.get("/category/:id", articleController.getArticlesByCategory.bind(articleController));
  router.get("/categories/trees/:id", articleController.getCategoryTreesOfArticle.bind(articleController));
  router.post("/", isSignedInMiddleware(), uploadArticleConfig, articleController.addArticle.bind(articleController));
  router.put("/:id", isSignedInMiddleware(), uploadArticleConfig, articleController.updateArticle.bind(articleController));
  router.delete("/:id", isSignedInMiddleware(), articleController.deleteArticle.bind(articleController));

  return router;
}

export default articleRoutes;
