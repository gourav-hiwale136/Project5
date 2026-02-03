import express from "express";
import {
  sellBook,
  buyBook,
  getAllbooks,
  updateBookStatus,
} from "../controllers/bookController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const bookRouter = express.Router();


bookRouter.post("/sold", authMiddleware, sellBook);

bookRouter.get("/buy/:id", authMiddleware, buyBook);

bookRouter.get("/getAll", getAllbooks);

bookRouter.put("/updateStatus/:id", updateBookStatus);



export default bookRouter;
