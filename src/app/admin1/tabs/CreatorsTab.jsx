export default function CreatorsTab() {
  return (
    <>
      <h1 className="page-title">Creators</h1>
      <input className="search-input" placeholder="Search creators..." />

      <div className="table">
        <div className="row head"><div>Creator</div><div>Email</div><div>Completed</div><div>Earnings</div><div>Status</div><div>Actions</div></div>
        <div className="row"><div>Sarah Chen</div><div>sarah@ugc.com</div><div>42</div><div>$3,240</div><div>Active</div><div>Manage</div></div>
      </div>
    </>
  );
}
