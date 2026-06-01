import { useState } from "react";

// ─── Palette & shared styles ───────────────────────────────────────────────
const C = {
  cream: "#f9f6f0",
  warmWhite: "#fdfaf5",
  ink: "#2c2416",
  softInk: "#4a3f2f",
  muted: "#8a7a65",
  accent: "#7a5c3a",
  accentLight: "#c4a882",
  rule: "#d9cfc0",
  sage: "#5a8a6a",
  sageBg: "#f0f5f2",
  warnBg: "#fff8f0",
  warnBorder: "#c4824a",
  faithBg: "#f5f0f8",
};

const font = {
  serif: "'Cormorant Garamond', Georgia, serif",
  sans: "'Lato', system-ui, sans-serif",
};

// ─── Inline style helpers ──────────────────────────────────────────────────
const s = {
  app: {
    fontFamily: font.sans,
    background: C.cream,
    minHeight: "100vh",
    maxWidth: 480,
    margin: "0 auto",
    position: "relative",
    paddingBottom: 80,
    color: C.ink,
  },
  header: {
    background: C.ink,
    color: C.cream,
    padding: "20px 24px 16px",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  headerTitle: {
    fontFamily: font.serif,
    fontSize: 22,
    fontWeight: 400,
    letterSpacing: 0.5,
    margin: 0,
  },
  headerSub: {
    fontSize: 11,
    color: C.accentLight,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginTop: 2,
  },
  nav: {
    position: "fixed",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: 480,
    background: C.ink,
    display: "flex",
    borderTop: `2px solid ${C.accent}`,
    zIndex: 20,
  },
  navBtn: (active) => ({
    flex: 1,
    padding: "10px 4px 8px",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: active ? C.accentLight : C.muted,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
    fontSize: 10,
    letterSpacing: 1,
    textTransform: "uppercase",
    fontFamily: font.sans,
    transition: "color 0.2s",
  }),
  page: { padding: "24px 20px" },
  h1: {
    fontFamily: font.serif,
    fontSize: 28,
    fontWeight: 400,
    color: C.ink,
    marginBottom: 6,
    lineHeight: 1.2,
  },
  h2: {
    fontFamily: font.serif,
    fontSize: 20,
    fontWeight: 500,
    color: C.accent,
    marginBottom: 10,
    marginTop: 24,
  },
  p: { color: C.softInk, lineHeight: 1.7, marginBottom: 12, fontSize: 15 },
  card: {
    background: C.warmWhite,
    border: `1px solid ${C.rule}`,
    borderRadius: 8,
    padding: "16px 18px",
    marginBottom: 12,
  },
  warnBox: {
    background: C.warnBg,
    borderLeft: `4px solid ${C.warnBorder}`,
    borderRadius: "0 6px 6px 0",
    padding: "14px 16px",
    marginBottom: 16,
  },
  safeBox: {
    background: C.sageBg,
    borderLeft: `4px solid ${C.sage}`,
    borderRadius: "0 6px 6px 0",
    padding: "14px 16px",
    marginBottom: 16,
  },
  label: {
    fontSize: 10,
    letterSpacing: 3,
    textTransform: "uppercase",
    fontWeight: 700,
    color: C.muted,
    marginBottom: 6,
    display: "block",
  },
  pill: (color, bg) => ({
    display: "inline-block",
    background: bg,
    color: color,
    borderRadius: 20,
    padding: "3px 12px",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 0.5,
  }),
  btn: (variant = "primary") => ({
    background: variant === "primary" ? C.ink : "transparent",
    color: variant === "primary" ? C.cream : C.accent,
    border: variant === "primary" ? "none" : `1px solid ${C.accent}`,
    borderRadius: 6,
    padding: "10px 20px",
    fontFamily: font.sans,
    fontSize: 14,
    cursor: "pointer",
    letterSpacing: 0.5,
  }),
  input: {
    width: "100%",
    background: C.warmWhite,
    border: `1px solid ${C.rule}`,
    borderRadius: 6,
    padding: "10px 12px",
    fontFamily: font.sans,
    fontSize: 14,
    color: C.ink,
    marginBottom: 10,
    boxSizing: "border-box",
    resize: "vertical",
  },
  divider: {
    border: "none",
    borderTop: `1px solid ${C.rule}`,
    margin: "20px 0",
  },
};

// ─── Icons (SVG inline) ────────────────────────────────────────────────────
const Icon = ({ name, size = 20 }) => {
  const icons = {
    learn: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    connect: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    play: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    reflect: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    chevron: (open) => (
      <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
        style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
        <polyline points="6 9 12 15 18 9" />
      </svg>
    ),
    check: (
      <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  };
  return icons[name] || null;
};

// ═══════════════════════════════════════════════════════════════════════════
// TAB 1: LEARN
// ═══════════════════════════════════════════════════════════════════════════
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

function LearnTab() {
  const [open, setOpen] = useState(null);
  return (
    <div style={s.page}>
      <p style={s.label}>Knowledge Base</p>
      <h1 style={s.h1}>Learn</h1>
      <p style={s.p}>Read these sections together or separately, fully clothed, outside the bedroom. Knowledge is the first safety tool.</p>
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
            <span style={{ color: open === sec.id ? C.accentLight : C.muted }}>
              {open === sec.id ? "▲" : "▼"}
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

// ═══════════════════════════════════════════════════════════════════════════
// TAB 2: CONNECT
// ═══════════════════════════════════════════════════════════════════════════
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

function ConnectTab() {
  const [view, setView] = useState("menu"); // menu | conversation | worksheet
  const [cardIdx, setCardIdx] = useState(0);
  const [partnerA, setPartnerA] = useState({});
  const [partnerB, setPartnerB] = useState({});
  const [activePartner, setActivePartner] = useState("A");
  const [hardLimitA, setHardLimitA] = useState("");
  const [hardLimitB, setHardLimitB] = useState("");
  const [showResults, setShowResults] = useState(false);

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
            <span style={{ ...s.label, color: C.sage }}>✓ Safe to Try Together</span>
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

// ═══════════════════════════════════════════════════════════════════════════
// TAB 3: PLAY (Live Session Safety)
// ═══════════════════════════════════════════════════════════════════════════
const preflightItems = [
  "We have both completed the conversation guide",
  "We have compared our Yes/No/Maybe lists",
  "We have agreed on our safeword or traffic light system",
  "We have agreed on a non-verbal safe signal",
  "Neither of us has had alcohol or any substance tonight",
  "We have agreed what aftercare looks like for each of us",
  "We both genuinely want to be here — not obliging, not tolerating",
  "We both understand that stopping at any point is completely okay",
  "We are not carrying unresolved conflict into this evening",
];

function PlayTab() {
  const [checked, setChecked] = useState({});
  const allChecked = preflightItems.every((_, i) => checked[i]);

  const toggle = (i) => setChecked(p => ({ ...p, [i]: !p[i] }));

  return (
    <div style={s.page}>
      <p style={s.label}>Live Session Safety</p>
      <h1 style={s.h1}>Play</h1>

      {/* Traffic Light */}
      <h2 style={s.h2}>Safeword Dashboard</h2>
      <p style={{ ...s.p, fontSize: 13 }}>Keep this visible. Either partner can call any signal at any moment.</p>
      {[
        { color: "#1a5c2a", bg: "#d4edda", border: "#5a8a4a", word: "GREEN", meaning: "All is well — continue", sub: "Say 'green' during a check-in to confirm you're comfortable." },
        { color: "#7a5500", bg: "#fff3cd", border: "#c4a010", word: "YELLOW", meaning: "Slow down — check in", sub: "Something feels uncertain. Pause, talk gently, and decide together." },
        { color: "#7a1a1a", bg: "#f8d7da", border: "#c44a3a", word: "RED", meaning: "Stop immediately", sub: "Everything stops. No questions. Move close, check in, be warm. Red is the system working perfectly." },
      ].map(sw => (
        <div key={sw.word} style={{ background: sw.bg, border: `2px solid ${sw.border}`, borderRadius: 10, padding: "14px 16px", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
            <span style={{ fontFamily: font.sans, fontWeight: 900, fontSize: 18, color: sw.color, letterSpacing: 2 }}>{sw.word}</span>
            <span style={{ fontFamily: font.serif, fontSize: 16, color: sw.color }}>{sw.meaning}</span>
          </div>
          <p style={{ color: sw.color, fontSize: 13, margin: 0, lineHeight: 1.6, opacity: 0.85 }}>{sw.sub}</p>
        </div>
      ))}

      <div style={{ ...s.card, background: C.faithBg, border: `1px solid #c4aadd` }}>
        <span style={{ ...s.label, color: "#8a6aaa" }}>Non-Verbal Signal</span>
        <p style={{ ...s.p, fontSize: 14, marginBottom: 0 }}>
          Agree on a physical signal before starting — e.g., <strong>three firm squeezes</strong> of the hand, or <strong>tapping twice</strong> on the partner's arm. This is your Red signal when speaking feels difficult.
        </p>
      </div>

      <hr style={s.divider} />

      {/* Pre-Flight */}
      <h2 style={s.h2}>Pre-Flight Checklist</h2>
      <p style={{ ...s.p, fontSize: 13 }}>Complete every item before proceeding. This is not optional.</p>
      {preflightItems.map((item, i) => (
        <button key={i} onClick={() => toggle(i)} style={{
          ...s.card, width: "100%", textAlign: "left", cursor: "pointer",
          display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 14px",
          background: checked[i] ? C.sageBg : C.warmWhite,
          border: `1px solid ${checked[i] ? C.sage : C.rule}`,
          marginBottom: 6,
        }}>
          <div style={{
            width: 22, height: 22, borderRadius: 4, flexShrink: 0, marginTop: 1,
            background: checked[i] ? C.sage : "transparent",
            border: `2px solid ${checked[i] ? C.sage : C.rule}`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {checked[i] && <span style={{ color: "white", fontSize: 14, fontWeight: 900 }}>✓</span>}
          </div>
          <span style={{ color: checked[i] ? C.softInk : C.muted, fontSize: 14, lineHeight: 1.5 }}>{item}</span>
        </button>
      ))}

      <div style={{ marginTop: 20 }}>
        {allChecked
          ? (
            <div style={{ ...s.safeBox }}>
              <p style={{ ...s.p, fontFamily: font.serif, fontSize: 18, marginBottom: 0 }}>
                ✓ Pre-flight complete. You may proceed — gently, slowly, and with care for each other.
              </p>
            </div>
          ) : (
            <div style={s.warnBox}>
              <p style={{ ...s.p, fontSize: 14, marginBottom: 0 }}>
                {Object.values(checked).filter(Boolean).length} of {preflightItems.length} items checked. Complete all items before proceeding.
              </p>
            </div>
          )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// TAB 4: REFLECT
// ═══════════════════════════════════════════════════════════════════════════
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

function ReflectTab() {
  const [view, setView] = useState("menu");
  const [answers, setAnswers] = useState({});

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
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ROOT APP
// ═══════════════════════════════════════════════════════════════════════════
const tabs = [
  { id: "learn", label: "Learn", icon: "learn", component: LearnTab },
  { id: "connect", label: "Connect", icon: "connect", component: ConnectTab },
  { id: "play", label: "Session", icon: "play", component: PlayTab },
  { id: "reflect", label: "Reflect", icon: "reflect", component: ReflectTab },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("learn");
  const ActiveComponent = tabs.find(t => t.id === activeTab).component;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Lato:wght@300;400;700&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: #f0ede6; }
        button { font-family: 'Lato', sans-serif; }
        textarea, input { outline: none; }
        textarea:focus, input:focus { border-color: #7a5c3a !important; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #d9cfc0; border-radius: 2px; }
      `}</style>
      <div style={s.app}>
        {/* Header */}
        <div style={s.header}>
          <h1 style={s.headerTitle}>PowerApp</h1>
          <div style={s.headerSub}>Private · Educational · Safety-First</div>
        </div>

        {/* Active tab */}
        <ActiveComponent />

        {/* Bottom Nav */}
        <nav style={s.nav}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={s.navBtn(activeTab === tab.id)}>
              <Icon name={tab.icon} size={22} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
