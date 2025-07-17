"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const LogoutPage: React.FC = () => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [showConfirmation, setShowConfirmation] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoggingOut) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            // Simulate logout process
            localStorage.removeItem("authToken");
            localStorage.removeItem("userSession");
            // Redirect to login page (you would replace this with your actual login route)
            router.push("/");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLoggingOut, router]);

  const handleLogout = () => {
    setShowConfirmation(false);
    setIsLoggingOut(true);
  };

  const handleCancel = () => {
    router.back();
  };

  const handleStayLoggedIn = () => {
    router.push("/employee");
  };

  if (isLoggingOut) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0a0f1a 0%, #1a2332 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            background: "rgba(26, 35, 50, 0.9)",
            padding: "40px",
            borderRadius: "20px",
            border: "1px solid rgba(0, 255, 136, 0.3)",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(20px)",
            textAlign: "center",
            maxWidth: "400px",
            width: "90%",
          }}
        >
          {/* Loading Animation */}
          <div
            style={{
              width: "60px",
              height: "60px",
              margin: "0 auto 20px",
              border: "3px solid #2a3f54",
              borderTop: "3px solid #00ff88",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          ></div>

          <h2
            style={{
              color: "#00ff88",
              marginBottom: "15px",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            Logging Out...
          </h2>

          <p
            style={{
              color: "#ccc",
              marginBottom: "20px",
              fontSize: "16px",
            }}
          >
            Clearing session data and securing your account
          </p>

          <div
            style={{
              background: "#0f1419",
              padding: "15px",
              borderRadius: "10px",
              border: "1px solid #2a3f54",
              marginBottom: "20px",
            }}
          >
            <p
              style={{
                color: "white",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Redirecting in {countdown} seconds...
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              fontSize: "14px",
              color: "#888",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#00ff88",
                }}
              ></div>
              <span>Clearing authentication tokens</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#00ff88",
                }}
              ></div>
              <span>Securing user session</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#00ff88",
                }}
              ></div>
              <span>Saving user preferences</span>
            </div>
          </div>

          <style jsx>{`
            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0a0f1a 0%, #1a2332 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {showConfirmation && (
        <div
          style={{
            background: "rgba(26, 35, 50, 0.9)",
            padding: "40px",
            borderRadius: "20px",
            border: "1px solid rgba(0, 255, 136, 0.3)",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(20px)",
            textAlign: "center",
            maxWidth: "500px",
            width: "90%",
          }}
        >
          {/* Logo/Icon */}
          <div
            style={{
              width: "80px",
              height: "80px",
              margin: "0 auto 20px",
              background: "linear-gradient(45deg, #00ff88, #00cc6a)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 30px rgba(0, 255, 136, 0.3)",
            }}
          >
            <span
              style={{
                fontSize: "40px",
                color: "#0a0f1a",
                fontWeight: "bold",
              }}
            >
              V
            </span>
          </div>

          <h1
            style={{
              color: "#00ff88",
              marginBottom: "15px",
              fontSize: "28px",
              fontWeight: "bold",
              textShadow: "0 0 20px rgba(0, 255, 136, 0.5)",
            }}
          >
            Sign Out of Velora
          </h1>

          <p
            style={{
              color: "#ccc",
              marginBottom: "30px",
              fontSize: "16px",
              lineHeight: "1.5",
            }}
          >
            Are you sure you want to sign out? Your current session will be
            terminated and you'll need to log in again to access your dashboard.
          </p>

          {/* Session Info */}
          <div
            style={{
              background: "#0f1419",
              padding: "20px",
              borderRadius: "10px",
              border: "1px solid #2a3f54",
              marginBottom: "30px",
              textAlign: "left",
            }}
          >
            <h3
              style={{
                color: "#00ff88",
                marginBottom: "10px",
                fontSize: "16px",
              }}
            >
              Current Session Info
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                fontSize: "14px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#888" }}>User:</span>
                <span style={{ color: "white" }}>John Doe</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#888" }}>Login Time:</span>
                <span style={{ color: "white" }}>
                  {new Date().toLocaleTimeString()}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#888" }}>Session Duration:</span>
                <span style={{ color: "white" }}>2h 45m</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#888" }}>Last Activity:</span>
                <span style={{ color: "white" }}>2 minutes ago</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              gap: "15px",
              marginBottom: "20px",
            }}
          >
            <button
              onClick={handleCancel}
              style={{
                flex: 1,
                background: "transparent",
                color: "#888",
                border: "1px solid #2a3f54",
                padding: "12px 20px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "#2a3f54";
                e.currentTarget.style.color = "white";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#888";
              }}
            >
              Cancel
            </button>

            <button
              onClick={handleStayLoggedIn}
              style={{
                flex: 1,
                background: "#2a3f54",
                color: "white",
                border: "1px solid #2a3f54",
                padding: "12px 20px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "#3a4f64";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "#2a3f54";
              }}
            >
              Stay Logged In
            </button>

            <button
              onClick={handleLogout}
              style={{
                flex: 1,
                background: "#ff4757",
                color: "white",
                border: "1px solid #ff4757",
                padding: "12px 20px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "bold",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "#ff3742";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "#ff4757";
              }}
            >
              Sign Out
            </button>
          </div>

          {/* Security Note */}
          <div
            style={{
              background: "rgba(255, 215, 0, 0.1)",
              border: "1px solid rgba(255, 215, 0, 0.3)",
              padding: "15px",
              borderRadius: "8px",
              marginTop: "20px",
            }}
          >
            <p
              style={{
                color: "#ffd700",
                fontSize: "13px",
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>🔒</span>
              For security, always sign out when using shared or public devices
            </p>
          </div>

          {/* Quick Actions */}
          <div
            style={{
              marginTop: "20px",
              paddingTop: "20px",
              borderTop: "1px solid #2a3f54",
            }}
          >
            <p
              style={{
                color: "#888",
                fontSize: "12px",
                marginBottom: "10px",
              }}
            >
              Need help? Contact support or check system status
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
              }}
            >
              <button
                onClick={() => router.push("/help")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#00ff88",
                  cursor: "pointer",
                  fontSize: "12px",
                  textDecoration: "underline",
                }}
              >
                Help Center
              </button>
              <button
                onClick={() => alert("System Status: All systems operational")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#00ff88",
                  cursor: "pointer",
                  fontSize: "12px",
                  textDecoration: "underline",
                }}
              >
                System Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoutPage;
