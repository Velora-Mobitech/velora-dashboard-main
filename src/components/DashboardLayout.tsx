"use client";
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [activeView, setActiveView] = useState("employee");

  return (
    <ProtectedRoute>
      <div className="dashboard-container">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        <main className="main-content">{children}</main>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
