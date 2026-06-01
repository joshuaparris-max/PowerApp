import React, { useState } from "react";
import { font } from "../constants";

const terms = [
  ["Aftercare", "Care after a session to help both partners return to baseline.", "Without aftercare, tenderness, drop, and delayed feelings can be missed."],
  ["B/D", "Bondage and Discipline.", "Names one part of BDSM without assuming anything intense or advanced."],
  ["Bondage", "Consensual restraint, from gentle hand-holding to equipment-based restraint.", "Beginners should stay with simple, easy-release options and avoid complex rope."],
  ["Bottom", "The person receiving sensation, direction, or an agreed experience.", "A bottom is still an active decision-maker with full consent rights."],
  ["Check-in", "A pause to ask how each person is doing.", "Check-ins protect ongoing consent."],
  ["Collaring", "A symbolic commitment or role marker in some D/s relationships.", "It can carry emotional meaning and should not be rushed."],
  ["Consent", "A freely given, reversible, informed, enthusiastic, and specific yes.", "Marriage, silence, or not resisting never replaces consent."],
  ["CNC", "Consensual non-consent roleplay.", "This is not beginner territory and should stay off the table here."],
  ["D/s", "Dominance and Submission; consensual power exchange.", "It is negotiated trust, not abuse or entitlement."],
  ["Dom Drop", "A low, guilty, anxious, or tender feeling a dominant may experience afterwards.", "Both partners may need reassurance and care."],
  ["Dominant", "The partner who takes an agreed leading role.", "Leadership means responsibility, warmth, and immediate willingness to stop."],
  ["Drop", "An emotional or physical low after intensity or vulnerability.", "Planning aftercare reduces confusion and fear."],
  ["Fawn Response", "People-pleasing to avoid conflict or disappointment.", "Fawning is not consent."],
  ["Freeze Response", "Going still, quiet, or unable to speak under stress.", "Silence or stillness is a reason to stop and check in."],
  ["Green", "Traffic-light signal meaning comfortable and present.", "Green should be current, not assumed."],
  ["Hard Limit", "An absolute no.", "Hard limits are never negotiated in the moment."],
  ["Impact Play", "Sensation involving striking.", "Beginners should avoid heavy impact and stay safety-focused."],
  ["Kink", "A broad term for non-conventional intimacy or erotic interest.", "Curiosity does not create obligation."],
  ["Limit", "A boundary around what is wanted, unwanted, or not wise.", "Limits protect trust."],
  ["Maybe", "Curiosity without clear permission.", "Maybe means not tonight unless it becomes a clear mutual yes later."],
  ["Negotiation", "The conversation before any session about desires, limits, safewords, and care.", "The conversation is the main safety tool."],
  ["Non-verbal Signal", "A physical signal such as tapping when words are hard.", "It matters when someone freezes, shuts down, or cannot speak clearly."],
  ["Power Exchange", "An agreed temporary shift in leading and following.", "The person following remains fully empowered to stop."],
  ["PRICK", "Personal Responsibility, Informed Consensual Kink.", "Useful for stressing informed choices, but not a shortcut around care."],
  ["Protocol", "Agreed behaviours or rituals within a dynamic.", "Protocols should serve connection, not control or fear."],
  ["RACK", "Risk-Aware Consensual Kink.", "Better for experienced people; beginners should not use it to justify risk."],
  ["Red", "Stop immediately.", "Red means drop the role, offer warmth, no argument, no sulking, no persuasion."],
  ["Roleplay", "Taking on agreed roles or scenarios.", "Fantasy is not a plan and must remain easy to stop."],
  ["S/M", "Sadism and Masochism; consensual giving/receiving intense sensation.", "This is often irrelevant for beginners."],
  ["Safeword", "A pre-agreed word that changes or stops the scene.", "Safewords only work when both people are trustworthy."],
  ["Scene", "A bounded period of agreed activity or role.", "A scene needs a beginning, stop conditions, and aftercare."],
  ["Shutdown", "Becoming emotionally unreachable or disconnected.", "Shutdown is a stop sign, not something to push through."],
  ["Soft Limit", "A boundary that may change only with time, trust, and clear discussion.", "Soft limits are excluded from tonight unless they become a mutual yes later."],
  ["SSC", "Safe, Sane, Consensual.", "A clear beginner framework for keeping care central."],
  ["Sub Drop", "A low, vulnerable, sad, or flat feeling after surrendering control.", "It is common enough to plan care in advance."],
  ["Submissive", "The partner who follows within an agreed power exchange.", "Submission is not weakness and never removes agency."],
  ["Switch", "Someone who may enjoy leading or following at different times.", "Roles are preferences, not fixed moral identities."],
  ["Tap-out", "A physical stop signal.", "Useful when speaking is difficult."],
  ["Top", "The person giving sensation or direction.", "A top is responsible for safety and responsiveness."],
  ["Traffic Lights", "Green, Yellow, Red signals for ongoing consent.", "They make changing course normal."],
  ["Vanilla", "A term for non-kink intimacy.", "It should not be used as an insult."],
  ["Yellow", "Slow down, pause, check in, reduce intensity, or stop.", "Yellow protects trust before distress becomes Red."],
].map(([term, definition, why]) => ({ term, definition, why })).sort((a, b) => a.term.localeCompare(b.term));

export default function Glossary({ C, s }) {
  const [search, setSearch] = useState("");
  const filtered = terms.filter(t => `${t.term} ${t.definition} ${t.why}`.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ ...s.card, padding: "20px" }}>
      <span style={s.label}>Searchable Reference</span>
      <h3 style={{ fontFamily: font.serif, fontSize: 20, color: C.ink, marginBottom: 12 }}>Glossary</h3>
      <label style={{ ...s.label, letterSpacing: 1 }} htmlFor="glossary-search">Search terms</label>
      <input id="glossary-search" style={{ ...s.input, marginBottom: 16 }} placeholder="Search terminology..." value={search} onChange={e => setSearch(e.target.value)} />
      <div style={{ maxHeight: 360, overflowY: "auto", paddingRight: 8 }}>
        {filtered.length === 0 ? (
          <p style={{ ...s.p, fontSize: 14, fontStyle: "italic", textAlign: "center" }}>No matching terms found.</p>
        ) : filtered.map((t, i) => (
          <div key={t.term} style={{ marginBottom: 14, borderBottom: i < filtered.length - 1 ? `1px solid ${C.rule}` : "none", paddingBottom: 10 }}>
            <strong style={{ color: C.accent, fontSize: 15, display: "block", marginBottom: 4 }}>{t.term}</strong>
            <p style={{ ...s.p, fontSize: 13, marginBottom: 4, lineHeight: 1.5 }}>{t.definition}</p>
            <p style={{ ...s.p, fontSize: 12, marginBottom: 0, lineHeight: 1.5 }}><strong>Why it matters:</strong> {t.why}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
