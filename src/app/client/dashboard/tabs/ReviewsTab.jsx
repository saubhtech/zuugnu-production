export default function ReviewsTab() {
  return (
    <div className="reviews-tab">
      <div className="panel-row">
        <div className="panel">
          <h3>Average Rating</h3>
          <h2>4.8 / 5 ⭐</h2>
        </div>

        <div className="panel">
          <h3>Total Reviews</h3>
          <h2>1,247</h2>
        </div>

        <div className="panel">
          <h3>5-Star Reviews</h3>
          <h2>892</h2>
        </div>
      </div>

      <div className="panel">
        <h3>Recent Reviews</h3>
        <div className="review-row">
          ⭐⭐⭐⭐⭐ — “Amazing analytics product!” — John Smith
        </div>
        <div className="review-row">
          ⭐⭐⭐⭐⭐ — “Boosted ROI massively!” — Sarah
        </div>
      </div>
    </div>
  );
}
