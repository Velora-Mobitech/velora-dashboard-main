"use client";
import React, { useState, useEffect } from "react";
import { employeeAPI, dashboardAPI } from "@/utils/api";
import { useAuth } from "@/contexts/AuthContext";

interface EmployeeData {
  name: string;
  email: string;
  position: string;
  department: string;
  productivity: number;
  performance: {
    efficiency: number;
    productivity: number;
    quality: number;
  };
  earnings: {
    today: number;
    weekly: number;
    monthly: number;
  };
  device: {
    batteryLevel: number;
    isCharging: boolean;
    deviceModel: string;
    lastSync: string;
  };
  location: {
    latitude: number;
    longitude: number;
    address: string;
    lastUpdate: string;
  };
}

const EnhancedEmployeeDashboard: React.FC = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState("efficiency");
  const [timeRange, setTimeRange] = useState("today");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [employeeData, setEmployeeData] = useState<EmployeeData | null>(null);
  const [dashboardStats, setDashboardStats] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Load employee data
  useEffect(() => {
    const loadEmployeeData = async () => {
      try {
        setLoading(true);
        const [dashboardResponse, profileResponse] = await Promise.all([
          employeeAPI.getDashboard(),
          employeeAPI.getProfile(),
        ]);

        if (dashboardResponse.success) {
          setDashboardStats(dashboardResponse);
        }

        if (profileResponse.success) {
          setEmployeeData(profileResponse.employee);
        }
      } catch (err) {
        setError("Failed to load employee data");
        console.error("Error loading employee data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === "employee") {
      loadEmployeeData();
    }
  }, [user]);

  // Auto-refresh data
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      if (autoRefresh && user?.role === "employee") {
        employeeAPI
          .getDashboard()
          .then((response) => {
            if (response.success) {
              setDashboardStats(response);
            }
          })
          .catch((err) => console.error("Auto-refresh error:", err));
      }
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(timer);
  }, [autoRefresh, user]);

  // Update current time every second
  useEffect(() => {
    const timeTimer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timeTimer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600 text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Get current values from API data or defaults
  const currentBatteryLevel = employeeData?.device?.batteryLevel || 87;
  const currentEarnings = employeeData?.earnings?.today || 0;
  const currentProductivity = employeeData?.performance?.productivity || 0;
  const currentEfficiency = employeeData?.performance?.efficiency || 0;
  const currentQuality = employeeData?.performance?.quality || 0;

  return (
    <div
      style={{
        padding: "20px",
        color: "white",
        background: darkMode ? "#0a0f1a" : "#f5f5f5",
        minHeight: "100vh",
        transition: "all 0.3s ease",
      }}
    >
      {/* Header Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          background: "rgba(26, 35, 50, 0.8)",
          padding: "20px",
          borderRadius: "15px",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <div>
          <h1
            style={{
              color: "#00ff88",
              marginBottom: "5px",
              fontSize: "32px",
              fontWeight: "bold",
              textShadow: "0 0 20px rgba(0, 255, 136, 0.5)",
            }}
          >
            Employee Dashboard
          </h1>
          <p style={{ color: "#888", fontSize: "14px" }}>
            {formatDate(currentTime)} • {formatTime(currentTime)} • Real-time
            Performance Tracking
          </p>
        </div>
        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <div
            style={{
              background: "#1a2332",
              padding: "10px 15px",
              borderRadius: "25px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              border: "1px solid #2a3f54",
            }}
          >
            <span style={{ fontSize: "12px", color: "#888" }}>Status:</span>
            <span
              style={{
                color: "#00ff88",
                fontWeight: "bold",
                fontSize: "12px",
              }}
            >
              🟢 ACTIVE
            </span>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            style={{
              background: "#00ff88",
              color: "#0a0f1a",
              border: "none",
              padding: "10px 20px",
              borderRadius: "25px",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "14px",
              transition: "all 0.3s ease",
            }}
          >
            ⚙️ Settings
          </button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #1a2332, #2a3f54)",
            padding: "25px",
            borderRadius: "15px",
            border: "1px solid #2a3f54",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "50px",
              height: "50px",
              background: "rgba(0, 255, 136, 0.1)",
              borderRadius: "50%",
              transform: "translate(25px, -25px)",
            }}
          ></div>
          <div style={{ fontSize: "28px", marginBottom: "10px" }}>🔋</div>
          <h3 style={{ color: "#888", fontSize: "12px", marginBottom: "8px" }}>
            BATTERY LEVEL
          </h3>
          <p
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            {currentBatteryLevel.toFixed(0)}%
          </p>
          <div
            style={{
              width: "100%",
              height: "4px",
              background: "#2a3f54",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${currentBatteryLevel}%`,
                height: "100%",
                background: currentBatteryLevel > 30 ? "#00ff88" : "#ff4444",
                borderRadius: "2px",
                transition: "all 0.3s ease",
              }}
            ></div>
          </div>
        </div>

        <div
          style={{
            background: "linear-gradient(135deg, #1a2332, #2a3f54)",
            padding: "25px",
            borderRadius: "15px",
            border: "1px solid #2a3f54",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "50px",
              height: "50px",
              background: "rgba(255, 165, 0, 0.1)",
              borderRadius: "50%",
              transform: "translate(25px, -25px)",
            }}
          ></div>
          <div style={{ fontSize: "28px", marginBottom: "10px" }}>🚗</div>
          <h3 style={{ color: "#888", fontSize: "12px", marginBottom: "8px" }}>
            TRIPS COMPLETED
          </h3>
          <p
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            {dashboardStats?.stats?.tasksCompleted || 0}
          </p>
          <p style={{ color: "#00ff88", fontSize: "12px" }}>
            📈 +3 from yesterday
          </p>
        </div>

        <div
          style={{
            background: "linear-gradient(135deg, #1a2332, #2a3f54)",
            padding: "25px",
            borderRadius: "15px",
            border: "1px solid #2a3f54",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "50px",
              height: "50px",
              background: "rgba(0, 255, 136, 0.1)",
              borderRadius: "50%",
              transform: "translate(25px, -25px)",
            }}
          ></div>
          <div style={{ fontSize: "28px", marginBottom: "10px" }}>💰</div>
          <h3 style={{ color: "#888", fontSize: "12px", marginBottom: "8px" }}>
            TODAY&apos;S EARNINGS
          </h3>
          <p
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            ${currentEarnings.toFixed(2)}
          </p>
          <p style={{ color: "#00ff88", fontSize: "12px" }}>
            📈 +$12.50 per hour
          </p>
        </div>

        <div
          style={{
            background: "linear-gradient(135deg, #1a2332, #2a3f54)",
            padding: "25px",
            borderRadius: "15px",
            border: "1px solid #2a3f54",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "50px",
              height: "50px",
              background: "rgba(255, 68, 68, 0.1)",
              borderRadius: "50%",
              transform: "translate(25px, -25px)",
            }}
          ></div>
          <div style={{ fontSize: "28px", marginBottom: "10px" }}>⭐</div>
          <h3 style={{ color: "#888", fontSize: "12px", marginBottom: "8px" }}>
            RATING
          </h3>
          <p
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            4.9
          </p>
          <p style={{ color: "#00ff88", fontSize: "12px" }}>
            🎯 Excellent performance
          </p>
        </div>
      </div>

      {/* Performance Charts */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            background: "#1a2332",
            padding: "25px",
            borderRadius: "15px",
            border: "1px solid #2a3f54",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h3 style={{ color: "#888", fontSize: "16px" }}>
              📊 Performance Analytics
            </h3>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => setSelectedMetric("efficiency")}
                style={{
                  background:
                    selectedMetric === "efficiency" ? "#00ff88" : "#2a3f54",
                  color: selectedMetric === "efficiency" ? "#0a0f1a" : "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                Efficiency
              </button>
              <button
                onClick={() => setSelectedMetric("earnings")}
                style={{
                  background:
                    selectedMetric === "earnings" ? "#00ff88" : "#2a3f54",
                  color: selectedMetric === "earnings" ? "#0a0f1a" : "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                Earnings
              </button>
            </div>
          </div>

          <div
            style={{
              height: "200px",
              background:
                "linear-gradient(180deg, rgba(0,255,136,0.1) 0%, rgba(0,255,136,0.05) 100%)",
              borderRadius: "10px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <svg
              width="100%"
              height="200"
              style={{ position: "absolute", top: 0, left: 0 }}
            >
              <defs>
                <linearGradient
                  id="performanceGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    style={{ stopColor: "#00ff88", stopOpacity: 0.3 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#00ff88", stopOpacity: 0.05 }}
                  />
                </linearGradient>
              </defs>
              <path
                d="M 0 150 Q 50 140 100 130 T 200 120 T 300 110 T 400 100 T 500 90 L 500 200 L 0 200 Z"
                fill="url(#performanceGradient)"
              />
              <path
                d="M 0 150 Q 50 140 100 130 T 200 120 T 300 110 T 400 100 T 500 90"
                fill="none"
                stroke="#00ff88"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <div
          style={{
            background: "#1a2332",
            padding: "25px",
            borderRadius: "15px",
            border: "1px solid #2a3f54",
          }}
        >
          <h3 style={{ color: "#888", marginBottom: "20px", fontSize: "16px" }}>
            🎯 Daily Goals
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span style={{ fontSize: "12px" }}>💰 Earnings Goal</span>
                <span style={{ fontSize: "12px", color: "#00ff88" }}>
                  $284.50 / $300
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "6px",
                  background: "#2a3f54",
                  borderRadius: "3px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "95%",
                    height: "100%",
                    background: "#00ff88",
                    borderRadius: "3px",
                    transition: "width 0.3s ease",
                  }}
                ></div>
              </div>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span style={{ fontSize: "12px" }}>🚗 Trip Goal</span>
                <span style={{ fontSize: "12px", color: "#00ff88" }}>
                  {dashboardStats?.stats?.tasksCompleted || 0} / 25
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "6px",
                  background: "#2a3f54",
                  borderRadius: "3px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${
                      ((dashboardStats?.stats?.tasksCompleted || 0) / 25) * 100
                    }%`,
                    height: "100%",
                    background: "#00ff88",
                    borderRadius: "3px",
                    transition: "width 0.3s ease",
                  }}
                ></div>
              </div>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span style={{ fontSize: "12px" }}>⭐ Rating Goal</span>
                <span style={{ fontSize: "12px", color: "#00ff88" }}>
                  4.9 / 5.0
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "6px",
                  background: "#2a3f54",
                  borderRadius: "3px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "98%",
                    height: "100%",
                    background: "#00ff88",
                    borderRadius: "3px",
                    transition: "width 0.3s ease",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div
        style={{
          background: "#1a2332",
          padding: "25px",
          borderRadius: "15px",
          border: "1px solid #2a3f54",
        }}
      >
        <h3 style={{ color: "#888", marginBottom: "20px", fontSize: "16px" }}>
          📝 Recent Activity
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              padding: "15px",
              background: "#0f1419",
              borderRadius: "10px",
              borderLeft: "4px solid #00ff88",
            }}
          >
            <div style={{ fontSize: "24px" }}>🚗</div>
            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginBottom: "4px",
                }}
              >
                Trip to Downtown completed
              </p>
              <p style={{ fontSize: "12px", color: "#888" }}>
                2 minutes ago • $18.50 earned • 4.9 ⭐ rating
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              padding: "15px",
              background: "#0f1419",
              borderRadius: "10px",
              borderLeft: "4px solid #ffa500",
            }}
          >
            <div style={{ fontSize: "24px" }}>🔋</div>
            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginBottom: "4px",
                }}
              >
                Battery charged to 90%
              </p>
              <p style={{ fontSize: "12px", color: "#888" }}>
                15 minutes ago • Fast charging station
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              padding: "15px",
              background: "#0f1419",
              borderRadius: "10px",
              borderLeft: "4px solid #ff4444",
            }}
          >
            <div style={{ fontSize: "24px" }}>💰</div>
            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginBottom: "4px",
                }}
              >
                Daily earnings milestone reached
              </p>
              <p style={{ fontSize: "12px", color: "#888" }}>
                1 hour ago • $250+ earned today
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedEmployeeDashboard;
