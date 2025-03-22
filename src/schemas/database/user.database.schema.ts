import mongoose from "mongoose";
import Role from "../../models/role";

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
  password: {
    type: String,
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
