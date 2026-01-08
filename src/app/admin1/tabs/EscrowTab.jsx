export default function EscrowTab() {
  return (
    <div className="escrow-wrap">
      <h1 className="page-title">Escrow Accounts</h1>
      <p className="page-sub">Track and manage all escrow funds</p>

      <div className="escrow-top">
        <input
          className="search-input"
          placeholder="Search escrows by project..."
        />

        <select className="filter-select">
          <option>All Status</option>
          <option>Funded</option>
          <option>Pending Funding</option>
          <option>Released</option>
        </select>
      </div>

      <div className="escrow-table">
        <div className="tbl-row tbl-head">
          <div>Project</div>
          <div>Client</div>
          <div>Consultant</div>
          <div>Amount</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        <div className="tbl-row">
          <div>
            <strong>Nike Summer Campaign</strong>
            <div className="sub-id">ID: ESC-001</div>
          </div>
          <div>Nike Inc.</div>
          <div>John Smith</div>
          <div className="green">$5,000</div>
          <div className="status funded">Funded</div>
          <div className="actions">
            <span className="link">Manage</span>
            <span className="link">View History</span>
          </div>
        </div>

        <div className="tbl-row">
          <div>
            <strong>Adidas Brand Awareness</strong>
            <div className="sub-id">ID: ESC-002</div>
          </div>
          <div>Adidas AG</div>
          <div>-</div>
          <div className="green">$8,500</div>
          <div className="status pending">Pending Funding</div>
          <div className="actions">
            <span className="link">Manage</span>
          </div>
        </div>
      </div>
    </div>
  );
}
