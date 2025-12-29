export default function Analytics() {
  return (
    <div className="content">
      <h1>📈 Analytics</h1>
      <p>Track WhatsApp performance metrics.</p>

      <div style={grid}>
        <Stat title="Messages Sent" value="0" />
        <Stat title="Replies Received" value="0" />
        <Stat title="Conversion Rate" value="0%" />
      </div>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div style={stat}>
      <p>{title}</p>
      <h2>{value}</h2>
    </div>
  );
}

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px",
  marginTop: "20px",
};

const stat = {
  background: "#ffffff",
  color: "white", 
  padding: "20px",
  borderRadius: "12px",
};
