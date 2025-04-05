import mongoose from "mongoose";

const ReviewDatabaseSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  comment: {
    type: String,
    required: true,
    min: 3,
    max: 1000
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  articleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article",
    required: true
  }
}, { timestamps: true });

ReviewDatabaseSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

ReviewDatabaseSchema.set("toJSON", {
  virtuals: true
});

ReviewDatabaseSchema.set("toObject", {
  virtuals: true
});

export default ReviewDatabaseSchema;
