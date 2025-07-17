const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // Financial metrics
    revenue: {
      daily: {
        type: Number,
        default: 0,
      },
      weekly: {
        type: Number,
        default: 0,
      },
      monthly: {
        type: Number,
        default: 0,
      },
      yearly: {
        type: Number,
        default: 0,
      },
    },
    // Performance metrics
    performance: {
      totalEmployees: {
        type: Number,
        default: 0,
      },
      activeEmployees: {
        type: Number,
        default: 0,
      },
      avgProductivity: {
        type: Number,
        default: 0,
      },
      customerSatisfaction: {
        type: Number,
        default: 0,
      },
    },
    // Fleet and vehicle data
    fleet: {
      totalVehicles: {
        type: Number,
        default: 0,
      },
      activeVehicles: {
        type: Number,
        default: 0,
      },
      maintenanceNeeded: {
        type: Number,
        default: 0,
      },
      fuelEfficiency: {
        type: Number,
        default: 0,
      },
    },
    // Project statistics
    projects: {
      total: {
        type: Number,
        default: 0,
      },
      completed: {
        type: Number,
        default: 0,
      },
      ongoing: {
        type: Number,
        default: 0,
      },
      overdue: {
        type: Number,
        default: 0,
      },
    },
    // Analytics and reports
    analytics: {
      monthlyReports: [
        {
          month: String,
          year: Number,
          revenue: Number,
          expenses: Number,
          profit: Number,
          employeeCount: Number,
        },
      ],
      performanceMetrics: [
        {
          date: Date,
          productivity: Number,
          efficiency: Number,
          customerSatisfaction: Number,
        },
      ],
    },
    // Settings and configuration
    settings: {
      timezone: {
        type: String,
        default: "UTC",
      },
      currency: {
        type: String,
        default: "USD",
      },
      workingHours: {
        start: String,
        end: String,
      },
      notifications: {
        email: Boolean,
        sms: Boolean,
        push: Boolean,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Company", companySchema);
