import React, { useState } from "react";
import { font } from "../constants";

const terms = [
  { term: "Aftercare", definition: "The time spent caring for each other immediately following a session to help both partners return to baseline emotionally and physically." },
  { term: "B/D", definition: "Bondage and Discipline. The use of physical restraints or the establishment of rules and tasks." },
  { term: "Bondage", definition: "The consensual use of restraints like silk ties, scarves, or soft cuffs." },
  { term: "D/s", definition: "Dominance and Submission. A consensual exchange of power where one partner leads and the other surrenders control." },
  { term: "Dominant (Dom)", definition: "The partner who takes the lead and responsibility for directing the session and maintaining safety." },
  { term: "Hard Limit", definition: "Activities that are strictly off-limits and will never be explored. Non-negotiable boundaries." },
  { term: "Impact Play", definition: "Consensual physical sensation involving striking, such as light spanking or tapping." },
  { term: "Limits", definition: "Boundaries established during negotiation. Includes both Hard Limits (never) and Soft Limits (not now/conditional)." },
  { term: "Negotiation", definition: "The conversation that happens before a session to agree on activities, limits, safewords, and aftercare." },
  { term: "RACK", definition: "Risk-Aware Consensual Kink. A framework that acknowledges all activities carry some risk and focuses on informed consent." },
  { term: "S/M", definition: "Sadism and Masochism. Deriving pleasure from giving or receiving controlled physical sensation." },
  { term: "Safeword", definition: "A pre-agreed word (like 'Red') that instantly stops all activity when spoken." },
  { term: "Soft Limit", definition: "Activities that a partner is hesitant about, curious but not ready for, or only willing to try under specific conditions." },
  { term: "SSC", definition: "Safe, Sane, Consensual. The foundational safety framework for beginners." },
  { term: "Submissive (Sub)", definition: "The partner who consensually surrenders control to the Dominant for the duration of the session." },
  { term: "Switch", definition: "A person who enjoys both Dominant and Submissive roles at different times." },
  { term: "Vanilla", definition: "A term for conventional, non-kink intimacy." }
].sort((a, b) => a.term.localeCompare(b.term));

export default function Glossary({ C, s }) {
  const [search, setSearch] = useState("");

  const filtered = terms.filter(t => 
    t.term.toLowerCase().includes(search.toLowerCase()) || 
    t.definition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ ...s.card, padding: "20px" }}>
      <span style={s.label}>Searchable Reference</span>
      <h3 style={{ fontFamily: font.serif, fontSize: 20, color: C.ink, marginBottom: 12 }}>Glossary</h3>
      
      <input 
        style={{ ...s.input, marginBottom: 16 }} 
        placeholder="Search terminology..." 
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div style={{ maxHeight: "300px", overflowY: "auto", paddingRight: "8px" }}>
        {filtered.length === 0 ? (
          <p style={{ ...s.p, fontSize: 14, fontStyle: "italic", textAlign: "center" }}>No matching terms found.</p>
        ) : (
          filtered.map((t, i) => (
            <div key={i} style={{ marginBottom: 14, borderBottom: i < filtered.length - 1 ? `1px solid ${C.rule}` : "none", paddingBottom: 10 }}>
              <strong style={{ color: C.accent, fontSize: 15, display: "block", marginBottom: 4 }}>{t.term}</strong>
              <p style={{ ...s.p, fontSize: 13, marginBottom: 0, lineHeight: 1.5 }}>{t.definition}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
