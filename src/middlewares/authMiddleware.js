import jwt from "jsonwebtoken";

const authMiddlware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: "Not logged in" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddlware;
