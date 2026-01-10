"use client";

export default function WhyMatters() {
  return (
    <section className="why-section">
      <div className="why-container">

        <h2 className="why-title">Why This Dashboard Matters to Gen Z</h2>

        <div className="why-cards">

          <div className="why-card">
            <div className="why-icon">📱</div>
            <div className="why-card-title">Digital-Native Design</div>
            <div className="why-card-desc">
              Built for the generation that grew up online, balancing education,
              multiple skills, side hustles, and ambitious life goals simultaneously.
            </div>
          </div>

          <div className="why-card">
            <div className="why-icon">⚡</div>
            <div className="why-card-title">Empowered Decision-Making</div>
            <div className="why-card-desc">
              Track and manage career objectives, learning milestones, achievements,
              and earnings with real-time insights and analytics.
            </div>
          </div>

          <div className="why-card">
            <div className="why-icon">📊</div>
            <div className="why-card-title">Actionable Intelligence</div>
            <div className="why-card-desc">
              Turn complex career data into intuitive insights that help you make
              confident decisions about your future with clarity.
            </div>
          </div>

        </div>

        <p className="why-bottom">
          In today’s fast-paced world, success demands more than just hard work—it
          requires smart organisation, strategic planning, and continuous self-assessment.
          Our dashboard becomes your personal career companion, offering clarity when you
          need it most and celebrating every win along the way.
        </p>
      </div>
    </section>
  );
}
