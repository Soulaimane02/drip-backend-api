import { Request, Response } from "express";
import CategoryService from "../services/category.service";

class CategoryController {
  private readonly categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
  }

  async getAllCategory(req: Request, res: Response) {
    try {
      const categories = await this.categoryService.getAllCategories();
      return res.status(200).json(categories);
    }
    catch(err: any) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default CategoryController;
