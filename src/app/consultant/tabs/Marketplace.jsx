"use client";

export default function MarketplaceTab() {
  return (
    <div className="market-container">
      
      <h1 className="market-title">Project Marketplace</h1>
      <p className="market-sub">Browse and bid on available projects</p>

      {/* ===== Project Grid ===== */}
      <div className="market-grid">

        {/* CARD 1 */}
        <div className="market-card-lg">
          <div className="card-head purple-grad">
            <div>
              <h3>Adidas Brand Awareness Campaign</h3>
              <small>Posted 2 hours ago</small>
            </div>
            <span className="pill">New</span>
          </div>

          <div className="card-meta">
            <div>
              <small>Budget</small>
              <p>$8,500</p>
            </div>
            <div>
              <small>Duration</small>
              <p>45 days</p>
            </div>
            <div>
              <small>Bids</small>
              <p>3</p>
            </div>
          </div>

          <p className="card-desc">
            Need 50+ social media posts, 10 articles, and 20+ Google reviews 
            for new product line launch.
          </p>

          <div className="tag-row">
            <span className="tag">Instagram</span>
            <span className="tag">YouTube</span>
            <span className="tag">Google Reviews</span>
          </div>

          <button className="proposal-btn">
            Submit Proposal
          </button>
        </div>

        {/* CARD 2 */}
        <div className="market-card-lg">
          <div className="card-head green-grad">
            <div>
              <h3>Eco-Friendly Product Launch Campaign</h3>
              <small>Posted 1 day ago</small>
            </div>
          </div>

          <div className="card-meta">
            <div>
              <small>Budget</small>
              <p>$4,000</p>
            </div>
            <div>
              <small>Duration</small>
              <p>25 days</p>
            </div>
            <div>
              <small>Bids</small>
              <p>1</p>
            </div>
          </div>

          <p className="card-desc">
            Seeking organic content creators for a new sustainable product 
            line launch on Pinterest and Instagram.
          </p>

          <div className="tag-row">
            <span className="tag">Pinterest</span>
            <span className="tag">Instagram</span>
            <span className="tag">Blog</span>
          </div>

          <button className="proposal-btn">
            Submit Proposal
          </button>
        </div>
      </div>
    </div>
  );
}
