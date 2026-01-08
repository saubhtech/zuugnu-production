export default function PlatformsTab() {
  return (
    <div className="platform-tab panel">
      <h3>Platform Performance Overview</h3>

      <div className="platform-row">
        <span className="icon fb">📘</span>
        <span>Facebook</span>
        <span className="right">87 posts · 12.4K Followers · 4.2% ER</span>
      </div>

      <div className="platform-row">
        <span className="icon ig">📸</span>
        <span>Instagram</span>
        <span className="right">124 posts · 23.8K Followers · 5.8% ER</span>
      </div>

      <div className="platform-row">
        <span className="icon ln">💼</span>
        <span>LinkedIn</span>
        <span className="right">56 articles · 8.7K Followers · 6.4% ER</span>
      </div>
    </div>
  );
}
