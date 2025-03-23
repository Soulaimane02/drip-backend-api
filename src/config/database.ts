import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MONGODB_DATABASE_PATH = process.env.MONGODB_DATABASE_PATH as string;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_DATABASE_PATH);
  }
  catch(error) {
    process.exit(1);
  }
};

export default connectDB;
