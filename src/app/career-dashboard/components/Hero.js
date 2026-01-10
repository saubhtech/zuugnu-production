"use client";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-left">
        <h1 className="hero-title">
          Career Dashboard: Your All-in-One Hub for Growth & Success
        </h1>

        <p className="hero-desc">
          Revolutionise how you navigate your professional journey with a comprehensive platform designed exclusively for ambitious Gen Z Indians. This intuitive dashboard brings together every dimension of your career—from education and skills to achievements and earnings—in one beautifully designed, intelligent interface.
        </p>

        <div className="hero-cta">
          <button className="primary-btn">Get Started Free</button>
          <button className="secondary-btn">Watch Demo</button>
        </div>
      </div>

      <div className="hero-right">
        <img src="/assets/hero.png" className="hero-illustration" alt="hero" />
      </div>
    </section>
  );
}
