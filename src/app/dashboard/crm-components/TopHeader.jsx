"use client";

export default function TopHeader({ user, onLogout }) {
  return (
    <header style={styles.header}>
      <div style={styles.headerContent}>
        <div>
          <h2 style={styles.title}>
            👋 Welcome, {user?.name || "User"}
          </h2>
          <p style={styles.subtitle}>
            Manage your WhatsApp CRM from here
          </p>
        </div>

        <button onClick={onLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </header>
  );
}

const styles = {
  header: {
    position: "fixed", // Make header fixed
    top: 0,
    left: 0,
    right: 0,
    height: "70px",
    background: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    zIndex: 100, // Ensure it stays on top
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)", // Optional: add shadow for separation
  },
  headerContent: {
    height: "100%",
    padding: "0 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "100%",
  },
  title: {
    margin: 0,
    fontSize: "1.3rem",
    color: "#0f172a",
  },
  subtitle: {
    margin: 0,
    fontSize: "0.9rem",
    color: "#64748b",
  },
  logoutBtn: {
    padding: "10px 18px",
    background: "green",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "0.95rem",
    cursor: "pointer",
    fontWeight: "600",
  },
};