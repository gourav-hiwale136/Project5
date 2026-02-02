import express from "express";
import { sellBook, buyBook, getAllbooks } from "../controllers/bookController.js";


const bookRouter = express.Router();


bookRouter.post("/sell", sellBook);
bookRouter.get("/buy/:id", buyBook);
bookRouter.get("/getAll", getAllbooks);

export default bookRouter