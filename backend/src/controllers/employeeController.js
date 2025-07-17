const Employee = require("../models/Employee");
const User = require("../models/User");

// @desc    Get employee dashboard data
// @route   GET /api/employee/dashboard
// @access  Private
const getDashboard = async (req, res) => {
  try {
    const employee = await Employee.findOne({ userId: req.user.id }).populate(
      "userId",
      "name email"
    );

    if (!employee) {
      return res.status(404).json({ message: "Employee record not found" });
    }

    // Generate real-time like data
    const dashboardData = {
      employee: {
        name: employee.userId.name,
        employeeId: employee.employeeId,
        status: employee.status,
      },
      performance: {
        efficiency: employee.performance.efficiency,
        productivity: employee.performance.productivity,
        quality: employee.performance.quality,
      },
      device: {
        batteryLevel: Math.max(
          0,
          employee.device.batteryLevel - Math.floor(Math.random() * 5)
        ),
        isCharging: employee.device.isCharging,
        lastSync: employee.device.lastSync,
      },
      earnings: {
        today: employee.earnings.today,
        weekly: employee.earnings.weekly,
        monthly: employee.earnings.monthly,
        total: employee.earnings.total,
      },
      workStats: {
        hoursWorked: employee.workStats.hoursWorked,
        tasksCompleted: employee.workStats.tasksCompleted,
        activeProjects: employee.workStats.activeProjects,
        completionRate: employee.workStats.completionRate,
      },
      location: employee.location,
      recentActivity: [
        {
          time: new Date(Date.now() - 5 * 60 * 1000),
          activity: "Task completed",
          details: "Delivery #1234",
        },
        {
          time: new Date(Date.now() - 15 * 60 * 1000),
          activity: "Location updated",
          details: "Downtown Area",
        },
        {
          time: new Date(Date.now() - 30 * 60 * 1000),
          activity: "Break ended",
          details: "15 minute break",
        },
      ],
    };

    res.json(dashboardData);
  } catch (error) {
    console.error("Get dashboard error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get employee profile
// @route   GET /api/employee/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const employee = await Employee.findOne({ userId: req.user.id }).populate(
      "userId"
    );

    if (!employee) {
      return res.status(404).json({ message: "Employee record not found" });
    }

    res.json({
      user: employee.userId,
      employee: {
        employeeId: employee.employeeId,
        performance: employee.performance,
        workStats: employee.workStats,
        schedule: employee.schedule,
        status: employee.status,
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update employee profile
// @route   PUT /api/employee/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const { schedule, preferences } = req.body;

    const employee = await Employee.findOne({ userId: req.user.id });

    if (!employee) {
      return res.status(404).json({ message: "Employee record not found" });
    }

    if (schedule) employee.schedule = { ...employee.schedule, ...schedule };
    if (preferences)
      employee.preferences = { ...employee.preferences, ...preferences };

    await employee.save();

    res.json({
      message: "Profile updated successfully",
      employee,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update employee location
// @route   POST /api/employee/update-location
// @access  Private
const updateLocation = async (req, res) => {
  try {
    const { latitude, longitude, address } = req.body;

    const employee = await Employee.findOne({ userId: req.user.id });

    if (!employee) {
      return res.status(404).json({ message: "Employee record not found" });
    }

    employee.location = {
      latitude,
      longitude,
      address,
      lastUpdated: new Date(),
    };

    await employee.save();

    res.json({
      message: "Location updated successfully",
      location: employee.location,
    });
  } catch (error) {
    console.error("Update location error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update employee status
// @route   POST /api/employee/update-status
// @access  Private
const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["active", "inactive", "on-break", "offline"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const employee = await Employee.findOne({ userId: req.user.id });

    if (!employee) {
      return res.status(404).json({ message: "Employee record not found" });
    }

    employee.status = status;
    await employee.save();

    res.json({
      message: "Status updated successfully",
      status: employee.status,
    });
  } catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get employee analytics
// @route   GET /api/employee/analytics
// @access  Private
const getAnalytics = async (req, res) => {
  try {
    const employee = await Employee.findOne({ userId: req.user.id });

    if (!employee) {
      return res.status(404).json({ message: "Employee record not found" });
    }

    // Generate sample analytics data
    const analytics = {
      dailyStats: employee.analytics.dailyStats.length
        ? employee.analytics.dailyStats
        : [
            {
              date: new Date(),
              hoursWorked: 8,
              tasksCompleted: 12,
              earnings: 250,
              efficiency: 85,
            },
            {
              date: new Date(Date.now() - 24 * 60 * 60 * 1000),
              hoursWorked: 7.5,
              tasksCompleted: 10,
              earnings: 200,
              efficiency: 80,
            },
          ],
      weeklyTrends: employee.analytics.weeklyTrends.length
        ? employee.analytics.weeklyTrends
        : [
            {
              week: "Week 1",
              totalHours: 40,
              totalEarnings: 1200,
              avgEfficiency: 85,
            },
            {
              week: "Week 2",
              totalHours: 38,
              totalEarnings: 1150,
              avgEfficiency: 82,
            },
          ],
      performanceMetrics: {
        thisWeek: {
          efficiency: employee.performance.efficiency,
          productivity: employee.performance.productivity,
          quality: employee.performance.quality,
        },
        lastWeek: {
          efficiency: employee.performance.efficiency - 5,
          productivity: employee.performance.productivity - 3,
          quality: employee.performance.quality - 2,
        },
      },
    };

    res.json(analytics);
  } catch (error) {
    console.error("Get analytics error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Employee clock in
// @route   POST /api/employee/clock-in
// @access  Private
const clockIn = async (req, res) => {
  try {
    const employee = await Employee.findOne({ userId: req.user.id });

    if (!employee) {
      return res.status(404).json({ message: "Employee record not found" });
    }

    employee.status = "active";

    // Add to daily stats
    const today = new Date().toDateString();
    const existingDayStats = employee.analytics.dailyStats.find(
      (stat) => stat.date.toDateString() === today
    );

    if (!existingDayStats) {
      employee.analytics.dailyStats.push({
        date: new Date(),
        hoursWorked: 0,
        tasksCompleted: 0,
        earnings: 0,
        efficiency: employee.performance.efficiency,
      });
    }

    await employee.save();

    res.json({
      message: "Clocked in successfully",
      status: employee.status,
      clockInTime: new Date(),
    });
  } catch (error) {
    console.error("Clock in error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Employee clock out
// @route   POST /api/employee/clock-out
// @access  Private
const clockOut = async (req, res) => {
  try {
    const employee = await Employee.findOne({ userId: req.user.id });

    if (!employee) {
      return res.status(404).json({ message: "Employee record not found" });
    }

    employee.status = "offline";

    // Update work stats
    employee.workStats.hoursWorked += 8; // Sample 8 hours
    employee.earnings.today += Math.floor(Math.random() * 100) + 50;
    employee.earnings.weekly += employee.earnings.today;
    employee.earnings.monthly += employee.earnings.today;
    employee.earnings.total += employee.earnings.today;

    await employee.save();

    res.json({
      message: "Clocked out successfully",
      status: employee.status,
      clockOutTime: new Date(),
      todayEarnings: employee.earnings.today,
    });
  } catch (error) {
    console.error("Clock out error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getDashboard,
  getProfile,
  updateProfile,
  updateLocation,
  updateStatus,
  getAnalytics,
  clockIn,
  clockOut,
};
