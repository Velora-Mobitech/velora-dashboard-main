const User = require("../models/User");
const Employee = require("../models/Employee");
const Company = require("../models/Company");
const bcrypt = require("bcryptjs");

// @desc    Get all users
// @route   GET /api/users
// @access  Private (Admin)
const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, role, search } = req.query;

    let query = {};

    if (role) {
      query.role = role;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const users = await User.find(query)
      .select("-password")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(query);

    res.json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private (Admin)
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get additional profile info based on role
    let profile = { ...user.toObject() };

    if (user.role === "employee") {
      const employee = await Employee.findOne({ userId: user._id });
      if (employee) {
        profile.employee = employee;
      }
    } else if (user.role === "company") {
      const company = await Company.findOne({ userId: user._id });
      if (company) {
        profile.company = company;
      }
    }

    res.json(profile);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Create new user
// @route   POST /api/users
// @access  Private (Admin)
const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate input
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    // Create profile based on role
    if (role === "employee") {
      const employee = new Employee({
        userId: user._id,
        name,
        email,
        position: "New Employee",
        department: "Unassigned",
        status: "active",
      });
      await employee.save();
    } else if (role === "company") {
      const company = new Company({
        userId: user._id,
        name: name + " Company",
        industry: "Technology",
        size: "Small",
        location: "Not specified",
      });
      await company.save();
    }

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private (Admin)
const updateUser = async (req, res) => {
  try {
    const { name, email, role, status } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if email is being changed and if it's already taken
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    // Update user fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;
    if (status) user.status = status;

    await user.save();

    // Update related profiles
    if (user.role === "employee") {
      await Employee.updateOne(
        { userId: user._id },
        { name: user.name, email: user.email }
      );
    } else if (user.role === "company") {
      await Company.updateOne(
        { userId: user._id },
        { contactEmail: user.email }
      );
    }

    res.json({
      message: "User updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private (Admin)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete related profiles
    if (user.role === "employee") {
      await Employee.deleteOne({ userId: user._id });
    } else if (user.role === "company") {
      await Company.deleteOne({ userId: user._id });
    }

    // Delete user
    await User.deleteOne({ _id: req.params.id });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
