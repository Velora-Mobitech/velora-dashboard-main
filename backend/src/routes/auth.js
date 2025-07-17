const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/authController");
const { auth } = require("../middleware/auth");

const router = express.Router();

// Validation middleware
const registerValidation = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("role")
    .optional()
    .isIn(["admin", "employee", "company"])
    .withMessage("Invalid role"),
];

const loginValidation = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post("/register", registerValidation, authController.register);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post("/login", loginValidation, authController.login);

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get("/me", auth, authController.getMe);

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put("/profile", auth, authController.updateProfile);

// @route   PUT /api/auth/password
// @desc    Change password
// @access  Private
router.put(
  "/password",
  auth,
  [
    body("currentPassword")
      .notEmpty()
      .withMessage("Current password is required"),
    body("newPassword")
      .isLength({ min: 6 })
      .withMessage("New password must be at least 6 characters"),
  ],
  authController.changePassword
);

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post("/logout", auth, authController.logout);

module.exports = router;
