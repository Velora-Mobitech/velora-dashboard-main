"use client";
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [activeView, setActiveView] = useState("employee");

  return (
    <div className="dashboard-container">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="main-content">{children}</main>
    </div>
  );
};

export default DashboardLayout;
