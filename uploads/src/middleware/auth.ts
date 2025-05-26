import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Token required" });
  const token = authHeader.split(" ")[1];
  try {
    const payload: any = jwt.verify(token, JWT_SECRET);
    // @ts-ignore
    req.user = await User.findById(payload.id);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  if (req.user && req.user.role === "admin") return next();
  return res.status(403).json({ error: "Admin only" });
};