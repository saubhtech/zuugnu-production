export default function AllContentTab() {
  return (
    <div className="content-tab">
      <div className="toolbar">
        <select className="filter-select">
          <option>All Platforms</option>
        </select>
        <input className="search-box" placeholder="Search content..." />
      </div>

      <div className="content-grid">
        <div className="content-card">
          <span className="tag linkedin">LinkedIn</span>
          <h4>Introducing our AI analytics platform</h4>
          <div className="content-meta">💬 1,834 | 🔁 234 | ❤️ 156</div>
        </div>

        <div className="content-card">
          <span className="tag facebook">Facebook</span>
          <h4>ROI increased by 150% – Case Study</h4>
          <div className="content-meta">💬 2,341 | 🔁 445 | ❤️ 267</div>
        </div>

        <div className="content-card">
          <span className="tag instagram">Instagram</span>
          <h4>Behind the scenes HQ</h4>
          <div className="content-meta">💬 5,678 | 🔁 890 | ❤️ 423</div>
        </div>
      </div>
    </div>
  );
}
