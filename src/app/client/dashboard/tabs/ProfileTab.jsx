"use client";

export default function ProfileTab() {
  return (
    <div className="profile-wrap">
      <h1 className="page-title">My Profile & Settings</h1>
      <p className="page-sub">Manage your account information and preferences</p>

      <div className="profile-card">
        <h3>Company Information</h3>

        <div className="form-grid">
          <div><label>Company Name</label><input defaultValue="Nike Inc." /></div>
          <div><label>Industry</label><input defaultValue="Fashion & Apparel" /></div>
          <div><label>Website</label><input defaultValue="https://www.nike.com" /></div>
          <div><label>Company Logo URL</label><input defaultValue="https://via.placeholder.com/40" /></div>
        </div>

        <h3>Contact Person</h3>
        <div className="form-grid">
          <div><label>Full Name</label><input defaultValue="Jordan Smith" /></div>
          <div><label>Email</label><input defaultValue="client@nike.com" /></div>
          <div><label>Phone</label><input defaultValue="+1 (555) 123-4567" /></div>
        </div>

        <h3>Billing Information</h3>
        <div className="form-grid">
          <div><label>Billing Email</label><input defaultValue="billing@nike.com" /></div>
          <div><label>Tax ID/VAT Number</label><input defaultValue="US123456789" /></div>
        </div>

        <button className="primary-btn save">Save Profile</button>
      </div>
    </div>
  );
}
