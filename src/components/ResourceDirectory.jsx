import React from "react";
import { font } from "../constants";

const resources = {
  australia: [
    {
      name: "Emergency Services",
      desc: "Immediate danger to life or safety.",
      phone: "000",
      link: "https://www.triplezero.gov.au"
    },
    {
      name: "1800RESPECT",
      desc: "National sexual assault, domestic and family violence counselling service.",
      phone: "1800 737 732",
      link: "https://www.1800respect.org.au"
    },
    {
      name: "Lifeline",
      desc: "24/7 crisis support and suicide prevention services.",
      phone: "13 11 14",
      link: "https://www.lifeline.org.au"
    },
    {
      name: "Blue Knot Foundation",
      desc: "Support for adult survivors of childhood trauma and abuse.",
      phone: "1300 657 380",
      link: "https://blueknot.org.au"
    },
    {
      name: "MensLine Australia",
      desc: "Support and referral service for men with family and relationship issues.",
      phone: "1300 78 99 78",
      link: "https://mensline.org.au"
    },
    {
      name: "Full Stop Australia",
      desc: "Support for people impacted by sexual, domestic, or family violence.",
      phone: "1800 385 578",
      link: "https://fullstop.org.au"
    }
  ],
  international: [
    {
      name: "National Domestic Violence Hotline (US)",
      desc: "Confidential support for anyone seeking resources in the US.",
      phone: "1-800-799-7233",
      link: "https://www.thehotline.org"
    },
    {
      name: "RAINN (US)",
      desc: "Anti-sexual violence organization in the US.",
      phone: "1-800-656-HOPE",
      link: "https://www.rainn.org"
    },
    {
      name: "Kink Aware Professionals (KAP)",
      desc: "Global directory of therapeutic and legal professionals.",
      link: "https://www.kapprofessionals.org"
    }
  ]
};

export default function ResourceDirectory({ C, s }) {
  const [region, setRegion] = React.useState("australia");

  return (
    <div style={s.page}>
      <p style={s.label}>Support & Safety</p>
      <h1 style={s.h1}>Resources</h1>
      <p style={s.p}>If you feel unsafe, pressured, or unable to say no, please stop and seek professional support.</p>
      
      <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
        <button 
          onClick={() => setRegion("australia")}
          style={{
            ...s.btn(region === "australia" ? "primary" : "outline"),
            flex: 1, padding: "10px"
          }}
        >
          Australia
        </button>
        <button 
          onClick={() => setRegion("international")}
          style={{
            ...s.btn(region === "international" ? "primary" : "outline"),
            flex: 1, padding: "10px"
          }}
        >
          International
        </button>
      </div>

      <div style={s.warnBox}>
        <p style={{ ...s.p, fontSize: 13, marginBottom: 0 }}>
          <strong>Important:</strong> These are external resources. This app is educational and not a substitute for counselling or medical advice.
        </p>
      </div>

      {resources[region].map((res, i) => (
        <div key={i} style={{ ...s.card, marginBottom: 12 }}>
          <h3 style={{ fontFamily: font.serif, fontSize: 19, color: C.accent, marginBottom: 6 }}>{res.name}</h3>
          <p style={{ ...s.p, fontSize: 14, marginBottom: 12 }}>{res.desc}</p>
          {res.phone && (
            <p style={{ ...s.p, fontSize: 14, fontWeight: 700, marginBottom: 10, color: C.ink }}>
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
      
      <p style={{ ...s.p, fontSize: 12, textAlign: "center", marginTop: 32, opacity: 0.6, fontStyle: "italic" }}>
        "Safety is a shared responsibility. Real-world support is always the priority."
      </p>
    </div>
  );
}
