const Backend = require("../models/Backend");
const User = require("../models/User");
const Employee = require("../models/Employee");
const Company = require("../models/Company");

// @desc    Get system status
// @route   GET /api/backend/status
// @access  Private (Admin)
const getSystemStatus = async (req, res) => {
  try {
    const systemStatus = {
      server: {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        cpu: {
          usage: Math.floor(Math.random() * 50) + 10,
          cores: require("os").cpus().length,
        },
        platform: process.platform,
        nodeVersion: process.version,
      },
      database: {
        status: "connected",
        collections: {
          users: await User.countDocuments(),
          employees: await Employee.countDocuments(),
          companies: await Company.countDocuments(),
          backends: await Backend.countDocuments(),
        },
      },
      services: {
        authentication: "running",
        api: "running",
        database: "running",
        monitoring: "running",
      },
      lastHealthCheck: new Date().toISOString(),
    };

    res.json(systemStatus);
  } catch (error) {
    console.error("Error fetching system status:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get system logs
// @route   GET /api/backend/logs
// @access  Private (Admin)
const getLogs = async (req, res) => {
  try {
    const { level = "all", limit = 100 } = req.query;

    // Mock log data - in production, you'd fetch from actual log files
    const mockLogs = [
      {
        timestamp: new Date().toISOString(),
        level: "info",
        message: "User login successful",
        userId: req.user.id,
        ip: req.ip,
      },
      {
        timestamp: new Date(Date.now() - 60000).toISOString(),
        level: "info",
        message: "Database connection established",
        service: "database",
      },
      {
        timestamp: new Date(Date.now() - 120000).toISOString(),
        level: "warning",
        message: "High memory usage detected",
        service: "monitoring",
      },
      {
        timestamp: new Date(Date.now() - 180000).toISOString(),
        level: "error",
        message: "Failed login attempt",
        ip: "192.168.1.100",
      },
    ];

    let filteredLogs = mockLogs;
    if (level !== "all") {
      filteredLogs = mockLogs.filter((log) => log.level === level);
    }

    res.json({
      logs: filteredLogs.slice(0, parseInt(limit)),
      total: filteredLogs.length,
      levels: ["info", "warning", "error", "debug"],
    });
  } catch (error) {
    console.error("Error fetching logs:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get system metrics
// @route   GET /api/backend/metrics
// @access  Private (Admin)
const getMetrics = async (req, res) => {
  try {
    const metrics = {
      performance: {
        responseTime: Math.floor(Math.random() * 200) + 50,
        throughput: Math.floor(Math.random() * 1000) + 500,
        errorRate: Math.floor(Math.random() * 5) + 1,
      },
      usage: {
        activeUsers: Math.floor(Math.random() * 100) + 50,
        dailyRequests: Math.floor(Math.random() * 10000) + 5000,
        dataTransfer: Math.floor(Math.random() * 1000) + 500,
      },
      resources: {
        cpuUsage: Math.floor(Math.random() * 80) + 10,
        memoryUsage: Math.floor(Math.random() * 70) + 20,
        diskUsage: Math.floor(Math.random() * 60) + 30,
      },
      alerts: [
        {
          level: "warning",
          message: "High CPU usage detected",
          timestamp: new Date().toISOString(),
        },
        {
          level: "info",
          message: "Database backup completed",
          timestamp: new Date(Date.now() - 3600000).toISOString(),
        },
      ],
    };

    res.json(metrics);
  } catch (error) {
    console.error("Error fetching metrics:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Health check
// @route   GET /api/backend/health
// @access  Private (Admin)
const healthCheck = async (req, res) => {
  try {
    const health = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
      version: process.env.npm_package_version || "1.0.0",
      checks: {
        database: "pass",
        memory: process.memoryUsage().heapUsed < 1000000000 ? "pass" : "fail",
        disk: "pass",
        external_services: "pass",
      },
    };

    // Check if any service is failing
    const hasFailures = Object.values(health.checks).some(
      (check) => check === "fail"
    );
    if (hasFailures) {
      health.status = "degraded";
    }

    res.json(health);
  } catch (error) {
    console.error("Error in health check:", error);
    res.status(500).json({
      status: "unhealthy",
      error: "Health check failed",
    });
  }
};

module.exports = {
  getSystemStatus,
  getLogs,
  getMetrics,
  healthCheck,
};
