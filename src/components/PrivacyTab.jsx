import React, { useState } from "react";
import { font } from "../constants";
import { clearAllLocal } from "../utils/storage";

export default function PrivacyTab({ C, s }) {
  const [confirmClear, setConfirmClear] = useState(false);

  const handlePanicClear = () => {
    if (confirm("This will instantly delete ALL saved data, notes, and plans. This cannot be undone. Proceed?")) {
      clearAllLocal();
      window.location.reload();
    }
  };

  return (
    <div style={s.page}>
      <p style={s.label}>Data & Privacy</p>
      <h1 style={s.h1}>Privacy Policy</h1>
      <p style={s.p}>Your privacy and safety are the highest priority. Here is how your data is handled.</p>

      <div style={s.card}>
        <span style={s.label}>Local-Only Storage</span>
        <p style={{ ...s.p, fontSize: 14, marginBottom: 12 }}>
          All data you enter (notes, worksheet responses, plans) is stored <strong>only in your browser's local storage</strong>.
        </p>
        <ul style={{ color: C.softInk, paddingLeft: 18, lineHeight: 1.6, fontSize: 13 }}>
          <li>Nothing is ever sent to a server.</li>
          <li>We have no access to your data.</li>
          <li>No tracking or analytics are used.</li>
        </ul>
      </div>

      <div style={s.card}>
        <span style={s.label}>Device Swapping & Shared Access</span>
        <p style={{ ...s.p, fontSize: 14, marginBottom: 12 }}>
          PowerApp is built for <strong>device-swapping</strong>. Since all data is stored locally on this specific phone or computer:
        </p>
        <ul style={{ color: C.softInk, paddingLeft: 18, lineHeight: 1.6, fontSize: 13 }}>
          <li>One partner fills their worksheet, then passes the device to the other.</li>
          <li>You cannot 'sync' data between two different phones.</li>
          <li>This design ensures that your sensitive data never leaves your physical control.</li>
        </ul>
      </div>

      <div style={s.warnBox}>
        <span style={{ ...s.label, color: C.warnBorder }}>Device Security</span>
        <p style={{ ...s.p, fontSize: 14, marginBottom: 0 }}>
          Because data is stored in the browser, anyone with access to your device and this browser may be able to see your saved information.
        </p>
      </div>

      <div style={s.card}>
        <span style={s.label}>Data Management</span>
        <p style={{ ...s.p, fontSize: 14, marginBottom: 16 }}>
          You can clear your data at any time. Use this before sharing your device or if you want to start fresh.
        </p>
        
        <button 
          onClick={handlePanicClear}
          style={{ ...s.btn(), background: "#c44a3a", width: "100%", padding: "14px", marginBottom: 12 }}
        >
          Panic Clear: Delete All Data
        </button>
        
        <p style={{ ...s.p, fontSize: 12, textAlign: "center", color: C.muted, marginBottom: 0 }}>
          This will reset the app to its original state.
        </p>
      </div>

      <div style={s.card}>
        <span style={s.label}>Safety Disclaimer</span>
        <p style={{ ...s.p, fontSize: 13, marginBottom: 0, lineHeight: 1.6 }}>
          PowerApp is an educational tool. It is not a substitute for professional counseling, medical advice, or crisis support. If you feel unsafe, pressured, or coerced, please seek real-world support immediately from the resources listed in the Resources tab.
        </p>
      </div>
    </div>
  );
}
