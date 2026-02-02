import express from "express";
import { sellBook, buyBook } from "../controllers/bookController.js";


const bookRouter = express.Router();


bookRouter.post("/sell", sellBook);
bookRouter.get("/buy", buyBook);

export default bookRouter