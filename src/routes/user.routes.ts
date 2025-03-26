import express from "express";
import UserController from "../controllers/user.controller";
import { uploadUserConfig } from "../config/uploads";

const router = express.Router();
const userController = new UserController();

router.get("/", userController.getAllUsers.bind(userController));
router.get("/:id", userController.getUserById.bind(userController));
router.put("/:id", uploadUserConfig, userController.updateUser.bind(userController));
router.delete("/:id", userController.deleteUser.bind(userController));

export default router;
