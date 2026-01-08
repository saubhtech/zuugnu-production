"use client";


import { useState } from "react";

export default function SubmitTab() {
  const [open, setOpen] = useState(false);

  return (
    <div className="creator-tab-wrap">
      <h1 className="page-title">Submit Deliverables</h1>
      <p className="page-sub">Upload content for consultant review</p>

      <button className="primary-btn" onClick={() => setOpen(true)}>
        + Upload Content
      </button>

      {open && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h3>Submit Content</h3>
            <input className="modal-input" placeholder="Content URL (Dropbox, Drive, YouTube, etc)" />
            <textarea className="modal-text" placeholder="Notes for consultant (optional)" />

            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setOpen(false)}>Cancel</button>
              <button className="btn-primary">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
