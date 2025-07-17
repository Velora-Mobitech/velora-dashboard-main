"use client";
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    // General Settings
    darkMode: true,
    language: "en",
    timezone: "UTC-5",
    autoRefresh: true,
    refreshInterval: 5000,

    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    soundEnabled: true,
    alertThreshold: 85,

    // Display Settings
    showAnimations: true,
    compactView: false,
    showTooltips: true,
    chartType: "area",

    // Privacy Settings
    shareAnalytics: false,
    locationTracking: true,
    dataRetention: 30,

    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: 30,
    loginAlerts: true,
  });

  const handleSettingChange = (key: string, value: unknown) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const tabs = [
    { id: "general", label: "General", icon: "⚙️" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "display", label: "Display", icon: "🖥️" },
    { id: "privacy", label: "Privacy", icon: "🔒" },
    { id: "security", label: "Security", icon: "🛡️" },
  ];

  const renderGeneralSettings = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div
        style={{
          background: "#1a2332",
          padding: "20px",
          borderRadius: "10px",
          border: "1px solid #2a3f54",
        }}
      >
        <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>
          🎨 Appearance
        </h3>

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{ display: "block", marginBottom: "8px", fontSize: "14px" }}
          >
            Theme
          </label>
          <select
            value={settings.darkMode ? "dark" : "light"}
            onChange={(e) =>
              handleSettingChange("darkMode", e.target.value === "dark")
            }
            style={{
              width: "100%",
              padding: "8px 12px",
              background: "#0f1419",
              border: "1px solid #2a3f54",
              borderRadius: "6px",
              color: "white",
              fontSize: "14px",
            }}
          >
            <option value="dark">Dark Theme</option>
            <option value="light">Light Theme</option>
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{ display: "block", marginBottom: "8px", fontSize: "14px" }}
          >
            Language
          </label>
          <select
            value={settings.language}
            onChange={(e) => handleSettingChange("language", e.target.value)}
            style={{
              width: "100%",
              padding: "8px 12px",
              background: "#0f1419",
              border: "1px solid #2a3f54",
              borderRadius: "6px",
              color: "white",
              fontSize: "14px",
            }}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="hi">Hindi</option>
          </select>
        </div>

        <div>
          <label
            style={{ display: "block", marginBottom: "8px", fontSize: "14px" }}
          >
            Timezone
          </label>
          <select
            value={settings.timezone}
            onChange={(e) => handleSettingChange("timezone", e.target.value)}
            style={{
              width: "100%",
              padding: "8px 12px",
              background: "#0f1419",
              border: "1px solid #2a3f54",
              borderRadius: "6px",
              color: "white",
              fontSize: "14px",
            }}
          >
            <option value="UTC-5">UTC-5 (Eastern)</option>
            <option value="UTC-6">UTC-6 (Central)</option>
            <option value="UTC-7">UTC-7 (Mountain)</option>
            <option value="UTC-8">UTC-8 (Pacific)</option>
          </select>
        </div>
      </div>

      <div
        style={{
          background: "#1a2332",
          padding: "20px",
          borderRadius: "10px",
          border: "1px solid #2a3f54",
        }}
      >
        <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>
          🔄 Data Refresh
        </h3>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "15px",
          }}
        >
          <label style={{ fontSize: "14px" }}>Auto Refresh</label>
          <button
            onClick={() =>
              handleSettingChange("autoRefresh", !settings.autoRefresh)
            }
            style={{
              background: settings.autoRefresh ? "#00ff88" : "#2a3f54",
              color: settings.autoRefresh ? "#0a0f1a" : "white",
              border: "none",
              padding: "6px 12px",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "12px",
              transition: "all 0.3s ease",
            }}
          >
            {settings.autoRefresh ? "ON" : "OFF"}
          </button>
        </div>

        <div>
          <label
            style={{ display: "block", marginBottom: "8px", fontSize: "14px" }}
          >
            Refresh Interval: {settings.refreshInterval / 1000}s
          </label>
          <input
            type="range"
            min="1000"
            max="30000"
            step="1000"
            value={settings.refreshInterval}
            onChange={(e) =>
              handleSettingChange("refreshInterval", parseInt(e.target.value))
            }
            style={{
              width: "100%",
              height: "6px",
              background: "#2a3f54",
              borderRadius: "3px",
              outline: "none",
              cursor: "pointer",
            }}
          />
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div
        style={{
          background: "#1a2332",
          padding: "20px",
          borderRadius: "10px",
          border: "1px solid #2a3f54",
        }}
      >
        <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>
          📧 Email Notifications
        </h3>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "15px",
          }}
        >
          <label style={{ fontSize: "14px" }}>Email Alerts</label>
          <button
            onClick={() =>
              handleSettingChange(
                "emailNotifications",
                !settings.emailNotifications
              )
            }
            style={{
              background: settings.emailNotifications ? "#00ff88" : "#2a3f54",
              color: settings.emailNotifications ? "#0a0f1a" : "white",
              border: "none",
              padding: "6px 12px",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "12px",
              transition: "all 0.3s ease",
            }}
          >
            {settings.emailNotifications ? "ON" : "OFF"}
          </button>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "15px",
          }}
        >
          <label style={{ fontSize: "14px" }}>Push Notifications</label>
          <button
            onClick={() =>
              handleSettingChange(
                "pushNotifications",
                !settings.pushNotifications
              )
            }
            style={{
              background: settings.pushNotifications ? "#00ff88" : "#2a3f54",
              color: settings.pushNotifications ? "#0a0f1a" : "white",
              border: "none",
              padding: "6px 12px",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "12px",
              transition: "all 0.3s ease",
            }}
          >
            {settings.pushNotifications ? "ON" : "OFF"}
          </button>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "15px",
          }}
        >
          <label style={{ fontSize: "14px" }}>Sound Alerts</label>
          <button
            onClick={() =>
              handleSettingChange("soundEnabled", !settings.soundEnabled)
            }
            style={{
              background: settings.soundEnabled ? "#00ff88" : "#2a3f54",
              color: settings.soundEnabled ? "#0a0f1a" : "white",
              border: "none",
              padding: "6px 12px",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "12px",
              transition: "all 0.3s ease",
            }}
          >
            {settings.soundEnabled ? "ON" : "OFF"}
          </button>
        </div>

        <div>
          <label
            style={{ display: "block", marginBottom: "8px", fontSize: "14px" }}
          >
            Alert Threshold: {settings.alertThreshold}%
          </label>
          <input
            type="range"
            min="50"
            max="100"
            value={settings.alertThreshold}
            onChange={(e) =>
              handleSettingChange("alertThreshold", parseInt(e.target.value))
            }
            style={{
              width: "100%",
              height: "6px",
              background: "#2a3f54",
              borderRadius: "3px",
              outline: "none",
              cursor: "pointer",
            }}
          />
        </div>
      </div>
    </div>
  );

  const renderDisplaySettings = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div
        style={{
          background: "#1a2332",
          padding: "20px",
          borderRadius: "10px",
          border: "1px solid #2a3f54",
        }}
      >
        <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>
          📊 Display Options
        </h3>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "15px",
          }}
        >
          <label style={{ fontSize: "14px" }}>Animations</label>
          <button
            onClick={() =>
              handleSettingChange("showAnimations", !settings.showAnimations)
            }
            style={{
              background: settings.showAnimations ? "#00ff88" : "#2a3f54",
              color: settings.showAnimations ? "#0a0f1a" : "white",
              border: "none",
              padding: "6px 12px",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "12px",
              transition: "all 0.3s ease",
            }}
          >
            {settings.showAnimations ? "ON" : "OFF"}
          </button>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "15px",
          }}
        >
          <label style={{ fontSize: "14px" }}>Compact View</label>
          <button
            onClick={() =>
              handleSettingChange("compactView", !settings.compactView)
            }
            style={{
              background: settings.compactView ? "#00ff88" : "#2a3f54",
              color: settings.compactView ? "#0a0f1a" : "white",
              border: "none",
              padding: "6px 12px",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "12px",
              transition: "all 0.3s ease",
            }}
          >
            {settings.compactView ? "ON" : "OFF"}
          </button>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "15px",
          }}
        >
          <label style={{ fontSize: "14px" }}>Show Tooltips</label>
          <button
            onClick={() =>
              handleSettingChange("showTooltips", !settings.showTooltips)
            }
            style={{
              background: settings.showTooltips ? "#00ff88" : "#2a3f54",
              color: settings.showTooltips ? "#0a0f1a" : "white",
              border: "none",
              padding: "6px 12px",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "12px",
              transition: "all 0.3s ease",
            }}
          >
            {settings.showTooltips ? "ON" : "OFF"}
          </button>
        </div>

        <div>
          <label
            style={{ display: "block", marginBottom: "8px", fontSize: "14px" }}
          >
            Chart Type
          </label>
          <select
            value={settings.chartType}
            onChange={(e) => handleSettingChange("chartType", e.target.value)}
            style={{
              width: "100%",
              padding: "8px 12px",
              background: "#0f1419",
              border: "1px solid #2a3f54",
              borderRadius: "6px",
              color: "white",
              fontSize: "14px",
            }}
          >
            <option value="area">Area Chart</option>
            <option value="line">Line Chart</option>
            <option value="bar">Bar Chart</option>
            <option value="donut">Donut Chart</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div
        style={{
          background: "#1a2332",
          padding: "20px",
          borderRadius: "10px",
          border: "1px solid #2a3f54",
        }}
      >
        <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>
          🔐 Privacy Controls
        </h3>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "15px",
          }}
        >
          <label style={{ fontSize: "14px" }}>Share Analytics</label>
          <button
            onClick={() =>
              handleSettingChange("shareAnalytics", !settings.shareAnalytics)
            }
            style={{
              background: settings.shareAnalytics ? "#00ff88" : "#2a3f54",
              color: settings.shareAnalytics ? "#0a0f1a" : "white",
              border: "none",
              padding: "6px 12px",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "12px",
              transition: "all 0.3s ease",
            }}
          >
            {settings.shareAnalytics ? "ON" : "OFF"}
          </button>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "15px",
          }}
        >
          <label style={{ fontSize: "14px" }}>Location Tracking</label>
          <button
            onClick={() =>
              handleSettingChange(
                "locationTracking",
                !settings.locationTracking
              )
            }
            style={{
              background: settings.locationTracking ? "#00ff88" : "#2a3f54",
              color: settings.locationTracking ? "#0a0f1a" : "white",
              border: "none",
              padding: "6px 12px",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "12px",
              transition: "all 0.3s ease",
            }}
          >
            {settings.locationTracking ? "ON" : "OFF"}
          </button>
        </div>

        <div>
          <label
            style={{ display: "block", marginBottom: "8px", fontSize: "14px" }}
          >
            Data Retention: {settings.dataRetention} days
          </label>
          <input
            type="range"
            min="7"
            max="365"
            value={settings.dataRetention}
            onChange={(e) =>
              handleSettingChange("dataRetention", parseInt(e.target.value))
            }
            style={{
              width: "100%",
              height: "6px",
              background: "#2a3f54",
              borderRadius: "3px",
              outline: "none",
              cursor: "pointer",
            }}
          />
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div
        style={{
          background: "#1a2332",
          padding: "20px",
          borderRadius: "10px",
          border: "1px solid #2a3f54",
        }}
      >
        <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>
          🛡️ Security Settings
        </h3>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "15px",
          }}
        >
          <label style={{ fontSize: "14px" }}>Two-Factor Authentication</label>
          <button
            onClick={() =>
              handleSettingChange("twoFactorAuth", !settings.twoFactorAuth)
            }
            style={{
              background: settings.twoFactorAuth ? "#00ff88" : "#2a3f54",
              color: settings.twoFactorAuth ? "#0a0f1a" : "white",
              border: "none",
              padding: "6px 12px",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "12px",
              transition: "all 0.3s ease",
            }}
          >
            {settings.twoFactorAuth ? "ON" : "OFF"}
          </button>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "15px",
          }}
        >
          <label style={{ fontSize: "14px" }}>Login Alerts</label>
          <button
            onClick={() =>
              handleSettingChange("loginAlerts", !settings.loginAlerts)
            }
            style={{
              background: settings.loginAlerts ? "#00ff88" : "#2a3f54",
              color: settings.loginAlerts ? "#0a0f1a" : "white",
              border: "none",
              padding: "6px 12px",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "12px",
              transition: "all 0.3s ease",
            }}
          >
            {settings.loginAlerts ? "ON" : "OFF"}
          </button>
        </div>

        <div>
          <label
            style={{ display: "block", marginBottom: "8px", fontSize: "14px" }}
          >
            Session Timeout: {settings.sessionTimeout} minutes
          </label>
          <input
            type="range"
            min="5"
            max="120"
            value={settings.sessionTimeout}
            onChange={(e) =>
              handleSettingChange("sessionTimeout", parseInt(e.target.value))
            }
            style={{
              width: "100%",
              height: "6px",
              background: "#2a3f54",
              borderRadius: "3px",
              outline: "none",
              cursor: "pointer",
            }}
          />
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return renderGeneralSettings();
      case "notifications":
        return renderNotificationSettings();
      case "display":
        return renderDisplaySettings();
      case "privacy":
        return renderPrivacySettings();
      case "security":
        return renderSecuritySettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <DashboardLayout>
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
            marginBottom: "30px",
            background: "rgba(26, 35, 50, 0.8)",
            padding: "20px",
            borderRadius: "15px",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <h1
            style={{
              color: "#00ff88",
              marginBottom: "5px",
              fontSize: "32px",
              fontWeight: "bold",
              textShadow: "0 0 20px rgba(0, 255, 136, 0.5)",
            }}
          >
            Settings
          </h1>
          <p style={{ color: "#888", fontSize: "14px" }}>
            Configure your dashboard preferences and account settings
          </p>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "30px",
            background: "#1a2332",
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #2a3f54",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? "#00ff88" : "transparent",
                color: activeTab === tab.id ? "#0a0f1a" : "#888",
                border: "none",
                padding: "10px 15px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: activeTab === tab.id ? "bold" : "normal",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ marginBottom: "30px" }}>{renderTabContent()}</div>

        {/* Save Button */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            background: "#1a2332",
            padding: "20px",
            borderRadius: "10px",
            border: "1px solid #2a3f54",
          }}
        >
          <button
            style={{
              background: "#2a3f54",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              transition: "all 0.3s ease",
            }}
          >
            Reset to Default
          </button>
          <button
            style={{
              background: "#00ff88",
              color: "#0a0f1a",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold",
              transition: "all 0.3s ease",
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
