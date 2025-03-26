import mongoose from "mongoose";

const PaymentDatabaseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  userId: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    required: true
  },
  articleId: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Article",
    required: true
  }
});

PaymentDatabaseSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

PaymentDatabaseSchema.set("toJSON", {
  virtuals: true
});

PaymentDatabaseSchema.set("toObject", {
  virtuals: true
});

export default PaymentDatabaseSchema;
