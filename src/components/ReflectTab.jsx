import React, { useEffect, useState } from "react";
import { font } from "../constants";
import BreathingTool from "./BreathingTool";
import { getLocal, setLocal } from "../utils/storage";

const aftercareItems = [
  { category: "Physical", items: ["Get warm with a blanket or comfortable clothes", "Drink water", "Eat something light if needed", "Check for numbness, pain, tenderness, or discomfort", "Slow, synchronized breathing"] },
  { category: "Emotional", items: ["Reassure each other: 'I love you. You are safe. I'm glad you trusted me.'", "Normalize whatever feelings arise", "No immediate analysis unless both want it", "Comfort touch if wanted", "Remind each other: we can stop anytime"] },
  { category: "Together", items: ["Quiet closeness", "A warm drink", "Gentle conversation", "Prayer if desired", "Agree when to debrief tomorrow"] },
  { category: "Solo", items: ["Journal privately", "Rest without having to explain everything", "Notice emotional flatness or unease", "Ask for support if feelings persist"] },
];

const debriefQuestions = [
  { q: "What felt connecting last night?", note: "Start with what was good." },
  { q: "What felt awkward or not quite right?", note: "Small discomforts are useful information." },
  { q: "Did anything feel unsafe?", note: "If yes, slow down and talk before any future plan." },
  { q: "Did you feel any pressure, even internal pressure?", note: "Pressure is a reason to pause future exploration." },
  { q: "Did either of us push past a Yellow?", note: "Yellow means pause, reduce intensity, change course, or stop." },
  { q: "Did this bring us closer or create distance?", note: "" },
  { q: "What should we never repeat?", note: "Add this to hard limits." },
  { q: "What do we need today?", note: "Rest, reassurance, space, conversation, prayer, or support." },
  { q: "How do we feel before God / in our conscience this morning?", note: "If either conscience feels unsettled, patience is the faithful move." },
];

const redFlagChecks = [
  "I felt pressured, obligated, or afraid to disappoint",
  "I felt unsafe, panicked, dissociated, shut down, frozen, or fawning",
  "A safeword, Yellow, or hesitation was not fully respected",
  "I feel ashamed, more alone, or spiritually uneasy afterwards",
];

