"use client";

export default function Donut({ value, label }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="donut-card">
      <div className="donut-svg">
        <svg width="130" height="130">
          <circle
            r={radius}
            cx="65"
            cy="65"
            stroke="#d8deff"
            strokeWidth="12"
            fill="transparent"
          />
          <circle
            r={radius}
            cx="65"
            cy="65"
            stroke="#4460ff"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="donut-bar"
          />
        </svg>
        <div className="donut-center">
          <span className="donut-value">{value}%</span>
        </div>
      </div>
      <div className="donut-label">{label}</div>
    </div>
  );
}
