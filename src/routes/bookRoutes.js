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
// import { get } from "mongoose";
import allowRoles from "../middlewares/roleMiddleware.js";

const bookRouter = express.Router();


bookRouter.post("/sold", authMiddleware, sellBook);

bookRouter.get("/buy/:id", authMiddleware, buyBook);

bookRouter.get("/getAll",  authMiddleware, getAllbooks);

bookRouter.put("/updateStatus/:id", authMiddleware,allowRoles("admin"),updateBookStatus);

bookRouter.get("/allSoldBooks", authMiddleware,allowRoles("admin"), allSoldedBooks);

bookRouter.post("/inventory/add/:id", authMiddleware, addBookToInventory);

bookRouter.get("/inventory/getAll", authMiddleware, getInventoryByUser);



export default bookRouter;
