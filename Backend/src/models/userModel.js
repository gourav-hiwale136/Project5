import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    Username: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
    },
    Contact: {
      type: String,
    },
    Role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    inventory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;