import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    contact: String,
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "lost"],
      default: "new"
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
