export default function PhygitalSection() {
  return (
    <section className="phygital-section">
      <div className="container">
        <div className="section-header">
          <h2>
            The Future is <span className="highlight">Phygital</span> (Physical + Digital)
          </h2>
        </div>
        <div className="phygital-grid">
          <div className="phygital-card">
            <div className="solution-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
            <h3>Physical Trust</h3>
            <p>Build relationships through personal connections and meet clients face-to-face to establish genuine trust.</p>
          </div>
          <div className="phygital-card">
            <div className="solution-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </div>
            <h3>Digital Scalability</h3>
            <p>Access gig assignments, bid on projects, and scale beyond geographical boundaries using technology.</p>
          </div>
          <div className="phygital-card">
            <div className="solution-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
            </div>
            <h3>Phygital Synergy</h3>
            <p>Work from anywhere, anytime to manage both demand and supply with the perfect blend of physical and digital.</p>
          </div>
        </div>
      </div>
    </section>
  );
}