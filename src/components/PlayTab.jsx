import React, { useState, useEffect } from "react";
import { C, s, font } from "../constants";

const preflightItems = [
  "We have both completed the conversation guide",
  "We have compared our Yes/No/Maybe lists",
  "We have agreed on our safeword or traffic light system",
  "We have agreed on a non-verbal safe signal",
  "Neither of us has had alcohol or any substance tonight",
  "We have agreed what aftercare looks like for each of us",
  "We both genuinely want to be here — not obliging, not tolerating",
  "We both understand that stopping at any point is completely okay",
  "We are not carrying unresolved conflict into this evening",
];

export default function PlayTab() {
  const [checked, setChecked] = useState(() => JSON.parse(localStorage.getItem("play_checked")) || {});
  const allChecked = preflightItems.every((_, i) => checked[i]);

  useEffect(() => {
    localStorage.setItem("play_checked", JSON.stringify(checked));
  }, [checked]);

  const toggle = (i) => setChecked(p => ({ ...p, [i]: !p[i] }));

  return (
    <div style={s.page}>
      <p style={s.label}>Live Session Safety</p>
      <h1 style={s.h1}>Play</h1>

      {/* Traffic Light */}
      <h2 style={s.h2}>Safeword Dashboard</h2>
      <p style={{ ...s.p, fontSize: 13 }}>Keep this visible. Either partner can call any signal at any moment.</p>
      {[
        { color: "#1a5c2a", bg: "#d4edda", border: "#5a8a4a", word: "GREEN", meaning: "All is well — continue", sub: "Say 'green' during a check-in to confirm you're comfortable." },
        { color: "#7a5500", bg: "#fff3cd", border: "#c4a010", word: "YELLOW", meaning: "Slow down — check in", sub: "Something feels uncertain. Pause, talk gently, and decide together." },
        { color: "#7a1a1a", bg: "#f8d7da", border: "#c44a3a", word: "RED", meaning: "Stop immediately", sub: "Everything stops. No questions. Move close, check in, be warm. Red is the system working perfectly." },
      ].map(sw => (
        <div key={sw.word} style={{ background: sw.bg, border: `2px solid ${sw.border}`, borderRadius: 10, padding: "14px 16px", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
            <span style={{ fontFamily: font.sans, fontWeight: 900, fontSize: 18, color: sw.color, letterSpacing: 2 }}>{sw.word}</span>
            <span style={{ fontFamily: font.serif, fontSize: 16, color: sw.color }}>{sw.meaning}</span>
          </div>
          <p style={{ color: sw.color, fontSize: 13, margin: 0, lineHeight: 1.6, opacity: 0.85 }}>{sw.sub}</p>
        </div>
      ))}

      <div style={{ ...s.card, background: C.faithBg, border: `1px solid #c4aadd` }}>
        <span style={{ ...s.label, color: "#8a6aaa" }}>Non-Verbal Signal</span>
        <p style={{ ...s.p, fontSize: 14, marginBottom: 0 }}>
          Agree on a physical signal before starting — e.g., <strong>three firm squeezes</strong> of the hand, or <strong>tapping twice</strong> on the partner's arm. This is your Red signal when speaking feels difficult.
        </p>
      </div>

      <hr style={s.divider} />

      {/* Pre-Flight */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <h2 style={s.h2}>Pre-Flight Checklist</h2>
        <button onClick={() => setChecked({})} style={{ ...s.btn("outline"), padding: "4px 8px", fontSize: 11 }}>Reset</button>
      </div>
      <p style={{ ...s.p, fontSize: 13 }}>Complete every item before proceeding. This is not optional.</p>
      {preflightItems.map((item, i) => (
        <button key={i} onClick={() => toggle(i)} style={{
          ...s.card, width: "100%", textAlign: "left", cursor: "pointer",
          display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 14px",
          background: checked[i] ? C.sageBg : C.warmWhite,
          border: `1px solid ${checked[i] ? C.sage : C.rule}`,
          marginBottom: 6,
        }}>
          <div style={{
            width: 22, height: 22, borderRadius: 4, flexShrink: 0, marginTop: 1,
            background: checked[i] ? C.sage : "transparent",
            border: `2px solid ${checked[i] ? C.sage : C.rule}`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {checked[i] && <span style={{ color: "white", fontSize: 14, fontWeight: 900 }}>✓</span>}
          </div>
          <span style={{ color: checked[i] ? C.softInk : C.muted, fontSize: 14, lineHeight: 1.5 }}>{item}</span>
        </button>
      ))}

      <div style={{ marginTop: 20 }}>
        {allChecked
          ? (
            <div style={{ ...s.safeBox }}>
              <p style={{ ...s.p, fontFamily: font.serif, fontSize: 18, marginBottom: 0 }}>
                ✓ Pre-flight complete. You may proceed — gently, slowly, and with care for each other.
              </p>
            </div>
          ) : (
            <div style={s.warnBox}>
              <p style={{ ...s.p, fontSize: 14, marginBottom: 0 }}>
                {Object.values(checked).filter(Boolean).length} of {preflightItems.length} items checked. Complete all items before proceeding.
              </p>
            </div>
          )}
      </div>
    </div>
  );
}
