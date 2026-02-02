import Book from "../models/booksModel.js";

// SELL BOOK
const sellBook = async (req, res) => {
  try {
    const { title, author, price, image, seller } = req.body;

    console.log("BODY:", req.body);
    if (!title || !author || !price || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBook = new Book({
      title,
      author,
      price,
      image,
      status: "available",
    });

    await newBook.save();
    res.status(201).json({ message: "Book listed for sale", book: newBook });
  } catch (error) {
    res.status(500).json({ message: "Error adding book", error: error.message });
  }

};

// BUY BOOK
const buyBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.status === "sold") {
      return res.status(400).json({ message: "Book already sold" });
    }

    book.status = "sold";
    await book.save();

    res.status(200).json({ message: "Book purchased successfully", book });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET ALL AVAILABLE BOOKS
const getAllbooks = async (req, res) => {
  try {
    const books = await Book.find();
    const availableBooks = books.filter((book) => book.status === "available");
    res.status(200).json(availableBooks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error: error.message });
  }
};

// GET ALL SOLD BOOKS
const soldAllbooks = async (req, res) => {
  try {
    const soldBooks = await Book.find({ status: "sold" });
    res.status(200).json(soldBooks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sold books", error: error.message });
  }
};

export { sellBook, buyBook, getAllbooks, soldAllbooks };
