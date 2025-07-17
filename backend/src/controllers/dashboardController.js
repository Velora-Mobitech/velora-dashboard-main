const User = require("../models/User");
const Employee = require("../models/Employee");
const Company = require("../models/Company");

// @desc    Get dashboard data for authenticated user
// @route   GET /api/dashboard
// @access  Private (All roles)
const getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let dashboardData = {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      notifications: [],
      stats: {},
    };

    // Role-specific dashboard data
    if (user.role === "employee") {
      const employee = await Employee.findOne({ userId: user._id });
      if (employee) {
        dashboardData.employee = employee;
        dashboardData.stats = {
          productivity:
            employee.productivity || Math.floor(Math.random() * 30) + 70,
          tasksCompleted: Math.floor(Math.random() * 20) + 10,
          hoursWorked: Math.floor(Math.random() * 8) + 6,
          rating: Math.floor(Math.random() * 2) + 4,
        };
      }
    } else if (user.role === "company") {
      const company = await Company.findOne({ userId: user._id });
      if (company) {
        const employeeCount = await Employee.countDocuments({
          companyId: company._id,
        });
        const activeEmployees = await Employee.countDocuments({
          companyId: company._id,
          status: "active",
        });

        dashboardData.company = company;
        dashboardData.stats = {
          totalEmployees: employeeCount,
          activeEmployees: activeEmployees,
          productivity:
            Math.floor((activeEmployees / employeeCount) * 100) || 0,
          growth: Math.floor(Math.random() * 20) + 5,
        };
      }
    } else if (user.role === "admin") {
      const totalUsers = await User.countDocuments();
      const totalCompanies = await Company.countDocuments();
      const totalEmployees = await Employee.countDocuments();

      dashboardData.stats = {
        totalUsers,
        totalCompanies,
        totalEmployees,
        systemHealth: Math.floor(Math.random() * 20) + 80,
      };
    }

    // Add sample notifications
    dashboardData.notifications = [
      {
        id: 1,
        type: "info",
        title: "Welcome to Velora Dashboard",
        message: "Your dashboard is ready to use",
        timestamp: new Date().toISOString(),
        read: false,
      },
      {
        id: 2,
        type: "success",
        title: "Profile Updated",
        message: "Your profile has been successfully updated",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        read: false,
      },
    ];

    res.json(dashboardData);
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private (All roles)
const getStats = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    let stats = {};

    if (user.role === "employee") {
      const employee = await Employee.findOne({ userId: user._id });
      stats = {
        productivity:
          employee?.productivity || Math.floor(Math.random() * 30) + 70,
        attendance: Math.floor(Math.random() * 20) + 80,
        performance: Math.floor(Math.random() * 25) + 75,
        goals: {
          completed: Math.floor(Math.random() * 8) + 2,
          total: 10,
        },
      };
    } else if (user.role === "company") {
      const company = await Company.findOne({ userId: user._id });
      if (company) {
        const employeeCount = await Employee.countDocuments({
          companyId: company._id,
        });
        stats = {
          employees: employeeCount,
          departments: 5,
          projects: Math.floor(Math.random() * 10) + 5,
          revenue: Math.floor(Math.random() * 100000) + 50000,
        };
      }
    } else if (user.role === "admin") {
      stats = {
        users: await User.countDocuments(),
        companies: await Company.countDocuments(),
        employees: await Employee.countDocuments(),
        growth: Math.floor(Math.random() * 20) + 10,
      };
    }

    res.json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get notifications
// @route   GET /api/dashboard/notifications
// @access  Private (All roles)
const getNotifications = async (req, res) => {
  try {
    // In a real app, you'd fetch from a notifications collection
    const notifications = [
      {
        id: 1,
        type: "info",
        title: "System Update",
        message: "New features are now available",
        timestamp: new Date().toISOString(),
        read: false,
      },
      {
        id: 2,
        type: "warning",
        title: "Scheduled Maintenance",
        message: "System will be down for maintenance on Sunday",
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        read: false,
      },
      {
        id: 3,
        type: "success",
        title: "Backup Complete",
        message: "Daily backup completed successfully",
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        read: true,
      },
    ];

    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Mark notification as read
// @route   POST /api/dashboard/notifications/read
// @access  Private (All roles)
const markNotificationAsRead = async (req, res) => {
  try {
    const { notificationId } = req.body;

    if (!notificationId) {
      return res.status(400).json({ message: "Notification ID is required" });
    }

    // In a real app, you'd update the notification in the database
    res.json({ message: "Notification marked as read" });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getDashboard,
  getStats,
  getNotifications,
  markNotificationAsRead,
};
