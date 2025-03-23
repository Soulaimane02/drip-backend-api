import mongoose from "mongoose";
import Condition from "../../models/enums/condition";
import CategoryDatabaseSchema from "./category.database.schema";
import Size from "../../models/enums/size";
import Color from "../../models/enums/color";

const ArticleDatabaseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  likes: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  pictures: {
    type: [String],
    required: true
  },
  views: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  condition: {
    type: String,
    enum: Object.values(Condition),
    required: true
  },
  categories: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Category",
    required: true
  },
  size: {
    type: String,
    enum: Object.values(Size),
    required: false
  },
  color: {
    type: String,
    enum: Object.values(Color),
    required: false
  }
});

ArticleDatabaseSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

ArticleDatabaseSchema.set("toJSON", {
  virtuals: true
});

ArticleDatabaseSchema.set("toObject", {
  virtuals: true
});

export default ArticleDatabaseSchema;
