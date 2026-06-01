const flow = [
  { id: "learn", label: "Learn" },
  { id: "connect", label: "Connect" },
  { id: "prepare", label: "Prepare" },
  { id: "session", label: "Session" },
  { id: "reflect", label: "Reflect" },
];

export default function FlowProgress({ C, active }) {
  const activeIndex = flow.findIndex(step => step.id === active);

  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 24, overflowX: "auto", paddingBottom: 4 }}>
      {flow.map((step, index) => {
        const isActive = step.id === active;
        const isPast = index < activeIndex;
        return (
          <div key={step.id} style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 10px",
            borderRadius: 999,
            border: `1px solid ${isActive ? C.accent : C.rule}`,
            background: isActive ? C.ink : isPast ? C.sageBg : C.warmWhite,
            color: isActive ? C.cream : isPast ? C.sage : C.muted,
            fontSize: 12,
            fontWeight: 700,
            whiteSpace: "nowrap",
          }}>
            <span>{index + 1}</span>
            <span>{step.label}</span>
          </div>
        );
      })}
    </div>
  );
}
