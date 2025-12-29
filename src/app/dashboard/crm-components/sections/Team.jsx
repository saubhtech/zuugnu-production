export default function Team() {
  return (
    <div className="content">
      <h1>👨‍👩‍👧‍👦 Team</h1>
      <p>Manage your CRM team members.</p>

      <div style={card}>
        <p>No team members added.</p>
        <button style={btn}>➕ Add Member</button>
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
  background: "#0ea5e9",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};
