const express = require("express");
const companyController = require("../controllers/companyController");
const { auth, authorize } = require("../middleware/auth");

const router = express.Router();

// All routes are protected and require company or admin role
router.use(auth);

// @route   GET /api/company/dashboard
// @desc    Get company dashboard data
// @access  Private (Company, Admin)
router.get(
  "/dashboard",
  authorize("company", "admin"),
  companyController.getDashboard
);

// @route   GET /api/company/employees
// @desc    Get all employees
// @access  Private (Company, Admin)
router.get(
  "/employees",
  authorize("company", "admin"),
  companyController.getEmployees
);

// @route   GET /api/company/analytics
// @desc    Get company analytics
// @access  Private (Company, Admin)
router.get(
  "/analytics",
  authorize("company", "admin"),
  companyController.getAnalytics
);

// @route   GET /api/company/reports
// @desc    Get company reports
// @access  Private (Company, Admin)
router.get(
  "/reports",
  authorize("company", "admin"),
  companyController.getReports
);

module.exports = router;
