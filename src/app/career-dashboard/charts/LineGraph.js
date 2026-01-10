"use client";

import { useEffect, useState } from "react";

export default function LineGraph() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  // Updated full 6 months data
  const income = [200, 340, 450, 520, 610, 750];
  const savings = [80, 120, 160, 210, 290, 380];

  const max = Math.max(...income, ...savings);
  const min = 0;

  const normalize = (arr) =>
    arr.map((v, i) => ({
      x: (i / (arr.length - 1)) * 360,
      y: 200 - ((v - min) / (max - min)) * 160,
    }));

  const inc = normalize(income);
  const sav = normalize(savings);

  const curve = (pts) =>
    pts.reduce(
      (acc, p, i, arr) =>
        i === 0
          ? `M ${p.x},${p.y}`
          : `${acc} C ${(arr[i - 1].x + p.x) / 2},${arr[i - 1].y} ${(arr[i - 1].x + p.x) / 2},${p.y} ${p.x},${p.y}`,
      ""
    );

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 120);
  }, []);

  return (
    <div className="premium-graph">
      <svg width="400" height="240">

        {/* Gradient fill under income */}
        <defs>
          <linearGradient id="incGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4d67ff9e" />
            <stop offset="100%" stopColor="rgba(77,103,255,0)" />
          </linearGradient>
        </defs>

        {/* Fill area */}
        <path
          d={`${curve(inc)} L 360,240 L 0,240 Z`}
          fill="url(#incGrad)"
          opacity=".6"
        />

        {/* Income line */}
        <path
          d={curve(inc)}
          fill="none"
          stroke="#3c5bff"
          strokeWidth="3"
          strokeLinecap="round"
          className={animate ? "graph-line-animate" : ""}
        />

        {/* Savings line */}
        <path
          d={curve(sav)}
          fill="none"
          stroke="#7bbdff"
          strokeWidth="3"
          strokeLinecap="round"
          className={animate ? "graph-line-animate" : ""}
        />

        {/* Points */}
        {[inc, sav].map((arr, j) =>
          arr.map((p, i) => (
            <circle
              key={`${j}-${i}`}
              cx={p.x}
              cy={p.y}
              r="4"
              fill={j === 0 ? "#3c5bff" : "#7bbdff"}
              stroke="white"
              strokeWidth="2"
            />
          ))
        )}
      </svg>

      {/* X-Axis Labels */}
      <div className="graph-x">
        {months.map((m, i) => (
          <span key={i}>{m}</span>
        ))}
      </div>

      {/* Legend */}
      <div className="graph-legend">
        <div><span className="dot inc"></span>Income</div>
        <div><span className="dot sav"></span>Savings</div>
      </div>
    </div>
  );
}
