"use client";

export default function EscrowPaymentsTab() {
  return (
    <div className="escrow-wrap">

      <h1 className="page-title">Escrow & Payments</h1>
      <p className="page-sub">Overview of your funded escrows and payment history</p>

      <div className="stats-row">
        <div className="stat-box">
          <small>Total In Escrow</small>
          <h2 className="green">$32,500</h2>
          <p className="muted">Across 5 projects</p>
        </div>

        <div className="stat-box">
          <small>Funds Released</small>
          <h2>$18,200</h2>
          <p className="muted">This quarter</p>
        </div>

        <div className="stat-box">
          <small>Pending Payouts</small>
          <h2 className="yellow">$5,000</h2>
          <p className="muted">1 project pending</p>
        </div>
      </div>

      <div className="escrow-table-container">
        <table className="nice-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Consultant</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr className="bottom-table-row">
              <td>
                Nike Summer Campaign
                <small>ID: PRO-001</small>
              </td>
              <td>John Smith</td>
              <td className="green">$5,000</td>
              <td><b>Funded</b></td>
              <td>Jan 1, 2026</td>
              <td><span className="link">View</span></td>
            </tr>

            <tr className="bottom-table-row">
              <td>
                Adidas Brand Awareness
                <small>ID: PRO-002</small>
              </td>
              <td>-</td>
              <td className="yellow">$8,500</td>
              <td><b>Pending Funding</b></td>
              <td>Dec 28, 2025</td>
              <td><span className="link">Fund</span></td>
            </tr>

          </tbody>
        </table>
      </div>

    </div>
  );
}
