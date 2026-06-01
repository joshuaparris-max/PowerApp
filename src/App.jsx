import React, { useState, useEffect } from "react";
import { themes, getStyles } from "./constants";
import { Icon } from "./components/Icon";
import LearnTab from "./components/LearnTab";
import ConnectTab from "./components/ConnectTab";
import PrepareTab from "./components/PrepareTab";
import SessionTab from "./components/SessionTab";
import ReflectTab from "./components/ReflectTab";
import ResourceDirectory from "./components/ResourceDirectory";
import PrivacyTab from "./components/PrivacyTab";
import { getLocal, setLocal } from "./utils/storage";

const tabs = [
  { id: "learn", label: "Learn", icon: "learn", component: LearnTab },
  { id: "connect", label: "Connect", icon: "connect", component: ConnectTab },
  { id: "prepare", label: "Prepare", icon: "prepare", component: PrepareTab },
  { id: "session", label: "Session", icon: "play", component: SessionTab },
  { id: "reflect", label: "Reflect", icon: "reflect", component: ReflectTab },
  { id: "resources", label: "Resources", icon: "resources", component: ResourceDirectory },
  { id: "privacy", label: "Privacy", icon: "privacy", component: PrivacyTab },
];

export default function App() {
  const [activeTab, setActiveTab] = useState(() => getLocal("activeTab", "learn"));
  const [themeMode, setThemeMode] = useState(() => getLocal("themeMode", "light"));

  useEffect(() => {
    setLocal("activeTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    setLocal("themeMode", themeMode);
  }, [themeMode]);

  const C = themes[themeMode];
  const s = getStyles(C);

  const ActiveComponent = tabs.find(t => t.id === activeTab)?.component || LearnTab;

  const handlePanicClear = () => {
    if (confirm("Instantly delete all data? This cannot be undone.")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Lato:wght@300;400;700&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: ${C.cream}; transition: background 0.3s; overflow-x: hidden; }
        button { font-family: 'Lato', sans-serif; transition: all 0.2s ease-in-out; cursor: pointer; border: none; outline: none; }
        button:active { transform: scale(0.98); }
        textarea, input { outline: none; transition: border-color 0.2s, background 0.3s, color 0.3s; }
        textarea:focus, input:focus { border-color: ${C.accent} !important; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: ${C.rule}; border-radius: 3px; }
        
        .page-enter-active { 
          animation: fadeIn 300ms ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (min-width: 768px) {
          .app-container {
            box-shadow: 0 0 60px rgba(0,0,0,0.15);
            margin: 40px auto !important;
            border-radius: 16px;
            overflow: hidden;
            height: calc(100vh - 80px);
            display: flex;
            flex-direction: column;
            border: 1px solid ${C.rule};
          }
          .content-scroll {
            overflow-y: auto;
            flex: 1;
            padding-bottom: 40px;
          }
        }
      `}</style>
      <div style={s.app} className="app-container">
        {/* Header */}
        <div style={s.header}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h1 style={s.headerTitle}>PowerApp</h1>
              <div style={s.headerSub}>Private · Educational · Safety-First</div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button 
                onClick={handlePanicClear}
                title="Panic clear all data"
                aria-label="Panic clear all data"
                style={{
                  background: "rgba(196, 74, 58, 0.1)",
                  border: "1px solid #c44a3a",
                  borderRadius: "50%",
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#c44a3a",
                  cursor: "pointer",
                  padding: 0,
                  fontSize: 16
                }}
              >
                !
              </button>
              <button 
                onClick={() => setThemeMode(themeMode === "light" ? "dark" : "light")}
                aria-label={`Switch to ${themeMode === "light" ? "dark" : "light"} mode`}
                style={{
                  background: "none",
                  border: `1px solid ${C.accentLight}`,
                  borderRadius: "50%",
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: C.accentLight,
                  cursor: "pointer",
                  padding: 0,
                  fontSize: 18
                }}
              >
                {themeMode === "light" ? "🌙" : "☀️"}
              </button>
            </div>
          </div>
        </div>

        {/* Active tab */}
        <div key={activeTab} className="page-enter-active content-scroll">
          <ActiveComponent C={C} s={s} />
        </div>

        {/* Bottom Nav */}
        <nav style={s.nav} aria-label="Main navigation">
          {tabs.map(tab => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)} 
              style={s.navBtn(activeTab === tab.id)}
              aria-current={activeTab === tab.id ? "page" : undefined}
            >
              <Icon name={tab.icon} size={20} />
              <span style={{ fontSize: 8, fontWeight: activeTab === tab.id ? 700 : 400, marginTop: 2 }}>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
