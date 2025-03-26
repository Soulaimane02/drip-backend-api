import express from "express";
import ArticleController from "../controllers/article.controller";
import { uploadArticleConfig } from "../config/uploads";

const router = express.Router();
const articleController = new ArticleController();

router.get("/", articleController.getAllArticles.bind(articleController));
router.get("/:id", articleController.getArticleById.bind(articleController));
router.get("/category/:id", articleController.getArticlesByCategory.bind(articleController));
router.get("/categories/trees/:id", articleController.getCategoryTreesOfArticle.bind(articleController));
router.post("/", uploadArticleConfig, articleController.addArticle.bind(articleController));
router.put("/:id", articleController.updateArticle.bind(articleController));
router.delete("/:id", articleController.deleteArticle.bind(articleController));

export default router;
