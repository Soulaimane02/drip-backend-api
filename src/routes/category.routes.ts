import express from "express";
import CategoryController from "../controllers/category.controller";

const router = express.Router();
const categoryController = new CategoryController();

router.get("/", categoryController.getAllCategory.bind(categoryController));
router.post("/", categoryController.addCategory.bind(categoryController));

export default router;
