import React from "react";
import { useSelector } from "react-redux";
import { User } from "lucide-react";
import "../styles/settings.css";

const Settings = () => {
  const user = useSelector((state) => state.user?.user);

  const creatorName = user?.name || "Verified Creator";
  const creatorEmail = user?.emailId || "creator@example.com";
  const creatorRole = user?.role || "creator";
  const initials = creatorName.slice(0, 2).toUpperCase();

  return (
    <div className="settings-page-container">
      <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "20px", color: "var(--t-bright)" }}>
        Profile Overview
      </h2>

      {/* Profile Section */}
      <div className="settings-section-card">
        <div className="settings-section-title">
          <User size={18} style={{ color: "var(--t-accent)" }} />
          <span>Profile Details</span>
        </div>
        <p className="settings-section-desc">
          Your verified SINA Quotes publisher credentials.
        </p>

        <div className="profile-settings-grid">
          <div className="profile-settings-avatar">{initials}</div>
          <div className="profile-settings-fields">
            <div className="settings-field-group">
              <label className="settings-field-label">Display Name</label>
              <input
                type="text"
                className="settings-field-input"
                value={creatorName}
                disabled
              />
            </div>
            <div className="settings-field-group">
              <label className="settings-field-label">Email Address</label>
              <input
                type="email"
                className="settings-field-input"
                value={creatorEmail}
                disabled
              />
            </div>
            <div className="settings-field-group" style={{ gridColumn: "1 / -1" }}>
              <label className="settings-field-label">Account Role</label>
              <input
                type="text"
                className="settings-field-input"
                value={creatorRole.toUpperCase()}
                disabled
                style={{ fontWeight: "700", letterSpacing: "0.05em" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;