"use client";

export default function DistributeAssignments() {
  return (
    <div className="assign-container">

      <h1 className="assign-title">Distribute Assignments</h1>
      <p className="assign-sub">
        Assign specific content tasks to your creators for active projects
      </p>

      <div className="assign-top">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input placeholder="Search projects..." />
        </div>

        <select className="filter-select">
          <option>All Projects</option>
          <option>Nike Summer Campaign</option>
          <option>Eco-Friendly Product Launch</option>
        </select>
      </div>

      <div className="assign-table">
        <table>
          <thead>
            <tr>
              <th>Project</th>
              <th>Client</th>
              <th>Assigned Creators</th>
              <th>Progress</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <b>Nike Summer Campaign</b>
                <div className="mini-label">Budget: $5,000</div>
              </td>
              <td>Nike Inc.</td>
              <td>12</td>
              <td className="progress-cell">
                <div className="progress-bar">
                  <div style={{ width: "65%" }} />
                </div>
                <span>65%</span>
              </td>
              <td><span className="status">In Progress</span></td>
              <td>
                <span className="action-link">Assign Creators</span> ·{" "}
                <span className="action-link">View Assignments</span>
              </td>
            </tr>

            <tr>
              <td>
                <b>Eco-Friendly Product Launch</b>
                <div className="mini-label">Budget: $3,800</div>
              </td>
              <td>Green Solutions Co.</td>
              <td>8</td>
              <td className="progress-cell">
                <div className="progress-bar">
                  <div style={{ width: "80%" }} />
                </div>
                <span>80%</span>
              </td>
              <td><span className="status">In Progress</span></td>
              <td>
                <span className="action-link">Assign Creators</span> ·{" "}
                <span className="action-link">View Assignments</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
