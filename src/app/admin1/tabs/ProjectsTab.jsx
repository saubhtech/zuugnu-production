"use client";

export default function ProjectsTab() {
  return (
    <div className="projects-wrap">

      <h1 className="page-title">All Projects</h1>
      <p className="page-sub">Overview of all active and past projects</p>

      <div className="projects-top">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input placeholder="Search projects..." />
        </div>

        <select className="status-filter">
          <option>All Status</option>
          <option>In Progress</option>
          <option>Pending Bids</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>

        <button className="create-btn">➕ Create Project</button>
      </div>

      <div className="projects-table">
        <table>
          <thead>
            <tr>
              <th>Project</th>
              <th>Client</th>
              <th>Consultant</th>
              <th>Budget</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {/* Row 1 */}
            <tr>
              <td>
                <b>Nike Summer Campaign</b>
                <div className="mini-sub">ID: PRO-001</div>
              </td>
              <td>Nike Inc.</td>
              <td>John Smith</td>
              <td className="budget green">$5,000</td>
              <td><span className="status inprogress">In Progress</span></td>
              <td>
                <span className="action">Manage</span>{" "}
                <span className="action danger">Cancel</span>
              </td>
            </tr>

            {/* Row 2 */}
            <tr>
              <td>
                <b>Adidas Brand Awareness</b>
                <div className="mini-sub">ID: PRO-002</div>
              </td>
              <td>Adidas AG</td>
              <td>-</td>
              <td className="budget green">$8,500</td>
              <td><span className="status pending">Pending Bids</span></td>
              <td>
                <span className="action">Manage</span>{" "}
                <span className="action danger">Cancel</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
