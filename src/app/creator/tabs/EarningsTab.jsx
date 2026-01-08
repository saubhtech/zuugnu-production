// /creator/tabs/EarningsTab.jsx
"use client";



export default function EarningsTab() {
  return (
    <div className="creator-tab">
      <h1 className="page-title">My Earnings</h1>
      <p className="page-sub">Track your payments from completed assignments</p>

      <div className="earn-grid">
        <div className="earn-card">
          <small>Total Earned (Lifetime)</small>
          <h2 className="green">$3,240</h2>
          <p className="muted">Across 42 assignments</p>
        </div>

        <div className="earn-card">
          <small>Pending Payout</small>
          <h2 className="yellow">$400</h2>
          <p className="muted">2 assignments approved</p>
        </div>

        <div className="earn-card">
          <small>Last Payout</small>
          <h2>$200</h2>
          <p className="muted">Jan 1, 2026</p>
        </div>
      </div>

      <table className="nice-table mt20">
        <thead>
          <tr>
            <th>Assignment</th><th>Project</th><th>Consultant</th><th>Amount</th><th>Status</th><th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Instagram Reel - Nike Air <br/><small>ID: ASG-001</small></td>
            <td>Nike Summer Campaign</td>
            <td>John Smith</td>
            <td className="green">$150</td>
            <td><b>Pending Payout</b></td>
            <td>Jan 8, 2026</td>
          </tr>

          <tr>
            <td>Facebook Post - Winter Collection <br/><small>ID: ASG-002</small></td>
            <td>Fashion Winter</td>
            <td>Sarah Lee</td>
            <td className="green">$80</td>
            <td><span className="green">Paid</span></td>
            <td>Jan 1, 2026</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
