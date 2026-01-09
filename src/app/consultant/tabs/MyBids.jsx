"use client";

export default function MyBids() {
  return (
    <div className="bids-container">

      <h1 className="bids-title">My Bids & Proposals</h1>
      <p className="bids-sub">Track the status of your submitted bids</p>

      {/* Search + Filter */}
      <div className="bids-top">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input placeholder="Search my bids..." />
        </div>

        <select className="status-select">
          <option>All Status</option>
          <option>Pending</option>
          <option>Accepted</option>
          <option>Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="bids-table">
        <table>
          <thead>
            <tr>
              <th>Project</th>
              <th>Your Bid</th>
              <th>Client Budget</th>
              <th>Submitted On</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <b>Adidas Brand Awareness Campaign</b>
                <div className="row-id">ID: PRO-002</div>
              </td>
              <td>$8,000</td>
              <td>$8,500</td>
              <td>Jan 2, 2026</td>
              <td><span className="status pending">Pending</span></td>
              <td><span className="action-link">View Proposal</span></td>
            </tr>

            <tr>
              <td>
                <b>Eco-Friendly Product Launch</b>
                <div className="row-id">ID: PRO-003</div>
              </td>
              <td>$3,800</td>
              <td>$4,000</td>
              <td>Jan 1, 2026</td>
              <td><span className="status accepted">Accepted</span></td>
              <td><span className="action-link">View Project</span></td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
