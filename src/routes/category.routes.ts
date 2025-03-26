import express from "express";
import CategoryController from "../controllers/category.controller";

const router = express.Router();
const categoryController = new CategoryController();

router.get("/", categoryController.getAllCategory.bind(categoryController));
router.get("/children/:id", categoryController.getChildrenCategories.bind(categoryController));
router.get("/tree/:id", categoryController.getCategoryTree.bind(categoryController));
router.post("/", categoryController.addCategory.bind(categoryController));
router.delete("/:id", categoryController.deleteCategory.bind(categoryController));

export default router;
