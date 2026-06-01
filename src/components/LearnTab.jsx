import React, { useState, useEffect } from "react";
import { font } from "../constants";
import { Icon } from "./Icon";
import SafetyQuiz from "./SafetyQuiz";
import Glossary from "./Glossary";
import { getLocal, setLocal, removeLocal } from "../utils/storage";

export default function LearnTab({ C, s }) {
  const [open, setOpen] = useState(() => getLocal("learn_open", null));
  const [confidence, setConfidence] = useState(() => getLocal("learn_confidence", {}));
  const [reflection, setReflection] = useState(() => getLocal("learn_reflection", {}));

  useEffect(() => {
    if (open) {
      setLocal("learn_open", open);
    } else {
      removeLocal("learn_open");
    }
  }, [open]);

  useEffect(() => {
    setLocal("learn_confidence", confidence);
    setLocal("learn_reflection", reflection);
  }, [confidence, reflection]);

  const handleConfidence = (id, level) => {
    setConfidence(prev => ({ ...prev, [id]: level }));
  };

  const handleReflection = (id, text) => {
    setReflection(prev => ({ ...prev, [id]: text }));
  };

  const learnSections = [
    {
      id: "what_is_bdsm",
      title: "What BDSM Actually Means",
      reflect: "Which of these definitions was most surprising or helpful to you?",
      content: (
        <div>
          <p style={s.p}>BDSM is an umbrella term for a variety of practices. It is not a single activity, but a customized language of trust between two people.</p>
          {[
            { name: "B/D", full: "Bondage & Discipline", desc: "Using physical restraints (bondage) or setting rules and tasks (discipline)." },
            { name: "D/s", full: "Dominance & Submission", desc: "A consensual exchange of power where one partner leads and the other surrenders control." },
            { name: "S/M", full: "Sadism & Masochism", desc: "Deriving pleasure from giving or receiving controlled physical sensation." },
            { name: "Kink", full: "Alternative Intimacy", desc: "A broad term for unconventional erotic interests that fall outside 'vanilla' norms." }
          ].map(item => (
            <div key={item.name} style={{ ...s.card, marginBottom: 8 }}>
              <span style={{ ...s.label, color: C.accent }}>{item.name} — {item.full}</span>
              <p style={{ ...s.p, marginBottom: 0, fontSize: 14 }}>{item.desc}</p>
            </div>
          ))}
          <div style={s.safeBox}>
            <p style={{ ...s.p, fontSize: 14, marginBottom: 0 }}>
              <strong>BDSM is not abuse.</strong> The dividing line is whether an act is explicitly negotiated, mutually desired, and genuinely retractable at any moment.
            </p>
          </div>
          <p style={{ ...s.p, fontSize: 14, marginTop: 12 }}>
            Beginner exploration does <strong>not</strong> require pain, intercourse, humiliation, or extreme practices. It can be as simple as changing your tone of voice or choosing the music.
          </p>
        </div>
      )
    },
    {
      id: "marriage_consent",
      title: "Marriage Never Replaces Consent",
      reflect: "What does 'Enthusiastic Consent' look like for you compared to just 'agreeing'?",
      content: (
        <div>
          <div style={s.safeBox}>
            <p style={{ ...s.p, fontSize: 14, marginBottom: 12 }}>
              In a committed marriage, it's easy to assume consent is 'implied.' However, for power exchange and kink, consent must be even more explicit.
            </p>
            <ul style={{ color: C.softInk, paddingLeft: 18, lineHeight: 1.8, fontSize: 14 }}>
              <li><strong>Consent is still needed:</strong> Marriage is a partnership of mutual honor, not a waiver of bodily autonomy.</li>
              <li><strong>Silence is not consent:</strong> Freezing, going quiet, or not resisting is often a sign of overwhelm, not permission.</li>
              <li><strong>'Maybe' means 'Not tonight':</strong> If it isn't an enthusiastic 'Yes,' treat it as a 'No' for now.</li>
              <li><strong>Reversible:</strong> You can say 'Yes' at 8 PM and 'Stop' at 8:05 PM without needing to justify it.</li>
            </ul>
          </div>
          <p style={s.p}><strong>The Goal:</strong> To ensure every activity is something you both <em>want</em> to do, not something one person is 'tolerating' for the other.</p>
        </div>
      )
    },
    {
      id: "safewords_logic",
      title: "Safewords are not Magic",
      reflect: "How does it feel to know that 'Red' is a success, not a bad outcome?",
      content: (
        <div>
          <p style={s.p}>Safewords are vital, but they are only as strong as the trust between you.</p>
          <div style={s.card}>
            <ul style={{ color: C.softInk, paddingLeft: 18, lineHeight: 1.8, fontSize: 14 }}>
              <li><strong>Red means Stop:</strong> Stop immediately, drop the role, come close, be warm, and check in. No arguing or sulking.</li>
              <li><strong>Yellow means Slow:</strong> Reduce intensity, check in, or change course. It's a 'caution' light.</li>
              <li><strong>Character is the real safety:</strong> Safewords work because you trust your partner to value your safety more than their own immediate pleasure.</li>
            </ul>
          </div>
          <div style={s.safeBox}>
            <p style={{ ...s.p, fontSize: 14, marginBottom: 0 }}>
              <strong>Red is not a bad outcome.</strong> Using a safeword means the safety system you built is working perfectly.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "healthy",
      title: "Healthy vs. Unhealthy Dynamics",
      reflect: "Can you think of a time when you felt free to say 'not tonight' and felt cherished in that choice?",
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
      id: "marriage_consent",
      title: "Marriage Never Replaces Consent",
      content: (
        <div>
          <div style={s.warnBox}>
            <p style={{ ...s.p, fontSize: 14, marginBottom: 0 }}>
              Being married does not create automatic permission. Consent still needs to be freely given, reversible, informed, enthusiastic, and specific.
            </p>
          </div>
          <ul style={{ color: C.softInk, paddingLeft: 18, lineHeight: 1.8, fontSize: 14 }}>
            <li>Silence, freezing, going quiet, not resisting, or avoiding conflict are not consent.</li>
            <li>"I said yes once" does not mean ongoing permission.</li>
            <li>"Maybe" means "not tonight" unless it becomes a clear mutual Yes later.</li>
            <li>Either spouse can stop, change course, or say "not tonight" without sulking, argument, or persuasion.</li>
          </ul>
        </div>
      )
    },
    {
      id: "safewords_not_magic",
      title: "Safewords Are Not Magic",
      content: (
        <div>
          <p style={s.p}>Safewords only work when both people are trustworthy, sober, attentive, and immediately willing to stop.</p>
          <div style={s.safeBox}>
            <p style={{ ...s.p, fontSize: 14, marginBottom: 0 }}>
              Red means: stop immediately, drop the role, come close if wanted, be warm, check in, and do not argue, sulk, persuade, or ask for justification.
            </p>
          </div>
          <p style={s.p}>The real safety system is character: warmth, patience, self-control, and care for the slower partner.</p>
        </div>
      )
    },
    {
      id: "nervous_system",
      title: "Emotional & Nervous System Safety",
      content: (
        <div>
          <p style={s.p}>Kink can touch vulnerability, shame, fear, rejection sensitivity, and old protective responses. These signs mean pause or stop warmly.</p>
          <ul style={{ color: C.softInk, paddingLeft: 18, lineHeight: 1.8, fontSize: 14 }}>
            <li><strong>Freeze:</strong> going still, quiet, blank, or unable to choose.</li>
            <li><strong>Fawn:</strong> people-pleasing to avoid disappointing the other person.</li>
            <li><strong>Dissociation:</strong> feeling far away, unreal, floaty, or disconnected.</li>
            <li><strong>Shutdown:</strong> becoming unreachable, numb, or unable to communicate clearly.</li>
          </ul>
          <div style={s.safeBox}>
            <p style={{ ...s.p, fontSize: 14, marginBottom: 0 }}>
              Stop warmly: "You are safe. We are stopping. Nothing is wrong with you. What do you need right now?"
            </p>
          </div>
        </div>
      )
    },
    {
      id: "role_responsibilities",
      title: "Role Responsibilities (Dom/Sub)",
      reflect: "Which role (leading or surrendering) feels more naturally stretching for you right now?",
      content: (
        <div>
          <p style={s.p}>In D/s (Dominance and Submission), both roles carry heavy responsibilities for the session to be successful and safe.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            <div style={{ ...s.card, padding: "14px", marginBottom: 0 }}>
              <span style={{ ...s.label, color: C.accent }}>Dominant</span>
              <ul style={{ color: C.softInk, paddingLeft: 14, fontSize: 13, lineHeight: 1.6 }}>
                <li>Directs the pace and flow</li>
                <li>Maintains safety checks</li>
                <li>Prioritizes Sub's well-being</li>
                <li>Responsible for Aftercare</li>
              </ul>
            </div>
            <div style={{ ...s.card, padding: "14px", marginBottom: 0 }}>
              <span style={{ ...s.label, color: C.accent }}>Submissive</span>
              <ul style={{ color: C.softInk, paddingLeft: 14, fontSize: 13, lineHeight: 1.6 }}>
                <li>Honest about limits</li>
                <li>Uses safewords clearly</li>
                <li>Communicates needs</li>
                <li>Active participant in trust</li>
              </ul>
            </div>
          </div>
          <p style={s.p}><strong>The Dominant does not 'own' the Submissive.</strong> The power is a gift freely given, which can be taken back at any second with a safeword.</p>
        </div>
      )
    },
    {
      id: "beginner_mistakes",
      title: "Common Beginner Mistakes",
      reflect: "Which of these mistakes feels most important for us to watch out for?",
      content: (
        <div>
          <div style={s.warnBox}>
            <ul style={{ color: C.softInk, paddingLeft: 18, lineHeight: 1.8, fontSize: 14 }}>
              <li><strong>Skipping Negotiation:</strong> Thinking you can 'just wing it.' Safety requires clear agreements first.</li>
              <li><strong>Poor Safeword Use:</strong> Waiting too long to call Yellow or Red out of fear of 'ruining the mood.'</li>
              <li><strong>Ignoring Aftercare:</strong> Assuming everything is fine because the session ended. Emotions need processing.</li>
              <li><strong>Copying Media:</strong> Trying to replicate porn or movies instead of listening to your partner's actual body and voice.</li>
              <li><strong>Assuming Consent is Permanent:</strong> Thinking a 'Yes' last week applies to today.</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: "equipment_safety",
      title: "Equipment & Physical Safety",
      reflect: "Do we have our 'Safety Shears' (blunt scissors) ready and available?",
      content: (
        <div>
          <p style={s.p}>If using any form of restraint or impact tool, safety is paramount. Improper use can lead to nerve damage or injury.</p>
          <div style={{ ...s.card, background: C.warnBg, border: `1px solid ${C.warnBorder}`, marginBottom: 16 }}>
            <span style={{ ...s.label, color: C.warnBorder }}>Nerve & Circulation Safety</span>
            <ul style={{ color: C.softInk, paddingLeft: 18, lineHeight: 1.6, fontSize: 13, marginTop: 8 }}>
              <li><strong>The Two-Finger Rule:</strong> Always ensure you can fit two fingers between any restraint and the skin.</li>
              <li><strong>Wrist/Ankle Caution:</strong> Nerves are very close to the surface on the inside of wrists and ankles. Avoid direct pressure there.</li>
              <li><strong>Impact Zones:</strong> Only strike fleshy areas (like the buttocks). Avoid the spine, kidneys, and joints.</li>
              <li><strong>Check Frequently:</strong> Ask: "Any tingling or numbness?" If yes, release the restraint immediately.</li>
            </ul>
          </div>
          <ul style={{ color: C.softInk, paddingLeft: 18, lineHeight: 1.8, fontSize: 14 }}>
            <li><strong>Safety Shears:</strong> Always have a pair of blunt-tipped safety scissors nearby to cut restraints in an emergency.</li>
            <li><strong>Never Leave Alone:</strong> A restrained person must never be left alone in a room, even for a moment.</li>
            <li><strong>Sobriety:</strong> Never use equipment while under the influence of alcohol or substances.</li>
          </ul>
        </div>
      )
    },
    {
      id: "drops",
      title: "Understanding 'The Drop'",
      reflect: "How can I best reassure you if you feel a hormonal 'drop' or vulnerability the next day?",
      content: (
        <div>
          <p style={s.p}>After an intense session, your body's chemistry changes. This can lead to a period of vulnerability or low mood known as "Drop."</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            <div style={{ ...s.card, padding: "14px", marginBottom: 0 }}>
              <span style={{ ...s.label, color: C.accent }}>Sub Drop</span>
              <p style={{ fontSize: 12, color: C.softInk, lineHeight: 1.4, margin: 0 }}>
                Feeling sad, flat, or vulnerable after surrendering control. The brain is adjusting from a high endorphin state.
              </p>
            </div>
            <div style={{ ...s.card, padding: "14px", marginBottom: 0 }}>
              <span style={{ ...s.label, color: C.accent }}>Dom Drop</span>
              <p style={{ fontSize: 12, color: C.softInk, lineHeight: 1.4, margin: 0 }}>
                Feeling guilty, anxious, or questioning if they were "too much" after leading a session.
              </p>
            </div>
          </div>
          <p style={s.p}><strong>The Remedy:</strong> Consistent, gentle aftercare. Reassure each other: "You are safe, you are loved, and we are okay."</p>
        </div>
      )
    },
    {
      id: "frameworks",
      title: "Safety Frameworks",
      reflect: "Which framework (SSC, 4Cs, RACK, PRICK) resonates most with your personal safety needs?",
      content: (
        <div>
          {[
            { name: "SSC", full: "Safe, Sane, Consensual", desc: "Activities must be physically safe, approached with a clear mind, and fully agreed to. The gold standard for beginners.", tag: "Recommended" },
            { name: "4Cs", full: "Caring, Communication, Consent, Caution", desc: "Focuses on relationship quality and ongoing care. Pairs perfectly with SSC.", tag: "Excellent for Couples" },
            { name: "RACK", full: "Risk-Aware Consensual Kink", desc: "Acknowledges that all activities carry some risk. Focuses on informed consent about those specific risks.", tag: "Advanced" },
            { name: "PRICK", full: "Personal Responsibility, Informed Consensual Kink", desc: "Emphasizes each individual's responsibility to communicate their own limits clearly.", tag: "Personal Focus" }
          ].map(fw => (
            <div key={fw.name} style={{ ...s.card, marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                <div>
                  <span style={{ fontFamily: font.serif, fontSize: 20, color: C.accent }}>{fw.name}</span>
                  <span style={{ fontSize: 12, color: C.muted, marginLeft: 8 }}>{fw.full}</span>
                </div>
                <span style={s.pill(C.accent, C.warmWhite)}>
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
      id: "consent",
      title: "Consent Foundations (FRIES)",
      reflect: "What does 'Enthusiastic Consent' look like for you compared to just 'agreeing'?",
      content: (
        <div>
          <p style={s.p}>A helpful way to remember the foundations of consent is the <strong>FRIES</strong> acronym:</p>
          {[
            ["Freely Given", "Consent is a choice made without pressure, manipulation, or influence of drugs/alcohol."],
            ["Reversible", "Anyone can change their mind at any time, even if they've already started."],
            ["Informed", "You can only consent to something if you have the full picture of what it involves."],
            ["Enthusiastic", "Consent should be about doing things you WANT to do, not things you're expected to do."],
            ["Specific", "Saying yes to one thing (like massage) is not a yes to everything else."]
          ].map(([type, desc]) => (
            <div key={type} style={{ ...s.card, marginBottom: 8 }}>
              <span style={{ ...s.label }}>{type}</span>
              <p style={{ ...s.p, marginBottom: 0, fontSize: 14 }}>{desc}</p>
            </div>
          ))}
          <div style={s.safeBox}>
            <p style={{ ...s.p, marginBottom: 0, fontSize: 14 }}>
              <strong>"I said yes once" does not mean ongoing permission.</strong> Consent is a continuous conversation, not a one-time checkbox.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "porn_vs_reality",
      title: "Porn vs. Reality",
      reflect: "What is one thing we've seen in media that we both agree is unsafe or unrealistic for us?",
      content: (
        <div>
          <p style={s.p}>Popular media and pornography are often poor teachers for healthy BDSM.</p>
          <div style={s.warnBox}>
            <ul style={{ color: C.softInk, paddingLeft: 18, lineHeight: 1.8, fontSize: 14 }}>
              <li><strong>Media omits negotiation:</strong> In movies, everything happens spontaneously. In reality, safety requires talking first.</li>
              <li><strong>Media ignores aftercare:</strong> Real scenes don't just end; they require emotional and physical care afterward.</li>
              <li><strong>Porn is a performance:</strong> It is designed for the viewer, not for the mutual pleasure or safety of the participants.</li>
              <li><strong>Risk is often hidden:</strong> Media rarely shows the safety checks or the technical skill required for certain acts.</li>
            </ul>
          </div>
          <p style={s.p}>Your exploration should be built around <strong>your</strong> relationship, <strong>your</strong> trust, and <strong>your</strong> specific boundaries — not a script from a screen.</p>
        </div>
      )
    },
    {
      id: "nervous_system",
      title: "Emotional & Nervous System Safety",
      reflect: "Which of these responses (Freeze, Fawn, etc.) do you think you'd be most likely to experience if overwhelmed?",
      content: (
        <div>
          <p style={s.p}>Intimacy can trigger deep responses in our nervous system. Understanding these helps you care for each other.</p>
          <div style={s.card}>
            {[
              { name: "Freeze", desc: "Feeling stuck, unable to move or speak, even if you want to stop." },
              { name: "Fawn", desc: "Over-complying or 'people-pleasing' to avoid conflict, even if uncomfortable." },
              { name: "Dissociation", desc: "Feeling 'checked out' or as if you are watching yourself from a distance." },
              { name: "Shutdown", desc: "A sudden loss of energy or emotional flatness." }
            ].map(item => (
              <div key={item.name} style={{ marginBottom: 12 }}>
                <span style={{ ...s.label, fontSize: 13, color: C.accent }}>{item.name}</span>
                <p style={{ ...s.p, fontSize: 13, marginBottom: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p style={s.p}><strong>The Remedy:</strong> If you notice your partner going quiet, staring blankly, or becoming overly compliant, <strong>pause immediately</strong>. Ground them with warmth, water, and eye contact.</p>
        </div>
      )
    },
    {
      id: "christian_reflection",
      title: "Faith & Christian Reflection",
      reflect: "How does our shared faith provide a safety net for our intimacy?",
      content: (
        <div>
          <p style={s.p}>For a Christian couple, the question is not just "is this allowed?" but "does this express mutual love and honor?"</p>
          <div style={{ ...s.card, background: "#f5f0f8", border: "1px solid #8a6aaa" }}>
            <span style={{ ...s.label, color: "#8a6aaa" }}>Biblical Principles</span>
            <ul style={{ color: C.softInk, paddingLeft: 18, lineHeight: 1.8, fontSize: 14 }}>
              <li><strong>Mutual Consent:</strong> 1 Corinthians 7 emphasizes reciprocal marital honor and "mutual consent."</li>
              <li><strong>Gentleness & Self-Control:</strong> Galatians 5 names these as fruits of the Spirit. Any play should deepen these qualities.</li>
              <li><strong>Honoring the Body:</strong> 1 Thessalonians 4 calls us to possess our own bodies in "holiness and honor."</li>
              <li><strong>Freedom of Conscience:</strong> Romans 14 teaches that we should not violate our own conscience or lead our spouse to violate theirs.</li>
              <li><strong>Fruit of the Spirit Test:</strong> Does this lead to more love, joy, and peace, or more fear, contempt, and secrecy?</li>
            </ul>
          </div>
          <p style={{ ...s.p, marginTop: 12 }}>
            If an experiment leaves either of you feeling used, spiritually muddy, or unable to pray with a clean conscience, that matters more than any "intensity." Trust the Spirit's leading in your marriage.
          </p>
        </div>
      )
    },
    {
      id: "limits",
      title: "Hard Boundaries — Do Not Cross",
      reflect: "Do we both agree that if either of us is uncomfortable, we stop immediately without needing to justify it?",
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
                "Degradation or humiliation designed to wound dignity",
                "Punishment dynamics or withholding affection",
                "Consensual non-consent (CNC) or free-use scenarios",
                "Anything involving fear, coercion, inability to speak, or inability to communicate clearly",
                "Anything done while intoxicated",
                "Anything copied directly from pornography",
              ].map(t => <li key={t}>{t}</li>)}
            </ul>
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
      
      <div className="wide-card-grid">
        <SafetyQuiz C={C} s={s} />
        <Glossary C={C} s={s} />
      </div>
      
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
              
              <div style={{ marginTop: 24, borderTop: `2px solid ${C.rule}`, paddingTop: 20 }}>
                <span style={s.label}>Guided Reflection</span>
                <p style={{ ...s.p, fontSize: 14, fontWeight: 700, marginBottom: 12, color: C.accent }}>
                  "{sec.reflect}"
                </p>
                <textarea
                  style={{ ...s.input, minHeight: "80px" }}
                  placeholder="Share your thoughts here (saved locally)..."
                  value={reflection[sec.id] || ""}
                  onChange={(e) => handleReflection(sec.id, e.target.value)}
                />
                
                <span style={{ ...s.label, marginTop: 12 }}>How confident do you feel about this?</span>
                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                  {["Low", "Medium", "High"].map(level => (
                    <button
                      key={level}
                      onClick={() => handleConfidence(sec.id, level)}
                      style={{
                        ...s.btn(confidence[sec.id] === level ? "primary" : "outline"),
                        flex: 1, padding: "8px", fontSize: 12
                      }}
                    >
                      {level}
                    </button>
                  ))}
                </div>
                {confidence[sec.id] === "Low" && (
                  <div style={{ ...s.warnBox, marginTop: 12, padding: "8px 12px" }}>
                    <p style={{ ...s.p, fontSize: 12, marginBottom: 0 }}>
                      If you feel low confidence, we recommend re-reading or having more conversation before moving to Step 2.
                    </p>
                  </div>
                )}
              </div>
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
