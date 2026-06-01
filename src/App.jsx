import React, { useState, useEffect } from "react";
import { themes, getStyles } from "./constants";
import { Icon } from "./components/Icon";
import LearnTab from "./components/LearnTab";
import ConnectTab from "./components/ConnectTab";
import PlayTab from "./components/PlayTab";
import ReflectTab from "./components/ReflectTab";
import ResourceDirectory from "./components/ResourceDirectory";

const tabs = [
  { id: "learn", label: "Learn", icon: "learn", component: LearnTab },
  { id: "connect", label: "Connect", icon: "connect", component: ConnectTab },
  { id: "play", label: "Session", icon: "play", component: PlayTab },
  { id: "reflect", label: "Reflect", icon: "reflect", component: ReflectTab },
  { id: "resources", label: "Resources", icon: "connect", component: ResourceDirectory }, // Reusing connect icon for now
];

export default function App() {
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem("activeTab") || "learn");
  const [themeMode, setThemeMode] = useState(() => localStorage.getItem("themeMode") || "light");

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  const C = themes[themeMode];
  const s = getStyles(C);

  const ActiveComponent = tabs.find(t => t.id === activeTab)?.component || LearnTab;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Lato:wght@300;400;700&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: ${C.cream}; transition: background 0.3s; }
        button { font-family: 'Lato', sans-serif; transition: all 0.2s ease-in-out; }
        button:active { transform: scale(0.98); }
        textarea, input { outline: none; transition: border-color 0.2s, background 0.3s, color 0.3s; }
        textarea:focus, input:focus { border-color: ${C.accent} !important; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: ${C.rule}; border-radius: 2px; }
        
        .page-enter-active { 
          animation: fadeIn 300ms ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div style={s.app}>
        {/* Header */}
        <div style={s.header}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <h1 style={s.headerTitle}>PowerApp</h1>
              <div style={s.headerSub}>Private · Educational · Safety-First</div>
            </div>
            <button 
              onClick={() => setThemeMode(themeMode === "light" ? "dark" : "light")}
              style={{
                background: "none",
                border: `1px solid ${C.accentLight}`,
                borderRadius: "50%",
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: C.accentLight,
                cursor: "pointer",
                padding: 0
              }}
            >
              {themeMode === "light" ? "🌙" : "☀️"}
            </button>
          </div>
        </div>

        {/* Active tab */}
        <div key={activeTab} className="page-enter-active">
          <ActiveComponent C={C} s={s} />
        </div>

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
