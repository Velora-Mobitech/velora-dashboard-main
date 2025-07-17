"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/employee");
  }, [router]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#0a0f1a",
        color: "#00ff88",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1>Velora Dashboard</h1>
        <p>Redirecting to Employee Dashboard...</p>
      </div>
    </div>
  );
}
