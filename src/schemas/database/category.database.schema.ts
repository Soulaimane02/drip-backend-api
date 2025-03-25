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
    required: false
  }
});

CategoryDatabaseSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

CategoryDatabaseSchema.set("toJSON", {
  virtuals: true
});

CategoryDatabaseSchema.set("toObject", {
  virtuals: true
});

export default CategoryDatabaseSchema;
