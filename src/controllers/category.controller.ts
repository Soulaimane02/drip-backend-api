import { Request, Response, NextFunction } from "express";
import CategoryService from "../services/category.service";
import CategoryRequestSchema from "../schemas/request/category.request.schema";
import CategoryRequestDTO from "../models/entities/category/dto/category.request.dto";

class CategoryController {
  private readonly categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
  }

  async getAllCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await this.categoryService.getAllCategories();
      return res.status(200).json(categories);
    }
    catch(err) {
      next(err);
    }
  }

  async getChildrenCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const children = await this.categoryService.getChildrenCategories(id);
      return res.status(200).json(children);
    }
    catch(err) {
      next(err);
    }
  }

  async getCategoryTree(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const tree = await this.categoryService.getCategoryTree(id);
      return res.status(200).json({ tree: tree });
    }
    catch(err) {
      next(err);
    }
  }

  async addCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = CategoryRequestSchema.validate(req.body);
      if(error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const category: CategoryRequestDTO = value;
      const addedCategory = await this.categoryService.addCategory(category);
      return res.status(201).json(addedCategory);
    }
    catch(err) {
      next(err);
    }
  }

  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await this.categoryService.deleteCategory(id);
      return res.status(200).json({ message: "Category deleted successfully" });
    }
    catch(err) {
      next(err);
    }
  }
}

export default CategoryController;
