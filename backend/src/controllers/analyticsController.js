const Employee = require("../models/Employee");
const Company = require("../models/Company");
const User = require("../models/User");

// @desc    Get analytics overview
// @route   GET /api/analytics/overview
// @access  Private (Admin)
const getOverview = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCompanies = await Company.countDocuments();
    const totalEmployees = await Employee.countDocuments();
    const activeEmployees = await Employee.countDocuments({ status: "active" });

    const overview = {
      totalUsers,
      totalCompanies,
      totalEmployees,
      activeEmployees,
      systemHealth: {
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
        cpuUsage: Math.floor(Math.random() * 50) + 10,
      },
      recentActivity: {
        newUsers: Math.floor(Math.random() * 20) + 5,
        newCompanies: Math.floor(Math.random() * 10) + 2,
        newEmployees: Math.floor(Math.random() * 50) + 10,
      },
    };

    res.json(overview);
  } catch (error) {
    console.error("Error fetching analytics overview:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get performance analytics
// @route   GET /api/analytics/performance
// @access  Private (All roles)
const getPerformance = async (req, res) => {
  try {
    let query = {};

    // Filter by company if user is company role
    if (req.user.role === "company") {
      const company = await Company.findOne({ userId: req.user.id });
      if (company) {
        query.companyId = company._id;
      }
    }

    // Filter by employee if user is employee role
    if (req.user.role === "employee") {
      const employee = await Employee.findOne({ userId: req.user.id });
      if (employee) {
        query._id = employee._id;
      }
    }

    const employees = await Employee.find(query);

    const performanceData = {
      totalEmployees: employees.length,
      averageProductivity: Math.floor(Math.random() * 30) + 70,
      topPerformers: employees
        .sort((a, b) => (b.productivity || 0) - (a.productivity || 0))
        .slice(0, 5)
        .map((emp) => ({
          name: emp.name,
          department: emp.department,
          productivity: emp.productivity || Math.floor(Math.random() * 30) + 70,
        })),
      trends: {
        weekly: Array.from({ length: 7 }, (_, i) => ({
          day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
          productivity: Math.floor(Math.random() * 20) + 70,
        })),
        monthly: Array.from({ length: 12 }, (_, i) => ({
          month: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ][i],
          productivity: Math.floor(Math.random() * 30) + 60,
        })),
      },
    };

    res.json(performanceData);
  } catch (error) {
    console.error("Error fetching performance analytics:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get productivity analytics
// @route   GET /api/analytics/productivity
// @access  Private (All roles)
const getProductivity = async (req, res) => {
  try {
    let query = {};

    if (req.user.role === "company") {
      const company = await Company.findOne({ userId: req.user.id });
      if (company) {
        query.companyId = company._id;
      }
    }

    if (req.user.role === "employee") {
      const employee = await Employee.findOne({ userId: req.user.id });
      if (employee) {
        query._id = employee._id;
      }
    }

    const employees = await Employee.find(query);

    const productivityData = {
      overallScore: Math.floor(Math.random() * 20) + 75,
      departmentScores: {
        Engineering: Math.floor(Math.random() * 15) + 80,
        Marketing: Math.floor(Math.random() * 15) + 75,
        Sales: Math.floor(Math.random() * 15) + 70,
        HR: Math.floor(Math.random() * 15) + 85,
      },
      timeTracking: {
        averageWorkHours: 8.5,
        overtimeHours: 2.3,
        efficientHours: 6.8,
      },
      taskCompletion: {
        completed: Math.floor(Math.random() * 20) + 70,
        inProgress: Math.floor(Math.random() * 15) + 15,
        pending: Math.floor(Math.random() * 10) + 5,
      },
      trends: {
        thisWeek: Math.floor(Math.random() * 10) + 80,
        lastWeek: Math.floor(Math.random() * 10) + 75,
        growth: Math.floor(Math.random() * 10) - 5,
      },
    };

    res.json(productivityData);
  } catch (error) {
    console.error("Error fetching productivity analytics:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get analytics reports
// @route   GET /api/analytics/reports
// @access  Private (All roles)
const getReports = async (req, res) => {
  try {
    const reports = {
      available: [
        {
          id: 1,
          title: "Monthly Performance Report",
          type: "performance",
          period: "Monthly",
          lastGenerated: new Date().toISOString(),
          status: "ready",
        },
        {
          id: 2,
          title: "Productivity Analysis",
          type: "productivity",
          period: "Weekly",
          lastGenerated: new Date().toISOString(),
          status: "ready",
        },
        {
          id: 3,
          title: "Employee Engagement Report",
          type: "engagement",
          period: "Quarterly",
          lastGenerated: new Date().toISOString(),
          status: "generating",
        },
      ],
      recent: [
        {
          title: "Weekly Summary",
          generatedAt: new Date().toISOString(),
          summary: "Overall productivity increased by 12% this week",
        },
        {
          title: "Monthly Review",
          generatedAt: new Date(
            Date.now() - 7 * 24 * 60 * 60 * 1000
          ).toISOString(),
          summary: "Strong performance across all departments",
        },
      ],
    };

    res.json(reports);
  } catch (error) {
    console.error("Error fetching analytics reports:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getOverview,
  getPerformance,
  getProductivity,
  getReports,
};
