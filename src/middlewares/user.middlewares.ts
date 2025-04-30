import { Request, Response, NextFunction } from "express";
import { getUserByToken } from "../utils/token";
import Role from "../models/enums/role";

export const verifyUserOwnershipByIdMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const user = await getUserByToken(token as string);
      const userId = req.params.id;

      if(user.role !== Role.Admin && userId !== user.id) {
        return res.status(403).json({ error: "You do not have permission with this user" });
      }

      next();
    }
    catch(err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };
};
