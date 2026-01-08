"use client";
import { useState } from "react";


export default function AssignmentsTab() {
  const [tab, setTab] = useState("todo");

  return (
    <div className="assign-wrap">
      <h1 className="page-title">My Assignments</h1>
      <p className="page-sub">All your active, in-review, and completed tasks</p>

      {/* TAB SWITCH */}
      <div className="assign-tabs">
        <button className={tab === "todo" ? "active" : ""} onClick={() => setTab("todo")}>
          To Do (8)
        </button>
        <button className={tab === "review" ? "active" : ""} onClick={() => setTab("review")}>
          In Review (3)
        </button>
        <button className={tab === "done" ? "active" : ""} onClick={() => setTab("done")}>
          Completed (42)
        </button>
      </div>

      {/* TODO SECTION */}
      {tab === "todo" && (
        <div className="assign-card todo">
          <div className="assign-head">
            <span className="priority high">High Priority</span>
            <span className="due">Due in 2 days</span>
          </div>

          <h3 className="assign-title">Instagram Reel - Nike Air</h3>
          <p className="assign-desc">
            Create a 60-second showcase reel featuring Nike Air Max. Include upbeat visuals & transitions.
          </p>

          <div className="assign-info">
            <div><small>Project</small><b>Nike Summer Campaign</b></div>
            <div><small>Consultant</small><b>John Smith</b></div>
            <div><small>Platform</small><b>Instagram</b></div>
            <div><small>Payment</small><b className="green">$150</b></div>
          </div>

          <button className="btn-red-lg mt10">Upload Content</button>
        </div>
      )}

      {/* REVIEW SECTION */}
      {tab === "review" && (
        <div className="assign-card review">
          <div className="assign-head">
            <span className="status">In Review (Consultant)</span>
          </div>

          <h3 className="assign-title">YouTube Video - Adidas Ultraboost</h3>
          <p className="assign-desc">
            Produce a 3-min review video discussing product comfort, features & visuals.
          </p>

          <div className="assign-info">
            <div><small>Project</small><b>Adidas Brand Awareness</b></div>
            <div><small>Platform</small><b>YouTube</b></div>
            <div><small>Payment</small><b className="green">$250</b></div>
          </div>

          <button className="btn-gray-lg mt10">View Submission</button>
        </div>
      )}

      {/* COMPLETED SECTION */}
      {tab === "done" && (
        <div className="assign-card completed">
          <span className="badge-done">Completed</span>

          <h3 className="assign-title">TikTok Fashion Showcase</h3>
          <p className="assign-desc">Final approved deliverables submitted & accepted.</p>

          <p className="assign-paid">
            Paid: <b className="green">$320</b>
          </p>
        </div>
      )}
    </div>
  );
}
