"use client";

export default function MarketplaceTab() {
  return (
    <div>
      <h1 className="page-title">Marketplace</h1>
      <p className="page-sub">Match brands with verified creators</p>

      <div className="filter-bar">
        <input placeholder="Search campaigns..." className="filter-input" />
        <select className="filter-select">
          <option>All Categories</option>
          <option>Fashion</option>
          <option>Gaming</option>
          <option>Health & Wellness</option>
        </select>
        <select className="filter-select">
          <option>All Platforms</option>
          <option>Instagram</option>
          <option>TikTok</option>
          <option>YouTube</option>
        </select>
        <button className="gray-btn">Filter</button>
      </div>

      <div className="market-card">
        <h3>Nike Summer Campaign</h3>
        <p className="muted">Reels + Youtube Review + UGC Clips</p>
        <div className="row-between">
          <span><b>Budget:</b> $8,500</span>
          <button className="btn-primary">Assign Creators</button>
        </div>
      </div>

      <div className="market-card">
        <h3>Sephora Beauty Collab</h3>
        <p className="muted">Instagram UGC + Testimonials</p>
        <div className="row-between">
          <span><b>Budget:</b> $12,000</span>
          <button className="btn-primary">Assign Creators</button>
        </div>
      </div>
    </div>
  );
}
