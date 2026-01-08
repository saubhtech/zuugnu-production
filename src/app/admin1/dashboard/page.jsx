export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">

      <div className="page-header">
        <h1>Admin Dashboard</h1>
        <p>Platform overview and key metrics</p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stats-card">
          <div className="icon icon-blue">💼</div>
          <div className="label">Total Clients</div>
          <div className="value">60</div>
          <div className="sub green">+5 this month</div>
        </div>

        <div className="stats-card">
          <div className="icon icon-purple">👤</div>
          <div className="label">Consultants</div>
          <div className="value">24</div>
          <div className="sub">Active</div>
        </div>

        <div className="stats-card">
          <div className="icon icon-pink">🎨</div>
          <div className="label">Creators</div>
          <div className="value">150</div>
          <div className="sub green">142 active</div>
        </div>

        <div className="stats-card">
          <div className="icon icon-green">📂</div>
          <div className="label">Active Projects</div>
          <div className="value">47</div>
          <div className="sub">Running</div>
        </div>

        <div className="stats-card">
          <div className="icon icon-yellow">🛡</div>
          <div className="label">Escrow Total</div>
          <div className="value">$127K</div>
        </div>
      </div>

      {/* Charts */}
      <div className="section-card">
        <div className="section-header">Platform Activity</div>
        <div className="chart-placeholder">Chart Placeholder</div>
      </div>

      <div className="section-card">
        <div className="section-header">Revenue Overview</div>
        <div className="chart-placeholder">Chart Placeholder</div>
      </div>

    </div>
  );
}
