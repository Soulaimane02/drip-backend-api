import { Request, Response } from "express";
import CategoryService from "../services/category.service";
import CategoryRequestSchema from "../schemas/request/category.request.schema";
import CategoryRequestDTO from "../models/entities/category/dto/category.request.dto";

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

  async addCategory(req: Request, res: Response) {
    try {
      const { error, value } = CategoryRequestSchema.validate(req.body);
      if(error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const category: CategoryRequestDTO = value;
      const addedCategory = this.categoryService.addCategory(category);
      return res.status(201).json(addedCategory);
    }
    catch(err: any) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default CategoryController;
