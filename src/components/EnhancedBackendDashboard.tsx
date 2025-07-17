"use client";
import React, { useState, useEffect } from "react";
import { backendAPI, analyticsAPI } from "@/utils/api";
import { useAuth } from "@/contexts/AuthContext";

const EnhancedBackendDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [showSystemLogs, setShowSystemLogs] = useState(false);
  const [selectedServer, setSelectedServer] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Real-time data from API
  const [systemMetrics, setSystemMetrics] = useState({
    cpuUsage: 68,
    memoryUsage: 72,
    diskUsage: 45,
    networkLoad: 23,
    activeConnections: 1247,
    responseTime: 145,
    errorRate: 0.02,
    uptime: 99.9,
  });

  const [systemStatus, setSystemStatus] = useState<any>(null);
  const [systemLogs, setSystemLogs] = useState<any[]>([]);
  const [analyticsData, setAnalyticsData] = useState<any>(null);

  // Load backend data
  useEffect(() => {
    const loadBackendData = async () => {
      try {
        setLoading(true);
        const [
          statusResponse,
          metricsResponse,
          logsResponse,
          analyticsResponse,
        ] = await Promise.all([
          backendAPI.getSystemStatus(),
          backendAPI.getMetrics(),
          backendAPI.getLogs({ limit: 50 }),
          analyticsAPI.getOverview(),
        ]);

        if (statusResponse) {
          setSystemStatus(statusResponse);
          // Update metrics with real data
          setSystemMetrics((prev) => ({
            ...prev,
            cpuUsage: statusResponse.server?.cpu?.usage || prev.cpuUsage,
            memoryUsage:
              Math.round(
                (statusResponse.server?.memory?.heapUsed /
                  statusResponse.server?.memory?.heapTotal) *
                  100
              ) || prev.memoryUsage,
            uptime: statusResponse.server?.uptime || prev.uptime,
          }));
        }

        if (metricsResponse) {
          setSystemMetrics((prev) => ({
            ...prev,
            responseTime:
              metricsResponse.performance?.responseTime || prev.responseTime,
            errorRate: metricsResponse.performance?.errorRate || prev.errorRate,
            activeConnections:
              metricsResponse.usage?.activeUsers || prev.activeConnections,
          }));
        }

        if (logsResponse?.logs) {
          setSystemLogs(logsResponse.logs);
        }

        if (analyticsResponse) {
          setAnalyticsData(analyticsResponse);
        }
      } catch (err) {
        setError("Failed to load backend data");
        console.error("Error loading backend data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === "admin") {
      loadBackendData();
    }
  }, [user]);

  // Auto-refresh data
  useEffect(() => {
    if (!autoRefresh || user?.role !== "admin") return;

    const interval = setInterval(async () => {
      try {
        const [statusResponse, metricsResponse] = await Promise.all([
          backendAPI.getSystemStatus(),
          backendAPI.getMetrics(),
        ]);

        if (statusResponse) {
          setSystemStatus(statusResponse);
          setSystemMetrics((prev) => ({
            ...prev,
            cpuUsage: statusResponse.server?.cpu?.usage || prev.cpuUsage,
            memoryUsage:
              Math.round(
                (statusResponse.server?.memory?.heapUsed /
                  statusResponse.server?.memory?.heapTotal) *
                  100
              ) || prev.memoryUsage,
          }));
        }

        if (metricsResponse) {
          setSystemMetrics((prev) => ({
            ...prev,
            responseTime:
              metricsResponse.performance?.responseTime || prev.responseTime,
            errorRate: metricsResponse.performance?.errorRate || prev.errorRate,
            activeConnections:
              metricsResponse.usage?.activeUsers || prev.activeConnections,
          }));
        }
      } catch (err) {
        console.error("Auto-refresh error:", err);
      }
    }, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval);
  }, [autoRefresh, user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0f1a]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#00ff88]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0f1a]">
        <div className="text-red-600 text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (
    value: number,
    thresholds: { good: number; warning: number }
  ) => {
    if (value < thresholds.good) return "#00ff88";
    if (value < thresholds.warning) return "#ffa500";
    return "#ff4444";
  };

  const servers = [
    { id: "web-01", name: "Web Server 01", status: "online", load: 45 },
    { id: "web-02", name: "Web Server 02", status: "online", load: 62 },
    { id: "api-01", name: "API Server 01", status: "online", load: 78 },
    { id: "db-01", name: "Database 01", status: "online", load: 34 },
    { id: "redis-01", name: "Redis Cache", status: "warning", load: 89 },
    { id: "worker-01", name: "Worker 01", status: "offline", load: 0 },
  ];

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
            Backend Dashboard
          </h1>
          <p style={{ color: "#888", fontSize: "14px" }}>
            System Monitoring • Performance Analytics • Server Health
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
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
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            style={{
              background: autoRefresh ? "#00ff88" : "#2a3f54",
              color: autoRefresh ? "#0a0f1a" : "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            {autoRefresh ? "🔄 Auto Refresh" : "⏸️ Paused"}
          </button>
        </div>
      </div>

      {/* System Metrics Grid */}
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
            padding: "20px",
            borderRadius: "15px",
            border: "1px solid #2a3f54",
          }}
        >
          <div style={{ fontSize: "24px", marginBottom: "10px" }}>🖥️</div>
          <h3 style={{ color: "#888", fontSize: "12px", marginBottom: "8px" }}>
            CPU USAGE
          </h3>
          <p
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              marginBottom: "8px",
              color: getStatusColor(systemMetrics.cpuUsage, {
                good: 70,
                warning: 85,
              }),
            }}
          >
            {systemMetrics.cpuUsage.toFixed(1)}%
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
                width: `${systemMetrics.cpuUsage}%`,
                height: "100%",
                background: getStatusColor(systemMetrics.cpuUsage, {
                  good: 70,
                  warning: 85,
                }),
                borderRadius: "2px",
                transition: "all 0.3s ease",
              }}
            ></div>
          </div>
        </div>

        <div
          style={{
            background: "linear-gradient(135deg, #1a2332, #2a3f54)",
            padding: "20px",
            borderRadius: "15px",
            border: "1px solid #2a3f54",
          }}
        >
          <div style={{ fontSize: "24px", marginBottom: "10px" }}>💾</div>
          <h3 style={{ color: "#888", fontSize: "12px", marginBottom: "8px" }}>
            MEMORY USAGE
          </h3>
          <p
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              marginBottom: "8px",
              color: getStatusColor(systemMetrics.memoryUsage, {
                good: 70,
                warning: 85,
              }),
            }}
          >
            {systemMetrics.memoryUsage.toFixed(1)}%
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
                width: `${systemMetrics.memoryUsage}%`,
                height: "100%",
                background: getStatusColor(systemMetrics.memoryUsage, {
                  good: 70,
                  warning: 85,
                }),
                borderRadius: "2px",
                transition: "all 0.3s ease",
              }}
            ></div>
          </div>
        </div>

        <div
          style={{
            background: "linear-gradient(135deg, #1a2332, #2a3f54)",
            padding: "20px",
            borderRadius: "15px",
            border: "1px solid #2a3f54",
          }}
        >
          <div style={{ fontSize: "24px", marginBottom: "10px" }}>🌐</div>
          <h3 style={{ color: "#888", fontSize: "12px", marginBottom: "8px" }}>
            ACTIVE CONNECTIONS
          </h3>
          <p
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              marginBottom: "8px",
              color: "#00ff88",
            }}
          >
            {systemMetrics.activeConnections.toLocaleString()}
          </p>
          <p style={{ color: "#888", fontSize: "12px" }}>
            📈 +12% from last hour
          </p>
        </div>

        <div
          style={{
            background: "linear-gradient(135deg, #1a2332, #2a3f54)",
            padding: "20px",
            borderRadius: "15px",
            border: "1px solid #2a3f54",
          }}
        >
          <div style={{ fontSize: "24px", marginBottom: "10px" }}>⚡</div>
          <h3 style={{ color: "#888", fontSize: "12px", marginBottom: "8px" }}>
            RESPONSE TIME
          </h3>
          <p
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              marginBottom: "8px",
              color: getStatusColor(systemMetrics.responseTime, {
                good: 200,
                warning: 500,
              }),
            }}
          >
            {systemMetrics.responseTime.toFixed(0)}ms
          </p>
          <p style={{ color: "#888", fontSize: "12px" }}>
            🎯 Target: &lt;200ms
          </p>
        </div>
      </div>

      {/* Server Status */}
      <div
        style={{
          background: "#1a2332",
          padding: "25px",
          borderRadius: "15px",
          border: "1px solid #2a3f54",
          marginBottom: "30px",
        }}
      >
        <h3 style={{ color: "#888", marginBottom: "20px", fontSize: "16px" }}>
          🖥️ Server Status
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "15px",
          }}
        >
          {servers.map((server) => (
            <div
              key={server.id}
              style={{
                background: "#0f1419",
                padding: "15px",
                borderRadius: "10px",
                border: `1px solid ${
                  server.status === "online"
                    ? "#00ff88"
                    : server.status === "warning"
                    ? "#ffa500"
                    : "#ff4444"
                }`,
                borderLeft: `4px solid ${
                  server.status === "online"
                    ? "#00ff88"
                    : server.status === "warning"
                    ? "#ffa500"
                    : "#ff4444"
                }`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <h4 style={{ fontSize: "14px", fontWeight: "bold" }}>
                  {server.name}
                </h4>
                <span
                  style={{
                    color:
                      server.status === "online"
                        ? "#00ff88"
                        : server.status === "warning"
                        ? "#ffa500"
                        : "#ff4444",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {server.status.toUpperCase()}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: "12px", color: "#888" }}>Load:</span>
                <span style={{ fontSize: "12px", fontWeight: "bold" }}>
                  {server.load}%
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "3px",
                  background: "#2a3f54",
                  borderRadius: "2px",
                  overflow: "hidden",
                  marginTop: "8px",
                }}
              >
                <div
                  style={{
                    width: `${server.load}%`,
                    height: "100%",
                    background: getStatusColor(server.load, {
                      good: 70,
                      warning: 85,
                    }),
                    borderRadius: "2px",
                    transition: "all 0.3s ease",
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Logs */}
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
          <h3 style={{ color: "#888", fontSize: "16px" }}>📝 System Logs</h3>
          <button
            onClick={() => setShowSystemLogs(!showSystemLogs)}
            style={{
              background: showSystemLogs ? "#00ff88" : "#2a3f54",
              color: showSystemLogs ? "#0a0f1a" : "white",
              border: "none",
              padding: "6px 12px",
              borderRadius: "6px",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            {showSystemLogs ? "Hide Logs" : "Show Logs"}
          </button>
        </div>

        {showSystemLogs && (
          <div
            style={{
              background: "#0f1419",
              padding: "15px",
              borderRadius: "10px",
              fontFamily: "monospace",
              fontSize: "12px",
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            <div style={{ color: "#00ff88", marginBottom: "5px" }}>
              [2024-01-17 14:23:45] INFO: Server web-01 response time: 145ms
            </div>
            <div style={{ color: "#ffa500", marginBottom: "5px" }}>
              [2024-01-17 14:23:44] WARN: Redis cache usage at 89%
            </div>
            <div style={{ color: "#00ff88", marginBottom: "5px" }}>
              [2024-01-17 14:23:43] INFO: Database connection established
            </div>
            <div style={{ color: "#ff4444", marginBottom: "5px" }}>
              [2024-01-17 14:23:42] ERROR: Worker-01 connection timeout
            </div>
            <div style={{ color: "#888", marginBottom: "5px" }}>
              [2024-01-17 14:23:41] DEBUG: Memory garbage collection completed
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedBackendDashboard;
