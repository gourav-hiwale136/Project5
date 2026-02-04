import express from "express";
import { getAllUsers } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import allowRoles from "../middlewares/roleMiddleware.js";

const adminRouter = express.Router();

adminRouter.get("/users", authMiddleware,allowRoles("admin"), getAllUsers);        


export default adminRouter;
