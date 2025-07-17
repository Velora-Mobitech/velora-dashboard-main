const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },
    // Performance metrics
    performance: {
      efficiency: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
      },
      productivity: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
      },
      quality: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
      },
    },
    // Battery and device info
    device: {
      batteryLevel: {
        type: Number,
        default: 100,
        min: 0,
        max: 100,
      },
      isCharging: {
        type: Boolean,
        default: false,
      },
      deviceModel: String,
      lastSync: {
        type: Date,
        default: Date.now,
      },
    },
    // Earnings and financial data
    earnings: {
      today: {
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
      total: {
        type: Number,
        default: 0,
      },
    },
    // Work statistics
    workStats: {
      hoursWorked: {
        type: Number,
        default: 0,
      },
      tasksCompleted: {
        type: Number,
        default: 0,
      },
      activeProjects: {
        type: Number,
        default: 0,
      },
      completionRate: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
      },
    },
    // Location and tracking
    location: {
      latitude: Number,
      longitude: Number,
      address: String,
      lastUpdated: {
        type: Date,
        default: Date.now,
      },
    },
    // Schedule and attendance
    schedule: {
      shiftStart: String,
      shiftEnd: String,
      breakTime: Number,
      workingDays: [
        {
          type: String,
          enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
        },
      ],
    },
    // Status
    status: {
      type: String,
      enum: ["active", "inactive", "on-break", "offline"],
      default: "offline",
    },
    // Analytics data
    analytics: {
      dailyStats: [
        {
          date: Date,
          hoursWorked: Number,
          tasksCompleted: Number,
          earnings: Number,
          efficiency: Number,
        },
      ],
      weeklyTrends: [
        {
          week: String,
          totalHours: Number,
          totalEarnings: Number,
          avgEfficiency: Number,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

// Index for better performance
employeeSchema.index({ userId: 1 });
employeeSchema.index({ employeeId: 1 });
employeeSchema.index({ status: 1 });

module.exports = mongoose.model("Employee", employeeSchema);
