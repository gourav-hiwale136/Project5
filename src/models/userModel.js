import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    Username: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Contact: { type: Number, required: true },
    Address: { type: String, required: true },
    Password: { type: String, required: true },
    Role: {
      type: String,
      enum: ["admin", "salesUser"],
      default: "salesUser"
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
