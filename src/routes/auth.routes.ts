import express from "express";
import AuthController from "../controllers/auth.controller";
import { uploadUserConfig } from "../config/uploads";
import { authorisationMiddleware, isSignedInMiddleware } from "../middlewares/base.middlewares";
import Role from "../models/enums/role";

const authRoutes = () => {
  const router = express.Router();
  const authController = new AuthController();

  router.post("/register", uploadUserConfig, authController.register.bind(authController));
  router.post("/login", authController.login.bind(authController));
  router.get("/me", isSignedInMiddleware(), authorisationMiddleware([Role.Admin, Role.Seller, Role.User]), authController.decodeToken.bind(authController));

  return router;
}

export default authRoutes;
