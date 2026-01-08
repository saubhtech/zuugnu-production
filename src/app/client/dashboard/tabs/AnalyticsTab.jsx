export default function AnalyticsTab() {
  return (
    <div className="analytics-tab">

      <div className="panel-row">
        <div className="panel">
          <h3>Post Performance</h3>
          <div className="placeholder-chart">📊 Bar Chart</div>
        </div>

        <div className="panel">
          <h3>Engagement Rate by Platform</h3>
          <div className="placeholder-chart">🕸 Radar Chart</div>
        </div>
      </div>

      <div className="panel">
        <h3>Top Performing Content</h3>
        <table className="analytics-table">
          <thead>
            <tr>
              <th>Content</th>
              <th>Platform</th>
              <th>Engagement</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Behind the scenes HQ</td>
              <td>Instagram</td>
              <td>6,991</td>
            </tr>
            <tr>
              <td>Realtime Analytics Demo</td>
              <td>YouTube</td>
              <td>4,924</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
