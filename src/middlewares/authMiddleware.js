import jwt from "jsonwebtoken";
import User from "../models/userModel.js";


const authMiddleware = async(req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: "Not logged in" });

  
  const token = authHeader
  if (!token)
    return res.status(401).json({ message: "Not logged in" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
const user = await User.findById(decoded.id);
if (!user) return res.status(401).json({ message: "User not found" });
req.user = user;

console.log(decoded);


    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
