"use client";

import { motion } from "framer-motion";
import Donut from "../charts/Donut";

export default function Skills() {
  const metrics = [
    { value: 78, label: "Skill Growth" },
    { value: 92, label: "Course Completion" },
    { value: 45, label: "Career Boost" },
  ];

  return (
    <section className="skills-premium-bg">

      <div className="skills-premium-card">

        {/* TEXT + IMAGE ROW */}
        <motion.div
          className="skills-row"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="skills-text">
            <h2 className="skills-heading">Training & Skills Development</h2>
            <p className="skills-sub">Build Your Competitive Edge</p>

            <p className="skills-body">
              Catalogue completed and ongoing training programmes,
              professional certifications, online courses, and workshops.
              Track proficiency levels across technical & soft skills while
              receiving intelligent growth recommendations.
            </p>

            <p className="skills-body small">
              Seamless integrations with platforms like Coursera, Udemy & LinkedIn Learning.
              Stay aligned with market demands and emerging career opportunities.
            </p>
          </div>

          <div className="skills-visual">
            <img src="/assets/skills.png" alt="skills" className="skills-image" />
          </div>
        </motion.div>

        {/* DONUT ANALYTICS PANEL */}
        <motion.div
          className="skills-metrics-panel"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.18 } },
          }}
        >
          <div className="skills-metrics-row">
            {metrics.map((m, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 180, damping: 14 }}
              >
                <Donut value={m.value} label={m.label} />
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
