"use client";

import { motion } from "framer-motion";

export default function ExtraCurricular() {
  const cards = [
    {
      icon: "🏅",
      title: "Prizes & Medals",
      desc: "Document awards with dates, descriptions, and photos for a comprehensive archive."
    },
    {
      icon: "🎨",
      title: "Visual Portfolio",
      desc: "Build a compelling showcase highlighting unique talents beyond academics."
    },
    {
      icon: "✨",
      title: "Recognition Wall",
      desc: "Celebrate certificates, appreciation letters, and achievements all in one place."
    }
  ];

  return (
    <section className="extra-wrapper">
      <div className="extra-inner">

        <h2 className="extra-title">
          Extra-Curricular Activities & Achievements
        </h2>

        <p className="extra-sub">
          Showcase Your Unique Story
        </p>

        <p className="extra-body">
          Beyond academics lies a world of experiences that define who you are.
          Capture involvement in clubs, volunteering, competitions, cultural events, and creative pursuits — 
          every experience matters.
        </p>

        <div className="extra-cards">
          {cards.map((c, i) => (
            <motion.div
              key={i}
              className="extra-card"
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 180, damping: 15 }}
            >
              <div className="extra-icon">{c.icon}</div>
              <div className="extra-card-title">{c.title}</div>
              <div className="extra-card-desc">{c.desc}</div>
            </motion.div>
          ))}
        </div>

        <p className="extra-quote">
          “My extra-curriculars told my story better than my grades ever could. 
           The dashboard helped me present it all professionally.”
        </p>

      </div>
    </section>
  );
}
