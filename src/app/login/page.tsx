"use client";
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const success = await login(email, password);
    if (success) {
      router.push("/employee"); // Redirect to main dashboard
    } else {
      setError("Invalid email or password");
    }
  };

  const demoCredentials = [
    { email: "admin@velora.com", password: "admin123", role: "Admin" },
    { email: "employee@velora.com", password: "employee123", role: "Employee" },
    { email: "company@velora.com", password: "company123", role: "Company" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0a0f1a 0%, #1a2332 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Elements */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: "100px",
          height: "100px",
          background: "rgba(0, 255, 136, 0.1)",
          borderRadius: "50%",
          animation: "float 6s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "60%",
          right: "15%",
          width: "80px",
          height: "80px",
          background: "rgba(0, 255, 136, 0.05)",
          borderRadius: "50%",
          animation: "float 4s ease-in-out infinite reverse",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          left: "20%",
          width: "60px",
          height: "60px",
          background: "rgba(0, 255, 136, 0.08)",
          borderRadius: "50%",
          animation: "float 5s ease-in-out infinite",
        }}
      />

      <div
        style={{
          background: "rgba(26, 35, 50, 0.9)",
          padding: "40px",
          borderRadius: "20px",
          border: "1px solid rgba(0, 255, 136, 0.2)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
          width: "100%",
          maxWidth: "450px",
          position: "relative",
        }}
      >
        {/* Logo/Header */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div
            style={{
              fontSize: "40px",
              marginBottom: "10px",
              background: "linear-gradient(45deg, #00ff88, #00cc6a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "bold",
            }}
          >
            ⚡ VELORA
          </div>
          <h2
            style={{
              color: "white",
              marginBottom: "5px",
              fontSize: "24px",
              fontWeight: "600",
            }}
          >
            Welcome Back
          </h2>
          <p style={{ color: "#888", fontSize: "14px" }}>
            Sign in to access your dashboard
          </p>
        </div>

        {/* Demo Credentials Info */}
        <div
          style={{
            background: "rgba(0, 255, 136, 0.1)",
            padding: "15px",
            borderRadius: "10px",
            border: "1px solid rgba(0, 255, 136, 0.2)",
            marginBottom: "20px",
          }}
        >
          <h4
            style={{
              color: "#00ff88",
              marginBottom: "10px",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            Demo Credentials:
          </h4>
          {demoCredentials.map((cred, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "5px",
                fontSize: "12px",
                color: "#ccc",
              }}
            >
              <span>{cred.role}:</span>
              <span>{cred.email} / {cred.password}</span>
            </div>
          ))}
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
                color: "#ccc",
                fontWeight: "500",
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "rgba(15, 20, 25, 0.8)",
                border: "1px solid rgba(42, 63, 84, 0.6)",
                borderRadius: "10px",
                color: "white",
                fontSize: "14px",
                outline: "none",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => {
                const target = e.target as HTMLInputElement;
                target.style.borderColor = "#00ff88";
                target.style.boxShadow = "0 0 0 2px rgba(0, 255, 136, 0.2)";
              }}
              onBlur={(e) => {
                const target = e.target as HTMLInputElement;
                target.style.borderColor = "rgba(42, 63, 84, 0.6)";
                target.style.boxShadow = "none";
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
                color: "#ccc",
                fontWeight: "500",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  paddingRight: "45px",
                  background: "rgba(15, 20, 25, 0.8)",
                  border: "1px solid rgba(42, 63, 84, 0.6)",
                  borderRadius: "10px",
                  color: "white",
                  fontSize: "14px",
                  outline: "none",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.style.borderColor = "#00ff88";
                  target.style.boxShadow = "0 0 0 2px rgba(0, 255, 136, 0.2)";
                }}
                onBlur={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.style.borderColor = "rgba(42, 63, 84, 0.6)";
                  target.style.boxShadow = "none";
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "#888",
                  cursor: "pointer",
                  fontSize: "18px",
                  padding: "4px",
                }}
              >
                {showPassword ? "👁️" : "🙈"}
              </button>
            </div>
          </div>

          {error && (
            <div
              style={{
                background: "rgba(255, 0, 0, 0.1)",
                color: "#ff6b6b",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid rgba(255, 0, 0, 0.2)",
                marginBottom: "20px",
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "14px",
              background: isLoading
                ? "rgba(0, 255, 136, 0.5)"
                : "linear-gradient(45deg, #00ff88, #00cc6a)",
              color: "#0a0f1a",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: isLoading ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
            onMouseOver={(e) => {
              if (!isLoading) {
                const target = e.target as HTMLButtonElement;
                target.style.transform = "translateY(-2px)";
                target.style.boxShadow = "0 10px 20px rgba(0, 255, 136, 0.3)";
              }
            }}
            onMouseOut={(e) => {
              if (!isLoading) {
                const target = e.target as HTMLButtonElement;
                target.style.transform = "translateY(0)";
                target.style.boxShadow = "none";
              }
            }}
          >
            {isLoading ? (
              <>
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    border: "2px solid #0a0f1a",
                    borderTop: "2px solid transparent",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                  }}
                />
                Signing In...
              </>
            ) : (
              <>
                🚀 Sign In
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p style={{ color: "#666", fontSize: "12px" }}>
            Protected by Velora Security System
          </p>
        </div>
      </div>

      {/* Add keyframes for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
