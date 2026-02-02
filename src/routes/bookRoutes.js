import express from "express";
import { sellBook, buyBook, getAllbooks, soldAllbooks } from "../controllers/bookController.js";
import authMiddleware from "../middlewares/authmiddleware.js"; 


const bookRouter = express.Router();


bookRouter.post("/sold", authMiddleware,sellBook);
bookRouter.get("/buy/:id", authMiddleware,buyBook);
bookRouter.get("/getAll", getAllbooks);
bookRouter.post("/soldAll", soldAllbooks);

export default bookRouter