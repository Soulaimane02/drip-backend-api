import mongoose from "mongoose";
import Category from "../models/entities/category/category";
import CategoryDatabaseSchema from "../schemas/database/category.database.schema";
import BaseRepository from "./base.repository";

class CategoryRepository extends BaseRepository<Category> {
  constructor() {
    super(mongoose.model<Category>("Category", CategoryDatabaseSchema));
  }

  async getChildren(parentId: string): Promise<Category[]> {
    const children = await this.model.find({ parent: parentId });
    return children.map((category) => category.toObject());
  }  
}

export default CategoryRepository;
