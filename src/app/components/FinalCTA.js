import Link from 'next/link';

export default function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="container">
        <h2>Ready to Transform?</h2>
        <p className="final-cta-text">
          Start earning with secure, escrow-backed payments by procuring pre-paid demand, bidding on assignments, and completing requirements. Our community-driven model ensures everyone succeeds together.
        </p>
        <div className="hero-buttons">
          <Link href="#register" className="btn-primary">
            Register as Business Associate
          </Link>
          <Link href="#demo" className="btn-secondary">
            Schedule a Demo
          </Link>
        </div>
      </div>
    </section>
  );
}