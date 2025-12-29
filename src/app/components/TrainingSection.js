import Link from 'next/link';

export default function TrainingSection() {
  return (
    <section className="training-section" id="academy">
      <div className="container">
        <div className="section-header">
          <h2>
            Skills Training: <span className="highlight">Invest in Your Future</span>
          </h2>
          <p>Zuugnu doesn't just connect you with opportunities but equip you to excel.</p>
        </div>
        <div className="training-grid">
          <div className="training-card">
            <div className="solution-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
            </div>
            <h4>Self-paced training</h4>
            <p>Learn at your own pace with comprehensive course materials</p>
          </div>
          <div className="training-card">
            <div className="solution-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <h4>Live workshops and Q&A sessions</h4>
            <p>Interactive sessions with experts and community</p>
          </div>
          <div className="training-card">
            <div className="solution-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="7"/>
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
              </svg>
            </div>
            <h4>Certification to boost credibility</h4>
            <p>Earn recognized certifications that increase your value</p>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Link href="#calendar" className="btn-orange">
            View Training Calendar
          </Link>
        </div>
      </div>
    </section>
  );
}