import React, { useState, useEffect } from "react";
import { font } from "../constants";
import { getLocal, setLocal } from "../utils/storage";
import { beginnerActivities, voteOptions } from "../data/activities";
import { getMutualYesActivities } from "../utils/plan";

// ConnectTab stores conversation position, Partner A/B worksheet answers, and hard limits in localStorage.
// It gathers motive-first conversation data and only reveals mutual Yes activities for planning.

const conversationCards = [
    { prompt: "What am I curious about exploring together?", category: "Motive" },
    { prompt: "What scares me or makes me feel uncertain?", category: "Motive" },
    { prompt: "What would make me feel pressured or unsafe?", category: "Safety" },
    { prompt: "What would make me feel cherished and safe during and after?", category: "Motive" },
    { prompt: "Is there anything I am agreeing to just to avoid disappointing you?", category: "Motive" },
    { prompt: "How do our faith and values shape what feels loving here?", category: "Values" },
    { prompt: "What does 'tenderness' look like for me?", category: "Motive" },
    { prompt: "What would make you feel free to say 'not tonight' at any point?", category: "Safety" },
    { prompt: "What would make this strengthen our marriage?", category: "Connection" },
    { prompt: "What would make this harm our marriage?", category: "Connection" },
    { prompt: "What would loving aftercare look like for you tonight?", category: "Aftercare" },
    { prompt: "If tonight ends with just a good conversation, how would you feel about that?", category: "Expectations" },
];

