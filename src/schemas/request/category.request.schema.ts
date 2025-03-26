import joi from "joi";
import Category from "../../models/entities/category/category";

const CategoryRequestSchema = joi.object<Category>({
  name: joi.string().min(3).max(100).required(),
  parent: joi.string().default(null).optional()
});

export default CategoryRequestSchema;
