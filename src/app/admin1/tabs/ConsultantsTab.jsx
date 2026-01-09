"use client";

export default function ConsultantsTab() {
  return (
    <div className="consultants-container">

      <h1 className="page-title">Consultant Management</h1>
      <p className="page-sub">
        Oversee consultant performance and project assignments
      </p>

      <div className="consultants-top">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input placeholder="Search consultants..." />
        </div>

        <button className="invite-btn">
          👥 Invite Consultant
        </button>
      </div>

      <div className="consultants-table">
        <table>
          <thead>
            <tr>
              <th>Consultant</th>
              <th>Contact</th>
              <th>Projects Managed</th>
              <th>Earnings</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="consultant-cell">
                <div>
                  <b>John Smith</b>
                  <div className="mini-sub">ID: CONS-001</div>
                </div>
              </td>

              <td>
                <div>john.smith@con.com</div>
                <div className="mini-sub">Expert in SMA</div>
              </td>

              <td>3 Active / 15 Total</td>

              <td>$12,400</td>

              <td><span className="status active">Active</span></td>

              <td>
                <span className="action-link">Edit</span> ·{" "}
                <span className="action-link danger">Block</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
