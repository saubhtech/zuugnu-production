"use client";

export default function MyBids() {
  return (
    <div className="tab-wrap">
      <h1 className="tab-title">My Bids</h1>
      <p className="tab-sub">Track bids you placed on marketplace campaigns</p>

      <table className="nice-table mt20">
        <thead>
          <tr>
            <th>Campaign</th>
            <th>Client</th>
            <th>Bid Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Nike Summer Campaign</td>
            <td>Nike</td>
            <td><b>$600</b></td>
            <td><span className="badge won">Won</span></td>
            <td>May 8, 2026</td>
          </tr>

          <tr>
            <td>Adidas Ultraboost Review</td>
            <td>Adidas</td>
            <td><b>$400</b></td>
            <td><span className="badge won">Won</span></td>
            <td>May 1, 2026</td>
          </tr>

          <tr>
            <td>Zara Fashion Lookbook</td>
            <td>Zara</td>
            <td><b>$380</b></td>
            <td><span className="badge pending">Pending</span></td>
            <td>May 29, 2026</td>
          </tr>

          <tr>
            <td>Puma Fitness Series</td>
            <td>Puma</td>
            <td><b>$420</b></td>
            <td><span className="badge lost">Lost</span></td>
            <td>May 6, 2026</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
