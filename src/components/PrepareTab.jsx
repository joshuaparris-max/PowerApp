import React, { useState, useEffect } from "react";
import { font } from "../constants";
import { getLocal, setLocal } from "../utils/storage";
import { beginnerActivities } from "../data/activities";
import { buildPlanText, getExcludedActivities, getMutualYesFromStorage } from "../utils/plan";

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

// Step 3: Prepare
// LocalStorage keys: prepare_checked, tonight_plan
export default function PrepareTab({ C, s, onNavigate }) {
  const [checked, setChecked] = useState(() => getLocal("prepare_checked", {}));
  const [plan, setPlan] = useState(() => getLocal("tonight_plan", {
    goal: "",
    safeword: "",
    nonVerbal: "",
    activities: [],
    hardLimits: "",
    softLimits: "",
    aftercare: "",
    stopConditions: "",
    checkInTime: "",
    riskConflict: false,
    riskSubstances: false,
    riskPressure: false,
    riskUnease: false
  }));
  const [showPlanBuilder, setShowPlanBuilder] = useState(false);

  const allChecked = preflightItems.every((_, i) => checked[i]);
  const bothYes = getMutualYesFromStorage(getLocal, beginnerActivities);
  const excluded = getExcludedActivities(getLocal("connect_partnerA", {}), getLocal("connect_partnerB", {}), beginnerActivities);
  const hasRiskFlag = plan.riskConflict || plan.riskSubstances || plan.riskPressure || plan.riskUnease;

  useEffect(() => {
    setLocal("prepare_checked", checked);
  }, [checked]);

  useEffect(() => {
    setLocal("tonight_plan", plan);
  }, [plan]);

  const toggleCheck = (i) => setChecked(p => ({ ...p, [i]: !p[i] }));

  const toggleActivity = (label) => {
    const newActivities = plan.activities.includes(label)
      ? plan.activities.filter(a => a !== label)
      : [...plan.activities, label];
    setPlan({ ...plan, activities: newActivities });
  };

  const exportPlan = () => {
    const text = buildPlanText(plan, bothYes);
    navigator.clipboard.writeText(text);
    alert("Plan copied to clipboard!");
  };

  const exportTextFile = () => {
    const blob = new Blob([buildPlanText(plan, bothYes)], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "powerapp-tonight-plan.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  if (showPlanBuilder) return (
    <div style={s.page}>
      <button onClick={() => setShowPlanBuilder(false)} style={{ ...s.btn("outline"), marginBottom: 20, fontSize: 13 }}>← Back to Checklist</button>
      <p style={s.label}>Plan Builder</p>
      <h1 style={s.h1}>Tonight's Plan</h1>
      <p style={s.p}>Create a clear, shared plan based on your mutual agreements.</p>

      <div style={s.card}>
        <span style={s.label}>Tonight's shared goal</span>
        <input
          style={s.input}
          placeholder="Connection, tenderness, honest conversation..."
          value={plan.goal}
          onChange={e => setPlan({ ...plan, goal: e.target.value })}
        />
      </div>

      <div style={hasRiskFlag ? s.warnBox : s.safeBox}>
        <span style={{ ...s.label, color: hasRiskFlag ? C.warnBorder : C.sage }}>Wisdom Check</span>
        {[
          ["riskConflict", "We are carrying unresolved conflict tonight"],
          ["riskSubstances", "Alcohol, medication, or substances may affect consent"],
          ["riskPressure", "Either person feels pressure, fear, or obligation"],
          ["riskUnease", "Either person feels spiritual or conscience unease"],
        ].map(([key, label]) => (
          <label key={key} style={{ display: "flex", gap: 10, alignItems: "flex-start", color: C.softInk, fontSize: 14, marginTop: 8 }}>
            <input
              type="checkbox"
              checked={Boolean(plan[key])}
              onChange={e => setPlan({ ...plan, [key]: e.target.checked })}
            />
            <span>{label}</span>
          </label>
        ))}
        {hasRiskFlag && (
          <p style={{ ...s.p, fontSize: 14, marginTop: 12, marginBottom: 0 }}>
            Tonight's wise choice is connection, rest, and no further exploration. Talk gently and return another day.
          </p>
        )}
      </div>

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
        <span style={s.label}>Limits for tonight</span>
        <textarea
          style={s.input}
          rows={2}
          placeholder="Hard limits, copied from your conversation..."
          value={plan.hardLimits}
          onChange={e => setPlan({ ...plan, hardLimits: e.target.value })}
        />
        <textarea
          style={s.input}
          rows={2}
          placeholder="Soft limits, Not Now, Maybe, or unanswered items excluded from tonight..."
          value={plan.softLimits}
          onChange={e => setPlan({ ...plan, softLimits: e.target.value })}
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

      <div style={s.card}>
        <span style={s.label}>Morning-after check-in time</span>
        <input
          style={s.input}
          placeholder="Tomorrow after breakfast, 10 minutes..."
          value={plan.checkInTime}
          onChange={e => setPlan({ ...plan, checkInTime: e.target.value })}
        />
      </div>

      <div style={s.warnBox}>
        <span style={{ ...s.label, color: C.warnBorder }}>Excluded from tonight</span>
        <p style={{ ...s.p, fontSize: 13, marginBottom: 8 }}>
          These are not in the plan unless both partners later move them to a clear Yes.
        </p>
        <p style={{ ...s.p, fontSize: 13, marginBottom: 0 }}>
          {excluded.map(item => item.label).join(", ") || "Nothing to show yet."}
        </p>
      </div>

      <button onClick={exportPlan} style={{ ...s.btn(), width: "100%", marginBottom: 12 }}>
        Copy Plan to Clipboard
      </button>
      <button onClick={exportTextFile} style={{ ...s.btn("outline"), width: "100%", marginBottom: 12 }}>
        Export Plan as .txt
      </button>
      <button 
        onClick={() => {
          if (confirm("Clear this plan?")) {
            setPlan({ goal: "", safeword: "", nonVerbal: "", activities: [], hardLimits: "", softLimits: "", aftercare: "", stopConditions: "", checkInTime: "", riskConflict: false, riskSubstances: false, riskPressure: false, riskUnease: false });
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
            { time: "20-30 min", title: "Only if still wise", desc: "Very mild, mutual Yes items only. Maybe, Not Now, No, and Hard Limits stay out." },
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
            Talk through the checklist above before opening the Plan Builder. Safety first.
          </p>
        </div>
      )}

      <div style={{ ...s.safeBox, marginTop: 24 }}>
        <p style={{ ...s.p, fontSize: 14, marginBottom: 0, fontStyle: "italic" }}>
          "Preparation is an act of care. It shows you value your partner's safety as much as your own."
        </p>
      </div>
      <button onClick={() => onNavigate?.("session")} style={{ ...s.btn(), width: "100%", marginTop: 12 }}>
        Ready to keep safety visible? Go to Session
      </button>
    </div>
  );
}
