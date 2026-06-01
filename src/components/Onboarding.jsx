import React from "react";
import { font } from "../constants";

export default function Onboarding({ C, s, onComplete }) {
  return (
    <div style={{ ...s.page, textAlign: "center", animation: "fadeIn 0.5s ease-out" }}>
      <div style={{ margin: "40px 0" }}>
        <h1 style={{ ...s.h1, fontSize: 36 }}>Welcome to PowerApp</h1>
        <p style={{ ...s.p, fontSize: 18, color: C.accent }}>A careful guide for couples exploring beginner kink.</p>
      </div>

      <div style={{ ...s.card, textAlign: "left", padding: "24px" }}>
        <span style={s.label}>How to use this app</span>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 16 }}>
          {[
            { step: "1", title: "Learn Together", desc: "Start in the Learn tab. Read the safety frameworks and common beginner mistakes before doing anything else." },
            { step: "2", title: "Talk & Align", desc: "Use the Connect tab to have honest conversations and fill out your boundary worksheet separately." },
            { step: "3", title: "Build a Plan", desc: "Once you have mutual 'Yes' items, use the Prepare tab to build a specific plan for your session." },
            { step: "4", title: "Prioritize Care", desc: "Never skip aftercare. Use the Reflect tab immediately after and the next morning." }
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 16 }}>
              <div style={{ 
                width: 28, height: 28, borderRadius: "50%", background: C.ink, color: C.cream, 
                display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, flexShrink: 0
              }}>
                {item.step}
              </div>
              <div>
                <strong style={{ display: "block", fontSize: 16, marginBottom: 4 }}>{item.title}</strong>
                <p style={{ ...s.p, fontSize: 14, marginBottom: 0, opacity: 0.8 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ ...s.warnBox, textAlign: "left" }}>
        <p style={{ ...s.p, fontSize: 14, marginBottom: 0 }}>
          <strong>Privacy Note:</strong> This app stores data locally in this browser only. It is never sent to a server. For maximum privacy, use a private window or use the 'Panic Clear' button.
        </p>
      </div>

      <button onClick={onComplete} style={{ ...s.btn(), width: "100%", padding: "16px", fontSize: 18, marginTop: 20 }}>
        Begin Journey
      </button>
    </div>
  );
}
