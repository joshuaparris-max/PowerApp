import React, { useState, useEffect } from "react";
import { font } from "../constants";
import { Icon } from "./Icon";
import SafetyQuiz from "./SafetyQuiz";
import { getLocal, setLocal, removeLocal } from "../utils/storage";

export default function LearnTab({ C, s }) {
  const [open, setOpen] = useState(() => getLocal("learn_open", null));

  useEffect(() => {
    if (open) {
      setLocal("learn_open", open);
    } else {
      removeLocal("learn_open");
    }
  }, [open]);

  const learnSections = [
    {
      id: "healthy",
      title: "Healthy vs. Unhealthy Dynamics",
      content: (
        <div>
          <div style={s.safeBox}>
            <span style={{ ...s.label, color: C.sage }}>Healthy Dynamics</span>
            <ul style={{ color: C.softInk, paddingLeft: 18, lineHeight: 1.8 }}>
              {["Both people genuinely want to be here",
                "Either person can stop at any moment — no questions asked",
                "Limits are set in advance and respected completely",
                "Safewords are never mocked or ignored",
                "Honest debrief happens afterwards",
                "This brings you closer, not further apart"].map(t => <li key={t}>{t}</li>)}
            </ul>
          </div>
          <div style={s.warnBox}>
            <span style={{ ...s.label, color: C.warnBorder }}>Unhealthy Dynamics</span>
            <ul style={{ color: C.softInk, paddingLeft: 18, lineHeight: 1.8 }}>
              {["One person tolerates rather than wants",
                "Stopping causes sulking, silence, or pressure",
                "Limits are pushed or quietly ignored",
                "Either person fears the other's disappointment",
                "Creates shame, secrecy, or emotional distance"].map(t => <li key={t}>{t}</li>)}
            </ul>
          </div>
          <p style={s.p}>
            <strong>The defining test:</strong> Can either person say "not tonight" freely, warmly, and without consequence? If yes, you are on safe ground.
          </p>
        </div>
      ),
    },
    {
      id: "frameworks",
      title: "Safety Frameworks",
      content: (
        <div>
          {[
            { name: "SSC", full: "Safe, Sane, Consensual", desc: "Activities must be physically safe, approached with a clear mind, and fully agreed to by both people. The foundation for beginners.", tag: "Recommended for beginners" },
            { name: "4Cs", full: "Caring, Communication, Consent, Caution", desc: "Places ongoing care for one another at the centre. Ask: 'Are we caring for each other through this?'", tag: "Excellent for couples" },
            { name: "RACK", full: "Risk-Aware Consensual Kink", desc: "Acknowledges that some activities carry risk. Better suited to experienced practitioners who understand those specific risks.", tag: "Advanced" },
          ].map(fw => (
            <div key={fw.name} style={{ ...s.card, marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                <div>
                  <span style={{ fontFamily: font.serif, fontSize: 20, color: C.accent }}>{fw.name}</span>
                  <span style={{ fontSize: 12, color: C.muted, marginLeft: 8 }}>{fw.full}</span>
                </div>
                <span style={s.pill(fw.tag.includes("Rec") ? C.sage : fw.tag.includes("coup") ? C.accent : C.muted,
                  fw.tag.includes("Rec") ? C.sageBg : fw.tag.includes("coup") ? "#f5ede0" : C.warnBg)}>
                  {fw.tag}
                </span>
              </div>
              <p style={{ ...s.p, marginBottom: 0, fontSize: 14 }}>{fw.desc}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "limits",
      title: "Hard Boundaries — Do Not Cross",
      content: (
        <div>
          <div style={{ ...s.warnBox, borderLeftWidth: 5 }}>
            <span style={{ ...s.label, color: C.warnBorder }}>⚑ Strict Hard Limits for Beginners</span>
            <p style={{ ...s.p, fontSize: 14, marginBottom: 10 }}>These practices carry serious medical or psychological risk and are <strong>not appropriate for beginners</strong>.</p>
            <ul style={{ color: C.softInk, paddingLeft: 18, lineHeight: 1.8, fontSize: 14 }}>
              {[
                "Breath restriction, choking, or neck compression",
                "Anything that restricts breathing in any way",
                "Suspension bondage or complex rope work",
                "Heavy impact play with implements",
                "Cutting, blood play, or needle play",
                "Electrical play of any kind",
                "Degradation or humiliation designed to wound",
                "Punishment dynamics or withholding affection",
                "Anything done while intoxicated",
                "Anything copied directly from pornography",
              ].map(t => <li key={t}>{t}</li>)}
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "consent",
      title: "Consent Foundations",
      content: (
        <div>
          {[
            ["Affirmative", "A clear, active yes — not the absence of no. Silence is not consent."],
            ["Enthusiastic", "Both people are genuinely looking forward to this. Hesitation is a 'no'."],
            ["Ongoing", "Consent must stay present. A yes ten minutes ago is not a yes now."],
            ["Specific", "Agreeing to X does not mean agreeing to Y. Each activity needs its own agreement."],
            ["Revocable", "Consent can be withdrawn instantly, at any point, without consequence."],
          ].map(([type, desc]) => (
            <div key={type} style={{ ...s.card, marginBottom: 8 }}>
              <span style={{ ...s.label }}>{type} Consent</span>
              <p style={{ ...s.p, marginBottom: 0, fontSize: 14 }}>{desc}</p>
            </div>
          ))}
          <div style={s.safeBox}>
            <p style={{ ...s.p, marginBottom: 0, fontSize: 14 }}>
              <strong>"I said yes once" does not mean ongoing permission.</strong> Check-ins are not interruptions; they are acts of care.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div style={s.page}>
      <p style={s.label}>Step 1</p>
      <h1 style={s.h1}>Learn</h1>
      <p style={s.p}>Read these sections together fully clothed. Knowledge is the foundation of safety.</p>
      
      <SafetyQuiz C={C} s={s} />
      
      <hr style={s.divider} />
      {learnSections.map(sec => (
        <div key={sec.id} style={{ marginBottom: 8 }}>
          <button
            onClick={() => setOpen(open === sec.id ? null : sec.id)}
            aria-expanded={open === sec.id}
            style={{
              width: "100%", textAlign: "left", background: open === sec.id ? C.ink : C.warmWhite,
              border: `1px solid ${open === sec.id ? C.ink : C.rule}`, borderRadius: 8,
              padding: "16px", cursor: "pointer", display: "flex",
              justifyContent: "space-between", alignItems: "center",
              fontFamily: font.serif, fontSize: 18,
              color: open === sec.id ? C.cream : C.ink, transition: "all 0.2s",
            }}>
            {sec.title}
            <span style={{ color: open === sec.id ? C.accentLight : C.muted, display: "flex", alignItems: "center" }}>
              <Icon name="chevron" open={open === sec.id} />
            </span>
          </button>
          {open === sec.id && (
            <div style={{ 
              background: C.warmWhite, 
              border: `1px solid ${C.rule}`, 
              borderTop: "none", 
              borderRadius: "0 0 8px 8px", 
              padding: "16px 16px 8px",
              animation: "fadeIn 0.2s ease-out"
            }}>
              {sec.content}
            </div>
          )}
        </div>
      ))}
      
      <div style={{ ...s.safeBox, marginTop: 24 }}>
        <p style={{ ...s.p, fontSize: 14, marginBottom: 0, fontStyle: "italic" }}>
          "Stopping is the safety system working. A conversation-only evening is a successful evening."
        </p>
      </div>
    </div>
  );
}
