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
  if(err.message.includes("card_declined")) {
    return res.status(402).json({ error: "Your card was declined. Please try another payment method." });
  }
  if(err.message.includes("insufficient_funds")) {
    return res.status(402).json({ error: "Insufficient funds. Please check your balance." });
  }
  if(err.message.includes("incorrect_cvc")) {
    return res.status(400).json({ error: "Incorrect security code. Please try again." });
  }
  if(err.message.includes("expired_card")) {
    return res.status(400).json({ error: "Your card has expired. Please use another card." });
  }
  if(err.message.includes("processing_error")) {
    return res.status(500).json({ error: "Payment processing error. Please try again later." });
  }
  return res.status(500).json({ error: "Internal server error" });
}
