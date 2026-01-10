"use client";

import { motion } from "framer-motion";

export default function Education() {
  return (
    <section className="education-section">

      <motion.div
        className="education-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 24 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } }
        }}
      >

        <div className="education-left">
          <img src="/assets/education.png" className="education-img" alt="education"/>
        </div>

        <div className="education-right">
          <h2 className="education-title">Education Pathways & Academic Performance</h2>

          <div className="education-points">

            <div className="edu-row">
              <span className="edu-number">01</span>
              <div>
                <div className="edu-label">Map Your Journey</div>
                <p className="edu-text">
                  Document courses, grades, and academic milestones in one centralised,
                  easy-to-navigate location.
                </p>
              </div>
            </div>

            <div className="edu-divider"></div>

            <div className="edu-row">
              <span className="edu-number">02</span>
              <div>
                <div className="edu-label">Visual Analytics</div>
                <p className="edu-text">
                  Interactive GPA tracker and analytics identify strengths, weaknesses,
                  and improvement areas instantly.
                </p>
              </div>
            </div>

            <div className="edu-divider"></div>

            <div className="edu-row">
              <span className="edu-number">03</span>
              <div>
                <div className="edu-label">Smart Recommendations</div>
                <p className="edu-text">
                  Personalised suggestions for best academic steps based on your
                  performance, interests, and aspirations.
                </p>
              </div>
            </div>

          </div>

          <p className="education-footnote">
            Academic performance insights adapt to every stream, semester, and benchmark — 
            with clarity and precision for long-term growth.
          </p>

        </div>
      </motion.div>
    </section>
  );
}
