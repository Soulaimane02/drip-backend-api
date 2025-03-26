import express from "express";
import AuthController from "../controllers/auth.controller";
import { uploadUserConfig } from "../config/uploads";

const router = express.Router();
const authController = new AuthController();

router.post("/register", uploadUserConfig, authController.register.bind(authController));
router.post("/login", authController.login.bind(authController));
router.get("/me", authController.decodeToken.bind(authController));

export default router;
