import Customer from "../models/customerModel.js";

// CREATE
const createCustomer = async (req, res) => {
  try {
    const { name, email, status } = req.body;

    const customer = await Customer.create({
      name,
      email,
      status,
      assignedTo: req.user.id
    });

    res.status(201).json({
      message: "Customer Created Successfully",
      customer
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating customer",
      error: error.message
    });
  }
};

// GET ALL (only own customers)
const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({ assignedTo: req.user.id });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching customers" });
  }
};

// UPDATE
const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedCustomer = await Customer.findOneAndUpdate(
      { _id: id, assignedTo: req.user.id },
      req.body,
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({
        message: "Customer not found or not authorized"
      });
    }

    res.status(200).json({
      message: "Customer updated successfully",
      customer: updatedCustomer
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating customer",
      error: error.message
    });
  }
};

// DELETE
const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCustomer = await Customer.findOneAndDelete({
      _id: id,
      assignedTo: req.user.id
    });

    if (!deletedCustomer) {
      return res.status(404).json({ message: "Customer Not Found" });
    }

    res.status(200).json({
      message: "Customer Deleted Successfully",
      deletedCustomer
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { createCustomer, getCustomers, updateCustomer, deleteCustomer };
