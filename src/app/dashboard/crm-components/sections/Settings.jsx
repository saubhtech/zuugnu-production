export default function Settings() {
  return (
    <div className="content">
      <h1>⚙️ Settings</h1>
      <p>Configure your WhatsApp CRM settings.</p>

      <div style={card}>
        <p>Profile, WhatsApp API, notifications, security.</p>
        <button style={btn}>Save Settings</button>
      </div>
    </div>
  );
}

const card = {
  background: "#ffffff",
  padding: "24px",
  borderRadius: "12px",
  marginTop: "20px",
};

const btn = {
  padding: "10px 16px",
  color: "white", 
  background: "#64748b",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};
