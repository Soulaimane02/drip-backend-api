import express from "express";
import UserController from "../controllers/user.controller";
import { uploadUserConfig } from "../config/uploads";
import { isSignedInMiddleware } from "../middlewares/base.middlewares";

const userRoutes = () => {
  const router = express.Router();
  const userController = new UserController();

  router.get("/", userController.getAllUsers.bind(userController));
  router.get("/:id", userController.getUserById.bind(userController));
  router.post("/become-seller/:id", isSignedInMiddleware(), userController.becomeSeller.bind(userController));
  router.put("/:id", isSignedInMiddleware(), uploadUserConfig, userController.updateUser.bind(userController));
  router.delete("/:id", isSignedInMiddleware(), userController.deleteUser.bind(userController));

  return router;
}

export default userRoutes;
