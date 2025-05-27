import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { getProfile, toggleFavorite } from "../controllers/user.controller";

const router = Router();

router.get("/me", authMiddleware, getProfile);
router.post("/me/favorites/:bookId", authMiddleware, toggleFavorite);

export default router;