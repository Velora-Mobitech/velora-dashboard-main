"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  Home,
  Users,
  Server,
  Building,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  User,
} from "lucide-react";

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const pathname = usePathname();
  const { user } = useAuth();

  const navItems = [
    {
      id: "employee",
      label: "Employee Dashboard",
      icon: Home,
      path: "/employee",
    },
    { id: "backend", label: "Backend Monitor", icon: Server, path: "/backend" },
    {
      id: "company",
      label: "Company Overview",
      icon: Building,
      path: "/company",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      path: "/analytics",
    },
    { id: "users", label: "User Management", icon: Users, path: "/users" },
  ];

  const bottomItems = [
    { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
    { id: "help", label: "Help & Support", icon: HelpCircle, path: "/help" },
    { id: "logout", label: "Logout", icon: LogOut, path: "/logout" },
  ];

  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-icon">V</div>
        <span className="logo-text">Velora</span>
      </div>

      {/* User Info */}
      {user && (
        <div
          style={{
            padding: "1rem",
            marginBottom: "1rem",
            background: "rgba(0, 255, 136, 0.1)",
            borderRadius: "8px",
            border: "1px solid rgba(0, 255, 136, 0.2)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <User size={16} color="#00ff88" />
            <div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#00ff88",
                  fontWeight: "600",
                }}
              >
                {user.name}
              </div>
              <div style={{ fontSize: "10px", color: "#888" }}>
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </div>
            </div>
          </div>
        </div>
      )}

      <nav>
        <ul className="nav-menu">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <li key={item.id} className="nav-item">
                <Link
                  href={item.path}
                  className={`nav-link ${isActive ? "active" : ""}`}
                  onClick={() => setActiveView(item.id)}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div style={{ marginTop: "auto", paddingTop: "2rem" }}>
          <ul className="nav-menu">
            {bottomItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id} className="nav-item">
                  <Link href={item.path} className="nav-link">
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
