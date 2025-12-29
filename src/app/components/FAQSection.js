export default function FAQSection() {
  return (
    <section className="faq-section">
      <div className="container">
        <div className="section-header">
          <h2>Frequently Asked Questions</h2>
          <p>Find answers to common questions about Zuugnu</p>
        </div>

        <div className="faq-category">
          <h3>Platform Basics</h3>
          <div className="faq-item">
            <div className="faq-question">
              <span>What is Zuugnu?</span>
              <span className="faq-arrow">▼</span>
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-question">
              <span>How does Zuugnu work?</span>
              <span className="faq-arrow">▼</span>
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-question">
              <span>What does 'Phygital' mean in Zuugnu's model?</span>
              <span className="faq-arrow">▼</span>
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-question">
              <span>Is Zuugnu available across India?</span>
              <span className="faq-arrow">▼</span>
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-question">
              <span>What makes Zuugnu different from other gig platforms?</span>
              <span className="faq-arrow">▼</span>
            </div>
          </div>
        </div>

        <div className="faq-category">
          <h3>For Businesses</h3>
          <div className="faq-item">
            <div className="faq-question">
              <span>What is the difference between UGC and SMA?</span>
              <span className="faq-arrow">▼</span>
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-question">
              <span>How does Zuugnu help generate organic leads?</span>
              <span className="faq-arrow">▼</span>
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-question">
              <span>Can Zuugnu replace paid advertising?</span>
              <span className="faq-arrow">▼</span>
            </div>
          </div>
        </div>

        <div className="faq-category">
          <h3>Payments, Trust & Escrow</h3>
          <div className="faq-item">
            <div className="faq-question">
              <span>How does the escrow payment system work?</span>
              <span className="faq-arrow">▼</span>
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-question">
              <span>Is payment guaranteed for Associates?</span>
              <span className="faq-arrow">▼</span>
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-question">
              <span>When do Associates receive payments?</span>
              <span className="faq-arrow">▼</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}