import React from "react";
import { font } from "../constants";

const resources = [
  {
    name: "National Domestic Violence Hotline",
    desc: "Confidential support for anyone experiencing abuse or seeking resources.",
    link: "https://www.thehotline.org",
    phone: "1-800-799-SAFE (7233)"
  },
  {
    name: "Kink Aware Professionals (KAP)",
    desc: "Directory of therapeutic and legal professionals who are knowledgeable about alternative lifestyles.",
    link: "https://www.kapprofessionals.org"
  },
  {
    name: "RAINN",
    desc: "The nation's largest anti-sexual violence organization.",
    link: "https://www.rainn.org",
    phone: "1-800-656-HOPE"
  },
  {
    name: "BDSM Safety Guide",
    desc: "Comprehensive community-led resources on physical and emotional safety.",
    link: "https://www.sm-101.com/safety"
  }
];

export default function ResourceDirectory({ C, s }) {
  return (
    <div style={s.page}>
      <p style={s.label}>Support & Safety</p>
      <h1 style={s.h1}>Resources</h1>
      <p style={s.p}>Professional support and community resources for your journey. Safety is a shared responsibility.</p>
      
      <div style={s.warnBox}>
        <p style={{ ...s.p, fontSize: 13, marginBottom: 0 }}>
          <strong>Note:</strong> These are external resources. If you ever feel unsafe in your relationship, please reach out to a professional immediately.
        </p>
      </div>

      <hr style={s.divider} />

      {resources.map((res, i) => (
        <div key={i} style={s.card}>
          <h3 style={{ fontFamily: font.serif, fontSize: 18, color: C.accent, marginBottom: 8 }}>{res.name}</h3>
          <p style={{ ...s.p, fontSize: 14, marginBottom: 12 }}>{res.desc}</p>
          {res.phone && (
            <p style={{ ...s.p, fontSize: 13, fontWeight: 700, marginBottom: 8, color: C.ink }}>
              Phone: {res.phone}
            </p>
          )}
          <a 
            href={res.link} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              color: C.accent, 
              fontSize: 13, 
              textDecoration: "underline",
              fontFamily: font.sans,
              fontWeight: 700
            }}
          >
            Visit Website →
          </a>
        </div>
      ))}
      
      <p style={{ ...s.p, fontSize: 12, textAlign: "center", marginTop: 24, opacity: 0.6 }}>
        This app is educational and does not replace professional counseling or medical advice.
      </p>
    </div>
  );
}
