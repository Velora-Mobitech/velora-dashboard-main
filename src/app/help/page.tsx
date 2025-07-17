"use client";
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

const HelpPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("faq");
  const [searchTerm, setSearchTerm] = useState("");
  const [supportForm, setSupportForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    priority: "medium",
  });

  const tabs = [
    { id: "faq", label: "FAQ", icon: "❓" },
    { id: "guide", label: "User Guide", icon: "📖" },
    { id: "support", label: "Contact Support", icon: "📞" },
    { id: "resources", label: "Resources", icon: "📚" },
  ];

  const faqData = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I access the dashboard?",
          answer:
            "You can access the dashboard by logging into your Velora account and navigating to the dashboard section. The dashboard is available 24/7 and can be accessed from any device with internet connectivity.",
        },
        {
          question: "What are the system requirements?",
          answer:
            "Velora Dashboard works on modern web browsers including Chrome, Firefox, Safari, and Edge. For optimal performance, we recommend using the latest browser version with JavaScript enabled.",
        },
        {
          question: "How do I customize my dashboard?",
          answer:
            "Go to Settings > Display to customize your dashboard appearance, chart types, and layout preferences. You can also rearrange widgets by dragging and dropping them.",
        },
      ],
    },
    {
      category: "Performance & Monitoring",
      questions: [
        {
          question: "How is performance data calculated?",
          answer:
            "Performance metrics are calculated based on real-time data from your connected devices and systems. The dashboard updates every 5 seconds by default, which you can adjust in Settings.",
        },
        {
          question: "What do the color indicators mean?",
          answer:
            "Green indicates optimal performance (>80%), yellow indicates moderate performance (60-80%), and red indicates poor performance (<60%). These thresholds can be customized in Settings.",
        },
        {
          question: "How do I set up alerts?",
          answer:
            "Navigate to Settings > Notifications to configure email and push notification alerts. You can set custom thresholds for various performance metrics.",
        },
      ],
    },
    {
      category: "Account & Security",
      questions: [
        {
          question: "How do I change my password?",
          answer:
            "Go to Settings > Security and click on 'Change Password'. You'll need to enter your current password and your new password twice for confirmation.",
        },
        {
          question: "What is two-factor authentication?",
          answer:
            "Two-factor authentication adds an extra layer of security to your account. When enabled, you'll need to enter a code from your phone in addition to your password when logging in.",
        },
        {
          question: "How do I manage my privacy settings?",
          answer:
            "Visit Settings > Privacy to control data sharing, location tracking, and data retention preferences. You can also download or delete your data from this section.",
        },
      ],
    },
  ];

  const userGuideData = [
    {
      title: "Dashboard Overview",
      content:
        "The main dashboard provides a comprehensive view of your system performance, including real-time metrics, charts, and key performance indicators.",
      steps: [
        "Navigate to the main dashboard from the sidebar",
        "Review key metrics in the top cards",
        "Analyze performance trends in the charts",
        "Monitor alerts and notifications",
      ],
    },
    {
      title: "Employee Dashboard",
      content:
        "Track individual employee performance, battery levels, earnings, and productivity metrics in real-time.",
      steps: [
        "Access the Employee Dashboard from the sidebar",
        "View current battery level and charging status",
        "Monitor daily and weekly earnings",
        "Check performance metrics and efficiency scores",
      ],
    },
    {
      title: "Backend Monitoring",
      content:
        "Monitor system health, server performance, and backend operations to ensure optimal functionality.",
      steps: [
        "Open the Backend Dashboard",
        "Check server status and uptime",
        "Monitor CPU, memory, and disk usage",
        "Review system logs and error reports",
      ],
    },
    {
      title: "Company Analytics",
      content:
        "Analyze business performance, revenue trends, and company-wide metrics for strategic decision making.",
      steps: [
        "Navigate to Company Dashboard",
        "Review revenue and profit charts",
        "Analyze team performance metrics",
        "Monitor business KPIs and goals",
      ],
    },
  ];

  const filteredFAQ = faqData
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  const handleSupportFormChange = (key: string, value: string) => {
    setSupportForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmitSupport = () => {
    // Handle form submission
    alert(
      "Support ticket submitted successfully! We'll get back to you within 24 hours."
    );
    setSupportForm({
      name: "",
      email: "",
      subject: "",
      message: "",
      priority: "medium",
    });
  };

  const renderFAQ = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Search */}
      <div
        style={{
          background: "#1a2332",
          padding: "20px",
          borderRadius: "10px",
          border: "1px solid #2a3f54",
        }}
      >
        <input
          type="text"
          placeholder="Search FAQ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            background: "#0f1419",
            border: "1px solid #2a3f54",
            borderRadius: "6px",
            color: "white",
            fontSize: "14px",
          }}
        />
      </div>

      {/* FAQ Categories */}
      {filteredFAQ.map((category, categoryIndex) => (
        <div
          key={categoryIndex}
          style={{
            background: "#1a2332",
            padding: "20px",
            borderRadius: "10px",
            border: "1px solid #2a3f54",
          }}
        >
          <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>
            {category.category}
          </h3>
          {category.questions.map((qa, index) => (
            <div key={index} style={{ marginBottom: "15px" }}>
              <h4
                style={{
                  color: "white",
                  marginBottom: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                {qa.question}
              </h4>
              <p
                style={{
                  color: "#ccc",
                  fontSize: "14px",
                  lineHeight: "1.5",
                  paddingLeft: "15px",
                  borderLeft: "2px solid #00ff88",
                }}
              >
                {qa.answer}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  const renderUserGuide = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {userGuideData.map((guide, index) => (
        <div
          key={index}
          style={{
            background: "#1a2332",
            padding: "20px",
            borderRadius: "10px",
            border: "1px solid #2a3f54",
          }}
        >
          <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>
            {guide.title}
          </h3>
          <p style={{ color: "#ccc", marginBottom: "15px", fontSize: "14px" }}>
            {guide.content}
          </p>
          <h4
            style={{ color: "white", marginBottom: "10px", fontSize: "16px" }}
          >
            Steps:
          </h4>
          <ol style={{ color: "#ccc", paddingLeft: "20px" }}>
            {guide.steps.map((step, stepIndex) => (
              <li
                key={stepIndex}
                style={{ marginBottom: "5px", fontSize: "14px" }}
              >
                {step}
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );

  const renderSupport = () => (
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
          📞 Contact Support
        </h3>
        <p style={{ color: "#ccc", marginBottom: "20px", fontSize: "14px" }}>
          Need help? Fill out the form below and our support team will get back
          to you within 24 hours.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "15px",
            marginBottom: "15px",
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontSize: "14px",
              }}
            >
              Name
            </label>
            <input
              type="text"
              value={supportForm.name}
              onChange={(e) => handleSupportFormChange("name", e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                background: "#0f1419",
                border: "1px solid #2a3f54",
                borderRadius: "6px",
                color: "white",
                fontSize: "14px",
              }}
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontSize: "14px",
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={supportForm.email}
              onChange={(e) => handleSupportFormChange("email", e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                background: "#0f1419",
                border: "1px solid #2a3f54",
                borderRadius: "6px",
                color: "white",
                fontSize: "14px",
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "15px",
            marginBottom: "15px",
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontSize: "14px",
              }}
            >
              Subject
            </label>
            <input
              type="text"
              value={supportForm.subject}
              onChange={(e) =>
                handleSupportFormChange("subject", e.target.value)
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
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontSize: "14px",
              }}
            >
              Priority
            </label>
            <select
              value={supportForm.priority}
              onChange={(e) =>
                handleSupportFormChange("priority", e.target.value)
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
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}
          >
            Message
          </label>
          <textarea
            value={supportForm.message}
            onChange={(e) => handleSupportFormChange("message", e.target.value)}
            rows={6}
            style={{
              width: "100%",
              padding: "8px 12px",
              background: "#0f1419",
              border: "1px solid #2a3f54",
              borderRadius: "6px",
              color: "white",
              fontSize: "14px",
              resize: "vertical",
            }}
            placeholder="Describe your issue or question in detail..."
          />
        </div>

        <button
          onClick={handleSubmitSupport}
          style={{
            background: "#00ff88",
            color: "#0a0f1a",
            border: "none",
            padding: "12px 24px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "bold",
            transition: "all 0.3s ease",
          }}
        >
          Submit Support Request
        </button>
      </div>

      {/* Contact Information */}
      <div
        style={{
          background: "#1a2332",
          padding: "20px",
          borderRadius: "10px",
          border: "1px solid #2a3f54",
        }}
      >
        <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>
          Other Ways to Reach Us
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "15px",
          }}
        >
          <div>
            <h4
              style={{ color: "white", marginBottom: "5px", fontSize: "16px" }}
            >
              📧 Email
            </h4>
            <p style={{ color: "#ccc", fontSize: "14px" }}>
              support@velora.com
            </p>
          </div>
          <div>
            <h4
              style={{ color: "white", marginBottom: "5px", fontSize: "16px" }}
            >
              📞 Phone
            </h4>
            <p style={{ color: "#ccc", fontSize: "14px" }}>+1 (555) 123-4567</p>
          </div>
          <div>
            <h4
              style={{ color: "white", marginBottom: "5px", fontSize: "16px" }}
            >
              💬 Live Chat
            </h4>
            <p style={{ color: "#ccc", fontSize: "14px" }}>Available 24/7</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderResources = () => (
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
          📚 Documentation & Resources
        </h3>
        <div style={{ display: "grid", gap: "15px" }}>
          <div
            style={{
              background: "#0f1419",
              padding: "15px",
              borderRadius: "8px",
              border: "1px solid #2a3f54",
            }}
          >
            <h4
              style={{ color: "white", marginBottom: "8px", fontSize: "16px" }}
            >
              📖 API Documentation
            </h4>
            <p
              style={{ color: "#ccc", fontSize: "14px", marginBottom: "10px" }}
            >
              Complete API reference for developers and integrations
            </p>
            <button
              style={{
                background: "#00ff88",
                color: "#0a0f1a",
                border: "none",
                padding: "6px 12px",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              View Documentation
            </button>
          </div>

          <div
            style={{
              background: "#0f1419",
              padding: "15px",
              borderRadius: "8px",
              border: "1px solid #2a3f54",
            }}
          >
            <h4
              style={{ color: "white", marginBottom: "8px", fontSize: "16px" }}
            >
              🎥 Video Tutorials
            </h4>
            <p
              style={{ color: "#ccc", fontSize: "14px", marginBottom: "10px" }}
            >
              Step-by-step video guides for common tasks
            </p>
            <button
              style={{
                background: "#00ff88",
                color: "#0a0f1a",
                border: "none",
                padding: "6px 12px",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              Watch Tutorials
            </button>
          </div>

          <div
            style={{
              background: "#0f1419",
              padding: "15px",
              borderRadius: "8px",
              border: "1px solid #2a3f54",
            }}
          >
            <h4
              style={{ color: "white", marginBottom: "8px", fontSize: "16px" }}
            >
              🔧 Troubleshooting Guide
            </h4>
            <p
              style={{ color: "#ccc", fontSize: "14px", marginBottom: "10px" }}
            >
              Solutions for common issues and error messages
            </p>
            <button
              style={{
                background: "#00ff88",
                color: "#0a0f1a",
                border: "none",
                padding: "6px 12px",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              View Guide
            </button>
          </div>

          <div
            style={{
              background: "#0f1419",
              padding: "15px",
              borderRadius: "8px",
              border: "1px solid #2a3f54",
            }}
          >
            <h4
              style={{ color: "white", marginBottom: "8px", fontSize: "16px" }}
            >
              🚀 What&apos;s New
            </h4>
            <p
              style={{ color: "#ccc", fontSize: "14px", marginBottom: "10px" }}
            >
              Latest features, updates, and release notes
            </p>
            <button
              style={{
                background: "#00ff88",
                color: "#0a0f1a",
                border: "none",
                padding: "6px 12px",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              View Updates
            </button>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div
        style={{
          background: "#1a2332",
          padding: "20px",
          borderRadius: "10px",
          border: "1px solid #2a3f54",
        }}
      >
        <h3 style={{ color: "#00ff88", marginBottom: "15px" }}>
          📊 System Status
        </h3>
        <div style={{ display: "grid", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#00ff88",
              }}
            ></div>
            <span style={{ color: "white", fontSize: "14px" }}>
              Dashboard Services
            </span>
            <span
              style={{ color: "#00ff88", fontSize: "12px", marginLeft: "auto" }}
            >
              Operational
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#00ff88",
              }}
            ></div>
            <span style={{ color: "white", fontSize: "14px" }}>
              API Services
            </span>
            <span
              style={{ color: "#00ff88", fontSize: "12px", marginLeft: "auto" }}
            >
              Operational
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#00ff88",
              }}
            ></div>
            <span style={{ color: "white", fontSize: "14px" }}>Database</span>
            <span
              style={{ color: "#00ff88", fontSize: "12px", marginLeft: "auto" }}
            >
              Operational
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "faq":
        return renderFAQ();
      case "guide":
        return renderUserGuide();
      case "support":
        return renderSupport();
      case "resources":
        return renderResources();
      default:
        return renderFAQ();
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
            Help & Support
          </h1>
          <p style={{ color: "#888", fontSize: "14px" }}>
            Get help, find answers, and connect with our support team
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
        <div>{renderTabContent()}</div>
      </div>
    </DashboardLayout>
  );
};

export default HelpPage;
