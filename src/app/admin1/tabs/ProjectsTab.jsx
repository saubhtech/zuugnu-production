export default function ProjectsTab() {
  return (
    <>
      <h1 className="page-title">All Projects</h1>
      <input className="search-input" placeholder="Search projects..." />

      <div className="table">
        <div className="row head"><div>Project</div><div>Client</div><div>Consultant</div><div>Budget</div><div>Status</div><div>Actions</div></div>
        <div className="row"><div>Nike Summer Campaign</div><div>Nike Inc.</div><div>John Smith</div><div>$5,000</div><div>In Progress</div><div>Manage</div></div>
      </div>
    </>
  );
}
