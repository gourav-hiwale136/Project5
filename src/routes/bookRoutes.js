import express from "express";
import {
  sellBook,
  buyBook,
  getAllbooks,
  updateBookStatus,
  allSoldedBooks,
  addBookToInventory,
  getInventoryByUser,
  
} from "../controllers/bookController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { get } from "mongoose";

const bookRouter = express.Router();


bookRouter.post("/sold", authMiddleware, sellBook);

bookRouter.get("/buy/:id", authMiddleware, buyBook);

bookRouter.get("/getAll",  authMiddleware, getAllbooks);

bookRouter.put("/updateStatus/:id", authMiddleware,updateBookStatus);

bookRouter.get("/allSoldBooks", authMiddleware, allSoldedBooks);

bookRouter.post("/inventory/add/:id", authMiddleware, addBookToInventory);

bookRouter.get("/inventory/getAll", authMiddleware, getInventoryByUser);



export default bookRouter;
