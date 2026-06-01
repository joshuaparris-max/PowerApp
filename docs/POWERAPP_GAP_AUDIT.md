# PowerApp Gap Audit

Date: 2026-06-01

## Summary

PowerApp already has a strong safety-first structure: Learn, Connect, Prepare, Session, Reflect, Resources, Privacy, onboarding, localStorage persistence, dark mode, and panic clear. The main gaps were not the overall direction, but consistency, depth, and enforcement: the worksheet and plan builder needed shared filtering logic, the glossary was too thin, reflection needed a clearer red-flag path, privacy needed individual clear controls, and the app needed stronger reminders that marriage never replaces consent.

## Findings

| Existing feature | Source | What is good | What was missing | Recommended improvement | Priority | Risk if left unfixed |
| --- | --- | --- | --- | --- | --- | --- |
| Learn modules | `src/components/LearnTab.jsx` | Covers frameworks, red flags, Christian reflection, drops, beginner limits | Consent-in-marriage, nervous-system signs, and safeword limitations needed more prominence | Added modules for marriage/consent, safewords, freeze/fawn/dissociation/shutdown | High | Users may mistake marriage, silence, or a past yes for current consent |
| Glossary | `src/components/Glossary.jsx` | Searchable glossary existed | Too few terms and no "why it matters" notes | Expanded A-Z glossary with practical safety notes | Medium | Beginners lack shared language |
| Connect worksheet | `src/components/ConnectTab.jsx` | Partner A/B local worksheet and compare mode existed | Plan filtering was duplicated and not centrally enforced; hard limit option was missing in activity votes | Added shared activity data and five-state vote options | High | Maybe/No/Hard Limit items could be mishandled |
| Plan builder | `src/components/PrepareTab.jsx` | Generates a local plan from mutual items | Needed risk screen, explicit excluded list, goal, soft/hard limits, check-in time, export | Added shared mutual-yes filtering and richer plan fields | High | Users could move too quickly or include ambiguous items |
| Session safety | `src/components/SessionTab.jsx` | Traffic lights and grounding prompts existed | Red and Yellow meanings needed warmer and clearer action language | Added stop/aftercare buttons and breathing access | High | Red/Yellow could be treated as a bad outcome or interruption |
| Reflect | `src/components/ReflectTab.jsx` | Aftercare and debrief existed | Missing robust red-flag flow and conscience questions | Added expanded aftercare, debrief, and red-flag guidance | High | Pressure, dissociation, shame, or fear may not lead to stopping |
| Resources | `src/components/ResourceDirectory.jsx` | Australian emergency and crisis resources existed | Missing Consent.gov.au, eSafety, NCSF, Scarleteen, AASECT-style guidance | Added more resources and external-resource caveat | Medium | Users may not know where to seek real support |
| Privacy | `src/components/PrivacyTab.jsx` | Local-only model and panic clear existed | Needed individual clear buttons and stronger device-access warning | Added separate clear controls for worksheets, plan, and debrief | High | Sensitive local data may remain visible on shared devices |
| Storage handling | `src/utils/storage.js` | Safe fallback functions existed | Errors logged to console | Removed production console logging | Low | Console noise and brittle private-browsing handling |
| Plan filtering tests | `src/utils/plan.test.js` | None | No automated check that Maybe/No/Hard Limit/high-risk are excluded | Added Node test for mutual Yes filtering | High | Regression could normalize unsafe planning |

## New Content / Features Added In This Pass

- Shared activity catalog and high-risk exclusion list.
- Shared plan filtering logic.
- Plan filtering test.
- Expanded glossary with why-it-matters notes.
- Consent-in-marriage learning module.
- Safewords-are-not-magic learning module.
- Nervous-system safety module.
- Prepare risk screen and richer plan text/export.
- Session end/aftercare controls and clearer Red/Yellow meanings.
- Reflect red-flag flow.
- Individual privacy clear buttons.
- More Australian and learning resources.
- First-launch route choice for new users.
- Lightweight global search with Ctrl/Cmd+K.

## Remaining Limitations

- The app remains single-device localStorage only. Partner sync was intentionally not added in this pass because encrypted import/export needs careful design and testing.
- The app is educational and cannot assess real-world coercion, trauma, or medical risk.
- Some source content still uses inline styles. A future pass could consolidate UI primitives further.
- Browser automation was not available in this session, so verification is build/test based plus local server checks where possible.

## Next Recommended Work

- Add a polished encrypted export/import flow for voluntary partner sync.
- Add a non-graphic printable worksheet export.
- Add small component-level tests for privacy clear actions.
- Add a richer "My Notes" history view if the app should retain multiple dated plans and debriefs.
