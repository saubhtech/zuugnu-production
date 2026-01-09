"use client";

export default function ClientsTab() {
  return (
    <div className="clients-container">

      <h1 className="page-title">Client Management</h1>
      <p className="page-sub">Manage business clients and their projects</p>

      <div className="clients-top">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input placeholder="Search clients..." />
        </div>

        <button className="add-client-btn">
          ➕ Add New Client
        </button>
      </div>

      <div className="clients-table">
        <table>
          <thead>
            <tr>
              <th>Client</th>
              <th>Contact</th>
              <th>Projects</th>
              <th>Escrow</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {/* CLIENT ROW */}
            <tr>
              <td className="client-cell">
                <img className="client-logo" src="/nike.png" alt="" />
                <div>
                  <b>Nike Inc.</b>
                  <div className="client-sub">Fashion | ID: CL-001</div>
                </div>
              </td>

              <td>
                <div>client@nike.com</div>
                <div className="client-sub">Jordan Smith</div>
              </td>

              <td>
                8 Active / 42 Total
              </td>

              <td>$32,500</td>

              <td>
                <span className="status active">Active</span>
              </td>

              <td>
                <span className="action-link">Edit</span> ·{" "}
                <span className="action-link danger">Suspend</span>
              </td>
            </tr>

            {/* CLIENT ROW */}
            <tr>
              <td className="client-cell">
                <img className="client-logo" src="/adidas.png" alt="" />
                <div>
                  <b>Adidas AG</b>
                  <div className="client-sub">Sports | ID: CL-002</div>
                </div>
              </td>

              <td>
                <div>contact@adidas.com</div>
                <div className="client-sub">Maria Hill</div>
              </td>

              <td>
                5 Active / 20 Total
              </td>

              <td>$18,000</td>

              <td>
                <span className="status active">Active</span>
              </td>

              <td>
                <span className="action-link">Edit</span> ·{" "}
                <span className="action-link danger">Suspend</span>
              </td>
            </tr>

          </tbody>
        </table>
      </div>

    </div>
  );
}
