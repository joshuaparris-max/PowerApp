import React, { useState, useEffect } from "react";
import { C, s, font } from "./constants";
import { Icon } from "./components/Icon";
import LearnTab from "./components/LearnTab";
import ConnectTab from "./components/ConnectTab";
import PlayTab from "./components/PlayTab";
import ReflectTab from "./components/ReflectTab";

const tabs = [
  { id: "learn", label: "Learn", icon: "learn", component: LearnTab },
  { id: "connect", label: "Connect", icon: "connect", component: ConnectTab },
  { id: "play", label: "Session", icon: "play", component: PlayTab },
  { id: "reflect", label: "Reflect", icon: "reflect", component: ReflectTab },
];

export default function App() {
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem("activeTab") || "learn");

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const ActiveComponent = tabs.find(t => t.id === activeTab).component;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Lato:wght@300;400;700&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: #f0ede6; }
        button { font-family: 'Lato', sans-serif; transition: all 0.2s ease-in-out; }
        button:active { transform: scale(0.98); }
        textarea, input { outline: none; transition: border-color 0.2s; }
        textarea:focus, input:focus { border-color: #7a5c3a !important; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #d9cfc0; border-radius: 2px; }
        
        .page-enter { opacity: 0; transform: translateY(10px); }
        .page-enter-active { opacity: 1; transform: translateY(0); transition: opacity 300ms, transform 300ms; }
      `}</style>
      <div style={s.app}>
        {/* Header */}
        <div style={s.header}>
          <h1 style={s.headerTitle}>PowerApp</h1>
          <div style={s.headerSub}>Private · Educational · Safety-First</div>
        </div>

        {/* Active tab */}
        <div key={activeTab} className="page-enter-active">
          <ActiveComponent />
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
