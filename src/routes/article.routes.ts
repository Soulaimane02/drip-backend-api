import express from "express";
import ArticleController from "../controllers/article.controller";

const router = express.Router();
const articleController = new ArticleController();

router.get("/", articleController.getAllArticles.bind(articleController));
router.get("/:id", articleController.getArticleById.bind(articleController));

export default router;
