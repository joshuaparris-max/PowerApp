import React, { useState, useEffect } from "react";
import { font } from "../constants";

const conversationCards = [
  { prompt: "What made you curious about exploring this together?", category: "Curiosity" },
  { prompt: "What would you most like this to add to our relationship?", category: "Curiosity" },
  { prompt: "What are you nervous or uncertain about?", category: "Fears" },
  { prompt: "Is there anything you're afraid I might want that you wouldn't be comfortable with?", category: "Fears" },
  { prompt: "What does 'feeling safe' look like for you during intimacy?", category: "Safety" },
  { prompt: "What would make you feel free to stop at any moment?", category: "Safety" },
  { prompt: "Are there past experiences or sensitivities we should protect against?", category: "History" },
  { prompt: "How do your values or faith shape what feels loving — or not loving — here?", category: "Values" },
  { prompt: "What is completely off the table for you — no exceptions?", category: "Limits" },
  { prompt: "What would loving aftercare look like for you tonight?", category: "Aftercare" },
  { prompt: "If tonight ends with just a good conversation, how would you feel about that?", category: "Expectations" },
];

const beginner_activities = [
  { id: "tone", label: "Tone of voice changes, playful instruction", category: "Atmosphere" },
  { id: "lead", label: "One partner chooses music, lighting, and pace", category: "Atmosphere" },
  { id: "words", label: "Agreed words of endearment during intimacy", category: "Atmosphere" },
  { id: "massage", label: "Massage with intentional, unhurried attention", category: "Sensation" },
  { id: "blindfold", label: "Blindfold (sleep mask) to heighten other senses", category: "Sensation" },
  { id: "light_touch", label: "Light sensation — soft fabric, fingertips", category: "Sensation" },
  { id: "temp", label: "Temperature play — ice cube or warm touch, gently", category: "Sensation" },
  { id: "hold", label: "Hands gently held (no binding)", category: "Gentle Restraint" },
  { id: "scarf", label: "Soft wrist tie with a scarf (easy-release only)", category: "Gentle Restraint" },
  { id: "stillness", label: "Agreed request to 'stay still' without binding", category: "Gentle Restraint" },
  { id: "initiative", label: "One person takes clear initiative for the encounter", category: "Power" },
  { id: "permission", label: "Asking permission before actions", category: "Power" },
  { id: "instructions", label: "Giving and receiving gentle instructions", category: "Power" },
];

