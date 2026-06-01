import React from "react";

export default function Onboarding({ C, s, onComplete }) {
  return (
    <div style={{ ...s.page, textAlign: "center", animation: "fadeIn 0.5s ease-out" }}>
      <div style={{ margin: "40px 0" }}>
        <h1 style={{ ...s.h1, fontSize: 36 }}>Welcome to PowerApp</h1>
        <p style={{ ...s.p, fontSize: 18, color: C.accent }}>A private, safety-first guide for careful learning and conversation.</p>
      </div>
      <div style={{ ...s.warnBox, textAlign: "left" }}>
        <p style={{ ...s.p, fontSize: 14, marginBottom: 0 }}>
          This app is educational only. It does not replace consent, professional advice, counselling, crisis support, or real-world safety. If either of you feels pressured, afraid, coerced, or unable to say no, stop and seek support.
        </p>
      </div>
      <div style={{ ...s.card, textAlign: "left", padding: 24 }}>
        <span style={s.label}>Are you new to this topic?</span>
        <p style={{ ...s.p, fontSize: 14 }}>
          If yes, start with Learn. If you have already read the basics together, move to Connect for motive-first conversation.
        </p>
        <div style={{ display: "grid", gap: 12 }}>
          <button onClick={() => onComplete("learn")} style={{ ...s.btn(), width: "100%", padding: 16 }}>
            Yes, start with Learn
          </button>
          <button onClick={() => onComplete("connect")} style={{ ...s.btn("outline"), width: "100%", padding: 16 }}>
            We have the basics, go to Connect
          </button>
        </div>
      </div>
      <div style={{ ...s.safeBox, textAlign: "left" }}>
        <p style={{ ...s.p, fontSize: 14, marginBottom: 0 }}>
          Privacy: data stays in this browser's localStorage. Use Panic Clear before sharing or lending this device.
        </p>
      </div>
    </div>
  );
}
