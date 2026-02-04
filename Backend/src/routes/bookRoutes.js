// routes/bookRoutes.js
import express from "express";
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
import authMiddleware from "../middlewares/authMiddleware.js";
import allowRoles from "../middlewares/roleMiddleware.js";

const bookRouter = express.Router();

bookRouter.post("/sell", authMiddleware, sellBook);
bookRouter.post("/buy/:id", authMiddleware, buyBook);
bookRouter.get("/getAll", authMiddleware, getAllBooks);
bookRouter.put("/updateStatus/:id", authMiddleware, allowRoles("admin"), updateBookStatus);
bookRouter.get("/allSoldBooks", authMiddleware, allowRoles("admin"), allSoldBooks);
bookRouter.post("/inventory/add/:id", authMiddleware, addBookToInventory);
bookRouter.get("/inventory/getAll", authMiddleware, getInventoryByUser);
bookRouter.delete("/delete/:id", authMiddleware, allowRoles("admin"), deleteBook);

export default bookRouter;
