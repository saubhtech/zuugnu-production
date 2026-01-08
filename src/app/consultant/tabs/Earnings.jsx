"use client";

export default function EarningsTab() {
  return (
    <div>
      <h1 className="page-title">Earnings & Payments</h1>
      <p className="page-sub">Track campaign payments & escrow releases</p>

      <div className="stats-4">
        <div className="stat-card">
          <small>Total Managed Payouts</small>
          <h2 className="green">$84,200</h2>
          <p className="text-mini">Across 128 assignments</p>
        </div>
        <div className="stat-card">
          <small>Pending Release</small>
          <h2 className="yellow">$5,400</h2>
          <p className="text-mini">Awaiting brand approval</p>
        </div>
        <div className="stat-card">
          <small>Released This Month</small>
          <h2>$12,800</h2>
          <p className="text-mini text-green">↑ +18%</p>
        </div>
        <div className="stat-card">
          <small>Lifetime Escrow</small>
          <h2 className="blue">$182,400</h2>
          <p className="text-mini">All campaigns</p>
        </div>
      </div>

      <table className="nice-table">
        <thead>
          <tr>
            <th>Campaign</th>
            <th>Creator</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Released</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Nike Summer Campaign</td>
            <td>Sarah Chen</td>
            <td className="green">$450</td>
            <td><span className="badge paid">Released</span></td>
            <td>Jan 7</td>
          </tr>
          <tr>
            <td>Adidas Boost Launch</td>
            <td>John Lee</td>
            <td className="green">$250</td>
            <td><span className="badge pending">Pending</span></td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
