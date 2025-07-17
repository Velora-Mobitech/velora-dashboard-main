"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Server,
  Building,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const pathname = usePathname();

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
