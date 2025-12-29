export default function Campaigns() {
  return (
    <div className="content">
      <h1>📣 Campaigns</h1>
      <p>Create and manage WhatsApp campaigns.</p>

      <div style={card}>
        <p>No campaigns created.</p>
        <button style={btn}>🚀 Create Campaign</button>
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
  background: "#6366f1",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};
