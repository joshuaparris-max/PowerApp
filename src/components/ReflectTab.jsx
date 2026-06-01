import React, { useState, useEffect } from "react";
import { font } from "../constants";
import BreathingTool from "./BreathingTool";
import { getLocal, setLocal } from "../utils/storage";

const aftercareItems = [
  { category: "Physical", items: ["Get warm — blanket, close together", "Drink water", "Eat something light if needed", "Check for any physical discomfort", "Slow, synchronized breathing"] },
  { category: "Emotional", items: ["Reassure each other: 'I love you. You're safe.'", "Normalize whatever feelings arise", "No need to analyze right away — just be present", "Hold each other without pressure", "Validating the session, regardless of how it went"] },
  { category: "Optional", items: ["Quiet reflection or prayer together", "A warm drink", "Watch something light/gentle together", "Journal separately"] },
];

const debriefQuestions = [
  { q: "What felt connecting last night?", note: "Start with the positives." },
  { q: "Did you feel safe the whole time?", note: "If not, when did that change?" },
  { q: "Did you feel any pressure — even internal pressure?", note: "This is crucial for long-term safety." },
  { q: "Did you feel heard and respected?", note: "" },
  { q: "Is there anything you'd want to do differently?", note: "" },
  { q: "Did this session increase trust and closeness between us?", note: "Reflect on the long-term pattern." },
  { q: "Is there anything we should never repeat?", note: "Identifying new hard limits." },
];

export default function ReflectTab({ C, s }) {
  const [view, setView] = useState(() => getLocal("reflect_view", "menu"));
  const [answers, setAnswers] = useState(() => getLocal("reflect_answers", {}));
  const [notes, setNotes] = useState(() => getLocal("reflect_notes", ""));
  const [revealNotes, setRevealNotes] = useState(false);

  useEffect(() => {
    setLocal("reflect_view", view);
    setLocal("reflect_answers", answers);
    setLocal("reflect_notes", notes);
  }, [view, answers, notes]);

  if (view === "aftercare") return (
    <div style={s.page}>
      <button onClick={() => setView("menu")} style={{ ...s.btn("outline"), marginBottom: 20, fontSize: 13 }}>← Back to Menu</button>
      <p style={s.label}>Aftercare Guide</p>
      <h1 style={s.h1}>Care for Each Other</h1>
      <p style={s.p}>Aftercare is a necessary part of the session. Do this before sleeping.</p>
      
      <div style={s.safeBox}>
        <p style={{ ...s.p, fontSize: 14, marginBottom: 0 }}>
          Aftercare is for <strong>both</strong> of you. Both may feel tender, tired, or emotionally raw.
        </p>
      </div>

      <hr style={s.divider} />

      {aftercareItems.map(sec => (
        <div key={sec.category} style={{ marginBottom: 24 }}>
          <span style={s.label}>{sec.category}</span>
          {sec.items.map(item => (
            <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 0", borderBottom: `1px solid ${C.rule}` }}>
              <span style={{ color: C.accentLight, fontSize: 18, lineHeight: 1.2 }}>○</span>
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
      <button onClick={() => setView("menu")} style={{ ...s.btn("outline"), marginBottom: 20, fontSize: 13 }}>← Back to Menu</button>
      <p style={s.label}>Morning Debrief</p>
      <h1 style={s.h1}>Reflection</h1>
      <p style={s.p}>Find a quiet, neutral moment today to check in honestly.</p>

      {debriefQuestions.map((item, i) => (
        <div key={i} style={{ ...s.card, marginBottom: 12 }}>
          <p style={{ fontFamily: font.serif, fontSize: 18, color: C.ink, marginBottom: 6, fontStyle: "italic" }}>
            "{item.q}"
          </p>
          {item.note && <p style={{ ...s.p, fontSize: 12, color: C.muted, marginBottom: 10 }}>{item.note}</p>}
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
        <span style={s.label}>Private Notes (Local Only)</span>
        {!revealNotes ? (
          <button onClick={() => setRevealNotes(true)} style={{ ...s.btn("outline"), width: "100%", marginTop: 8 }}>
            Reveal Saved Notes
          </button>
        ) : (
          <>
            <textarea
              style={s.input}
              rows={4}
              placeholder="Any other private reflections..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
            <button onClick={() => setRevealNotes(false)} style={{ ...s.btn("outline"), width: "100%", fontSize: 12 }}>
              Hide Notes
            </button>
          </>
        )}
      </div>

      <div style={s.safeBox}>
        <p style={{ ...s.p, fontSize: 14, marginBottom: 0 }}>
          If any session leaves you feeling uneasy, flat, or disconnected, take it seriously. Slow down and consider professional support.
        </p>
      </div>
    </div>
  );

  return (
    <div style={s.page}>
      <p style={s.label}>Step 5</p>
      <h1 style={s.h1}>Reflect</h1>
      <p style={s.p}>Integration and care are what make this sustainable and healthy.</p>

      <hr style={s.divider} />

      <button onClick={() => setView("aftercare")} style={{
        ...s.card, width: "100%", textAlign: "left", cursor: "pointer", border: `1px solid ${C.rule}`, 
        display: "block", marginBottom: 16
      }}>
        <span style={s.label}>Immediate</span>
        <p style={{ fontFamily: font.serif, fontSize: 22, color: C.ink, marginBottom: 6 }}>Aftercare Guide</p>
        <p style={{ ...s.p, fontSize: 14, marginBottom: 0 }}>Physical and emotional care immediately following a session.</p>
      </button>

      <button onClick={() => setView("debrief")} style={{
        ...s.card, width: "100%", textAlign: "left", cursor: "pointer", border: `1px solid ${C.rule}`, 
        display: "block"
      }}>
        <span style={s.label}>Next Day</span>
        <p style={{ fontFamily: font.serif, fontSize: 22, color: C.ink, marginBottom: 6 }}>Morning Debrief</p>
        <p style={{ ...s.p, fontSize: 14, marginBottom: 0 }}>Reflect on safety, trust, and how the session affected your connection.</p>
      </button>

      <div style={{ ...s.warnBox, marginTop: 24 }}>
        <h3 style={{ ...s.label, color: C.warnBorder }}>Red Flags</h3>
        <ul style={{ color: C.softInk, paddingLeft: 18, lineHeight: 1.8, fontSize: 13, marginTop: 8 }}>
          {[
            "Pressure or obligation to continue",
            "Fear of saying 'not tonight'",
            "Safewords not being respected",
            "Dissociating or shutting down during play",
            "Feeling more alone after intimacy than before",
          ].map(f => <li key={f}>{f}</li>)}
        </ul>
      </div>
    </div>
  );
}
