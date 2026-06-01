import React, { useState, useEffect } from "react";
import { C, s, font } from "../constants";

const aftercareItems = [
  { category: "Physical", items: ["Get warm — blanket, close together", "Drink water", "Eat something if needed", "Check for any physical discomfort or tenderness", "Slow breathing together"] },
  { category: "Emotional", items: ["Reassure each other: 'I love you. You're safe.'", "Normalise feelings — whatever you feel is okay", "'Nothing about stopping would disappoint me.'", "Hold each other without needing to analyse anything", "If either person is tearful, just hold them"] },
  { category: "Optional", items: ["Quiet prayer together if desired", "A warm drink and quiet time", "Watch something gentle together", "Write in a journal separately"] },
];

const debriefQuestions = [
  { q: "What felt connecting last night?", note: "Start here — name what was good." },
  { q: "Was there anything that felt uncomfortable or not quite right?", note: "Be honest, even if it's small." },
  { q: "Did you feel safe the whole time?", note: "If not — when did that change?" },
  { q: "Did you feel any pressure — to continue, or to not disappoint me?", note: "This is the most important question." },
  { q: "Did you feel heard and respected?", note: "" },
  { q: "Is there anything you'd want to do differently?", note: "" },
  { q: "Is there anything we should never repeat?", note: "Hard limits learned from experience." },
  { q: "How do you feel about us this morning?", note: "" },
  { q: "Is there anything you need from me today?", note: "End here — tend to each other." },
];

export default function ReflectTab() {
  const [view, setView] = useState(() => localStorage.getItem("reflect_view") || "menu");
  const [answers, setAnswers] = useState(() => JSON.parse(localStorage.getItem("reflect_answers")) || {});

  useEffect(() => {
    localStorage.setItem("reflect_view", view);
    localStorage.setItem("reflect_answers", JSON.stringify(answers));
  }, [view, answers]);

  if (view === "aftercare") return (
    <div style={s.page}>
      <button onClick={() => setView("menu")} style={{ ...s.btn("outline"), marginBottom: 20, fontSize: 13 }}>← Back</button>
      <p style={s.label}>Aftercare Guide</p>
      <h1 style={s.h1}>Care for Each Other</h1>
      <p style={s.p}>Aftercare is the final, necessary part of any intimate session. It is not optional. Do this before sleeping.</p>
      <div style={s.safeBox}>
        <p style={{ ...s.p, fontSize: 13, marginBottom: 0 }}>Aftercare is for both of you — not only the person in the following role. Both of you may feel tender, tired, or emotionally raw. Both deserve tending.</p>
      </div>
      <hr style={s.divider} />
      {aftercareItems.map(sec => (
        <div key={sec.category} style={{ marginBottom: 20 }}>
          <span style={s.label}>{sec.category}</span>
          {sec.items.map(item => (
            <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "9px 0", borderBottom: `1px solid ${C.rule}` }}>
              <span style={{ color: C.accentLight, fontSize: 18, lineHeight: 1.3 }}>○</span>
              <span style={{ color: C.softInk, fontSize: 14, lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  if (view === "debrief") return (
    <div style={s.page}>
      <button onClick={() => setView("menu")} style={{ ...s.btn("outline"), marginBottom: 20, fontSize: 13 }}>← Back</button>
      <p style={s.label}>Morning Debrief</p>
      <h1 style={s.h1}>The Next Morning</h1>
      <p style={s.p}>Find a quiet moment — not immediately on waking. Either of you can pass on any question.</p>
      <div style={{ ...s.card, background: C.faithBg, border: `1px solid #c4aadd`, marginBottom: 20 }}>
        <p style={{ ...s.p, fontSize: 13, marginBottom: 0 }}>
          If either of you feels sad, flat, or uneasy today — that may be a normal hormonal drop (see the Learn tab). But if unease persists, take it seriously and talk, or consider speaking to a counsellor.
        </p>
      </div>
      {debriefQuestions.map((item, i) => (
        <div key={i} style={{ ...s.card, marginBottom: 10 }}>
          <p style={{ fontFamily: font.serif, fontSize: 17, color: C.ink, marginBottom: 4, fontStyle: "italic" }}>
            "{item.q}"
          </p>
          {item.note && <p style={{ ...s.p, fontSize: 12, color: C.muted, marginBottom: 8 }}>{item.note}</p>}
          <textarea
            style={s.input}
            rows={2}
            placeholder="Write your thoughts..."
            value={answers[i] || ""}
            onChange={e => setAnswers(p => ({ ...p, [i]: e.target.value }))}
          />
        </div>
      ))}
      <div style={s.safeBox}>
        <p style={{ ...s.p, fontSize: 14, marginBottom: 0 }}>
          If the debrief surfaces anything uncomfortable or unresolved, that's important information. Slow down, have more conversation, and consider whether a kink-aware couples therapist would be a helpful next step.
        </p>
      </div>
    </div>
  );

  return (
    <div style={s.page}>
      <p style={s.label}>Aftercare &amp; Integration</p>
      <h1 style={s.h1}>Reflect</h1>
      <p style={s.p}>The session isn't over until you've cared for each other and checked in honestly.</p>
      <hr style={s.divider} />
      <button onClick={() => setView("aftercare")} style={{
        ...s.card, width: "100%", textAlign: "left", cursor: "pointer", border: `1px solid ${C.rule}`, display: "block", marginBottom: 12,
      }}>
        <span style={s.label}>Tonight</span>
        <p style={{ fontFamily: font.serif, fontSize: 20, color: C.ink, marginBottom: 4 }}>Aftercare Guide</p>
        <p style={{ ...s.p, fontSize: 13, marginBottom: 0 }}>Physical and emotional care for both partners after any session.</p>
      </button>
      <button onClick={() => setView("debrief")} style={{
        ...s.card, width: "100%", textAlign: "left", cursor: "pointer", border: `1px solid ${C.rule}`, display: "block",
      }}>
        <span style={s.label}>Next Morning</span>
        <p style={{ fontFamily: font.serif, fontSize: 20, color: C.ink, marginBottom: 4 }}>Morning Debrief</p>
        <p style={{ ...s.p, fontSize: 13, marginBottom: 0 }}>Nine gentle questions to work through together the day after.</p>
      </button>

      <hr style={s.divider} />
      <h2 style={{ ...s.h2, marginTop: 8 }}>Red Flags — Stop and Talk First</h2>
      <p style={{ ...s.p, fontSize: 13 }}>If any of the following are true, pause all exploration and have more honest conversation — ideally with a professional.</p>
      <div style={s.warnBox}>
        <ul style={{ color: C.softInk, paddingLeft: 18, lineHeight: 2, fontSize: 13 }}>
          {[
            "Either person feels pressured, obligated, or says yes to keep the peace",
            "Either person is afraid to say 'not tonight'",
            "One partner is doing the persuading or returning to the subject repeatedly",
            "Safewords are not fully respected when used",
            "Either person is dissociating, shutting down, or becoming unreachable",
            "Shame, secrecy, or conflict is increasing rather than decreasing",
            "Either person feels more alone after intimacy than before",
          ].map(f => <li key={f}>{f}</li>)}
        </ul>
      </div>

      <hr style={s.divider} />
      <button 
        onClick={() => {
          if (window.confirm("Are you sure you want to clear all app data? This cannot be undone.")) {
            localStorage.clear();
            window.location.reload();
          }
        }} 
        style={{ ...s.btn("outline"), width: "100%", color: "#c44a3a", borderColor: "#c44a3a" }}
      >
        Clear All App Data
      </button>
    </div>
  );
}
