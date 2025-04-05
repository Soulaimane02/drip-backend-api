import mongoose from "mongoose";

const ConversationDatabaseSchema = new mongoose.Schema({
  firstUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  secondUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

ConversationDatabaseSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

ConversationDatabaseSchema.set("toJSON", {
  virtuals: true
});

ConversationDatabaseSchema.set("toObject", {
  virtuals: true
});

export default ConversationDatabaseSchema;
