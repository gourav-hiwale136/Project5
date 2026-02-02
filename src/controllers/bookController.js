import Book from "../models/booksModel.js";
import User from "../models/userModel.js";

const sellBook = async (req, res) => {
  try {
    const { title, author, price, image } = req.body;

    if (!title || !author || !price || !image) {
      return res.status(400).json({ message: "All fields are required" });
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

    const seller = await User.findById(newBook.seller).select("Username Email");

    res.status(201).json({
      message: "Book listed for sale",
      book: {
        ...newBook.toObject(),
        seller,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding book", error: error.message });
  }
};

const buyBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.status === "sold") {
      return res.status(400).json({ message: "Book already sold" });
    }

    book.status = "sold";
    book.buyer = req.user.id; // logged-in user becomes buyer

    await book.save();

    // populate seller & buyer names
    const populatedBook = await book
      .populate("seller", "Username Email")
      .populate("buyer", "Username Email");

    res.status(200).json({
      message: "Book purchased successfully",
      book: populatedBook,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const getAllbooks = async (req, res) => {
  try {
    const books = await Book.find({ status: "available" });

    const booksWithSeller = await Promise.all(
      books.map(async (book) => {
        const seller = await User.findById(book.seller).select("Username Email");
        return { ...book.toObject(), seller };
      })
    );

    res.status(200).json(booksWithSeller);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error: error.message });
  }
};

const soldAllbooks = async (req, res) => {
  try {
    const soldBooks = await Book.find({ status: "sold" });

    const booksWithUsers = await Promise.all(
      soldBooks.map(async (book) => {
        const seller = await User.findById(book.seller).select("Username Email");
        const buyer = await User.findById(book.buyer).select("Username Email");
        return { ...book.toObject(), seller, buyer };
      })
    );

    res.status(200).json(booksWithUsers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sold books", error: error.message });
  }
};

export { sellBook, buyBook, getAllbooks, soldAllbooks };
