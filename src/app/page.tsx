"use client";
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        router.push("/employee");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (err) {
      setError("Login failed. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0a0f1a 0%, #1a2332 100%)",
        color: "white",
      }}
    >
      <div
        style={{
          background: "rgba(26, 35, 50, 0.8)",
          padding: "40px",
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          width: "400px",
          maxWidth: "90%",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1
            style={{
              color: "#00ff88",
              fontSize: "32px",
              fontWeight: "bold",
              marginBottom: "10px",
              textShadow: "0 0 20px rgba(0, 255, 136, 0.5)",
            }}
          >
            Velora Dashboard
          </h1>
          <p style={{ color: "#888", fontSize: "14px" }}>
            Sign in to access your dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#ccc",
                fontSize: "14px",
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #2a3f54",
                background: "rgba(42, 63, 84, 0.3)",
                color: "white",
                fontSize: "14px",
              }}
              placeholder="Enter your email"
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#ccc",
                fontSize: "14px",
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #2a3f54",
                background: "rgba(42, 63, 84, 0.3)",
                color: "white",
                fontSize: "14px",
              }}
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div
              style={{
                color: "#ff4444",
                fontSize: "14px",
                marginBottom: "20px",
                padding: "10px",
                background: "rgba(255, 68, 68, 0.1)",
                borderRadius: "6px",
                border: "1px solid rgba(255, 68, 68, 0.3)",
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
              padding: "12px",
              background: isLoading
                ? "rgba(0, 255, 136, 0.3)"
                : "linear-gradient(135deg, #00ff88, #00cc70)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: isLoading ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
            }}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <p style={{ color: "#888", fontSize: "14px", marginBottom: "10px" }}>
            Demo Credentials:
          </p>
          <div style={{ fontSize: "12px", color: "#666" }}>
            <p>Admin: admin@velora.com / admin123</p>
            <p>Company: contact@techcorp.com / company123</p>
            <p>Employee: john@techcorp.com / employee123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
