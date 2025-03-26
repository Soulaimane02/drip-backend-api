import mongoose from "mongoose";
import Role from "../../models/enums/role";
import PasswordDatabaseSchema from "./password.database.schema";

const UserDatabaseSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true
  },
  profilePicture: {
    type: String,
    required: true
  },
  password: {
    type: PasswordDatabaseSchema,
    required: true
  },
  role: {
    type: String,
    enum: Object.values(Role),
    required: true
  }
});

UserDatabaseSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

UserDatabaseSchema.set("toJSON", {
  virtuals: true
});

UserDatabaseSchema.set("toObject", {
  virtuals: true
});

export default UserDatabaseSchema;
