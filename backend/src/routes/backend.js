const express = require("express");
const backendController = require("../controllers/backendController");
const { auth, authorize } = require("../middleware/auth");

const router = express.Router();

// All routes are protected and require admin role
router.use(auth);
router.use(authorize("admin"));

// @route   GET /api/backend/status
// @desc    Get backend system status
// @access  Private (Admin)
router.get("/status", backendController.getSystemStatus);

// @route   GET /api/backend/logs
// @desc    Get system logs
// @access  Private (Admin)
router.get("/logs", backendController.getLogs);

// @route   GET /api/backend/metrics
// @desc    Get system metrics
// @access  Private (Admin)
router.get("/metrics", backendController.getMetrics);

// @route   GET /api/backend/health
// @desc    Health check endpoint
// @access  Private (Admin)
router.get("/health", backendController.healthCheck);

module.exports = router;