export default function ConnectTab({ C, s, onNavigate }) {
  const [view, setView] = useState(() => getLocal("connect_view", "menu"));
  const [cardIdx, setCardIdx] = useState(() => getLocal("connect_cardIdx", 0));
  const [partnerA, setPartnerA] = useState(() => getLocal("connect_partnerA", {}));
  const [partnerB, setPartnerB] = useState(() => getLocal("connect_partnerB", {}));
  const [activePartner, setActivePartner] = useState("A");
  const [hardLimitA, setHardLimitA] = useState(() => getLocal("connect_hardLimitA", ""));
  const [hardLimitB, setHardLimitB] = useState(() => getLocal("connect_hardLimitB", ""));
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    setLocal("connect_view", view);
    setLocal("connect_cardIdx", cardIdx);
    setLocal("connect_partnerA", partnerA);
    setLocal("connect_partnerB", partnerB);
    setLocal("connect_hardLimitA", hardLimitA);
    setLocal("connect_hardLimitB", hardLimitB);
  }, [view, cardIdx, partnerA, partnerB, hardLimitA, hardLimitB]);

  const votes = activePartner === "A" ? partnerA : partnerB;
  const setVotes = activePartner === "A" ? setPartnerA : setPartnerB;

  const bothYes = getMutualYesActivities(partnerA, partnerB, beginnerActivities);
  const categories = [...new Set(beginnerActivities.map(a => a.category))];

  // Progress calculations
  const cardsCompleted = cardIdx + 1 === conversationCards.length;
  const worksheetCompleted = Object.keys(partnerA).length > 0 && Object.keys(partnerB).length > 0;

  if (view === "conversation") return (
    <div style={s.page}>
      <button onClick={() => setView("menu")} style={{ ...s.btn("outline"), marginBottom: 20, fontSize: 13 }}>← Back to Menu</button>
      <p style={s.label}>Conversation Guide</p>
      <h1 style={s.h1}>Card {cardIdx + 1} of {conversationCards.length}</h1>
      <p style={{ ...s.p, fontSize: 14 }}>Have this conversation fully clothed, outside the bedroom, with no expectations.</p>

      <div style={{
        background: C.ink, color: C.cream, borderRadius: 12, padding: "40px 28px",
        minHeight: 180, display: "flex", flexDirection: "column", justifyContent: "space-between",
        marginBottom: 24, boxShadow: "0 8px 32px rgba(0,0,0,0.15)"
      }}>
        <span style={{ ...s.pill(C.accentLight, "rgba(196,168,130,0.1)"), marginBottom: 20, fontSize: 11, alignSelf: "flex-start" }}>
          {conversationCards[cardIdx].category}
        </span>
        <p style={{ fontFamily: font.serif, fontSize: 24, lineHeight: 1.4, color: C.cream, margin: 0 }}>
          "{conversationCards[cardIdx].prompt}"
        </p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        <button 
          onClick={() => setCardIdx(Math.max(0, cardIdx - 1))} 
          style={{ ...s.btn("outline"), flex: 1 }} 
          disabled={cardIdx === 0}
        >
          Previous
        </button>
        {cardIdx < conversationCards.length - 1
          ? <button onClick={() => setCardIdx(cardIdx + 1)} style={{ ...s.btn(), flex: 1 }}>Next Card</button>
          : <button onClick={() => setView("menu")} style={{ ...s.btn(), flex: 1, background: C.sage }}>Finish Guide</button>
        }
        <div style={{ width: "100%", display: "flex", gap: 12, marginTop: 8 }}>
          <button onClick={() => setCardIdx(Math.min(conversationCards.length - 1, cardIdx + 1))} style={{ ...s.btn("outline"), flex: 1, fontSize: 13 }}>
            Pass Question
          </button>
          <button onClick={() => setView("menu")} style={{ ...s.btn("outline"), flex: 1, fontSize: 13 }}>
            Pause & Save
          </button>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 24, flexWrap: "wrap" }}>
        {conversationCards.map((_, i) => (
          <div key={i} onClick={() => setCardIdx(i)} style={{
            width: 8, height: 8, borderRadius: "50%", cursor: "pointer",
            background: i === cardIdx ? C.accent : i < cardIdx ? C.sage : C.rule,
            transition: "all 0.2s"
          }} />
        ))}
      </div>
      
      <div style={{ ...s.safeBox, marginTop: 24 }}>
        <p style={{ ...s.p, fontSize: 12, marginBottom: 0, fontStyle: "italic" }}>
          "Pausing or skipping a question is a safe and good choice. The slower partner sets the pace."
        </p>
      </div>
    </div>
  );

  if (view === "worksheet") return (
    <div style={s.page}>
      <button onClick={() => { setView("menu"); setShowResults(false); }} style={{ ...s.btn("outline"), marginBottom: 20, fontSize: 13 }}>← Back to Menu</button>
      <p style={s.label}>Boundary Worksheet</p>
      <h1 style={s.h1}>Yes / No / Maybe</h1>

      {!showResults ? (
        <>
          <div style={{ ...s.safeBox, marginBottom: 20 }}>
            <p style={{ ...s.p, fontSize: 14, marginBottom: 8 }}>
              Each partner fills this in <strong>separately</strong>. Only activities where <strong>both</strong> mark Yes will appear on the safe list.
            </p>
            <p style={{ ...s.p, fontSize: 13, marginBottom: 0, opacity: 0.8 }}>
              <strong>Important:</strong> "Maybe" or "Not now" is not permission. It means "No" until it becomes a clear, enthusiastic "Yes" later.
            </p>
            <p style={{ ...s.p, fontSize: 13, marginBottom: 0, opacity: 0.8 }}>
              <strong>Plan rule:</strong> Maybe, Not Now, No, Hard Limit, and unanswered items cannot enter tonight's plan.
            </p>
          </div>

          <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
            {["A", "B"].map(p => (
              <button key={p} onClick={() => setActivePartner(p)} style={{
                flex: 1, padding: "12px", borderRadius: 8, cursor: "pointer",
                fontFamily: font.sans, fontSize: 14, fontWeight: 700,
                background: activePartner === p ? C.ink : C.warmWhite,
                color: activePartner === p ? C.cream : C.softInk,
                border: `1px solid ${activePartner === p ? C.ink : C.rule}`,
                transition: "all 0.2s"
              }}>
                Partner {p}
              </button>
            ))}
          </div>

          {categories.map(cat => (
            <div key={cat} style={{ marginBottom: 20 }}>
              <span style={{ ...s.label, color: C.accent }}>{cat}</span>
              {beginnerActivities.filter(a => a.category === cat).map(act => (
                <div key={act.id} style={{ ...s.card, padding: "16px", marginBottom: 8 }}>
                  <p style={{ ...s.p, fontSize: 15, marginBottom: 12 }}>{act.label}</p>
                  <div style={{ display: "flex", gap: 6 }}>
                    {voteOptions.map(opt => (
                      <button key={opt.id} onClick={() => setVotes({ ...votes, [act.id]: opt.id })} style={{
                        flex: 1, padding: "8px 2px", borderRadius: 6, cursor: "pointer",
                        fontSize: 10, fontWeight: 700, letterSpacing: 0.2, textTransform: "uppercase",
                        border: "1px solid",
                        background: votes[act.id] === opt.id ? (opt.id === "yes" ? C.sage : opt.id === "hard_limit" || opt.id === "no" ? "#c44a3a" : "#c4a010") : C.warmWhite,
                        color: votes[act.id] === opt.id ? "white" : C.muted,
                        borderColor: votes[act.id] === opt.id ? (opt.id === "yes" ? C.sage : opt.id === "hard_limit" || opt.id === "no" ? "#c44a3a" : "#c4a010") : C.rule,
                        transition: "all 0.2s"
                      }}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}

          <hr style={s.divider} />
          <div style={{ marginBottom: 24 }}>
            <span style={s.label}>Partner A — Hard Limits (Never)</span>
            <textarea style={s.input} rows={3} value={hardLimitA} onChange={e => setHardLimitA(e.target.value)}
              placeholder="List items that are completely off the table..." />
            <span style={s.label}>Partner B — Hard Limits (Never)</span>
            <textarea style={s.input} rows={3} value={hardLimitB} onChange={e => setHardLimitB(e.target.value)}
              placeholder="List items that are completely off the table..." />
          </div>

          <button onClick={() => setShowResults(true)} style={{ ...s.btn(), width: "100%", padding: "14px" }}>
            Compare Mutual List
          </button>
        </>
      ) : (
        <>
          <div style={{ ...s.safeBox, marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ ...s.label, color: C.sage, marginBottom: 0 }}>✓ Mutual Yes List</span>
              {bothYes.length > 0 && (
                <button 
                  onClick={() => {
                    const text = bothYes.map(a => `✓ ${a.label}`).join("\n");
                    navigator.clipboard.writeText(`Our Mutual Safe List:\n${text}`);
                    alert("Copied to clipboard!");
                  }}
                  style={{ ...s.btn("outline"), padding: "6px 12px", fontSize: 11 }}
                >
                  Copy List
                </button>
              )}
            </div>
            <p style={{ ...s.p, fontSize: 14, marginBottom: 12 }}>
              Only activities where both partners marked Yes. Maybe is not permission; no persuasion; a conversation-only night is success.
            </p>
            {bothYes.length === 0
              ? <p style={{ color: C.muted, fontSize: 14, fontStyle: "italic" }}>No mutual items yet. This is a great time for more conversation.</p>
              : bothYes.map(a => (
                <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: `1px solid ${C.rule}` }}>
                  <span style={{ color: C.sage, fontSize: 18 }}>✓</span>
                  <span style={{ color: C.softInk, fontSize: 14 }}>{a.label}</span>
                </div>
              ))
            }
          </div>

          {(hardLimitA || hardLimitB) && (
            <div style={s.warnBox}>
              <span style={{ ...s.label, color: C.warnBorder }}>⚑ Shared Hard Limits</span>
              {hardLimitA && <p style={{ ...s.p, fontSize: 14, marginBottom: 8 }}><strong>Partner A:</strong> {hardLimitA}</p>}
              {hardLimitB && <p style={{ ...s.p, fontSize: 14, marginBottom: 0 }}><strong>Partner B:</strong> {hardLimitB}</p>}
            </div>
          )}

          <button onClick={() => setShowResults(false)} style={{ ...s.btn("outline"), width: "100%", marginTop: 12 }}>
            Edit Responses
          </button>
        </>
      )}
    </div>
  );

  return (
    <div style={s.page}>
      <p style={s.label}>Step 2</p>
      <h1 style={s.h1}>Connect</h1>
      <p style={s.p}>These tools help you talk and align before any physical exploration.</p>
      
      <div style={{ ...s.warnBox }}>
        <p style={{ ...s.p, fontSize: 14, marginBottom: 0 }}>
          <strong>The slower partner sets the pace.</strong> Exploration should strengthen trust, never create pressure or fear.
        </p>
      </div>

      <hr style={s.divider} />

      <button onClick={() => { setView("conversation"); setCardIdx(0); }} style={{
        ...s.card, width: "100%", textAlign: "left", cursor: "pointer", border: `1px solid ${C.rule}`,
        marginBottom: 16, display: "block", position: "relative"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={s.label}>Part 1</span>
          {cardsCompleted && <span style={{ color: C.sage, fontSize: 12, fontWeight: 700 }}>✓ Completed</span>}
        </div>
        <p style={{ fontFamily: font.serif, fontSize: 22, color: C.ink, marginBottom: 6 }}>Conversation Guide</p>
        <p style={{ ...s.p, fontSize: 14, marginBottom: 0 }}>Motive-first prompts to explore your curiosity, values, and expectations.</p>
      </button>

      <button onClick={() => setView("worksheet")} style={{
        ...s.card, width: "100%", textAlign: "left", cursor: "pointer", border: `1px solid ${C.rule}`,
        display: "block", position: "relative"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={s.label}>Part 2</span>
          {worksheetCompleted && <span style={{ color: C.sage, fontSize: 12, fontWeight: 700 }}>✓ Completed</span>}
        </div>
        <p style={{ fontFamily: font.serif, fontSize: 22, color: C.ink, marginBottom: 6 }}>Yes / No / Maybe / Not Now</p>
        <p style={{ ...s.p, fontSize: 14, marginBottom: 0 }}>Detailed categories to build a mutual list of safe activities.</p>
      </button>

      <div style={{ ...s.safeBox, marginTop: 24 }}>
        <p style={{ ...s.p, fontSize: 14, marginBottom: 0, fontStyle: "italic" }}>
          "Stopping after a good conversation is a complete and successful evening."
        </p>
      </div>
      <button onClick={() => onNavigate?.("prepare")} style={{ ...s.btn(), width: "100%", marginTop: 12 }}>
        Ready? Go to Prepare
      </button>
    </div>
  );
}

