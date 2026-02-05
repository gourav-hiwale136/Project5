import { Router } from "express";
import {
  sellBook,
  buyBook,
  getAllBooks,
  updateBookStatus,
  allSoldBooks,
  addBookToInventory,
  getInventoryByUser,
  deleteBook,
} from "../controllers/bookController.js";
import  authMiddleware  from "../middlewares/authMiddleware.js"; 

const bookRouter = Router();

bookRouter.post("/sell", authMiddleware, sellBook);
bookRouter.post("/buy/:id", authMiddleware, buyBook);
bookRouter.get("/getAll",  getAllBooks);
bookRouter.patch("/status/:id", authMiddleware, updateBookStatus);
bookRouter.get("/allSoldBooks", authMiddleware, allSoldBooks);
bookRouter.post("/buy/:id/addToInventory", authMiddleware, addBookToInventory);
bookRouter.get("/inventory/getAll", authMiddleware, getInventoryByUser);
bookRouter.delete("/delete/:id", authMiddleware, deleteBook);

export default bookRouter;


