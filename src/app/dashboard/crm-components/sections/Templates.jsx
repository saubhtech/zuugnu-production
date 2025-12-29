export default function Templates() {
  return (
    <div className="content">
      <h1>📄 Message Templates</h1>
      <p>Create reusable WhatsApp message templates.</p>

      <div style={card}>
        <p>No templates created.</p>
        <button style={btn}>➕ Create Template</button>
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
  background: "#f59e0b",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};
