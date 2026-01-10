"use client";

import { motion } from "framer-motion";

export default function Opportunities() {
  const steps = [
    {
      icon: "🔍",
      title: "Discover",
      desc: "Find scholarships, internships, jobs, & competitions tailored to your profile & goals."
    },
    {
      icon: "📝",
      title: "Apply & Track",
      desc: "Monitor deadlines, statuses, & outcomes with reminders & real-time tracking."
    },
    {
      icon: "🔔",
      title: "Get Alerts",
      desc: "Receive personalised alerts for new opportunities matching your skills."
    },
  ];

  return (
    <section className="opps-wrapper">

      <h2 className="opps-title">
        Opportunities — Available & Applied
      </h2>

      <div className="opps-steps">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            className="opps-step"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 180, damping: 14 }}
          >
            <div className="opps-step-icon">{s.icon}</div>
            <div className="opps-step-title">{s.title}</div>
            <div className="opps-step-desc">{s.desc}</div>
          </motion.div>
        ))}
      </div>

      <div className="opps-info">
        <h3 className="opps-info-title">Never Miss Your Chance</h3>
        <p className="opps-info-desc">
          Stop losing opportunities to deadlines, anxiety, or information overload. Our intelligent engine scans thousands of options—from internships to scholarships to competitions—showing only what matters to you.
        </p>

        <ul className="opps-info-list">
          <li>Smart filters based on location, eligibility, and goals.</li>
          <li>Application tracking avoids missed deadlines & follow-ups.</li>
          <li>Success insights reveal which opportunities suit you best.</li>
        </ul>
      </div>

    </section>
  );
}
