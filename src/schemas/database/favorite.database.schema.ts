import mongoose from "mongoose";

const FavoriteDatabaseSchema = new mongoose.Schema({
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

FavoriteDatabaseSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

FavoriteDatabaseSchema.set("toJSON", {
  virtuals: true
});

FavoriteDatabaseSchema.set("toObject", {
  virtuals: true
});

export default FavoriteDatabaseSchema;
