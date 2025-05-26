import { Request, Response } from "express";
import Book from "../models/Book";

// Get all books (search/filter)
export const getBooks = async (req: Request, res: Response) => {
  const { query, genre, year } = req.query;
  let filter: any = {};
  if (query) filter.title = { $regex: query, $options: "i" };
  if (genre) filter.genre = genre;
  if (year) filter.year = Number(year);
  const books = await Book.find(filter);
  res.json(books);
};

// Get one book
export const getBook = async (req: Request, res: Response) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
};

// Create book (admin only)
export const createBook = async (req: Request, res: Response) => {
  const book = new Book({ ...req.body, imageUrl: req.file?.filename ? `/uploads/${req.file.filename}` : undefined });
  await book.save();
  res.status(201).json(book);
};

// Update book (admin only)
export const updateBook = async (req: Request, res: Response) => {
  const updated = { ...req.body, ...(req.file && { imageUrl: `/uploads/${req.file.filename}` }) };
  const book = await Book.findByIdAndUpdate(req.params.id, updated, { new: true });
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
};

// Delete book (admin only)
export const deleteBook = async (req: Request, res: Response) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json({ message: "Book deleted" });
};