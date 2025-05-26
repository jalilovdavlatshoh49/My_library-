import { Router } from "express";
import { getBooks, getBook, createBook, updateBook, deleteBook } from "../controllers/book.controller";
import { authMiddleware, adminMiddleware } from "../middleware/auth";
import { upload } from "../middleware/upload";
import { validateBody } from "../middleware/validate";
import { bookCreateSchema, bookUpdateSchema } from "../validation/book.validation";

const router = Router();

router.get("/", getBooks);
router.get("/:id", getBook);
router.post("/", authMiddleware, adminMiddleware, upload.single("image"), validateBody(bookCreateSchema), createBook);
router.put("/:id", authMiddleware, adminMiddleware, upload.single("image"), validateBody(bookUpdateSchema), updateBook);
router.delete("/:id", authMiddleware, adminMiddleware, deleteBook);

export default router;