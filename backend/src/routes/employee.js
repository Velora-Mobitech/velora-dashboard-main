const express = require("express");
const employeeController = require("../controllers/employeeController");
const { auth, authorize } = require("../middleware/auth");

const router = express.Router();

// All routes are protected
router.use(auth);

// @route   GET /api/employee/dashboard
// @desc    Get employee dashboard data
// @access  Private (Employee, Admin)
router.get(
  "/dashboard",
  authorize("employee", "admin"),
  employeeController.getDashboard
);

// @route   GET /api/employee/profile
// @desc    Get employee profile
// @access  Private (Employee, Admin)
router.get(
  "/profile",
  authorize("employee", "admin"),
  employeeController.getProfile
);

// @route   PUT /api/employee/profile
// @desc    Update employee profile
// @access  Private (Employee, Admin)
router.put(
  "/profile",
  authorize("employee", "admin"),
  employeeController.updateProfile
);

// @route   POST /api/employee/update-location
// @desc    Update employee location
// @access  Private (Employee)
router.post(
  "/update-location",
  authorize("employee"),
  employeeController.updateLocation
);

// @route   POST /api/employee/update-status
// @desc    Update employee status
// @access  Private (Employee)
router.post(
  "/update-status",
  authorize("employee"),
  employeeController.updateStatus
);

// @route   GET /api/employee/analytics
// @desc    Get employee analytics
// @access  Private (Employee, Admin)
router.get(
  "/analytics",
  authorize("employee", "admin"),
  employeeController.getAnalytics
);

// @route   POST /api/employee/clock-in
// @desc    Employee clock in
// @access  Private (Employee)
router.post("/clock-in", authorize("employee"), employeeController.clockIn);

// @route   POST /api/employee/clock-out
// @desc    Employee clock out
// @access  Private (Employee)
router.post("/clock-out", authorize("employee"), employeeController.clockOut);

module.exports = router;
