const express = require("express");
const usersController = require("../controllers/usersController");
const { auth, authorize } = require("../middleware/auth");

const router = express.Router();

// All routes are protected and require admin role
router.use(auth);
router.use(authorize("admin"));

// @route   GET /api/users
// @desc    Get all users
// @access  Private (Admin)
router.get("/", usersController.getUsers);

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Private (Admin)
router.get("/:id", usersController.getUserById);

// @route   POST /api/users
// @desc    Create new user
// @access  Private (Admin)
router.post("/", usersController.createUser);

// @route   PUT /api/users/:id
// @desc    Update user
// @access  Private (Admin)
router.put("/:id", usersController.updateUser);

// @route   DELETE /api/users/:id
// @desc    Delete user
// @access  Private (Admin)
router.delete("/:id", usersController.deleteUser);

module.exports = router;
