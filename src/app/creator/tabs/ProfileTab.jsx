"use client";


export default function ProfileTab() {
  return (
    <div className="creator-tab-wrap">
      <h1 className="page-title">Profile & Settings</h1>
      <p className="page-sub">Manage personal info, portfolio & payouts</p>

      <div className="profile-card">
        <h3>Personal Details</h3>

        <div className="form-grid">
          <div><label>Full Name</label><input defaultValue="Sarah Chen" /></div>
          <div><label>Email</label><input defaultValue="sarah.chen@mail.com" /></div>
          <div><label>Phone</label><input defaultValue="+1 (555) 111-2222" /></div>
          <div><label>Profile Image URL</label><input defaultValue="https://via.placeholder.com/40" /></div>
        </div>

        <label>Bio / Intro</label>
        <textarea defaultValue="Creative short-form content creator specializing in reviews & reels." />

        <h3>Content Focus</h3>
        <div className="form-grid">
          <div><label>Content Type</label><input defaultValue="Reels & Short Videos" /></div>
          <div><label>Main Platforms</label><input defaultValue="Instagram, TikTok, YouTube" /></div>
          <div><label>Portfolio Link</label><input defaultValue="https://sarahchencreative.com" /></div>
        </div>

        <h3>Payout Settings</h3>
        <div className="form-grid">
          <div><label>Payout Method</label><input defaultValue="Stripe Connect" /></div>
          <div><label>Payout Email</label><input defaultValue="payout@sarah.com" /></div>
        </div>

        <button className="primary-btn mt20">Save Profile</button>
      </div>
    </div>
  );
}
