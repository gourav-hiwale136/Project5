import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routes/authRoutes.js";
import customerRouter from "./routes/customerRoutes.js";
import bookRouter from "./routes/bookRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

connectDB(process.env.MONGO_URL);
app.use("/api/auth", userRouter);
app.use("/api/customer", customerRouter);
app.use("/api/book", bookRouter);
app.get("/",(req,res) => {
  res.send("Welcome to the Bookstore API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
