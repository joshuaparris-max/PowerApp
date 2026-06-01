import React from "react";

const steps = [
  { id: "learn", label: "1. Learn" },
  { id: "connect", label: "2. Connect" },
  { id: "prepare", label: "3. Prepare" },
  { id: "session", label: "4. Session" },
  { id: "reflect", label: "5. Reflect" },
];

export default function StepProgress({ activeStep, C, s }) {
  const activeIdx = steps.findIndex(s => s.id === activeStep);

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={s.stepProgress}>
        {steps.map((step, i) => (
          <div 
            key={step.id} 
            style={s.stepDot(activeStep === step.id, i < activeIdx)} 
            title={step.label}
          />
        ))}
      </div>
      <div style={{ textAlign: "center" }}>
        <span style={{ ...s.label, color: C.accent, marginBottom: 0 }}>
          {steps[activeIdx]?.label || ""}
        </span>
      </div>
    </div>
  );
}
