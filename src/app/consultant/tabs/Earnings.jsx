"use client";

export default function Earnings() {
  return (
    <div className="earn-container">

      <h1 className="earn-title">Earnings & Escrow</h1>
      <p className="earn-sub">
        Track your project earnings and managed escrow funds
      </p>

      {/* ===== Earning Summary Cards ===== */}
      <div className="earn-cards">
        <div className="earn-card">
          <small>Total Earned</small>
          <h2 className="green">$45,200</h2>
          <p className="mini">All time</p>
        </div>

        <div className="earn-card">
          <small>Pending Payout</small>
          <h2 className="yellow">$5,000</h2>
          <p className="mini">1 project approved by client</p>
        </div>

        <div className="earn-card">
          <small>Earnest Money Held</small>
          <h2 className="purple">$1,200</h2>
          <p className="mini">Across 2 active bids</p>
        </div>
      </div>

      {/* ===== Earnings Table ===== */}
      <div className="earn-table">
        <table>
          <thead>
            <tr>
              <th>Project</th>
              <th>Client</th>
              <th>Your Bid</th>
              <th>Status</th>
              <th>Last Update</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <b>Nike Summer Campaign</b>
                <div className="mini-label">ID: PRO-001</div>
              </td>
              <td>Nike Inc.</td>
              <td className="green">$5,000</td>
              <td><span className="status approved">Client Approved</span></td>
              <td>Jan 8, 2026</td>
              <td><span className="action-link">Request Payout</span></td>
            </tr>

            <tr>
              <td>
                <b>Eco-Friendly Product Launch</b>
                <div className="mini-label">ID: PRO-003</div>
              </td>
              <td>Green Solutions Co.</td>
              <td className="green">$3,800</td>
              <td><span className="status progress">In Progress</span></td>
              <td>Jan 7, 2026</td>
              <td><span className="action-link">View Progress</span></td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
