import mongoose from "mongoose";
import OfferDatabaseSchema from "./offer.database.schema";

const MessageDatabaseSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    min: 1
  },
  isUpdated: {
    type: Boolean,
    default: false,
    required: true
  },
  isOffer: {
    type: Boolean,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
    required: true
  },
  pictures: {
    type: [String],
    required: true
  },
  offer: {
    type: OfferDatabaseSchema,
    required: false
  }
}, { timestamps: true });

MessageDatabaseSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

MessageDatabaseSchema.set("toJSON", {
  virtuals: true
});

MessageDatabaseSchema.set("toObject", {
  virtuals: true
});

export default MessageDatabaseSchema;
