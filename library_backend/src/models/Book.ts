import { Schema, model } from "mongoose";

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: Number,
  genre: [String],
  description: String,
  imageUrl: String,
}, { timestamps: true });

export default model("Book", bookSchema);