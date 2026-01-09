"use client";

export default function EarningsTab() {
  return (
    <div className="creator-tab">

      {/* HEADER */}
      <h1 className="page-title">My Earnings</h1>
      <p className="page-sub">
        Track your payments from completed and approved assignments
      </p>

      {/* SUMMARY CARDS */}
      <div className="earn-summary-grid">
        
        <div className="earn-summary-card">
          <small>Total Earned (Lifetime)</small>
          <h2 className="green">$3,240</h2>
          <span className="muted">Across 42 assignments</span>
        </div>

        <div className="earn-summary-card">
          <small>Pending Payout</small>
          <h2 className="yellow">$400</h2>
          <span className="muted">2 assignments approved by client</span>
        </div>

        <div className="earn-summary-card">
          <small>Last Payout</small>
          <h2>$200</h2>
          <span className="muted">Jan 1, 2026</span>
        </div>

      </div>

      {/* PAYOUT TABLE */}
      <table className="nice-table mt30">
        <thead>
          <tr>
            <th>Assignment</th>
            <th>Project</th>
            <th>Consultant</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              Instagram Reel - Nike Air
              <br />
              <small className="muted">ID: ASG-001</small>
            </td>
            <td>Nike Summer Campaign</td>
            <td>John Smith</td>
            <td className="green">$150</td>
            <td className="bold">Pending Payout</td>
            <td>Jan 8, 2026</td>
          </tr>

          <tr>
            <td>
              Facebook Post - Winter Collection
              <br />
              <small className="muted">ID: ASG-002</small>
            </td>
            <td>Fashion Winter Campaign</td>
            <td>Sarah Lee</td>
            <td className="green">$80</td>
            <td className="green bold">Paid</td>
            <td>Jan 1, 2026</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
