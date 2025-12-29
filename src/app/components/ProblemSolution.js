export default function ProblemSolution() {
  return (
    <section className="problem-solution">
      <div className="container">
        <div className="section-header">
          <h2>
            No Business Without a Brand.{' '}
            <span className="highlight">
              <br />
              No Brand Without Social Proof.
            </span>
          </h2>
          <p>Businesses need brands and social proof to succeed in today's competitive market.</p>
        </div>

        <div className="solution-grid">
          <div className="solution-card">
            <div className="solution-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="6"/>
                <circle cx="12" cy="12" r="2"/>
              </svg>
            </div>
            <h4><strong>Aggregation</strong><br />User Generated Content (UGC) Hub</h4>
            <p>Real users creating authentic content including reviews, testimonials, and videos that resonate with your audience.</p>
          </div>
          <div className="solution-card">
            <div className="solution-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
            </div>
            <h4><strong>Amplification</strong><br />Social Media Amplification (SMA) Network</h4>
            <p>Multi-channel people-to-people content distribution that multiplies reach, drives engagement and visibility.</p>
          </div>
          <div className="solution-card">
            <div className="solution-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </div>
            <h4><strong>Automation</strong><br />Organic Leads Generation (OLG) Engine</h4>
            <p>Embedded widgets, landing pages, and sign-ups delivering pre-qualified leads directly to your CRM sales funnel.</p>
          </div>
        </div>

        <div className="results">
          <h3>Proven Results</h3>
          <div className="results-grid">
            <div className="result-card">
              <div className="result-icon">✓</div>
              <div className="result-text">
                <strong>6.9x</strong>
                <p>higher conversion rates from UGC vs traditional ads</p>
              </div>
            </div>
            <div className="result-card">
              <div className="result-icon">✓</div>
              <div className="result-text">
                <strong>65%</strong>
                <p>lower customer acquisition costs compared to paid advertising</p>
              </div>
            </div>
            <div className="result-card">
              <div className="result-icon">✓</div>
              <div className="result-text">
                <strong>82%</strong>
                <p>more engagement, trust, and conversion through organic leads</p>
              </div>
            </div>
            <div className="result-card">
              <div className="result-icon">✓</div>
              <div className="result-text">
                <strong>40%</strong>
                <p>increase in repeat orders due to peer recommendations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}