export default function ReflectTab({ C, s }) {
  const [view, setView] = useState(() => getLocal("reflect_view", "menu"));
  const [answers, setAnswers] = useState(() => getLocal("reflect_answers", {}));
  const [notes, setNotes] = useState(() => getLocal("reflect_notes", ""));
  const [flags, setFlags] = useState(() => getLocal("reflect_flags", {}));
  const [revealNotes, setRevealNotes] = useState(false);

  useEffect(() => {
    setLocal("reflect_view", view);
    setLocal("reflect_answers", answers);
    setLocal("reflect_notes", notes);
    setLocal("reflect_flags", flags);
  }, [view, answers, notes, flags]);

  if (view === "aftercare") return (
    <div style={s.page}>
      <button onClick={() => setView("menu")} style={{ ...s.btn("outline"), marginBottom: 20, fontSize: 13 }}>Back to Menu</button>
      <p style={s.label}>Aftercare Guide</p>
      <h1 style={s.h1}>Care for Both Partners</h1>
      <p style={s.p}>Aftercare is part of the session. It is for both of you, not only the person who followed.</p>
      <div style={s.safeBox}>
        <p style={{ ...s.p, fontSize: 14, marginBottom: 0 }}>
          Suggested words: "I love you. You are safe. I'm glad you trusted me. We can stop anytime."
        </p>
      </div>
      <hr style={s.divider} />
      {aftercareItems.map(sec => (
        <div key={sec.category} style={{ marginBottom: 24 }}>
          <span style={s.label}>{sec.category}</span>
          {sec.items.map(item => (
            <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 0", borderBottom: `1px solid ${C.rule}` }}>
              <span style={{ color: C.accentLight, fontSize: 18, lineHeight: 1.2 }}>o</span>
              <span style={{ color: C.softInk, fontSize: 15, lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>
      ))}
      <BreathingTool C={C} s={s} />
    </div>
  );

  if (view === "debrief") return (
    <div style={s.page}>
      <button onClick={() => setView("menu")} style={{ ...s.btn("outline"), marginBottom: 20, fontSize: 13 }}>Back to Menu</button>
      <p style={s.label}>Morning Debrief</p>
      <h1 style={s.h1}>Reflection</h1>
      <p style={s.p}>Find a quiet, neutral moment today. Either of you may pass on any question.</p>
      {debriefQuestions.map((item, i) => (
        <div key={item.q} style={{ ...s.card, marginBottom: 12 }}>
          <p style={{ fontFamily: font.serif, fontSize: 18, color: C.ink, marginBottom: 6, fontStyle: "italic" }}>
            "{item.q}"
          </p>
          {item.note && <p style={{ ...s.p, fontSize: 12, color: C.muted, marginBottom: 10 }}>{item.note}</p>}
          <label style={{ ...s.label, letterSpacing: 1 }}>Response</label>
          <textarea
            style={s.input}
            rows={2}
            placeholder="Your thoughts..."
            value={answers[i] || ""}
            onChange={e => setAnswers(p => ({ ...p, [i]: e.target.value }))}
          />
        </div>
      ))}
      <div style={s.card}>
        <span style={s.label}>Red flag check</span>
        {redFlagChecks.map((flag, i) => (
          <label key={flag} style={{ display: "flex", gap: 10, alignItems: "flex-start", color: C.softInk, fontSize: 14, marginBottom: 10 }}>
            <input type="checkbox" checked={Boolean(flags[i])} onChange={e => setFlags(p => ({ ...p, [i]: e.target.checked }))} />
            <span>{flag}</span>
          </label>
        ))}
      </div>
      {Object.values(flags).some(Boolean) && (
        <div style={s.warnBox}>
          <span style={{ ...s.label, color: C.warnBorder }}>Red flag detected</span>
          <p style={{ ...s.p, fontSize: 14, marginBottom: 8 }}>
            Stop exploring for now. Talk gently, do not persuade, and consider a qualified counsellor, sex therapist, or kink-aware therapist.
          </p>
          <p style={{ ...s.p, fontSize: 14, marginBottom: 0 }}>
            If there is fear, coercion, abuse, or danger, use the Australian support resources in the Resources tab.
          </p>
        </div>
      )}
      <div style={s.card}>
        <span style={s.label}>Private Notes (Local Only)</span>
        {!revealNotes ? (
          <button onClick={() => setRevealNotes(true)} style={{ ...s.btn("outline"), width: "100%", marginTop: 8 }}>Reveal Saved Notes</button>
        ) : (
          <>
            <textarea style={s.input} rows={4} placeholder="Any other private reflections..." value={notes} onChange={e => setNotes(e.target.value)} />
            <button onClick={() => setRevealNotes(false)} style={{ ...s.btn("outline"), width: "100%", fontSize: 12 }}>Hide Notes</button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div style={s.page}>
      <p style={s.label}>Step 5</p>
      <h1 style={s.h1}>Reflect</h1>
      <p style={s.p}>Integration and care are what make this sustainable and healthy.</p>
      <hr style={s.divider} />
      <button onClick={() => setView("aftercare")} style={{ ...s.card, width: "100%", textAlign: "left", cursor: "pointer", border: `1px solid ${C.rule}`, display: "block", marginBottom: 16 }}>
        <span style={s.label}>Immediate</span>
        <p style={{ fontFamily: font.serif, fontSize: 22, color: C.ink, marginBottom: 6 }}>Aftercare Guide</p>
        <p style={{ ...s.p, fontSize: 14, marginBottom: 0 }}>Physical, emotional, solo, and together care after a session.</p>
      </button>
      <button onClick={() => setView("debrief")} style={{ ...s.card, width: "100%", textAlign: "left", cursor: "pointer", border: `1px solid ${C.rule}`, display: "block" }}>
        <span style={s.label}>Next Day</span>
        <p style={{ fontFamily: font.serif, fontSize: 22, color: C.ink, marginBottom: 6 }}>Morning Debrief</p>
        <p style={{ ...s.p, fontSize: 14, marginBottom: 0 }}>Reflect on pressure, safety, trust, conscience, and what should never repeat.</p>
      </button>
      <div style={{ ...s.warnBox, marginTop: 24 }}>
        <h3 style={{ ...s.label, color: C.warnBorder }}>Red Flags</h3>
        <ul style={{ color: C.softInk, paddingLeft: 18, lineHeight: 1.8, fontSize: 13, marginTop: 8 }}>
          {["Pressure or obligation to continue", "Fear of saying not tonight", "Safewords or Yellow not being respected", "Dissociating, fawning, freezing, or shutting down", "Feeling more alone after intimacy than before"].map(f => <li key={f}>{f}</li>)}
        </ul>
      </div>
    </div>
  );
}
