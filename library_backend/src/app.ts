import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import authRoutes from "./routes/auth.routes";
import bookRoutes from "./routes/book.routes";
import userRoutes from "./routes/user.routes";
import { setupSwagger } from "./swagger";
import { errorHandler } from "./middleware/errorHandler";
import { apiLimiter } from "./middleware/rateLimit";

const app = express();

app.use(helmet());
app.use(cors({
  origin: ["http://localhost:3000", "exp://localhost:19000"],
  credentials: true,
}));
app.use(express.json());
app.use(apiLimiter);

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

setupSwagger(app);

app.use("/auth", authRoutes);
app.use("/books", bookRoutes);
app.use("/users", userRoutes);

app.use(errorHandler);

export default app;