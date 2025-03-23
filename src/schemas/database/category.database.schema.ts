import mongoose from "mongoose";

const CategoryDatabaseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null,
    required: true
  }
});

export default CategoryDatabaseSchema;
