"use client";
import { motion } from "framer-motion";

export default function Goals() {
  return (
    <section className="goals-section">

      <motion.div
        className="goals-container"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
      >

        <div className="goals-left">
          <h2 className="goals-title">Career Objectives & Goal Setting</h2>

          <p className="goals-desc">
            Plan and visualise both short-term and long-term career goals with structured planning tools.
            Whether you're targeting higher education, internships, domain shifts, or entrepreneurship —
            clarity helps you stay motivated and aligned with long-term ambitions.
          </p>

          <ul className="goals-list">
            <li>Smart reminders + nudges for continuous tracking</li>
            <li>Milestone checkpoints to measure progress</li>
            <li>Visual insights that celebrate small wins</li>
            <li>Flexible adjustments as new opportunities emerge</li>
          </ul>
        </div>

        <div className="goals-right">
          <div className="goals-stats-grid">

            {[{ num: "85%", label: "Users Hit Goals" },
              { num: "3×", label: "More Productive" },
              { num: "2.1×", label: "Faster Growth" }].map((stat, i) => (
              <motion.div
                key={i}
                className="goal-stat"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 180, damping: 14 }}
              >
                <div className="goal-number">{stat.num}</div>
                <div className="goal-label">{stat.label}</div>
              </motion.div>
            ))}

          </div>
        </div>

      </motion.div>
    </section>
  );
}
