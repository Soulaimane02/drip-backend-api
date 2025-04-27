import express, { Request, Response, NextFunction } from "express";
import { getUserByToken } from "../utils/token";

export const middleware = (app: express.Application) => {
  app.use(express.json());
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send("Something broke!");
  });
};

export const isSignedInMiddleware = () =>{
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if(!token) {
        return res.status(401).json({ message: "Token not provided" });
      }
  
      const user = await getUserByToken(token);
      if(!user) {
        return res.status(401).json({ message: "Invalid token" });
      }

      next();
    }
    catch(err) {
      return res.status(401).json({ message: "Token session error" });
    }
  };
};
