import { Request, Response } from "express";
import User from "../models/User";

// Get profile
export const getProfile = async (req: Request, res: Response) => {
  // @ts-ignore
  const user = await User.findById(req.user._id).select("-password").populate("favorites");
  res.json(user);
};

// Toggle favorite book
export const toggleFavorite = async (req: Request, res: Response) => {
  // @ts-ignore
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ error: "User not found" });
  const { bookId } = req.params;
  if (user.favorites.includes(bookId)) {
    user.favorites = user.favorites.filter((id: string) => id != bookId);
  } else {
    user.favorites.push(bookId);
  }
  await user.save();
  res.json(user.favorites);
};