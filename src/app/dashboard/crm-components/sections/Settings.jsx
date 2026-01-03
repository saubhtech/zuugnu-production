"use client";

import { useState } from "react";

export default function Settings() {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    setMessage("");

    // Validation
    if (!oldPassword || !newPassword || !confirmPassword) {
      setMessage("❌ Please fill all fields");
      return;
    }

    if (newPassword.length < 6) {
      setMessage("❌ New password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("❌ New passwords do not match");
      return;
    }

    if (oldPassword === newPassword) {
      setMessage("❌ New password must be different from old password");
      return;
    }

    setLoading(true);

    try {
      // Get user from localStorage
      const authUser = JSON.parse(localStorage.getItem("authUser") || "{}");
      
      if (!authUser.whatsapp) {
        setMessage("❌ User not logged in");
        setLoading(false);
        return;
      }

      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          whatsapp: authUser.whatsapp,
          oldPassword: oldPassword,
          newPassword: newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Password changed successfully!");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        
        // Close form after 2 seconds
        setTimeout(() => {
          setShowPasswordForm(false);
          setMessage("");
        }, 2000);
      } else {
        setMessage(`❌ ${data.error || "Failed to change password"}`);
      }
    } catch (error) {
      console.error("Password change error:", error);
      setMessage("❌ Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={headerSection}>
        <div>
          <h1 style={headingStyle}>⚙️ Settings</h1>
          <p style={subtitleStyle}>Configure your WhatsApp CRM settings.</p>
        </div>
      </div>

      <div style={cardsGrid}>
        {/* Change Password Section */}
        <div style={card}>
          <h3 style={cardTitleStyle}>🔐 Password Settings</h3>
          
          {!showPasswordForm ? (
            <div>
              <p style={cardTextStyle}>
                Keep your account secure by changing your password regularly.
              </p>
              <button 
                style={primaryBtn} 
                onClick={() => setShowPasswordForm(true)}
              >
                Change Password
              </button>
            </div>
          ) : (
            <div style={formStyle}>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Current Password</label>
                <input
                  type="password"
                  style={inputStyle}
                  placeholder="Enter current password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>New Password</label>
                <input
                  type="password"
                  style={inputStyle}
                  placeholder="Enter new password (min 6 chars)"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>Confirm New Password</label>
                <input
                  type="password"
                  style={inputStyle}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                />
              </div>

              {message && (
                <div style={{
                  ...messageStyle,
                  background: message.includes("✅") ? "#dcfce7" : "#fee2e2",
                  color: message.includes("✅") ? "#166534" : "#991b1b"
                }}>
                  {message}
                </div>
              )}

              <div style={buttonGroupStyle}>
                <button 
                  onClick={handleChangePassword}
                  style={primaryBtn}
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Password"}
                </button>
                <button 
                  style={secondaryBtn}
                  onClick={() => {
                    setShowPasswordForm(false);
                    setOldPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                    setMessage("");
                  }}
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Notification Settings */}
        <div style={card}>
          <h3 style={cardTitleStyle}>🔔 Notification Settings</h3>
          <p style={cardTextStyle}>
            Manage email and WhatsApp notifications for new messages, leads, and campaigns.
          </p>
          <div style={settingItemStyle}>
            <label style={switchLabelStyle}>
              <input type="checkbox" style={checkboxStyle} defaultChecked />
              <span>Email notifications</span>
            </label>
          </div>
          <div style={settingItemStyle}>
            <label style={switchLabelStyle}>
              <input type="checkbox" style={checkboxStyle} defaultChecked />
              <span>WhatsApp notifications</span>
            </label>
          </div>
          <div style={settingItemStyle}>
            <label style={switchLabelStyle}>
              <input type="checkbox" style={checkboxStyle} />
              <span>Desktop notifications</span>
            </label>
          </div>
        </div>

        {/* Profile Settings */}
        <div style={card}>
          <h3 style={cardTitleStyle}>👤 Profile Settings</h3>
          <p style={cardTextStyle}>
            Update your personal information and preferences.
          </p>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Display Name</label>
            <input
              type="text"
              style={inputStyle}
              placeholder="Your name"
              defaultValue="Admin"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              style={inputStyle}
              placeholder="admin@example.com"
            />
          </div>
          <button style={btn}>Update Profile</button>
        </div>

        {/* WhatsApp API Settings */}
        <div style={card}>
          <h3 style={cardTitleStyle}>📱 WhatsApp API</h3>
          <p style={cardTextStyle}>
            Configure your WhatsApp Business API connection and settings.
          </p>
          <div style={apiStatusStyle}>
            <span style={statusDotStyle}></span>
            <span>Connected</span>
          </div>
          <button style={secondaryBtn}>Reconnect API</button>
        </div>

        {/* Security Settings */}
        <div style={card}>
          <h3 style={cardTitleStyle}>🔒 Security & Privacy</h3>
          <p style={cardTextStyle}>
            Manage your security preferences and data privacy settings.
          </p>
          <div style={settingItemStyle}>
            <label style={switchLabelStyle}>
              <input type="checkbox" style={checkboxStyle} defaultChecked />
              <span>Two-factor authentication</span>
            </label>
          </div>
          <div style={settingItemStyle}>
            <label style={switchLabelStyle}>
              <input type="checkbox" style={checkboxStyle} defaultChecked />
              <span>Session timeout after 30 minutes</span>
            </label>
          </div>
          <button style={dangerBtn}>Clear All Data</button>
        </div>

        {/* Danger Zone */}
        <div style={{...card, borderLeft: "4px solid #ef4444"}}>
          <h3 style={{...cardTitleStyle, color: "#ef4444"}}>⚠️ Danger Zone</h3>
          <p style={cardTextStyle}>
            Irreversible actions. Please be certain before proceeding.
          </p>
          <button style={dangerBtn}>Delete Account</button>
        </div>
      </div>
    </div>
  );
}

// Styles
const containerStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  padding: "20px",
};

const headerSection = {
  marginBottom: "24px",
  paddingBottom: "16px",
  borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
};

const headingStyle = {
  fontSize: "32px",
  fontWeight: "bold",
  marginBottom: "8px",
  color: "#ffffff",
};

const subtitleStyle = {
  color: "rgba(255, 255, 255, 0.9)",
  marginBottom: "0",
};

const cardsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
  gap: "20px",
  maxWidth: "1400px",
  margin: "0 auto",
};

