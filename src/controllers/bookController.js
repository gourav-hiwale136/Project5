import booksModel from "../models/booksModel.js";


const sellBook = async (req, res) => {
    try {
        const { title, author, price, seller, buyer, status } = req.body;
        const newBook = new booksModel({
            title,
            author,
            price,
            seller,
            buyer,
            status:  "available"
            
        });
        await newBook.save();
        res.status(201).json({ message: "Book For Sell", book: newBook });
    } catch (error) {
        res.status(500).json({ message: "Error adding book", error: error.message });
    }
};

const buyBook = async (req, res) => {
    try {
        const books = await booksModel.findById(req.params.id);
        if (!books) {
            return res.status(404).json({ message: "Book not found" });
        }
        
        
    
    } catch (error) {
        res.status(500).json({ message : "the server issus", error: error.message})
    }
};


const getAllbooks = async (req, res) => {
    try {
        const books = await booksModel.find();
        const availableBooks = books.fillter(book => book.status === "available");
        return res.status(200).json(availableBooks);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching books", error: error.message });
    }
}

export { sellBook, buyBook, getAllbooks};

