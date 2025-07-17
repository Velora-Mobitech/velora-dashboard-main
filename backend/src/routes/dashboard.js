const express = require("express");
const dashboardController = require("../controllers/dashboardController");
const { auth } = require("../middleware/auth");

const router = express.Router();

// All routes are protected
router.use(auth);

// @route   GET /api/dashboard
// @desc    Get dashboard data for the authenticated user
// @access  Private (All roles)
router.get("/", dashboardController.getDashboard);

// @route   GET /api/dashboard/stats
// @desc    Get dashboard statistics
// @access  Private (All roles)
router.get("/stats", dashboardController.getStats);

// @route   GET /api/dashboard/notifications
// @desc    Get user notifications
// @access  Private (All roles)
router.get("/notifications", dashboardController.getNotifications);

// @route   POST /api/dashboard/notifications/read
// @desc    Mark notification as read
// @access  Private (All roles)
router.post("/notifications/read", dashboardController.markNotificationAsRead);

module.exports = router;
