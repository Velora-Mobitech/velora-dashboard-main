const express = require("express");
const analyticsController = require("../controllers/analyticsController");
const { auth, authorize } = require("../middleware/auth");

const router = express.Router();

// All routes are protected
router.use(auth);

// @route   GET /api/analytics/overview
// @desc    Get analytics overview
// @access  Private (Admin)
router.get("/overview", authorize("admin"), analyticsController.getOverview);

// @route   GET /api/analytics/performance
// @desc    Get performance analytics
// @access  Private (All roles)
router.get("/performance", analyticsController.getPerformance);

// @route   GET /api/analytics/productivity
// @desc    Get productivity analytics
// @access  Private (All roles)
router.get("/productivity", analyticsController.getProductivity);

// @route   GET /api/analytics/reports
// @desc    Get analytics reports
// @access  Private (All roles)
router.get("/reports", analyticsController.getReports);

module.exports = router;
