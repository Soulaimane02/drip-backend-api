import User from "../models/entities/user/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import TokenPayload from "../config/payload";
import UserRepository from "../repositories/user.repository";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY as string;

const userRepository = new UserRepository();

export async function getUserByToken(token: string): Promise<User> {
  const decoded = jwt.verify(token, SECRET_KEY) as TokenPayload;
  return await userRepository.get(decoded.id);
}
