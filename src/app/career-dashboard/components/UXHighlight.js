"use client";

import { motion } from "framer-motion";

export default function UserExperience() {
  return (
    <section className="ux-section">

      {/* LEFT IMAGE */}
      <motion.div
        className="ux-left"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <img
          src="/assets/teeth.jpeg"
          alt="user"
          className="ux-illustration"
        />
      </motion.div>

      {/* RIGHT CONTENT */}
      <motion.div
        className="ux-right"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="ux-title">
          User Experience & Visual <br /> Design Highlights
        </h2>

        {/* TOP SECTION */}
        <div className="ux-feature-block">
          {/* <img src="/assets/mobile icon.png" className="ux-small-icon" alt="" /> */}
          <div>
            <div className="ux-feature-title">Designed for Delight</div>
            <p className="ux-feature-text">
              Experience a clean, modern interface with dark and light mode toggle for
              maximum comfort and style throughout the day. Our responsive design ensures
              seamless access whether you're on your mobile during commute or desktop
              at home — your data syncs instantly across all devices.
            </p>
          </div>
        </div>

        {/* BULLET SECTION */}
        <div className="ux-items">

          <div className="ux-item">
            {/* <img src="/assets/mobile-icon.png" className="ux-bullet-icon" alt="" /> */}
            <div className="ux-item-title">Beautiful Visuals</div>
            <p className="ux-item-desc">
              Interactive charts, animated progress bars, and achievement badges
              celebrate your wins visually and keep motivation high.
            </p>
          </div>

          <div className="ux-item">
            {/* <img src="/assets/mobile-icon.png" className="ux-bullet-icon" alt="" /> */}
            <div className="ux-item-title">Mobile-First</div>
            <p className="ux-item-desc">
              Optimised for smartphones so you can update goals, track opportunities,
              or monitor earnings effortlessly.
            </p>
          </div>

          <div className="ux-item">
            {/* <img src="/assets/mobile-icon.png" className="ux-bullet-icon" alt="" /> */}
            <div className="ux-item-title">Personalisation</div>
            <p className="ux-item-desc">
              Customisable widgets, colour themes, and dashboard layout to match your
              personality and workflow preferences.
            </p>
          </div>

        </div>
      </motion.div>

    </section>
  );
}
