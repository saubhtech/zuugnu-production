export default function Leads() {
  return (
    <div className="content">
      <h1>👥 Leads</h1>
      <p>Manage and view all your WhatsApp leads here.</p>

      <div style={box}>
        <p>No leads available yet.</p>
        <button style={btn}>➕ Add Lead</button>
      </div>
    </div>
  );
}

const box = {
  background: "#ffffff",
  padding: "24px",
  borderRadius: "12px",
  marginTop: "20px",
};

const btn = {
  marginTop: "10px",
  color: "white", 
  padding: "10px 16px",
  background: "#22c55e",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};
