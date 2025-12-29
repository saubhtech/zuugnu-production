import Link from 'next/link';

export default function BlogsSection() {
  return (
    <section className="blogs-section">
      <div className="container">
        <div className="section-header">
          <h2>Blogs</h2>
          <p>Explore insights, tips, and trends in the gig economy, digital branding, and phygital work.</p>
        </div>
        <div className="blog-filters">
          <button className="blog-filter active">All</button>
          <button className="blog-filter">Gig Economy & Phygital Work</button>
          <button className="blog-filter">Branding, UGC & Trust</button>
          <button className="blog-filter">Social Media Amplification & Organic Growth</button>
        </div>
        <div className="blog-category">
          <h3>Gig Economy & Phygital Work</h3>
          <div className="blog-grid">
            <div className="blog-card">
              <div className="blog-tag">Gig Economy & Phygital Work</div>
              <h4 className="blog-title">What Is Phygital Work and Why It's the Future of India's Gig Economy</h4>
              <p className="blog-date">2025-01-15</p>
              <p className="blog-excerpt">Discover how phygital work combines physical trust with digital scalability to revolutionize India's gig economy.</p>
            </div>
            <div className="blog-card">
              <div className="blog-tag">Gig Economy & Phygital Work</div>
              <h4 className="blog-title">The Rise of India's Gig Economy: Opportunities, Challenges & Trends</h4>
              <p className="blog-date">2025-01-14</p>
              <p className="blog-excerpt">Explore the explosive growth of India's gig economy and what it means for workers and businesses.</p>
            </div>
            <div className="blog-card">
              <div className="blog-tag">Gig Economy & Phygital Work</div>
              <h4 className="blog-title">Why Digital-Only Platforms Are No Longer Enough</h4>
              <p className="blog-date">2025-01-13</p>
              <p className="blog-excerpt">Learn why successful platforms need to integrate physical touchpoints with digital infrastructure.</p>
            </div>
          </div>
        </div>
        <div className="blog-category">
          <h3>Branding, UGC & Trust</h3>
          <div className="blog-grid">
            <div className="blog-card">
              <div className="blog-tag">Branding, UGC & Trust</div>
              <h4 className="blog-title">Why User-Generated Content (UGC) Converts Better Than Paid Ads</h4>
              <p className="blog-date">2025-01-07</p>
              <p className="blog-excerpt">Data-driven insights into why UGC outperforms traditional advertising.</p>
            </div>
            <div className="blog-card">
              <div className="blog-tag">Branding, UGC & Trust</div>
              <h4 className="blog-title">How UGC Builds Trust Faster Than Traditional Advertising</h4>
              <p className="blog-date">2025-01-06</p>
              <p className="blog-excerpt">The psychology behind why consumers trust peer-generated content.</p>
            </div>
            <div className="blog-card">
              <div className="blog-tag">Branding, UGC & Trust</div>
              <h4 className="blog-title">UGC vs Influencer Marketing: What Works Better for Indian SMEs?</h4>
              <p className="blog-date">2025-01-05</p>
              <p className="blog-excerpt">A practical comparison for small and medium businesses in India.</p>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Link href="#all-blogs" className="btn-view-all">
            View All Articles
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 5l-1.5 1.5L12 10l-3.5 3.5L10 15l5-5z"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}