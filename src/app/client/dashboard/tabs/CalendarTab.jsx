export default function CalendarTab() {
  return (
    <div className="calendar-tab panel">
      <h3>Content Calendar - January 2026</h3>
      <div className="calendar-grid">
        {[...Array(31)].map((_, i) => (
          <div key={i} className="calendar-cell">
            {i + 1}
          </div>
        ))}
      </div>

      <div className="scheduled">
        <h3>Scheduled Content (Next 7 Days)</h3>
        <div className="sched-row">🗓 Jan 08 — Product Launch (LinkedIn)</div>
        <div className="sched-row">🗓 Jan 09 — Tips Thread (Twitter)</div>
        <div className="sched-row">🗓 Jan 10 — Testimonial Video (YouTube)</div>
      </div>
    </div>
  );
}
