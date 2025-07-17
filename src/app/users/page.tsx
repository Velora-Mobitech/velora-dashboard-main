import DashboardLayout from "@/components/DashboardLayout";

export default function UsersPage() {
  return (
    <DashboardLayout>
      <div
        style={{
          padding: "20px",
          color: "white",
          background: "#0a0f1a",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1
            style={{ color: "#00ff88", fontSize: "32px", marginBottom: "20px" }}
          >
            👥 User Management
          </h1>
          <p style={{ color: "#888", fontSize: "18px" }}>
            User management and administration features coming soon...
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
