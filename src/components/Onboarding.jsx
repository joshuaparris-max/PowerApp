import React, { useState } from "react";

export default function Onboarding({ C, s, onComplete }) {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Welcome to PowerApp",
      desc: "A private, educational space for adult couples to explore relationship safety and trust together.",
      icon: "learn"
    },
    {
      title: "How it Works",
      desc: "We recommend a 5-step flow: Learn the basics, Connect through conversation, Prepare a plan, prioritize Session safety, and Reflect together.",
      icon: "resources"
    },
    {
      title: "Your Privacy",
      desc: "Everything is stored locally on your device. No data ever leaves this phone. The 'Panic Clear' button deletes everything instantly.",
      icon: "privacy"
    }
  ];

  if (step === 99) {
    return (
      <div style={{ ...s.page, minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px 24px" }}>
        <h1 style={{ ...s.h1, textAlign: "center", fontSize: 32 }}>The 5-Step Flow</h1>
        <div style={{ margin: "32px 0" }}>
          {[
            { id: "1", title: "Learn", desc: "Foundational knowledge and safety frameworks." },
            { id: "2", title: "Connect", desc: "Conversation cards and mutual boundary worksheet." },
            { id: "3", title: "Prepare", desc: "Pre-flight checklist and tonight's plan builder." },
            { id: "4", title: "Session", desc: "Traffic lights, grounding, and real-time safety." },
            { id: "5", title: "Reflect", desc: "Aftercare guide and morning-after debrief." },
          ].map(item => (
            <div key={item.id} style={{ display: "flex", gap: 16, marginBottom: 20 }}>
              <div style={{ 
                width: 28, height: 28, borderRadius: "50%", background: C.accent, color: "white", 
                display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, flexShrink: 0,
                fontSize: 14
              }}>
                {item.id}
              </div>
              <div>
                <p style={{ ...s.p, fontWeight: 700, marginBottom: 2, fontSize: 16 }}>{item.title}</p>
                <p style={{ ...s.p, fontSize: 14, marginBottom: 0, opacity: 0.8 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => onComplete("learn")} style={{ ...s.btn(), width: "100%", padding: "18px" }}>
          Start at Step 1: Learn →
        </button>
      </div>
    );
  }

  return (
    <div style={{ ...s.page, minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ 
          width: 80, height: 80, borderRadius: "50%", background: C.accent, margin: "0 auto 24px",
          display: "flex", alignItems: "center", justifyContent: "center", color: "white"
        }}>
          <Icon name={steps[step].icon} size={40} />
        </div>
        <h1 style={{ ...s.h1, fontSize: 32, marginBottom: 16 }}>{steps[step].title}</h1>
        <p style={{ ...s.p, fontSize: 18, lineHeight: 1.6, color: C.softInk }}>{steps[step].desc}</p>
      </div>

      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 40 }}>
        {steps.map((_, i) => (
          <div key={i} style={{ 
            width: 8, height: 8, borderRadius: "50%", 
            background: i === step ? C.accent : C.rule,
            transition: "all 0.3s"
          }} />
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {step < steps.length - 1 ? (
          <button onClick={() => setStep(step + 1)} style={{ ...s.btn(), width: "100%", padding: "16px" }}>
            Continue
          </button>
        ) : (
          <>
            <button onClick={() => setStep(99)} style={{ ...s.btn(), width: "100%", padding: "16px" }}>
              Show me the suggested order
            </button>
            <button onClick={() => onComplete("learn")} style={{ ...s.btn("outline"), width: "100%", padding: "16px" }}>
              I'm new, start with Learn
            </button>
            <button onClick={() => onComplete("connect")} style={{ ...s.btn("outline"), width: "100%", padding: "16px" }}>
              I have the basics, go to Connect
            </button>
          </>
        )}
      </div>
    </div>
  );
