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
      return res.status(400).json({ message: "Book already sold", book });
    }

    book.status = "sold";
    book.buyer = req.user.id;

    await book.save();

    const populatedBook = await book.populate([
      { path: "seller", select: "Username Email" },
      { path: "buyer", select: "Username Email" },
    ]);

    res.status(200).json({
      message: "Book purchased successfully",
      book: populatedBook,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


const getAllbooks = async (req, res) => {
  try {
    const books = await Book.find();

    const result = [];

    for (let book of books) {
      const seller = await User.findById(book.seller);

      result.push({
        _id: book._id,
        title: book.title,
        author: book.author,
        price: book.price,
        image: book.image,
        status: book.status,
        seller: seller
          ? {
              _id: seller._id,
              Username: seller.Username,
              Email: seller.Email,
            }
          : null,
        buyer: book.buyer, 
      });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching books",
      error: error.message,
    });
  }
};


 const updateBookStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    book.status = status;
    await book.save();

    res.status(200).json({
      message: "Book status updated",
      book,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating book status",
      error: error.message,
    });
  }
};



export { sellBook, buyBook, getAllbooks, updateBookStatus };
