import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: String, required: true },
    seller: { type: String, required: true },
    buyer: { type: String, required: true },
    status: {
      type: String,
      enum: ["available", "sold"],
      default: "available",
    }
  },
  {
    timestamps: true   
  }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;
