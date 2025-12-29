export default function Automation() {
  return (
    <div className="content">
      <h1>🤖 Automation</h1>
      <p>Automate WhatsApp workflows.</p>

      <div style={card}>
        <p>No automations configured.</p>
        <button style={btn}>⚙️ Create Automation</button>
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
  background: "#ec4899",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};
