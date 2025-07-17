const mongoose = require("mongoose");

const backendSchema = new mongoose.Schema(
  {
    // System health metrics
    systemHealth: {
      cpuUsage: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
      },
      memoryUsage: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
      },
      diskUsage: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
      },
      networkLatency: {
        type: Number,
        default: 0,
      },
    },
    // Server statistics
    serverStats: {
      uptime: {
        type: Number,
        default: 0,
      },
      requestsPerMinute: {
        type: Number,
        default: 0,
      },
      errorRate: {
        type: Number,
        default: 0,
      },
      responseTime: {
        type: Number,
        default: 0,
      },
    },
    // Database metrics
    database: {
      connectionCount: {
        type: Number,
        default: 0,
      },
      queryPerformance: {
        type: Number,
        default: 0,
      },
      storageUsed: {
        type: Number,
        default: 0,
      },
      backupStatus: {
        type: String,
        enum: ["success", "failed", "pending"],
        default: "success",
      },
    },
    // API metrics
    api: {
      totalRequests: {
        type: Number,
        default: 0,
      },
      successfulRequests: {
        type: Number,
        default: 0,
      },
      failedRequests: {
        type: Number,
        default: 0,
      },
      avgResponseTime: {
        type: Number,
        default: 0,
      },
    },
    // Security metrics
    security: {
      failedLogins: {
        type: Number,
        default: 0,
      },
      blockedIPs: [
        {
          ip: String,
          reason: String,
          timestamp: Date,
        },
      ],
      vulnerabilityScan: {
        lastScan: Date,
        issuesFound: Number,
        status: {
          type: String,
          enum: ["clean", "warning", "critical"],
          default: "clean",
        },
      },
    },
    // System logs
    logs: [
      {
        level: {
          type: String,
          enum: ["info", "warning", "error", "critical"],
          default: "info",
        },
        message: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
        source: String,
        details: mongoose.Schema.Types.Mixed,
      },
    ],
    // Performance monitoring
    performance: {
      historicalData: [
        {
          timestamp: Date,
          cpu: Number,
          memory: Number,
          disk: Number,
          network: Number,
          responseTime: Number,
        },
      ],
      alerts: [
        {
          type: String,
          message: String,
          severity: {
            type: String,
            enum: ["low", "medium", "high", "critical"],
            default: "medium",
          },
          timestamp: {
            type: Date,
            default: Date.now,
          },
          resolved: {
            type: Boolean,
            default: false,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

// Index for better performance
backendSchema.index({ "logs.timestamp": -1 });
backendSchema.index({ "performance.alerts.timestamp": -1 });

module.exports = mongoose.model("Backend", backendSchema);
