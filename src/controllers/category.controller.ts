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

  async getChildrenCategories(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const children = await this.categoryService.getChildrenCategories(id);
      return res.status(200).json(children);
    }
    catch(err: any) {
      if(err.name === "CastError") {
        return res.status(400).json({ error: "Invalid ID format" });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getCategoryTree(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const tree = await this.categoryService.getCategoryTree(id);
      return res.status(200).json({ tree: tree });
    }
    catch(err: any) {
      if(err.message === "Category not found !") {
        return res.status(404).json({ error: "Category not found" });
      }
      else if(err.name === "CastError") {
        return res.status(400).json({ error: "Invalid ID format" });
      }
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

  async deleteCategory(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await this.categoryService.deleteCategory(id);
      return res.status(200).json({ message: "Category deleted successfully" });
    }
    catch(err: any) {
      if(err.message === "Category not found !") {
        return res.status(404).json({ error: "Category not found" });
      }
      else if(err.name === "CastError") {
        return res.status(400).json({ error: "Invalid ID format" });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default CategoryController;
