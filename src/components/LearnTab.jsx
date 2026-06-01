import React, { useState, useEffect } from "react";
import { font } from "../constants";
import { Icon } from "./Icon";
import SafetyQuiz from "./SafetyQuiz";

export default function LearnTab({ C, s }) {
  const [open, setOpen] = useState(() => localStorage.getItem("learn_open") || null);

  useEffect(() => {
    if (open) {
      localStorage.setItem("learn_open", open);
    } else {
      localStorage.removeItem("learn_open");
    }
  }, [open]);

  const learnSections = [
    {
      id: "healthy",
      title: "Healthy vs. Unhealthy Dynamics",
      content: (
        <div>
          <div style={s.safeBox}>
            <span style={{ ...s.label, color: C.sage }}>Healthy</span>
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
            <span style={{ ...s.label, color: C.warnBorder }}>Unhealthy</span>
            <ul style={{ color: C.softInk, paddingLeft: 18, lineHeight: 1.8 }}>
              {["One person tolerates rather than wants",
                "Stopping causes sulking, silence, or pressure",
                "Limits are pushed or quietly ignored",
                "Either person fears the other's disappointment",
                "Creates shame, secrecy, or emotional distance"].map(t => <li key={t}>{t}</li>)}
            </ul>
          </div>
          <p style={s.p}>The defining test: can either person say "not tonight" freely, warmly, and without consequence? If yes, you are on safe ground.</p>
        </div>
      ),
    },
    {
      id: "frameworks",
      title: "Safety Frameworks",
      content: (
        <div>
          {[
            { name: "SSC", full: "Safe, Sane, Consensual", desc: "The original framework and the right one for beginners. Activities must be physically safe, approached with a clear mind, and fully agreed to by both people. Recommended as your primary framework.", tag: "Recommended for beginners" },
            { name: "4Cs", full: "Caring, Communication, Consent, Caution", desc: "Places ongoing care for one another at the centre. Pairs beautifully with SSC — ask not just 'did we consent?' but 'are we caring for each other through this?'", tag: "Excellent for couples" },
            { name: "RACK", full: "Risk-Aware Consensual Kink", desc: "Acknowledges that some activities carry unavoidable risk. Better suited to experienced practitioners. Not needed at beginner level.", tag: "Not for beginners" },
          ].map(fw => (
            <div key={fw.name} style={{ ...s.card, marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                <div>
                  <span style={{ fontFamily: font.serif, fontSize: 22, color: C.accent }}>{fw.name}</span>
                  <span style={{ fontSize: 13, color: C.muted, marginLeft: 8 }}>{fw.full}</span>
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
            <span style={{ ...s.label, color: C.warnBorder }}>⚑ These are off the table — always</span>
            <p style={{ ...s.p, fontSize: 14, marginBottom: 10 }}>The following practices are not appropriate for beginners under any circumstances. They require specialist training, carry serious medical risk, or have significant potential for lasting psychological harm.</p>
            <ul style={{ color: C.softInk, paddingLeft: 18, lineHeight: 2, fontSize: 14 }}>
              {[
                "Breath restriction, choking, or any neck compression",
                "Anything that restricts breathing in any way",
                "Suspension bondage or complex rope work",
                "Heavy impact play with implements",
                "Cutting, blood play, or needle play",
                "Electrical play of any kind",
                "Degradation or humiliation designed to wound",
                "Punishment dynamics or withholding affection",
                "Consensual non-consent (CNC) scenarios",
                "Anything done while intoxicated",
                "Anything copied directly from pornography",
                "Surprise escalation beyond agreed activities",
              ].map(t => <li key={t}>{t}</li>)}
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "consent",
      title: "Consent — The Foundation",
      content: (
        <div>
          {[
            ["Affirmative", "A clear, active yes — not the absence of no. Silence is not consent."],
            ["Enthusiastic", "Both people are genuinely looking forward to this. A hesitant 'if you want' is not enough."],
            ["Ongoing", "Consent must stay present throughout. A yes ten minutes ago is not a yes now."],
            ["Specific", "Agreeing to X does not mean agreeing to Y. Each activity needs its own agreement."],
            ["Revocable", "Any consent given can be withdrawn instantly, at any point, without consequence."],
          ].map(([type, desc]) => (
            <div key={type} style={{ ...s.card, marginBottom: 8 }}>
              <span style={{ ...s.label }}>{type} Consent</span>
              <p style={{ ...s.p, marginBottom: 0, fontSize: 14 }}>{desc}</p>
            </div>
          ))}
          <div style={s.safeBox}>
            <p style={{ ...s.p, marginBottom: 0, fontSize: 14 }}>
              <strong>"I said yes once" does not mean ongoing permission.</strong> Brief check-ins during any session — "Is this still good?" — are not interruptions. They are acts of love.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div style={s.page}>
      <p style={s.label}>Knowledge Base</p>
      <h1 style={s.h1}>Learn</h1>
      <p style={s.p}>Read these sections together or separately, fully clothed, outside the bedroom. Knowledge is the first safety tool.</p>
      
      <SafetyQuiz C={C} s={s} />
      
      <hr style={s.divider} />
      {learnSections.map(sec => (
        <div key={sec.id} style={{ marginBottom: 8 }}>
          <button
            onClick={() => setOpen(open === sec.id ? null : sec.id)}
            style={{
              width: "100%", textAlign: "left", background: open === sec.id ? C.ink : C.warmWhite,
              border: `1px solid ${open === sec.id ? C.ink : C.rule}`, borderRadius: 8,
              padding: "14px 16px", cursor: "pointer", display: "flex",
              justifyContent: "space-between", alignItems: "center",
              fontFamily: font.serif, fontSize: 17,
              color: open === sec.id ? C.cream : C.ink, transition: "all 0.2s",
            }}>
            {sec.title}
            <span style={{ color: open === sec.id ? C.accentLight : C.muted, display: "flex", alignItems: "center" }}>
              <Icon name="chevron" open={open === sec.id} />
            </span>
          </button>
          {open === sec.id && (
            <div style={{ background: C.cream, border: `1px solid ${C.rule}`, borderTop: "none", borderRadius: "0 0 8px 8px", padding: "16px 16px 8px" }}>
              {sec.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