export default function ConnectTab({ C, s }) {
  const [view, setView] = useState(() => localStorage.getItem("connect_view") || "menu");
  const [cardIdx, setCardIdx] = useState(() => parseInt(localStorage.getItem("connect_cardIdx")) || 0);
  const [partnerA, setPartnerA] = useState(() => JSON.parse(localStorage.getItem("connect_partnerA")) || {});
  const [partnerB, setPartnerB] = useState(() => JSON.parse(localStorage.getItem("connect_partnerB")) || {});
  const [activePartner, setActivePartner] = useState("A");
  const [hardLimitA, setHardLimitA] = useState(() => localStorage.getItem("connect_hardLimitA") || "");
  const [hardLimitB, setHardLimitB] = useState(() => localStorage.getItem("connect_hardLimitB") || "");
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    localStorage.setItem("connect_view", view);
    localStorage.setItem("connect_cardIdx", cardIdx);
    localStorage.setItem("connect_partnerA", JSON.stringify(partnerA));
    localStorage.setItem("connect_partnerB", JSON.stringify(partnerB));
    localStorage.setItem("connect_hardLimitA", hardLimitA);
    localStorage.setItem("connect_hardLimitB", hardLimitB);
  }, [view, cardIdx, partnerA, partnerB, hardLimitA, hardLimitB]);

  const votes = activePartner === "A" ? partnerA : partnerB;
  const setVotes = activePartner === "A" ? setPartnerA : setPartnerB;

  const bothYes = beginner_activities.filter(a => partnerA[a.id] === "yes" && partnerB[a.id] === "yes");
  const categories = [...new Set(beginner_activities.map(a => a.category))];

  if (view === "conversation") return (
    <div style={s.page}>
      <button onClick={() => setView("menu")} style={{ ...s.btn("outline"), marginBottom: 20, fontSize: 13 }}>← Back</button>
      <p style={s.label}>Conversation Guide</p>
      <h1 style={s.h1}>Card {cardIdx + 1} of {conversationCards.length}</h1>
      <p style={{ ...s.p, fontSize: 13 }}>Have this conversation fully clothed, outside the bedroom, with no expectations.</p>

      <div style={{
        background: C.ink, color: C.cream, borderRadius: 12, padding: "32px 24px",
        minHeight: 160, display: "flex", flexDirection: "column", justifyContent: "space-between",
        marginBottom: 20, boxShadow: "0 4px 20px rgba(44,36,22,0.15)"
      }}>
        <span style={{ ...s.pill(C.accentLight, "rgba(196,168,130,0.2)"), marginBottom: 16, fontSize: 11 }}>
          {conversationCards[cardIdx].category}
        </span>
        <p style={{ fontFamily: font.serif, fontSize: 22, lineHeight: 1.4, color: C.cream, margin: 0 }}>
          "{conversationCards[cardIdx].prompt}"
        </p>
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={() => setCardIdx(Math.max(0, cardIdx - 1))} style={{ ...s.btn("outline"), flex: 1 }} disabled={cardIdx === 0}>
          ← Prev
        </button>
        {cardIdx < conversationCards.length - 1
          ? <button onClick={() => setCardIdx(cardIdx + 1)} style={{ ...s.btn(), flex: 1 }}>Next →</button>
          : <button onClick={() => setView("menu")} style={{ ...s.btn(), flex: 1, background: C.sage }}>Done ✓</button>
        }
      </div>

      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 16, flexWrap: "wrap" }}>
        {conversationCards.map((_, i) => (
          <div key={i} onClick={() => setCardIdx(i)} style={{
            width: 8, height: 8, borderRadius: "50%", cursor: "pointer",
            background: i === cardIdx ? C.accent : i < cardIdx ? C.accentLight : C.rule,
          }} />
        ))}
      </div>
    </div>
  );

  if (view === "worksheet") return (
    <div style={s.page}>
      <button onClick={() => { setView("menu"); setShowResults(false); }} style={{ ...s.btn("outline"), marginBottom: 20, fontSize: 13 }}>← Back</button>
      <p style={s.label}>Boundary Worksheet</p>
      <h1 style={s.h1}>Yes / No / Maybe</h1>

      {!showResults ? (
        <>
          <div style={{ ...s.safeBox, marginBottom: 16 }}>
            <p style={{ ...s.p, fontSize: 13, marginBottom: 0 }}>
              Each partner fills this in <strong>separately</strong>. Only activities where <strong>both</strong> mark Yes will appear on the safe list. Fill yours in, then swap.
            </p>
          </div>

          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            {["A", "B"].map(p => (
              <button key={p} onClick={() => setActivePartner(p)} style={{
                flex: 1, padding: "10px", borderRadius: 6, cursor: "pointer",
                fontFamily: font.sans, fontSize: 13, fontWeight: 700,
                background: activePartner === p ? C.ink : C.warmWhite,
                color: activePartner === p ? C.cream : C.softInk,
                border: `1px solid ${activePartner === p ? C.ink : C.rule}`,
              }}>
                Partner {p}
              </button>
            ))}
          </div>

          {categories.map(cat => (
            <div key={cat} style={{ marginBottom: 16 }}>
              <span style={{ ...s.label, color: C.accent }}>{cat}</span>
              {beginner_activities.filter(a => a.category === cat).map(act => (
                <div key={act.id} style={{ ...s.card, padding: "12px 14px", marginBottom: 6 }}>
                  <p style={{ ...s.p, fontSize: 14, marginBottom: 10 }}>{act.label}</p>
                  <div style={{ display: "flex", gap: 6 }}>
                    {["yes", "maybe", "no"].map(opt => (
                      <button key={opt} onClick={() => setVotes({ ...votes, [act.id]: opt })} style={{
                        flex: 1, padding: "6px 4px", borderRadius: 4, cursor: "pointer",
                        fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase",
                        border: "1px solid",
                        background: votes[act.id] === opt
                          ? (opt === "yes" ? C.sage : opt === "maybe" ? "#c4a010" : "#c44a3a")
                          : C.warmWhite,
                        color: votes[act.id] === opt ? "white" : C.muted,
                        borderColor: votes[act.id] === opt
                          ? (opt === "yes" ? C.sage : opt === "maybe" ? "#c4a010" : "#c44a3a")
                          : C.rule,
                      }}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}

          <hr style={s.divider} />
          <div style={{ marginBottom: 20 }}>
            <span style={s.label}>Partner A — Hard Limits (never, no exceptions)</span>
            <textarea style={s.input} rows={3} value={hardLimitA} onChange={e => setHardLimitA(e.target.value)}
              placeholder="Write any hard limits here..." />
            <span style={s.label}>Partner B — Hard Limits (never, no exceptions)</span>
            <textarea style={s.input} rows={3} value={hardLimitB} onChange={e => setHardLimitB(e.target.value)}
              placeholder="Write any hard limits here..." />
          </div>

          <button onClick={() => setShowResults(true)} style={{ ...s.btn(), width: "100%" }}>
            Compare Lists →
          </button>
        </>
      ) : (
        <>
          <div style={{ ...s.safeBox, marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ ...s.label, color: C.sage, marginBottom: 0 }}>✓ Safe to Try Together</span>
              {bothYes.length > 0 && (
                <button 
                  onClick={() => {
                    const text = bothYes.map(a => `✓ ${a.label}`).join("\n");
                    navigator.clipboard.writeText(`Mutual Safe List:\n${text}`);
                    alert("Copied to clipboard!");
                  }}
                  style={{ ...s.btn("outline"), padding: "4px 8px", fontSize: 11 }}
                >
                  Copy
                </button>
              )}
            </div>
            <p style={{ ...s.p, fontSize: 13, marginBottom: 10 }}>Only activities where both partners marked Yes.</p>
            {bothYes.length === 0
              ? <p style={{ color: C.muted, fontSize: 14, fontStyle: "italic" }}>No mutual Yes items yet — that's okay. Have more conversation first.</p>
              : bothYes.map(a => (
                <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: `1px solid ${C.rule}` }}>
                  <span style={{ color: C.sage, fontSize: 16 }}>✓</span>
                  <span style={{ color: C.softInk, fontSize: 14 }}>{a.label}</span>
                </div>
              ))
            }
          </div>

          {(hardLimitA || hardLimitB) && (
            <div style={s.warnBox}>
              <span style={{ ...s.label, color: C.warnBorder }}>⚑ Hard Limits — Always Respected</span>
              {hardLimitA && <p style={{ ...s.p, fontSize: 13, marginBottom: 4 }}><strong>Partner A:</strong> {hardLimitA}</p>}
              {hardLimitB && <p style={{ ...s.p, fontSize: 13, marginBottom: 0 }}><strong>Partner B:</strong> {hardLimitB}</p>}
            </div>
          )}

          <button onClick={() => setShowResults(false)} style={{ ...s.btn("outline"), width: "100%", marginTop: 8 }}>
            ← Edit Responses
          </button>
        </>
      )}
    </div>
  );

  return (
    <div style={s.page}>
      <p style={s.label}>Communication Tools</p>
      <h1 style={s.h1}>Connect</h1>
      <p style={s.p}>These tools are designed for use fully clothed, outside the bedroom, before anything else.</p>
      <div style={{ ...s.warnBox }}>
        <p style={{ ...s.p, fontSize: 13, marginBottom: 0 }}>
          <strong>Reminder:</strong> A good conversation that ends without physical exploration is a complete and successful evening.
        </p>
      </div>
      <hr style={s.divider} />
      <button onClick={() => { setView("conversation"); setCardIdx(0); }} style={{
        ...s.card, width: "100%", textAlign: "left", cursor: "pointer", border: `1px solid ${C.rule}`,
        marginBottom: 12, display: "block",
      }}>
        <span style={s.label}>Step 1</span>
        <p style={{ fontFamily: font.serif, fontSize: 20, color: C.ink, marginBottom: 4 }}>Conversation Guide</p>
        <p style={{ ...s.p, fontSize: 13, marginBottom: 0 }}>{conversationCards.length} gentle prompts to work through together, one at a time.</p>
      </button>
      <button onClick={() => setView("worksheet")} style={{
        ...s.card, width: "100%", textAlign: "left", cursor: "pointer", border: `1px solid ${C.rule}`,
        display: "block",
      }}>
        <span style={s.label}>Step 2</span>
        <p style={{ fontFamily: font.serif, fontSize: 20, color: C.ink, marginBottom: 4 }}>Yes / No / Maybe Worksheet</p>
        <p style={{ ...s.p, fontSize: 13, marginBottom: 0 }}>Fill in separately, then compare. Only mutual Yes items are shown as safe to try.</p>
      </button>
    </div>
  );
}
