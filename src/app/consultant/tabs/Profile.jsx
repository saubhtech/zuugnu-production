"use client";

export default function ProfileTab() {
  return (
    <div>
      <h1 className="page-title">My Profile & Settings</h1>
      <p className="page-sub">Manage consultant preferences & payout details</p>

      <div className="profile-card">
        <h3>Personal Information</h3>

        <div className="form-grid">
          <div><label>Full Name</label><input defaultValue="David Miller" /></div>
          <div><label>Email</label><input defaultValue="david.consultant@mail.com" /></div>
          <div><label>Phone</label><input defaultValue="+1 (555) 555-2222" /></div>
          <div><label>Profile Picture URL</label><input defaultValue="https://via.placeholder.com/40" /></div>
        </div>

        <h3>Payout Settings</h3>
        <div className="form-grid">
          <div><label>Payout Method</label><input defaultValue="Bank Transfer" /></div>
          <div><label>Billing Email</label><input defaultValue="payouts@consultant.com" /></div>
        </div>

        <button className="btn-primary mt20">Save Profile</button>
      </div>
    </div>
  );
}
