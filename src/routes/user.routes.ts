import express from "express";
import UserController from "../controllers/user.controller";
import { uploadUserConfig } from "../config/uploads";
import { authorisationMiddleware, isSignedInMiddleware } from "../middlewares/base.middlewares";
import Role from "../models/enums/role";

const userRoutes = () => {
  const router = express.Router();
  const userController = new UserController();

  router.get("/", isSignedInMiddleware(), authorisationMiddleware([Role.Admin, Role.Seller, Role.User]), userController.getAllUsers.bind(userController));
  router.get("/:id", isSignedInMiddleware(), authorisationMiddleware([Role.Admin, Role.Seller, Role.User]), userController.getUserById.bind(userController));
  router.post("/become-seller/:id", isSignedInMiddleware(), authorisationMiddleware([Role.User]), userController.becomeSeller.bind(userController));
  router.put("/:id", isSignedInMiddleware(), authorisationMiddleware([Role.Admin, Role.Seller, Role.User]), uploadUserConfig, userController.updateUser.bind(userController));
  router.delete("/:id", isSignedInMiddleware(), authorisationMiddleware([Role.Admin, Role.Seller, Role.User]), userController.deleteUser.bind(userController));

  return router;
}

export default userRoutes;
