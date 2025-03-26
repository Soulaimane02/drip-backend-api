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

export default PaymentDatabaseSchema;
