import React, { useState, useEffect } from "react";
import { font } from "../constants";

export default function BreathingTool({ C, s }) {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState("Inhale"); // Inhale, Hold, Exhale, Hold
  const [seconds, setSeconds] = useState(4);
  const [totalSeconds, setTotalSeconds] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev === 1) {
            // Switch phases in order: Inhale -> Hold (In) -> Exhale -> Hold (Out)
            setPhase((currentPhase) => {
              if (currentPhase === "Inhale") return "Hold "; // Hold after inhale
              if (currentPhase === "Hold ") return "Exhale";
              if (currentPhase === "Exhale") return "Hold";  // Hold after exhale
              return "Inhale";
            });
            return 4;
          }
          return prev - 1;
        });
        setTotalSeconds(t => t + 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setSeconds(4);
      setPhase("Inhale");
    }
    return () => clearInterval(interval);
  }, [isActive]);

  // Visual size logic: Inhale grows, Hold stays large, Exhale shrinks, Hold stays small
  const getVisualSize = () => {
    if (!isActive) return 160;
    if (phase === "Inhale") return 220;
    if (phase === "Hold ") return 220;
    if (phase === "Exhale") return 120;
    return 120; // Hold (Out)
  };

  const size = getVisualSize();

  return (
    <div style={{ ...s.card, textAlign: "center", padding: "32px 24px", overflow: "hidden" }}>
      <span style={s.label}>Box Breathing</span>
      <p style={{ ...s.p, fontSize: 13, marginBottom: 24 }}>A simple technique to calm the nervous system during aftercare.</p>
      
      <div style={{
        width: 220, height: 220, margin: "0 auto 24px",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative"
      }}>
        <div style={{
          width: size, height: size,
          borderRadius: "50%",
          background: C.accent,
          opacity: 0.15,
          transition: phase === "Inhale" || phase === "Exhale" ? "all 4s linear" : "none",
          position: "absolute"
        }} />
        <div style={{
          width: 100, height: 100,
          borderRadius: "50%",
          background: C.accent,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "white", fontWeight: 700, fontSize: 24,
          zIndex: 2, position: "relative"
        }}>
          {isActive ? seconds : "Ready"}
        </div>
      </div>

      <h3 style={{ fontFamily: font.serif, fontSize: 24, color: C.ink, marginBottom: 8, height: 32 }}>
        {isActive ? phase.trim() : "Box Breathing"}
      </h3>
      
      <p style={{ ...s.p, fontSize: 14, marginBottom: 24, opacity: 0.7 }}>
        {isActive ? "Follow the circle and the count." : "4s Inhale • 4s Hold • 4s Exhale • 4s Hold"}
      </p>

      <div style={{ display: "flex", gap: 10 }}>
        <button 
          onClick={() => setIsActive(!isActive)}
          style={{ ...s.btn(isActive ? "outline" : "primary"), flex: 1 }}
        >
          {isActive ? "Stop" : "Start Exercise"}
        </button>
      </div>

      {totalSeconds > 0 && !isActive && (
        <p style={{ ...s.p, fontSize: 12, marginTop: 12, marginBottom: 0 }}>
          Great job. You practiced for {Math.floor(totalSeconds / 60)}m {totalSeconds % 60}s.
        </p>
      )}
    </div>
  );
}
