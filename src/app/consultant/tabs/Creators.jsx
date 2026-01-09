"use client";

export default function Creators() {
  return (
    <div className="creators-container">

      <h1 className="creators-title">Manage Creators</h1>
      <p className="creators-sub">
        Your pool of UGC creators and their performance
      </p>

      <div className="creators-top-row">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input placeholder="Search creators..." />
        </div>

        <button className="invite-btn">
          <span className="invite-icon">👤➕</span>
          Invite New Creator
        </button>
      </div>

      <div className="creators-table">
        <table>
          <thead>
            <tr>
              <th>Creator</th>
              <th>Specialization</th>
              <th>Active Tasks</th>
              <th>Success Rate</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="creator-cell">
                <div className="avatar" />
                <div>
                  <b>Sarah Chen</b>
                  <div className="email">sarah.chen@mail.com</div>
                </div>
              </td>
              <td>Instagram Reels, Posts</td>
              <td>3</td>
              <td className="success green">95%</td>
              <td className="status hired">Hired</td>
              <td>
                <span className="action-link">View Profile</span> ·{" "}
                <span className="action-link remove">Remove</span>
              </td>
            </tr>

            <tr>
              <td className="creator-cell">
                <div className="avatar" />
                <div>
                  <b>David Lee</b>
                  <div className="email">david.lee@mail.com</div>
                </div>
              </td>
              <td>YouTube Videos, TikTok</td>
              <td>2</td>
              <td className="success green">92%</td>
              <td className="status hired">Hired</td>
              <td>
                <span className="action-link">View Profile</span> ·{" "}
                <span className="action-link remove">Remove</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
