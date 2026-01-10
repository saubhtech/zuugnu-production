"use client";

import LineGraph from "../charts/LineGraph";
import { motion } from "framer-motion";

export default function Earnings() {
  return (
    <section className="earn-premium-bg">
      <motion.div
        className="earn-card"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >

        <div className="earn-head">
          <h2>Earnings & Financial Growth Tracker</h2>
          <p className="earn-sub">
            Visualise Your Financial Journey
          </p>
        </div>

        <p className="earn-desc">
          Understanding your finances is crucial for independence and confidence.
          Track income streams from internships, freelancing gigs, or entrepreneurial work —
          with beautiful visual graphs and comprehensive summaries.
        </p>

        <div className="earn-graph-wrapper">
          <LineGraph />
        </div>

        <div className="earn-progress-row">
          <div className="earn-progress-item">
            <div className="earn-progress-label">Savings Goal</div>
            <div className="earn-progress-bar"><div style={{ width: "60%" }} /></div>
            <span className="earn-progress-num">60%</span>
          </div>

          <div className="earn-progress-item">
            <div className="earn-progress-label">Income Growth</div>
            <div className="earn-progress-bar"><div style={{ width: "85%" }} /></div>
            <span className="earn-progress-num">85%</span>
          </div>
        </div>

      </motion.div>
    </section>
  );
}
