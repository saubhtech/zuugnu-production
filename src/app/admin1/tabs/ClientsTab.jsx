export default function ClientsTab() {
  return (
    <>
      <h1 className="page-title">Clients</h1>
      <input className="search-input" placeholder="Search clients..." />

      <div className="table">
        <div className="row head"><div>Client</div><div>Email</div><div>Projects</div><div>Escrow</div><div>Status</div><div>Actions</div></div>
        <div className="row"><div>Nike Inc.</div><div>client@nike.com</div><div>8 Active</div><div>$32,500</div><div>Active</div><div>Manage</div></div>
        <div className="row"><div>Adidas AG</div><div>info@adidas.com</div><div>5 Active</div><div>$18,000</div><div>Active</div><div>Manage</div></div>
      </div>
    </>
  );
}
