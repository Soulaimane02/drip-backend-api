import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err.name === "CastError") {
    return res.status(400).json({ error: "Invalid ID format" });
  }
  if(err.message === "Not found") {
    return res.status(404).json({ error: "Not found" });
  }
  if(err.message === "Invalid token") {
    return res.status(401).json({ error: "Invalid token" });
  }
  if(err.message === "Email already exists") {
    return res.status(409).json({ error: "Email already exists" });
  }
  if(err.message === "User not found") {
    return res.status(401).json({ error: "Invalid email" });
  }
  if(err.message === "Invalid password") {
    return res.status(401).json({ error: "Invalid password" });
  }
  if(err.message === "No offer associated with this message !") {
    return res.status(400).json({ error: "No offer associated with this message" });
  }
  if(err.message === "Favorite already exists") {
    return res.status(409).json({ error: "This article is already in your favorites" });
  }
  if(err.message === "User is already a seller") {
    return res.status(409).json({ error: "User is already a seller" });
  }
  if(err.message  === "Unexpected become seller error") {
    return res.status(500).json({ error: "Unexpected error occurred while becoming a seller" });
  }
  if(err.message === "User is not a seller") {
    return res.status(409).json({ error: "User is not a seller" });
  }
  if(err.message.includes("Stripe seller error")) {
    return res.status(500).json({ error: `Stripe error: ${err.message}` });
  }
  if(err.message.includes("Invalid IBAN")) {
    return res.status(400).json({ error: "The IBAN is invalid or unsupported" });
  }
  if(err.message.includes("Stripe payment error")) {
    return res.status(500).json({ error: `Stripe error: ${err.message}` });
  }
  if(err.message === "Unexpected payment error") {
    return res.status(500).json({ error: "Unexpected error occurred while processing the payment" });
  }
  return res.status(500).json({ error: "Internal server error" });
}
