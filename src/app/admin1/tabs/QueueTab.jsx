export default function QueueTab() {
  return (
    <>
      <h1 className="page-title">Approval Queue</h1>
      <p className="page-sub">Pending client approvals & submissions</p>

      <input className="search-input" placeholder="Search submissions..." />

      <div className="table">
        <div className="row head">
          <div>Content</div>
          <div>Creator</div>
          <div>Client</div>
          <div>Status</div>
          <div>Date</div>
          <div>Actions</div>
        </div>

        {/* Sample Row */}
        <div className="row">
          <div>Instagram Reel</div>
          <div>Sarah Johnson</div>
          <div>Nike</div>
          <div>Pending Client</div>
          <div>Jan 8</div>
          <div style={{color:"#4f46e5",cursor:"pointer",fontWeight:500}}>Review</div>
        </div>

        <div className="row">
          <div>UGC Shorts Video</div>
          <div>Mark Lee</div>
          <div>Adidas</div>
          <div>Pending Client</div>
          <div>Jan 6</div>
          <div style={{color:"#4f46e5",cursor:"pointer",fontWeight:500}}>Review</div>
        </div>
      </div>
    </>
  );
}
