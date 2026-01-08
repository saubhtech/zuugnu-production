export default function DashboardTab() {
  return (
    <div className="admin-dash-wrap">

      <h1 className="page-title">Admin Dashboard</h1>
      <p className="page-sub">Platform overview and key metrics</p>

      {/* KPI Boxes */}
      <div className="kpi-grid">
        <div className="kpi-box">
          <div className="kpi-icon purple">💼</div>
          <div className="kpi-title">Total Clients</div>
          <div className="kpi-value">60</div>
          <div className="kpi-sub green">+5 this month</div>
        </div>

        <div className="kpi-box">
          <div className="kpi-icon pink">👤</div>
          <div className="kpi-title">Consultants</div>
          <div className="kpi-value">24</div>
          <div className="kpi-sub gray">Active</div>
        </div>

        <div className="kpi-box">
          <div className="kpi-icon peach">🎨</div>
          <div className="kpi-title">Creators</div>
          <div className="kpi-value">150</div>
          <div className="kpi-sub green">142 active</div>
        </div>

        <div className="kpi-box">
          <div className="kpi-icon green-bg">📁</div>
          <div className="kpi-title">Active Projects</div>
          <div className="kpi-value">47</div>
          <div className="kpi-sub gray">Running</div>
        </div>

        <div className="kpi-box">
          <div className="kpi-icon yellow">🛡️</div>
          <div className="kpi-title">Escrow Total</div>
          <div className="kpi-value">$127K</div>
        </div>
      </div>

      {/* Graph Panels */}
      <div className="panel-row">
        <div className="panel">
          <div className="panel-header">
            <strong>Platform Activity</strong>
          </div>
          <div className="chart-placeholder">📈 Chart</div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <strong>Revenue Overview</strong>
          </div>
          <div className="chart-placeholder">📉 Chart</div>
        </div>
      </div>

    </div>
  );
}
