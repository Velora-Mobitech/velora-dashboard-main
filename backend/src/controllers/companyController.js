const Company = require("../models/Company");
const Employee = require("../models/Employee");
const User = require("../models/User");

// @desc    Get company dashboard data
// @route   GET /api/company/dashboard
// @access  Private (Company, Admin)
const getDashboard = async (req, res) => {
  try {
    // Get company info
    const company = await Company.findOne({ userId: req.user.id });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Get employees count
    const employeesCount = await Employee.countDocuments({
      companyId: company._id,
    });

    // Get active employees
    const activeEmployees = await Employee.countDocuments({
      companyId: company._id,
      status: "active",
    });

    // Get recent employees
    const recentEmployees = await Employee.find({ companyId: company._id })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("userId", "name email");

    // Calculate performance metrics
    const performanceMetrics = {
      totalEmployees: employeesCount,
      activeEmployees: activeEmployees,
      productivity: Math.round((activeEmployees / employeesCount) * 100) || 0,
      satisfaction: 85, // Mock data
    };

    res.json({
      company: {
        name: company.name,
        industry: company.industry,
        size: company.size,
        location: company.location,
      },
      metrics: performanceMetrics,
      recentEmployees: recentEmployees,
    });
  } catch (error) {
    console.error("Error fetching company dashboard:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get all employees
// @route   GET /api/company/employees
// @access  Private (Company, Admin)
const getEmployees = async (req, res) => {
  try {
    const company = await Company.findOne({ userId: req.user.id });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const employees = await Employee.find({ companyId: company._id })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get company analytics
// @route   GET /api/company/analytics
// @access  Private (Company, Admin)
const getAnalytics = async (req, res) => {
  try {
    const company = await Company.findOne({ userId: req.user.id });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const employees = await Employee.find({ companyId: company._id });

    // Calculate analytics data
    const analytics = {
      totalEmployees: employees.length,
      activeEmployees: employees.filter((emp) => emp.status === "active")
        .length,
      departmentBreakdown: {},
      productivityTrends: {
        thisMonth: Math.floor(Math.random() * 100),
        lastMonth: Math.floor(Math.random() * 100),
        growth: Math.floor(Math.random() * 20) - 10,
      },
      attendanceRate: Math.floor(Math.random() * 20) + 80,
      performanceScores: {
        excellent: Math.floor(Math.random() * 30) + 20,
        good: Math.floor(Math.random() * 40) + 30,
        average: Math.floor(Math.random() * 20) + 10,
        poor: Math.floor(Math.random() * 10),
      },
    };

    // Calculate department breakdown
    employees.forEach((emp) => {
      const dept = emp.department || "Unassigned";
      analytics.departmentBreakdown[dept] =
        (analytics.departmentBreakdown[dept] || 0) + 1;
    });

    res.json(analytics);
  } catch (error) {
    console.error("Error fetching company analytics:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get company reports
// @route   GET /api/company/reports
// @access  Private (Company, Admin)
const getReports = async (req, res) => {
  try {
    const company = await Company.findOne({ userId: req.user.id });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const reports = {
      monthlyReport: {
        title: "Monthly Performance Report",
        period: new Date().toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        }),
        metrics: {
          productivity: Math.floor(Math.random() * 20) + 70,
          attendance: Math.floor(Math.random() * 15) + 80,
          satisfaction: Math.floor(Math.random() * 25) + 70,
        },
      },
      weeklyReport: {
        title: "Weekly Activity Report",
        period: "This Week",
        activities: [
          { date: "2024-01-15", activity: "Team meeting", participants: 15 },
          { date: "2024-01-16", activity: "Training session", participants: 8 },
          { date: "2024-01-17", activity: "Project review", participants: 12 },
        ],
      },
      upcomingDeadlines: [
        { project: "Q4 Review", deadline: "2024-01-30", priority: "High" },
        {
          project: "Budget Planning",
          deadline: "2024-02-15",
          priority: "Medium",
        },
        { project: "Team Evaluation", deadline: "2024-02-28", priority: "Low" },
      ],
    };

    res.json(reports);
  } catch (error) {
    console.error("Error fetching company reports:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getDashboard,
  getEmployees,
  getAnalytics,
  getReports,
};
