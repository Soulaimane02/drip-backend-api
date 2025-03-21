import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { middleware } from "./config/middlewares";

dotenv.config();
const IP_ADRESS = process.env.IP_ADRESS as string;

const app = express();

app.use(cors({
  origin: IP_ADRESS,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

middleware(app);

export default app;
