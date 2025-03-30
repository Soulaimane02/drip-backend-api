import mongoose from "mongoose";
import Repository from "./repository";
import Category from "../models/entities/category/category";
import CategoryDatabaseSchema from "../schemas/database/category.database.schema";

class CategoryRepository implements Repository<Category> {
  private readonly categoryModel;

  constructor() {
    this.categoryModel = mongoose.model<Category>("Category", CategoryDatabaseSchema);
  }

  async getAll(): Promise<Category[]> {
    const categories = await this.categoryModel.find();
    return categories.map((category) => category.toObject());
  }
  
  async get(id: String): Promise<Category> {
    const category = await this.categoryModel.findById(id);
    if(!category) {
      throw new Error("Category not found !");
    }
    return category?.toObject();
  }

  async getChildren(parentId: string): Promise<Category[]> {
    const children = await this.categoryModel.find({ parent: parentId });
    return children.map((category) => category.toObject());
  }
  
  async add(categoryToAdd: Category): Promise<Category> {
    const category = await new this.categoryModel(categoryToAdd).save();
    return category.toObject();
  }
  
  async put(id: String, newCategory: Category): Promise<Category> {
    const category = await this.categoryModel.findByIdAndUpdate(id, newCategory, {new: true});
    if(!category) {
      throw new Error("Category not found !");
    }
    return category?.toObject();
  }
  
  async delete(id: String): Promise<void> {
    const category = await this.categoryModel.findByIdAndDelete(id);
    if(!category) {
      throw new Error("Category not found !");
    }
  }
}

export default CategoryRepository;
