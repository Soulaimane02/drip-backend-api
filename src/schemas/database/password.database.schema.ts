import mongoose from "mongoose";

const PasswordDatabaseSchema = new mongoose.Schema({
  hash: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  }
});

export default PasswordDatabaseSchema;
