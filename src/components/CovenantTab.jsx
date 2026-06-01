import React, { useState } from "react";
import { font } from "../constants";

const activities = [
  { name: "Light sensory touch with feathers or soft fabrics", level: "Gentle" },
  { name: "Guided massage with warm oils", level: "Connecting" },
  { name: "Blindfold for heightened trust", level: "Trust-building" },
  { name: "Gentle restraint with silk ties", level: "Surrender" },
  { name: "Spanking with open hand (light)", level: "Discipline" },
  { name: "Verbal guidance and instruction", level: "Leadership" },
  { name: "Prolonged teasing and edging", level: "Intimate Control" }
];

const inspirations = {
  "leadership": "The husband gently leads his wife into a space of deep surrender. He guides her movements and helps her release control in a loving, protective way.",
  "surrender": "The wife offers her trust completely, allowing her husband to take loving authority over her body and pleasure, strengthening their covenant bond.",
  "sensual": "The couple explores heightened sensory experiences — soft touches, temperature play, and focused attention — all while maintaining eye contact and prayerful connection."
};

export default function CovenantTab({ C, s }) {
  const [activeTab, setActiveTab] = useState(0);
  const [mood, setMood] = useState("leadership");
  const [sceneText, setSceneText] = useState("");

  const generateScene = () => {
    const text = inspirations[mood] + 
      " Begin and end with prayer. Use safewords if anything feels uncomfortable. Prioritize aftercare, emotional connection, and mutual honor.";
    setSceneText(text);
  };

  const amberStyle = {
    card: {
      background: "rgba(255, 248, 240, 0.95)",
      border: "1px solid #d4b89f",
      borderRadius: "24px",
      padding: "24px",
      marginBottom: "16px"
    },
    h1: {
      fontFamily: font.serif,
      fontSize: "32px",
      color: "#78350f",
      textAlign: "center",
      marginBottom: "8px"
    },
    sub: {
      textAlign: "center",
      color: "#92400e",
      fontSize: "14px",
      marginBottom: "24px"
    },
    nav: {
      display: "flex",
      gap: "8px",
      overflowX: "auto",
      paddingBottom: "12px",
      marginBottom: "24px",
      borderBottom: "1px solid #fcd34d"
    },
    tabBtn: (active) => ({
      padding: "8px 16px",
      whiteSpace: "nowrap",
      color: active ? "#78350f" : "#92400e",
      borderBottom: active ? "3px solid #78350f" : "3px solid transparent",
      fontWeight: active ? "700" : "400",
      background: "none",
      fontSize: "14px"
    })
  };

  return (
    <div style={{ ...s.page, background: "linear-gradient(180deg, #f8f1e3 0%, #f3e8d8 100%)", minHeight: "100vh" }}>
      <header style={{ padding: "24px 0" }}>
        <h1 style={amberStyle.h1}>COVENANTPOWER</h1>
        <p style={amberStyle.sub}>Leadership • Submission • Sacred Intimacy</p>
        <div style={{ textAlign: "center" }}>
          <span style={{ 
            fontSize: "11px", color: "#92400e", background: "#fef3c7", 
            border: "1px solid #fcd34d", padding: "4px 12px", borderRadius: "20px" 
          }}>
            For Married Couples • Built on Love, Respect & Biblical Truth
          </span>
        </div>
      </header>

      <nav style={amberStyle.nav}>
        {["Home", "Inspiration", "Inventory", "Planning", "Prayer"].map((label, i) => (
          <button key={i} onClick={() => setActiveTab(i)} style={amberStyle.tabBtn(activeTab === i)}>
            {label}
          </button>
        ))}
      </nav>

      {activeTab === 0 && (
        <div style={amberStyle.card}>
          <h2 style={{ ...amberStyle.h1, fontSize: "24px", marginBottom: "16px" }}>Sacred Power Exchange</h2>
          <p style={{ ...s.p, textAlign: "center", color: "#451a03", lineHeight: "1.6" }}>
            CovenantPower helps married couples explore loving leadership and willing submission in the marriage bed. 
            All activities are grounded in mutual consent, safety, and the biblical call to love and honor one another.
          </p>
          <p style={{ ...s.p, fontSize: "12px", color: "#92400e", textAlign: "center", fontStyle: "italic", marginTop: "16px" }}>
            "Wives, submit to your own husbands as you do to the Lord... Husbands, love your wives, just as Christ loved the church." — Ephesians 5:22,25
          </p>
        </div>
      )}

      {activeTab === 1 && (
        <div>
          <h2 style={{ ...amberStyle.h1, fontSize: "24px", textAlign: "left" }}>Scene Inspiration</h2>
          <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
            <select 
              value={mood} 
              onChange={(e) => setMood(e.target.value)}
              style={{ ...s.input, flex: 1, background: "#fffbeb", borderColor: "#fcd34d" }}
            >
              <option value="leadership">Loving Leadership</option>
              <option value="surrender">Willing Surrender</option>
              <option value="sensual">Deep Sensory Connection</option>
            </select>
            <button onClick={generateScene} style={{ ...s.btn(), background: "#78350f" }}>
              Receive
            </button>
          </div>
          {sceneText && (
            <div style={{ ...amberStyle.card, minHeight: "150px" }}>
              <p style={{ ...s.p, color: "#451a03", lineHeight: "1.6", margin: 0 }}>{sceneText}</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 2 && (
        <div>
          <h2 style={{ ...amberStyle.h1, fontSize: "24px", textAlign: "left" }}>Intimacy Inventory</h2>
          <div style={{ display: "grid", gap: "12px" }}>
            {activities.map((act, i) => (
              <div key={i} style={{ ...amberStyle.card, padding: "16px", marginBottom: 0 }}>
                <div style={{ fontWeight: "700", color: "#451a03" }}>{act.name}</div>
                <div style={{ fontSize: "12px", color: "#92400e", marginTop: "4px" }}>Level: {act.level}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 3 && (
        <div>
          <h2 style={{ ...amberStyle.h1, fontSize: "24px", textAlign: "left" }}>Session Planning</h2>
          <textarea 
            style={{ ...s.input, height: "200px", background: "#fffbeb", borderColor: "#fcd34d" }} 
            placeholder="Desired roles... Atmosphere... Boundaries... Aftercare wishes..."
          />
          <button onClick={() => alert("Plan saved locally.")} style={{ ...s.btn(), background: "#78350f", width: "100%", marginTop: "12px" }}>
            Save Plan
          </button>
        </div>
      )}

      {activeTab === 4 && (
        <div>
          <h2 style={{ ...amberStyle.h1, fontSize: "24px", textAlign: "left" }}>Prayer & Reflection</h2>
          <div style={amberStyle.card}>
            <p style={{ fontWeight: "700", fontSize: "14px", color: "#78350f", marginBottom: "8px" }}>Prayer Prompt:</p>
            <p style={{ ...s.p, fontStyle: "italic", color: "#451a03" }}>
              "Lord, guide us in our intimacy. Let our love reflect Your covenant. Help us lead and submit with humility and joy."
            </p>
            <textarea 
              style={{ ...s.input, height: "150px", marginTop: "16px", background: "#fffbeb", borderColor: "#fcd34d" }} 
              placeholder="Write your reflections, thanks, or prayers..."
            />
          </div>
        </div>
      )}
    </div>
  );
}
