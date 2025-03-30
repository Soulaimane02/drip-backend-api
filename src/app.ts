import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database";
import { middleware } from "./config/middlewares";
import uploadsRoutes from "./routes/uploads.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import articleRoutes from "./routes/article.routes";
import categoryRoutes from "./routes/category.routes";
import paymentRoutes from "./routes/payment.routes";
import conversationRoutes from "./routes/conversation.routes";
import messageRoutes from "./routes/message.routes";
import initSockets from "./config/sockets";

dotenv.config();
const IP_ADRESS = process.env.IP_ADRESS as string;

const app = express();
const { server, io } = initSockets(app);

app.use(cors({
  origin: IP_ADRESS,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

middleware(app);
connectDB();

app.use("/uploads", uploadsRoutes());
app.use("/auth", authRoutes());
app.use("/users", userRoutes());
app.use("/articles", articleRoutes());
app.use("/categories", categoryRoutes());
app.use("/payments", paymentRoutes());
app.use("/conversations", conversationRoutes());
app.use("/messages", messageRoutes(io));

export default server;
