import Customer from "../models/customerModel.js";

// CREATE CUSTOMER
const createCustomer = async (req, res) => {
  try {
    const { username, email, status } = req.body;
    if (!username || !email) {
      return res.status(400).json({ message: "username and email are required" });
    }

    const customer = await Customer.create({
      username,
      email,
      status: status || "new",
      assignedTo: req.user.id,
    });

    res.status(201).json({ message: "Customer created successfully", customer });
  } catch (error) {
    res.status(500).json({ message: "Error creating customer", error: error.message });
  }
};

// GET ALL CUSTOMERS ASSIGNED TO USER
const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({ assignedTo: req.user.id });
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching customers", error: error.message });
  }
};

// UPDATE CUSTOMER
const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedCustomer = await Customer.findOneAndUpdate(
      { _id: id, assignedTo: req.user.id },
      req.body,
      { new: true }
    );

    if (!updatedCustomer) return res.status(404).json({ message: "Customer not found" });

    res.status(200).json({ message: "Customer updated successfully", customer: updatedCustomer });
  } catch (error) {
    res.status(500).json({ message: "Error updating customer", error: error.message });
  }
};

// DELETE CUSTOMER
const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCustomer = await Customer.findOneAndDelete({ _id: id, assignedTo: req.user.id });

    if (!deletedCustomer) return res.status(404).json({ message: "Customer not found" });

    res.status(200).json({ message: "Customer deleted successfully", deletedCustomer });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export { createCustomer, getCustomers, updateCustomer, deleteCustomer };
