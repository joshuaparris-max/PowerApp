import React, { useState } from "react";
import { font } from "../constants";
import BreathingTool from "./BreathingTool";

const checkInPrompts = [
  "How are you feeling right now?",
  "Is the pace okay for you?",
  "Are you still finding this enjoyable?",
  "Do we need to pause for a moment?",
  "Is there anything you want to change?"
];

const groundingPrompts = [
  "Can you feel the bed/chair/floor beneath you?",
  "Look at me — are you here with me?",
  "What is one thing you can hear right now?",
  "Take a slow breath with me.",
  "What do you need right now? (Water, warmth, quiet, closeness?)"
];

export default function SessionTab({ C, s }) {
  const [showGrounding, setShowGrounding] = useState(false);
  const [ended, setEnded] = useState(false);

  return (
    <div style={s.page}>
      <p style={s.label}>Step 4</p>
      <h1 style={s.h1}>Session Safety</h1>
      <p style={s.p}>Keep this screen visible. Either partner can call a signal at any moment.</p>

      {/* Traffic Light Dashboard */}
      <div style={{ marginBottom: 24 }}>
        {[
          { color: "#1a5c2a", bg: "#d4edda", border: "#5a8a4a", word: "GREEN", meaning: "Continue", sub: "All is well. We are both comfortable, present, and enjoying this." },
          { color: "#7a5500", bg: "#fff3cd", border: "#c4a010", word: "YELLOW", meaning: "Pause and check in", sub: "Slow down, reduce intensity, change course, or stop if either person wants. No justification needed." },
          { color: "#7a1a1a", bg: "#f8d7da", border: "#c44a3a", word: "RED", meaning: "Stop now", sub: "Stop immediately, drop the role, offer warmth, no argument, no sulking, no persuasion, no justification needed." },
        ].map(sw => (
          <div key={sw.word} style={{ 
            background: sw.bg, 
            border: `2px solid ${sw.border}`, 
            borderRadius: 12, 
            padding: "16px", 
            marginBottom: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
              <span style={{ fontFamily: font.sans, fontWeight: 900, fontSize: 18, color: sw.color, letterSpacing: 2 }}>{sw.word}</span>
              <span style={{ fontFamily: font.serif, fontSize: 18, color: sw.color, fontWeight: 500 }}>— {sw.meaning}</span>
            </div>
            <p style={{ color: sw.color, fontSize: 14, margin: 0, lineHeight: 1.5, opacity: 0.85 }}>{sw.sub}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(145px, 1fr))", gap: 10, marginBottom: 24 }}>
        <button 
          onClick={() => alert("Check-in requested. Slow down and talk.")}
          style={{ ...s.btn(), background: "#c4a010", borderColor: "#c4a010" }}
        >
          Check colour now
        </button>
        <button 
          onClick={() => setShowGrounding(!showGrounding)}
          style={s.btn("outline")}
        >
          Pause and breathe
        </button>
        <button
          onClick={() => setEnded(true)}
          style={{ ...s.btn("outline"), color: "#c44a3a", borderColor: "#c44a3a" }}
        >
          End session now
        </button>
        <button
          onClick={() => alert("Move to aftercare: water, warmth, reassurance, quiet, and no immediate analysis.")}
          style={{ ...s.btn("outline"), color: C.sage, borderColor: C.sage }}
        >
          Move to aftercare
        </button>
      </div>

      {ended && (
        <div style={s.safeBox}>
          <p style={{ ...s.p, fontSize: 14, marginBottom: 0 }}>
            Session ended. This is a successful safety outcome. Move to aftercare: water, warmth, reassurance, and gentle closeness if wanted.
          </p>
        </div>
      )}

      {showGrounding && (
        <div style={{ ...s.card, background: C.faithBg, border: `1px solid ${C.accentLight}`, marginBottom: 24, animation: "fadeIn 0.2s ease-out" }}>
          <span style={s.label}>Grounding Prompts</span>
          <BreathingTool C={C} s={s} />
          <p style={{ ...s.p, fontSize: 13, marginBottom: 12 }}>Use these if someone feels overwhelmed, floaty, or disconnected.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {groundingPrompts.map((p, i) => (
              <div key={i} style={{ 
                padding: "10px 14px", 
                background: C.warmWhite, 
                borderRadius: 6, 
                fontSize: 14, 
                color: C.softInk,
                border: `1px solid ${C.rule}`,
                fontStyle: "italic"
              }}>
                "{p}"
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ ...s.card, background: C.faithBg, border: `1px solid ${C.accentLight}`, marginBottom: 24 }}>
        <span style={{ ...s.label, color: C.accent }}>Non-Verbal Reminder</span>
        <p style={{ ...s.p, fontSize: 14, marginBottom: 0 }}>
          If speaking is difficult, use your agreed physical signal (e.g., <strong>double tap</strong> or <strong>triple squeeze</strong>). This is your Red signal.
        </p>
      </div>

      <div style={s.card}>
        <span style={s.label}>Ongoing Check-in Prompts</span>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
          {checkInPrompts.map((p, i) => (
            <div key={i} style={{ 
              padding: "10px 14px", 
              background: C.warmWhite, 
              borderRadius: 6, 
              fontSize: 14, 
              color: C.softInk,
              border: `1px solid ${C.rule}`,
              fontStyle: "italic"
            }}>
              "{p}"
            </div>
          ))}
        </div>
      </div>

      <div style={{ ...s.warnBox, marginTop: 24 }}>
        <p style={{ ...s.p, fontSize: 14, marginBottom: 0 }}>
          <strong>Red is the system working.</strong> If anyone calls Red, stop immediately, move close, and prioritize emotional care.
        </p>
      </div>
    </div>
  );
}
