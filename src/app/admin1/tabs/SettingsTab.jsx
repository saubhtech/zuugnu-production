export default function SettingsTab() {
  return (
    <div className="settings-wrap">
      <h1 className="page-title">Platform Settings</h1>
      <p className="page-sub">
        Configure global platform parameters and integrations
      </p>

      <div className="settings-card">

        {/* GENERAL SETTINGS */}
        <h3 className="section-title">General Settings</h3>

        <div className="settings-row">
          <div className="settings-col">
            <label className="input-label">Platform Name</label>
            <input className="input-box" defaultValue="UGC SMA Platform" />
          </div>

          <div className="settings-col">
            <label className="input-label">Default Currency</label>
            <select className="input-box">
              <option>USD - United States Dollar</option>
              <option>EUR - Euro</option>
              <option>INR - Indian Rupee</option>
            </select>
          </div>
        </div>

        {/* ESCROW SETTINGS */}
        <h3 className="section-title" style={{marginTop:24}}>Escrow & Payments</h3>

        <div className="settings-row">
          <div className="settings-col">
            <label className="input-label">Escrow Provider</label>
            <select className="input-box">
              <option>Stripe Connect</option>
              <option>PayPal</option>
              <option>Razorpay</option>
            </select>
          </div>

          <div className="settings-col">
            <label className="input-label">Consultant Earnest Money %</label>
            <input className="input-box" type="number" defaultValue={10} />
          </div>
        </div>

        <div className="settings-row">
          <div className="settings-col">
            <label className="input-label">Client Payment Gateway</label>
            <select className="input-box">
              <option>Stripe</option>
              <option>PayPal</option>
              <option>Razorpay</option>
            </select>
          </div>
          <div className="settings-col">
            <label className="input-label">Creator Payout Method</label>
            <select className="input-box">
              <option>Bank Transfer</option>
              <option>Stripe</option>
              <option>UPI</option>
            </select>
          </div>
        </div>

        {/* AI / AUTOMATION */}
        <h3 className="section-title" style={{marginTop:24}}>AI/ML & Automation Integration</h3>

        <div className="checkbox-row">
          <input type="checkbox" defaultChecked />
          <span className="checkbox-text">
            Enable AI Content Quality Scoring &nbsp;
            <span className="muted">Via internal ML Model</span>
          </span>
        </div>

        <div className="checkbox-row">
          <input type="checkbox" defaultChecked />
          <span className="checkbox-text">
            Enable n8n for workflow automation &nbsp;
            <span className="muted">Webhooks integrated</span>
          </span>
        </div>

        <div className="settings-col" style={{marginTop:10}}>
          <label className="input-label">Cloudflare R2 Key</label>
          <input className="input-box" type="password" defaultValue="******************" />
        </div>

      </div>

      <div style={{display:"flex",justifyContent:"flex-end",marginTop:20}}>
        <button className="save-btn">Save All Settings</button>
      </div>
    </div>
  );
}
