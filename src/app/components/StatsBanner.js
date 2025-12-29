export default function StatsBanner() {
  return (
    <section className="stats-banner">
      <h2 className="banner-title">
        India's Booming Gig Economy: <span className="highlight">Unprecedented Opportunities</span>
      </h2>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon teal">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <div className="stat-value">13M+</div>
          <div className="stat-label">Gig Workers</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
              <polyline points="17 6 23 6 23 12"/>
            </svg>
          </div>
          <div className="stat-value">₹1.85T</div>
          <div className="stat-label">Gig Market</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon yellow">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23"/>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
          </div>
          <div className="stat-value">₹24k Cr</div>
          <div className="stat-label">UGC + SMA</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon teal">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <div className="stat-value">24×7</div>
          <div className="stat-label">Phygital Availability</div>
        </div>
      </div>
    </section>
  );
}