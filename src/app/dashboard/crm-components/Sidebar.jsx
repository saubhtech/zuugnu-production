// Sidebar.jsx
"use client";

export default function Sidebar({ active, onChange }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "career-choice", label: "Career Choice", icon: "🎯" },
    // { id: "leads", label: "Leads", icon: "👥" },
    // { id: "campaigns", label: "Campaigns", icon: "📣" },
    // { id: "messages", label: "Messages", icon: "💬" },
    // { id: "team", label: "Team", icon: "👨‍👩‍👧‍👦" },
    // { id: "analytics", label: "Analytics", icon: "📈" },
    // { id: "templates", label: "Templates", icon: "📄" },
    // { id: "automation", label: "Automation", icon: "🤖" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <aside style={styles.sidebar}>
      <div style={styles.logo}>💚 WhatsApp CRM</div>

      <nav style={styles.nav}>
        {menuItems.map((item) => {
          const isActive = active === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              style={{
                ...styles.item,
                backgroundColor: isActive ? "#1e293b" : "transparent",
                color: isActive ? "#ffffff" : "#cbd5f5",
                fontWeight: isActive ? "600" : "500",
              }}
            >
              <span style={styles.icon}>{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: "250px",
    backgroundColor: "#0f172a",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    overflowY: "auto", // Allow sidebar to scroll if needed
  },
  logo: {
    padding: "20px",
    fontSize: "1.3rem",
    fontWeight: "700",
    textAlign: "center",
    borderBottom: "1px solid #1e293b",
    color: "#22c55e",
  },
  nav: {
    flex: 1,
    overflowY: "auto",
  },
  item: {
    width: "100%",
    padding: "14px 18px",
    border: "none",
    background: "transparent",
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "all 0.2s ease",
  },
  icon: {
    fontSize: "1.2rem",
  },
};
