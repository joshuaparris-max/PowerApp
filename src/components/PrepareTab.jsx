import React, { useState, useEffect } from "react";
import { font } from "../constants";
import { getLocal, setLocal } from "../utils/storage";

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

export default function PrepareTab({ C, s }) {
  const [checked, setChecked] = useState(() => getLocal("prepare_checked", {}));
  const [plan, setPlan] = useState(() => getLocal("tonight_plan", {
    safeword: "",
    nonVerbal: "",
    activities: [],
    aftercare: "",
    stopConditions: ""
  }));
  const [showPlanBuilder, setShowPlanBuilder] = useState(false);

  const allChecked = preflightItems.every((_, i) => checked[i]);
  const bothYes = beginner_activities_filter();

  useEffect(() => {
    setLocal("prepare_checked", checked);
  }, [checked]);

  useEffect(() => {
    setLocal("tonight_plan", plan);
  }, [plan]);

  function beginner_activities_filter() {
    const partnerA = getLocal("connect_partnerA", {});
    const partnerB = getLocal("connect_partnerB", {});
    const activities = [
      { id: "tone", label: "Tone of voice changes" },
      { id: "lead", label: "One partner chooses music/lighting" },
      { id: "words", label: "Agreed words of endearment" },
      { id: "massage", label: "Massage" },
      { id: "blindfold", label: "Blindfold" },
      { id: "light_touch", label: "Light sensation" },
      { id: "temp", label: "Temperature play" },
      { id: "hold", label: "Hands gently held" },
      { id: "scarf", label: "Soft wrist tie (scarf)" },
      { id: "stillness", label: "Agreed stillness" },
      { id: "initiative", label: "One person takes initiative" },
      { id: "permission", label: "Asking permission" },
      { id: "instructions", label: "Gentle instructions" },
    ];
    return activities.filter(a => partnerA[a.id] === "yes" && partnerB[a.id] === "yes");
  }

  const toggleCheck = (i) => setChecked(p => ({ ...p, [i]: !p[i] }));

  const toggleActivity = (label) => {
    const newActivities = plan.activities.includes(label)
      ? plan.activities.filter(a => a !== label)
      : [...plan.activities, label];
    setPlan({ ...plan, activities: newActivities });
  };

  const exportPlan = () => {
    const text = `TONIGHT'S PLAN
Activities: ${plan.activities.join(", ") || "None selected"}
Safeword: ${plan.safeword || "Not set"}
Non-Verbal: ${plan.nonVerbal || "Not set"}
Aftercare: ${plan.aftercare || "Not set"}
Stop Conditions: ${plan.stopConditions || "Not set"}`;
    
    navigator.clipboard.writeText(text);
    alert("Plan copied to clipboard!");
  };

  if (showPlanBuilder) return (
    <div style={s.page}>
      <button onClick={() => setShowPlanBuilder(false)} style={{ ...s.btn("outline"), marginBottom: 20, fontSize: 13 }}>← Back to Checklist</button>
      <p style={s.label}>Plan Builder</p>
      <h1 style={s.h1}>Tonight's Plan</h1>
      <p style={s.p}>Create a clear, shared plan based on your mutual agreements.</p>

      <div style={s.card}>
        <span style={s.label}>Mutual Yes Activities</span>
        {bothYes.length === 0 ? (
          <p style={{ ...s.p, fontSize: 13, color: C.muted }}>No mutual activities found. Complete the worksheet in 'Connect' first.</p>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
            {bothYes.map(a => (
              <button 
                key={a.id} 
                onClick={() => toggleActivity(a.label)}
                style={{
                  ...s.pill(plan.activities.includes(a.label) ? "white" : C.softInk, 
                          plan.activities.includes(a.label) ? C.sage : C.warmWhite),
                  border: `1px solid ${plan.activities.includes(a.label) ? C.sage : C.rule}`,
                  cursor: "pointer"
                }}
              >
                {a.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={s.card}>
        <span style={s.label}>Safeword & Signal</span>
        <input 
          style={s.input} 
          placeholder="Agreed Safeword (e.g. Red)" 
          value={plan.safeword} 
          onChange={e => setPlan({ ...plan, safeword: e.target.value })}
        />
        <input 
          style={s.input} 
          placeholder="Non-Verbal Signal (e.g. 3 firm squeezes)" 
          value={plan.nonVerbal} 
          onChange={e => setPlan({ ...plan, nonVerbal: e.target.value })}
        />
      </div>

      <div style={s.card}>
        <span style={s.label}>Aftercare Plan</span>
        <textarea 
          style={s.input} 
          rows={2}
          placeholder="What do we both need afterwards? (e.g. blanket, water, quiet time)" 
          value={plan.aftercare} 
          onChange={e => setPlan({ ...plan, aftercare: e.target.value })}
        />
      </div>

      <div style={s.card}>
        <span style={s.label}>Stop Conditions</span>
        <textarea 
          style={s.input} 
          rows={2}
          placeholder="When should we definitely stop? (e.g. if one person seems quiet or tired)" 
          value={plan.stopConditions} 
          onChange={e => setPlan({ ...plan, stopConditions: e.target.value })}
        />
      </div>

      <button onClick={exportPlan} style={{ ...s.btn(), width: "100%", marginBottom: 12 }}>
        Copy Plan to Clipboard
      </button>
      <button 
        onClick={() => {
          if (confirm("Clear this plan?")) {
            setPlan({ safeword: "", nonVerbal: "", activities: [], aftercare: "", stopConditions: "" });
          }
        }} 
        style={{ ...s.btn("outline"), width: "100%", color: "#c44a3a", borderColor: "#c44a3a" }}
      >
        Clear Plan
      </button>
    </div>
  );

  return (
    <div style={s.page}>
      <p style={s.label}>Step 3</p>
      <h1 style={s.h1}>Prepare</h1>
      <p style={s.p}>Safety happens before you start. Complete the checklist and build your plan.</p>

      <div style={s.card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={s.label}>Suggested First Night Guide</span>
          <span style={s.pill(C.accent, C.warmWhite)}>90 Minutes</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { time: "15 min", title: "Connection", desc: "Calm conversation and prayer/check-in. Kids are asleep, phones are away." },
            { time: "20 min", title: "Negotiation", desc: "Compare Yes/No/Maybe lists and agree on what sounds fun tonight." },
            { time: "10 min", title: "Safety Setup", desc: "Confirm safewords, non-verbal signals, and aftercare plan." },
            { time: "20-30 min", title: "Exploration", desc: "Very mild, mutually agreed activities only. Stay in the 'Yes' zone." },
            { time: "15 min", title: "Aftercare", desc: "Immediate care, reassurance, and synchronized breathing." }
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ fontFamily: font.sans, fontWeight: 700, fontSize: 12, color: C.accent, minWidth: 50 }}>{item.time}</span>
              <div>
                <p style={{ ...s.p, fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{item.title}</p>
                <p style={{ ...s.p, fontSize: 13, marginBottom: 0, opacity: 0.8 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={s.card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={s.label}>Pre-Flight Checklist</span>
          <button onClick={() => setChecked({})} style={{ ...s.btn("outline"), padding: "4px 8px", fontSize: 11 }}>Reset</button>
        </div>
        {preflightItems.map((item, i) => (
          <button key={i} onClick={() => toggleCheck(i)} style={{
            width: "100%", textAlign: "left", cursor: "pointer",
            display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 0",
            background: "none", border: "none",
            borderBottom: i < preflightItems.length - 1 ? `1px solid ${C.rule}` : "none",
          }}>
            <div style={{
              width: 20, height: 20, borderRadius: 4, flexShrink: 0, marginTop: 2,
              background: checked[i] ? C.sage : "transparent",
              border: `2px solid ${checked[i] ? C.sage : C.rule}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s"
            }}>
              {checked[i] && <span style={{ color: "white", fontSize: 12, fontWeight: 900 }}>✓</span>}
            </div>
            <span style={{ color: checked[i] ? C.softInk : C.muted, fontSize: 14, lineHeight: 1.4 }}>{item}</span>
          </button>
        ))}
      </div>

      {allChecked ? (
        <button onClick={() => setShowPlanBuilder(true)} style={{ ...s.btn(), width: "100%", padding: "16px", marginTop: 8 }}>
          Build Tonight's Plan →
        </button>
      ) : (
        <div style={s.warnBox}>
          <p style={{ ...s.p, fontSize: 14, marginBottom: 0 }}>
            Complete the checklist above to unlock the Plan Builder. Safety first.
          </p>
        </div>
      )}

      <div style={{ ...s.safeBox, marginTop: 24 }}>
        <p style={{ ...s.p, fontSize: 14, marginBottom: 0, fontStyle: "italic" }}>
          "Preparation is an act of care. It shows you value your partner's safety as much as your own."
        </p>
      </div>
    </div>
  );
}
