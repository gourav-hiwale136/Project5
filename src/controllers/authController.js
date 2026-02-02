import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// REGISTER
const register = async (req, res) => {
  try {
    const { Username, Email, Password, Address, Contact, Role } = req.body;

    const existingUser = await User.findOne({ Email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(Password, 10);

    const user = await User.create({
      Username,
      Email,
      Password: hashedPassword,
      Address,
      Contact,
      Role: Role || "User"
    });

    res.status(201).json({
      message: "User registered successfully",
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    const user = await User.findOne({ Email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.Role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        Username: user.Username,
        Email: user.Email,
        Role: user.Role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { register, login };
