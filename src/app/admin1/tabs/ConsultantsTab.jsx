export default function ConsultantsTab() {
  return (
    <>
      <h1 className="page-title">Consultants</h1>
      <p className="page-sub">Manage consultant allocations & earnings</p>

      <input className="search-input" placeholder="Search consultants..." />

      <div className="table">
        <div className="row head">
          <div>Name</div>
          <div>Email</div>
          <div>Active Projects</div>
          <div>Earnings</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        <div className="row">
          <div>John Smith</div>
          <div>john@consult.com</div>
          <div>3</div>
          <div>$12,400</div>
          <div style={{color:"#16a34a"}}>Active</div>
          <div style={{color:"#4f46e5",cursor:"pointer",fontWeight:500}}>Manage</div>
        </div>

        <div className="row">
          <div>Ankit Verma</div>
          <div>ankit@ugc.com</div>
          <div>5</div>
          <div>$9,820</div>
          <div style={{color:"#16a34a"}}>Active</div>
          <div style={{color:"#4f46e5",cursor:"pointer",fontWeight:500}}>Manage</div>
        </div>
      </div>
    </>
  );
}
