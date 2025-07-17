"use client";
import React, { useState } from "react";

const EnhancedCompanyDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState("24h");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <div
      style={{
        padding: "20px",
        color: "white",
        background: "#0a0f1a",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
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
            Company Dashboard
          </h1>
          <p style={{ color: "#888", fontSize: "14px" }}>
            Business Intelligence • Analytics • Fleet Management • Financial
            Overview
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            style={{
              background: "#1a2332",
              color: "white",
              border: "1px solid #2a3f54",
              padding: "8px 12px",
              borderRadius: "6px",
            }}
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
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
          <div style={{ fontSize: "28px", marginBottom: "10px" }}>💰</div>
          <h3 style={{ color: "#888", fontSize: "12px", marginBottom: "8px" }}>
            TOTAL REVENUE
          </h3>
          <p
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            $847,392
          </p>
          <p style={{ color: "#00ff88", fontSize: "12px" }}>
            📈 +12.5% from last month
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
              background: "rgba(255, 165, 0, 0.1)",
              borderRadius: "50%",
              transform: "translate(25px, -25px)",
            }}
          ></div>
          <div style={{ fontSize: "28px", marginBottom: "10px" }}>🚗</div>
          <h3 style={{ color: "#888", fontSize: "12px", marginBottom: "8px" }}>
            ACTIVE VEHICLES
          </h3>
          <p
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            1,247
          </p>
          <p style={{ color: "#00ff88", fontSize: "12px" }}>
            🔄 98.7% operational
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
          <div style={{ fontSize: "28px", marginBottom: "10px" }}>👥</div>
          <h3 style={{ color: "#888", fontSize: "12px", marginBottom: "8px" }}>
            ACTIVE DRIVERS
          </h3>
          <p
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            892
          </p>
          <p style={{ color: "#00ff88", fontSize: "12px" }}>
            ⭐ 4.8 avg rating
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
          <div style={{ fontSize: "28px", marginBottom: "10px" }}>📊</div>
          <h3 style={{ color: "#888", fontSize: "12px", marginBottom: "8px" }}>
            DAILY TRIPS
          </h3>
          <p
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            15,432
          </p>
          <p style={{ color: "#00ff88", fontSize: "12px" }}>
            🎯 +8.2% from yesterday
          </p>
        </div>
      </div>

      {/* Charts and Analytics */}
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
          <h3 style={{ color: "#888", marginBottom: "20px", fontSize: "16px" }}>
            📈 Revenue Trend
          </h3>
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
                  id="revenueGradient"
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
                d="M 0 180 Q 100 170 200 150 T 400 120 T 600 100 L 600 200 L 0 200 Z"
                fill="url(#revenueGradient)"
              />
              <path
                d="M 0 180 Q 100 170 200 150 T 400 120 T 600 100"
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
            🎯 Performance Metrics
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
                <span style={{ fontSize: "12px" }}>Fleet Efficiency</span>
                <span style={{ fontSize: "12px", color: "#00ff88" }}>94%</span>
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
                    width: "94%",
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
                <span style={{ fontSize: "12px" }}>Customer Satisfaction</span>
                <span style={{ fontSize: "12px", color: "#00ff88" }}>97%</span>
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
                    width: "97%",
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
                <span style={{ fontSize: "12px" }}>Profit Margin</span>
                <span style={{ fontSize: "12px", color: "#00ff88" }}>23%</span>
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
                    width: "23%",
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

      {/* Recent Activities */}
      <div
        style={{
          background: "#1a2332",
          padding: "25px",
          borderRadius: "15px",
          border: "1px solid #2a3f54",
        }}
      >
        <h3 style={{ color: "#888", marginBottom: "20px", fontSize: "16px" }}>
          🔔 Recent Activities
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
            <div style={{ fontSize: "24px" }}>💰</div>
            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginBottom: "4px",
                }}
              >
                Monthly revenue target achieved
              </p>
              <p style={{ fontSize: "12px", color: "#888" }}>
                2 hours ago • $847,392 total revenue this month
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
            <div style={{ fontSize: "24px" }}>🚗</div>
            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginBottom: "4px",
                }}
              >
                New vehicle fleet added
              </p>
              <p style={{ fontSize: "12px", color: "#888" }}>
                6 hours ago • 25 electric vehicles added to fleet
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
            <div style={{ fontSize: "24px" }}>👥</div>
            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginBottom: "4px",
                }}
              >
                Driver training program completed
              </p>
              <p style={{ fontSize: "12px", color: "#888" }}>
                1 day ago • 50 drivers completed safety training
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedCompanyDashboard;
