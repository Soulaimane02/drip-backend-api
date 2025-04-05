import mongoose from "mongoose";
import OfferStatus from "../../models/enums/offer.status";

const OfferDatabaseSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
    min: 1
  },
  articleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article",
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(OfferStatus),
    default: "pending"
  }
});

export default OfferDatabaseSchema;
