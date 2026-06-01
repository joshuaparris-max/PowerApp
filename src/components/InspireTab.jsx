import React, { useEffect, useMemo, useState } from "react";
import { getLocal, setLocal } from "../utils/storage";
import {
  atmosphereOptions,
  defaultScenePlan,
  dynamicStyles,
  intensityLevels,
  ritualKitItems,
  sensoryFocuses,
} from "../data/inspiration";

const intensityValues = ["Low", "Medium", "High"];

const nextIndex = (list, currentId) => {
  const current = list.findIndex(item => item.id === currentId);
  return (current + 1 + list.length) % list.length;
};

export default function InspireTab({ C, s, onNavigate }) {
  const [generator, setGenerator] = useState(() => getLocal("inspire_generator", {
    dynamic: dynamicStyles[0].id,
    intensity: intensityLevels[0].id,
    sensory: sensoryFocuses[0].id,
    atmosphere: atmosphereOptions[0],
  }));
  const [scenePlan, setScenePlan] = useState(() => getLocal("inspire_scene_plan", defaultScenePlan));
  const [ritualKit, setRitualKit] = useState(() => getLocal("inspire_ritual_kit", {}));
  const [copyStatus, setCopyStatus] = useState("");

  useEffect(() => {
    setLocal("inspire_generator", generator);
  }, [generator]);

  useEffect(() => {
    setLocal("inspire_scene_plan", scenePlan);
  }, [scenePlan]);

  useEffect(() => {
    setLocal("inspire_ritual_kit", ritualKit);
  }, [ritualKit]);

  const selectedDynamic = dynamicStyles.find(item => item.id === generator.dynamic) || dynamicStyles[0];
  const selectedIntensity = intensityLevels.find(item => item.id === generator.intensity) || intensityLevels[0];
  const selectedSensory = sensoryFocuses.find(item => item.id === generator.sensory) || sensoryFocuses[0];

  const outline = useMemo(() => [
    `Start with ${generator.atmosphere} energy: ${selectedDynamic.phrase}.`,
    `Keep the intensity ${selectedIntensity.phrase}.`,
    `Let the main sensory focus be ${selectedSensory.phrase}.`,
    "Open with a consent check, name any limits, and agree that Yellow means pause and Red means stop.",
    "Close with aftercare, a role-release statement, and a short note about what felt connecting or uncomfortable.",
  ], [generator, selectedDynamic, selectedIntensity, selectedSensory]);

  const updatePlan = (key, value) => setScenePlan(current => ({ ...current, [key]: value }));

  const updateRitual = (id, patch) => {
    setRitualKit(current => ({
      ...current,
      [id]: {
        enabled: false,
        intensity: "Low",
        notes: "",
        ...(current[id] || {}),
        ...patch,
      },
    }));
  };

  const randomizePrompt = () => {
    setGenerator(current => ({
      dynamic: dynamicStyles[nextIndex(dynamicStyles, current.dynamic)].id,
      intensity: intensityLevels[nextIndex(intensityLevels, current.intensity)].id,
      sensory: sensoryFocuses[nextIndex(sensoryFocuses, current.sensory)].id,
      atmosphere: atmosphereOptions[(atmosphereOptions.indexOf(current.atmosphere) + 1) % atmosphereOptions.length],
    }));
  };

  const copyWorksheet = () => {
    const selectedRituals = ritualKitItems
      .filter(item => ritualKit[item.id]?.enabled)
      .map(item => `- ${item.label}: ${ritualKit[item.id]?.intensity || "Low"}${ritualKit[item.id]?.notes ? ` - ${ritualKit[item.id].notes}` : ""}`)
      .join("\n") || "- None selected yet";

    const text = [
      "PowerApp Inspire Worksheet",
      "",
      "Generated outline:",
      ...outline.map(line => `- ${line}`),
      "",
      "Scene planning worksheet:",
      `Desired dynamic: ${scenePlan.dynamic || "Not set"}`,
      `Mood and atmosphere: ${scenePlan.mood || "Not set"}`,
      `Sensory elements: ${scenePlan.sensory || "Not set"}`,
      `Psychological elements: ${scenePlan.psychological || "Not set"}`,
      `Consent boundaries: ${scenePlan.boundaries || "Not set"}`,
      `Safeword and signal: ${scenePlan.safeword || "Not set"}`,
      `Aftercare requirements: ${scenePlan.aftercare || "Not set"}`,
      `Stop conditions: ${scenePlan.stopConditions || "Not set"}`,
      "",
      "Ritual kit:",
      selectedRituals,
      "",
      "Consent reminder: anything unclear, pressured, or not mutually wanted stays out of the plan.",
    ].join("\n");

    navigator.clipboard.writeText(text);
    setCopyStatus("Inspire worksheet copied.");
  };

  return (
    <div style={s.page}>
      <p style={s.label}>Idea Lab</p>
      <h1 style={s.h1}>Inspire</h1>
      <p style={s.p}>
        Build non-explicit, consent-first inspiration for conversation and planning. Treat every idea as optional until both partners clearly choose it.
      </p>

      <div style={s.safeBox}>
        <p style={{ ...s.p, fontSize: 14, marginBottom: 0 }}>
          Inspiration is not permission. Use this tab for discussion only; anything vague, pressured, or one-sided belongs outside the plan.
        </p>
      </div>

      <div className="wide-card-grid">
        <section style={s.card}>
          <span style={s.label}>Fantasy Idea Generator</span>
          <SelectField s={s} label="Power dynamic style" value={generator.dynamic} onChange={value => setGenerator({ ...generator, dynamic: value })} options={dynamicStyles} />
          <SelectField s={s} label="Intensity level" value={generator.intensity} onChange={value => setGenerator({ ...generator, intensity: value })} options={intensityLevels} />
          <SelectField s={s} label="Sensory focus" value={generator.sensory} onChange={value => setGenerator({ ...generator, sensory: value })} options={sensoryFocuses} />
          <label style={s.label} htmlFor="inspire-atmosphere">Atmosphere</label>
          <select
            id="inspire-atmosphere"
            style={s.input}
            value={generator.atmosphere}
            onChange={event => setGenerator({ ...generator, atmosphere: event.target.value })}
          >
            {atmosphereOptions.map(option => <option key={option} value={option}>{option}</option>)}
          </select>
          <button type="button" onClick={randomizePrompt} style={{ ...s.btn("outline"), width: "100%" }}>
            Generate Another Outline
          </button>
        </section>

        <section style={s.card}>
          <span style={s.label}>Neutral Outline</span>
          <div style={{ display: "grid", gap: 10 }}>
            {outline.map(line => (
              <p key={line} style={{ ...s.p, fontSize: 14, marginBottom: 0 }}>{line}</p>
            ))}
          </div>
        </section>
      </div>

      <section style={s.card}>
        <span style={s.label}>Scene Planning Worksheet</span>
        <div className="wide-card-grid">
          <TextArea s={s} label="Desired power dynamic" value={scenePlan.dynamic} placeholder="Example: Partner A leads; Partner B chooses clear Yes, Yellow, or Red feedback." onChange={value => updatePlan("dynamic", value)} />
          <TextArea s={s} label="Mood and atmosphere" value={scenePlan.mood} placeholder="Calm, reverent, playful, structured, quiet..." onChange={value => updatePlan("mood", value)} />
          <TextArea s={s} label="Sensory elements" value={scenePlan.sensory} placeholder="Voice, lighting, music, texture, comfortable temperature..." onChange={value => updatePlan("sensory", value)} />
          <TextArea s={s} label="Psychological elements" value={scenePlan.psychological} placeholder="Trust, service, patience, surrender, reassurance, role release..." onChange={value => updatePlan("psychological", value)} />
          <TextArea s={s} label="Consent boundaries" value={scenePlan.boundaries} placeholder="Hard limits, soft limits, not-now items, and topics to avoid." onChange={value => updatePlan("boundaries", value)} />
          <TextArea s={s} label="Safewords and signals" value={scenePlan.safeword} placeholder="Traffic lights, non-verbal signal, check-in frequency." onChange={value => updatePlan("safeword", value)} />
          <TextArea s={s} label="Aftercare requirements" value={scenePlan.aftercare} placeholder="Water, blanket, quiet, prayer, reassurance, debrief timing." onChange={value => updatePlan("aftercare", value)} />
          <TextArea s={s} label="Stop conditions" value={scenePlan.stopConditions} placeholder="Tiredness, confusion, silence, pressure, overwhelm, conscience unease." onChange={value => updatePlan("stopConditions", value)} />
        </div>
      </section>

      <section style={s.card}>
        <span style={s.label}>Sensory & Ritual Builder</span>
        <div style={{ display: "grid", gap: 12 }}>
          {ritualKitItems.map(item => {
            const saved = ritualKit[item.id] || { enabled: false, intensity: "Low", notes: "" };
            return (
              <div key={item.id} style={{ border: `1px solid ${C.rule}`, borderRadius: 8, padding: 14, background: saved.enabled ? C.sageBg : "transparent" }}>
                <label style={{ display: "flex", gap: 10, alignItems: "flex-start", color: C.ink, fontWeight: 700 }}>
                  <input type="checkbox" checked={Boolean(saved.enabled)} onChange={event => updateRitual(item.id, { enabled: event.target.checked })} />
                  <span>{item.label}</span>
                </label>
                <p style={{ ...s.p, fontSize: 13, margin: "6px 0 10px" }}>{item.note}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
                  {intensityValues.map(level => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => updateRitual(item.id, { intensity: level, enabled: true })}
                      style={{
                        ...s.pill(saved.intensity === level ? C.cream : C.softInk, saved.intensity === level ? C.accent : C.warmWhite),
                        border: `1px solid ${saved.intensity === level ? C.accent : C.rule}`,
                      }}
                    >
                      {level}
                    </button>
                  ))}
                </div>
                <input
                  style={{ ...s.input, marginBottom: 0 }}
                  placeholder="Personal notes or boundaries for this item"
                  value={saved.notes || ""}
                  onChange={event => updateRitual(item.id, { notes: event.target.value })}
                />
              </div>
            );
          })}
        </div>
      </section>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
        <button type="button" onClick={copyWorksheet} style={{ ...s.btn(), width: "100%" }}>Copy Inspire Worksheet</button>
        <button type="button" onClick={() => onNavigate?.("prepare")} style={{ ...s.btn("outline"), width: "100%" }}>Use Ideas in Prepare</button>
      </div>
      {copyStatus && <p style={{ ...s.p, fontSize: 13, textAlign: "center", color: C.sage }}>{copyStatus}</p>}
    </div>
  );
}

function SelectField({ s, label, value, onChange, options }) {
  const id = `inspire-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <>
      <label style={s.label} htmlFor={id}>{label}</label>
      <select id={id} style={s.input} value={value} onChange={event => onChange(event.target.value)}>
        {options.map(option => <option key={option.id} value={option.id}>{option.label}</option>)}
      </select>
    </>
  );
}

function TextArea({ s, label, value, placeholder, onChange }) {
  const id = `worksheet-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <label htmlFor={id} style={{ display: "block" }}>
      <span style={{ ...s.label, letterSpacing: 2 }}>{label}</span>
      <textarea
        id={id}
        style={{ ...s.input, minHeight: 96 }}
        placeholder={placeholder}
        value={value}
        onChange={event => onChange(event.target.value)}
      />
    </label>
  );
}
