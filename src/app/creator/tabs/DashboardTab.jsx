"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";


export default function DashboardTab() {
  return (
    <div className="creator-dashboard">

      {/* PAGE HEADER */}
      <h1 className="page-title">Creator Dashboard</h1>
      <p className="page-sub">Your assignments and earnings overview</p>

      {/* --- TOP 4 STATS --- */}
      <div className="creator-stats-row">

        <div className="stat-card">
          <div className="icon-box pink">📋</div>
          <small>Active Assignments</small>
          <h2>8</h2>
          <span className="muted-sm">3 due this week</span>
        </div>

        <div className="stat-card">
          <div className="icon-box green">✅</div>
          <small>Completed This Month</small>
          <h2>42</h2>
          <span className="green-sm">↑ +15% from last month</span>
        </div>

        <div className="stat-card">
          <div className="icon-box purple">⭐</div>
          <small>Approval Rate</small>
          <h2>96%</h2>
          <span className="muted-sm">Overall success</span>
        </div>

        <div className="stat-card">
          <div className="icon-box yellow">💰</div>
          <small>Total Earnings</small>
          <h2>$3,240</h2>
          <span className="muted-sm">Lifetime earnings</span>
        </div>

      </div>

      {/* --- MAIN GRID SECTION --- */}
      <div className="creator-grid">

        {/* LEFT SIDE */}
        <div className="panel">
          <div className="panel-header">
            <h3>My Assignments</h3>
            <span className="view-link">View All</span>
          </div>

          {/* CARD 1 */}
          <div className="assign-card red-border">
            <div className="row-between">
              <b>Instagram Reel - Nike Air</b>
              <span className="due">Due in 2 days</span>
            </div>

            <p className="desc">
              Create 60-second product showcase reel for Air Max
            </p>

            <p className="payment"><b>Payment:</b> $150</p>
            <button className="red-btn">Upload</button>
          </div>

          {/* CARD 2 */}
          <div className="assign-card blue-border">
            <div className="row-between">
              <b>YouTube Video - Adidas Ultraboost</b>
              <span className="review">In Review (Consultant)</span>
            </div>

            <p className="desc">
              Produce a 3-minute review video for new Ultraboost shoes
            </p>

            <p className="payment"><b>Payment:</b> $250</p>
            <button className="gray-btn">View Submission</button>
          </div>

          {/* CARD 3 */}
          <div className="assign-card yellow-border">
            <div className="row-between">
              <b>Pinterest Board - Eco-Friendly Fashion</b>
              <span className="revision">Revision Requested</span>
            </div>

            <p className="desc">
              Curate a Pinterest board featuring sustainable fashion ideas
            </p>

            <p className="payment"><b>Payment:</b> $80</p>
            <button className="yellow-btn">Revise & Upload</button>
          </div>

        </div>

        {/* RIGHT SIDE */}
        {/* RIGHT PANEL */}
<div className="panel">
  <h3>Performance Trend</h3>

  <LineChart width={450} height={260} data={[
    { month: "Jan", value: 10 },
    { month: "Feb", value: 12 },
    { month: "Mar", value: 7 },
    { month: "Apr", value: 16 },
    { month: "May", value: 14 },
    { month: "Jun", value: 15 }
  ]}>
    <XAxis dataKey="month" stroke="#888" fontSize={12} />
    <YAxis stroke="#888" fontSize={12} />
    <Tooltip />
    <Line
      type="monotone"
      dataKey="value"
      stroke="#8b5cf6"
      strokeWidth={3}
      dot={{ r: 3, fill:"#8b5cf6" }}
    />
    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
  </LineChart>
</div>


      </div>
    </div>
  );
}
