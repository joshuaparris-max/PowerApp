import React, { useState } from "react";
import { font } from "../constants";

const quizData = [
  {
    scenario: "Your partner says 'Yellow' during an activity. What do you do?",
    options: [
      { text: "Stop everything immediately and walk away.", correct: false, feedback: "Red is for immediate stop. Yellow means slow down and check in." },
      { text: "Slow down, pause, and ask 'Are you okay to continue?'", correct: true, feedback: "Correct! Yellow is a signal to check in and adjust pace." },
      { text: "Continue but more gently without speaking.", correct: false, feedback: "Communication is key. You must verbally check in." }
    ]
  },
  {
    scenario: "Which of these is a 'Hard Limit' for beginners?",
    options: [
      { text: "Using a silk scarf for light restraint.", correct: false, feedback: "This is generally considered safe for beginners if agreed upon." },
      { text: "Breath restriction or neck compression.", correct: true, feedback: "Correct. Anything affecting breathing is a strict hard limit for beginners." },
      { text: "Playing music and changing the lighting.", correct: false, feedback: "This is a great way to set the atmosphere safely." }
    ]
  },
  {
    scenario: "Your partner agreed to an activity 10 minutes ago, but now seems hesitant. What is the rule?",
    options: [
      { text: "Consent is ongoing and can be revoked at any time.", correct: true, feedback: "Exactly. A 'yes' 10 minutes ago doesn't mean a 'yes' now." },
      { text: "They already agreed, so we should finish the activity.", correct: false, feedback: "Never. Consent must be active and enthusiastic throughout." },
      { text: "We should wait until the end to talk about it.", correct: false, feedback: "No, stop and check in immediately if you sense hesitation." }
    ]
  }
];

export default function SafetyQuiz({ C, s }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleSelect = (idx) => {
    if (showFeedback) return;
    setSelectedOpt(idx);
    setShowFeedback(true);
    if (quizData[currentIdx].options[idx].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIdx < quizData.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOpt(null);
      setShowFeedback(false);
    } else {
      setQuizComplete(true);
    }
  };

  const reset = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setShowFeedback(false);
    setScore(0);
    setQuizComplete(false);
  };

  if (quizComplete) return (
    <div style={{ ...s.card, textAlign: "center", padding: "32px 24px" }}>
      <span style={s.label}>Quiz Complete</span>
      <h3 style={{ fontFamily: font.serif, fontSize: 24, color: C.ink, marginBottom: 12 }}>
        Your Score: {score} / {quizData.length}
      </h3>
      <p style={{ ...s.p, marginBottom: 24 }}>
        {score === quizData.length 
          ? "Perfect! You have a solid grasp of safety fundamentals." 
          : "Good effort. Review the Learn tab to brush up on safety."}
      </p>
      <button onClick={reset} style={{ ...s.btn(), width: "100%" }}>Try Again</button>
    </div>
  );

  const q = quizData[currentIdx];

  return (
    <div style={s.card}>
      <span style={s.label}>Safety Knowledge Check</span>
      <p style={{ ...s.p, fontSize: 13, marginBottom: 16 }}>Question {currentIdx + 1} of {quizData.length}</p>
      
      <h3 style={{ fontFamily: font.serif, fontSize: 19, color: C.ink, marginBottom: 20, lineHeight: 1.4 }}>
        "{q.scenario}"
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            style={{
              ...s.btn("outline"),
              textAlign: "left",
              padding: "12px 16px",
              borderColor: showFeedback 
                ? (opt.correct ? C.sage : (selectedOpt === i ? "#c44a3a" : C.rule))
                : (selectedOpt === i ? C.accent : C.rule),
              background: showFeedback && opt.correct ? C.sageBg : (showFeedback && selectedOpt === i ? "#fff5f5" : "transparent"),
              color: C.ink,
              fontWeight: 400,
            }}
          >
            {opt.text}
          </button>
        ))}
      </div>

      {showFeedback && (
        <div style={{ 
          marginTop: 20, 
          padding: 12, 
          borderRadius: 6, 
          background: q.options[selectedOpt].correct ? C.sageBg : "#fff5f5",
          border: `1px solid ${q.options[selectedOpt].correct ? C.sage : "#c44a3a"}`
        }}>
          <p style={{ ...s.p, fontSize: 13, marginBottom: 12, color: C.ink }}>
            <strong>{q.options[selectedOpt].correct ? "Correct!" : "Not quite."}</strong> {q.options[selectedOpt].feedback}
          </p>
          <button onClick={nextQuestion} style={{ ...s.btn(), width: "100%", padding: "8px" }}>
            {currentIdx === quizData.length - 1 ? "Finish" : "Next Question"}
          </button>
        </div>
      )}
    </div>
  );
}