const card = {
  background: "#ffffff",
  padding: "24px",
  borderRadius: "16px",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  transition: "transform 0.2s, box-shadow 0.2s",
};

const cardTitleStyle = {
  fontSize: "20px",
  fontWeight: "600",
  marginBottom: "12px",
  color: "#1e293b",
};

const cardTextStyle = {
  color: "#64748b",
  marginBottom: "16px",
  lineHeight: "1.6",
  fontSize: "14px",
};

const formStyle = {
  marginTop: "20px",
};

const inputGroupStyle = {
  marginBottom: "16px",
};

const labelStyle = {
  display: "block",
  marginBottom: "6px",
  fontSize: "14px",
  fontWeight: "500",
  color: "#374151",
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  fontSize: "14px",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
  outline: "none",
};

const messageStyle = {
  padding: "12px 16px",
  borderRadius: "8px",
  marginBottom: "16px",
  fontSize: "14px",
  fontWeight: "500",
};

const buttonGroupStyle = {
  display: "flex",
  gap: "12px",
  marginTop: "20px",
  flexWrap: "wrap",
};

const primaryBtn = {
  padding: "10px 20px",
  background: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
  transition: "background 0.2s",
};

const secondaryBtn = {
  padding: "10px 20px",
  background: "#e5e7eb",
  color: "#374151",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
  transition: "background 0.2s",
};

const btn = {
  padding: "10px 16px",
  background: "#64748b",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
  transition: "background 0.2s",
};

const dangerBtn = {
  padding: "10px 16px",
  background: "#ef4444",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
  transition: "background 0.2s",
};

const settingItemStyle = {
  padding: "12px 0",
  borderBottom: "1px solid #e5e7eb",
};

const switchLabelStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  cursor: "pointer",
  fontSize: "14px",
  color: "#374151",
};

const checkboxStyle = {
  width: "18px",
  height: "18px",
  cursor: "pointer",
};

const apiStatusStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "16px",
  padding: "8px 12px",
  background: "#dcfce7",
  borderRadius: "8px",
  fontSize: "14px",
  color: "#166534",
  fontWeight: "500",
};

const statusDotStyle = {
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  background: "#22c55e",
};