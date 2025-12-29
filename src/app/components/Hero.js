import Link from 'next/link';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          Community-Driven Phygital{' '}
          <span className="highlight">
            <br />
            Gig-Work Aggregator Platform
          </span>
        </h1>
        <div className="hero-description">
          <h3 align="justify">
            💼 Businesses can use Zuugnu's Operating System to manage operations, outsource requirements, build brands, and generate organic leads.
          </h3>
          <br />
          <h3 align="justify">
            👤 Associates can procure pre-paid demand, bid on assignments, complete work, and receive instant, escrow-backed payments.
          </h3>
        </div>
        <div className="hero-buttons">
          <Link href="#register" className="btn-primary">
            Register as Business Associate
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 5l-1.5 1.5L12 10l-3.5 3.5L10 15l5-5z"/>
            </svg>
          </Link>
          <Link href="#demo" className="btn-secondary">Schedule a Demo</Link>
        </div>
      </div>
    </section>
  );
}