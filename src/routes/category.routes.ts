import express from "express";
import CategoryController from "../controllers/category.controller";
import { authorisationMiddleware, isSignedInMiddleware } from "../middlewares/base.middlewares";
import Role from "../models/enums/role";

const categoryRoutes = () => {
  const router = express.Router();
  const categoryController = new CategoryController();

  router.get("/", categoryController.getAllCategories.bind(categoryController));
  router.get("/children/:id", isSignedInMiddleware(), authorisationMiddleware([Role.Admin, Role.Seller, Role.User]), categoryController.getChildrenCategories.bind(categoryController));
  router.get("/tree/:id", isSignedInMiddleware(), authorisationMiddleware([Role.Admin, Role.Seller, Role.User]), categoryController.getCategoryTree.bind(categoryController));
  router.post("/", isSignedInMiddleware(), authorisationMiddleware([Role.Admin]), categoryController.addCategory.bind(categoryController));
  router.delete("/:id", isSignedInMiddleware(), authorisationMiddleware([Role.Admin]), categoryController.deleteCategory.bind(categoryController));

  return router;
}

export default categoryRoutes;
