import { Schema, model, Types } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  favorites: [{ type: Types.ObjectId, ref: "Book" }]
}, { timestamps: true });

export default model("User", userSchema);