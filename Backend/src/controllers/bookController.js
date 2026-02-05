import Book from "../models/booksModel.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";

// SELL BOOK
const sellBook = async (req, res) => {
  try {
    const { title, author, price, image } = req.body;

    if (!title || !author || !price || !image) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const soldBook = await Book.findOne({
      title,
      author,
      status: "sold",
    });

    if (soldBook) {
      return res.status(400).json({
        success: false,
        message: `"${title}" by ${author} is already sold!`,
      });
    }

    const newBook = new Book({
      title,
      author,
      price,
      image,
      seller: req.user.id,
      status: "available",
    });

    await newBook.save();

    res.status(201).json({
      success: true,
      message: "Book listed for sale",
      book: newBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding book",
    });
  }
};

// BUY BOOK (simple route)
const buyBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    if (book.status === "sold") {
      return res.status(400).json({
        success: false,
        message: "Book already sold",
        book,
      });
    }

    book.status = "sold";
    book.buyer = req.user.id;

    await book.save();

    const populatedBook = await book.populate([
      { path: "seller", select: "Username Email" },
      { path: "buyer", select: "Username Email" },
    ]);

    res.status(200).json({
      success: true,
      message: "Book purchased successfully",
      book: populatedBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// GET ALL BOOKS (returns array directly)
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find()
      .populate("seller", "Username Email")
      .populate("buyer", "Username Email");

    res.status(200).json(books); // ← plain array, not { success, data }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching books",
    });
  }
};

// UPDATE BOOK STATUS (admin)
const updateBookStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    book.status = status;
    await book.save();

    res.status(200).json({
      success: true,
      message: "Book status updated",
      book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating book status",
    });
  }
};

// GET ALL SOLD BOOKS (admin)
const allSoldBooks = async (req, res) => {
  try {
    const books = await Book.find({ status: "sold" })
      .populate("seller", "Username Email")
      .populate("buyer", "Username Email");

    res.status(200).json(books); // ← plain array
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ADD BOOK TO INVENTORY (buy + add to user’s inventory)
const addBookToInventory = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    if (book.status === "sold") {
      return res.status(400).json({
        success: false,
        message: "Book already sold",
      });
    }

    if (book.seller.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot buy your own book",
      });
    }

    book.status = "sold";
    book.buyer = req.user._id;
    await book.save();

    const user = await User.findById(req.user._id);
    user.inventory.push(book._id);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Book added to inventory",
      book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error purchasing book",
    });
  }
};

// GET USER INVENTORY
const getInventoryByUser = async (req, res) => {
  try {
    const books = await Book.find({
      buyer: req.user._id,
      status: "sold",
    }).populate("seller", "Username Email");

    res.status(200).json(books); // ← plain array
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching purchased books",
    });
  }
};

// DELETE BOOK (admin)
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    await Book.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export {
  sellBook,
  buyBook,
  getAllBooks,
  updateBookStatus,
  allSoldBooks,
  addBookToInventory,
  getInventoryByUser,
  deleteBook,
};
