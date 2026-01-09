"use client";

export default function Profile() {
  return (
    <div className="profile-container">

      <h1 className="profile-title">My Profile & Settings</h1>
      <p className="profile-sub">
        Manage your professional information and platform settings
      </p>

      {/* PERSONAL INFO CARD */}
      <div className="profile-card">
        <h3 className="section-title">Personal & Professional Details</h3>

        <div className="grid-2">
          <div className="field">
            <label>Full Name</label>
            <input defaultValue="John Smith" />
          </div>

          <div className="field">
            <label>Email</label>
            <input defaultValue="john.smith@con.com" />
          </div>
        </div>

        <div className="grid-2">
          <div className="field">
            <label>Phone Number</label>
            <input defaultValue="+1 (555) 987-6543" />
          </div>

          <div className="field">
            <label>Years of Experience</label>
            <input defaultValue="5" />
          </div>
        </div>

        <div className="field">
          <label>Bio / About Me</label>
          <textarea defaultValue="Experienced consultant specializing in social media amplification and content strategy for brands across various industries." />
        </div>
      </div>

      {/* SPECIALIZATIONS CARD */}
      <div className="profile-card">
        <h3 className="section-title">Specializations & Platforms</h3>

        <div className="grid-2">
          <div className="field">
            <label>Primary Specialization</label>
            <input defaultValue="Social Media Amplification" />
          </div>

          <div className="field">
            <label>Key Platforms</label>
            <input defaultValue="Instagram, YouTube, Facebook, LinkedIn" />
          </div>
        </div>

        <div className="field">
          <label>Portfolio URL</label>
          <input defaultValue="https://www.yourportfolio.com" />
        </div>
      </div>

      {/* PAYOUT SETTINGS */}
      <div className="profile-card">
        <h3 className="section-title">Payout Settings</h3>

        <div className="grid-2">
          <div className="field">
            <label>Preferred Payout Method</label>
            <select defaultValue="Bank Transfer">
              <option>Bank Transfer</option>
              <option>PayPal</option>
              <option>Wise</option>
              <option>Crypto</option>
            </select>
          </div>

          <div className="field">
            <label>Bank Account/PayPal Email</label>
            <input defaultValue="your_payout@example.com" />
          </div>
        </div>
      </div>

      <div className="save-wrap">
        <button className="save-btn">Save Profile</button>
      </div>

    </div>
  );
}
