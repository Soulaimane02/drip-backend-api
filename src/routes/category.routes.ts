import express from "express";
import CategoryController from "../controllers/category.controller";
import { isSignedInMiddleware } from "../middlewares/base.middlewares";

const categoryRoutes = () => {
  const router = express.Router();
  const categoryController = new CategoryController();

  router.get("/", categoryController.getAllCategories.bind(categoryController));
  router.get("/children/:id", categoryController.getChildrenCategories.bind(categoryController));
  router.get("/tree/:id", categoryController.getCategoryTree.bind(categoryController));
  router.post("/", isSignedInMiddleware(), categoryController.addCategory.bind(categoryController));
  router.delete("/:id", isSignedInMiddleware(), categoryController.deleteCategory.bind(categoryController));

  return router;
}

export default categoryRoutes;
