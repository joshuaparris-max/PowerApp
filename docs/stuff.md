While I cannot directly access or view the live contents of the specific "PowerApp" links you provided (as they appear to be private, unindexed, or recently created), I can tell you what is typically missing or underdeveloped in apps designed to teach or manage BDSM and power-exchange dynamics.

If you are developing or evaluating this app, here are the critical educational and functional elements that most platforms in this space fail to include:

### 1. Robust Frameworks for Consent and Negotiation

Many apps treat consent as a simple "yes/no" checklist. A truly educational app should teach users the nuances of continuous consent.

* **What's often missing:** Interactive templates that guide users through establishing **Hard Limits** (absolute no's), **Soft Limits** (maybe, under specific conditions), and **Desires**.
* **Educational gap:** Failing to teach the difference between **SSC** (Safe, Sane, and Consensual) and **RACK** (Risk-Aware Consensual Kink). Users need to understand the theoretical frameworks behind the practices, not just a list of acts.

### 2. Aftercare and Debriefing Protocols

Apps often focus entirely on the buildup or the "scene" itself, completely neglecting what happens afterward.

* **What's often missing:** A guided "debrief" feature where partners can check in with each other 24-48 hours after a scene.
* **Educational gap:** Information on identifying and managing psychological states like "Subspace," "Domspace," "Sub Drop," and "Dom Drop." Learning how to safely come down from intense psychological or physical scenes is heavily underrepresented in BDSM tech.

### 3. Anatomical and Physical Safety Education

BDSM involves physical risks, and many apps do not provide sufficient medical or anatomical safety education.

* **What's often missing:** Clear, diagrammatic warnings about nerve damage (e.g., where *not* to strike during impact play) or circulation risks (e.g., safe vs. unsafe bondage points).
* **Educational gap:** First-aid integration or resources on what to do if an injury occurs, as well as education on the importance of having safety shears or trauma tools on hand during rope bondage.

### 4. Vetted, Non-Toxic Power Dynamics

Apps that involve "tasks," "chores," or point systems for Dominants and submissives can easily gamify abusive behavior if not carefully designed.

* **What's often missing:** Educational prompts that help users distinguish between healthy power exchange and actual domestic abuse or coercive control.
* **Educational gap:** Teaching the concept of the "safe word" not just as a physical stop button, but as a psychological safety net. Apps should encourage establishing a traffic-light system (Red, Yellow, Green) and explicitly teach users how to respect it.

### 5. High-Level Data Security and Anonymity

Given the highly stigmatized and personal nature of the topic, privacy cannot just be a feature; it must be the foundation of the app.

* **What's often missing:** End-to-end encryption, stealth modes, and local-only data storage options. If PowerApp is a web app hosted on platforms like Vercel or GitHub Pages, users need to know exactly where their sensitive checklists, journals, or chat logs are being stored and who has access to them.

**To improve PowerApp:** I highly recommend ensuring that it doesn't just gamify power exchange, but actively injects safety checkpoints, anatomical education, and psychological aftercare into the user journey.

Let me look at the actual source code to understand what's currently in the app.The live app returns minimal content (it's a React SPA, so the HTML shell doesn't expose much). Based on the README and what I can see, here's a gap analysis:

**What the app clearly has (per README):**
- SSC / 4Cs consent framework
- Local-only storage + panic clear
- Aftercare focus
- Australian crisis resources
- Worksheets / notes

**What's likely missing for genuine *education* about BDSM:**

**Content gaps:**
- Definitions and terminology — people new to this space often don't know basic vocabulary (D/s, bondage, impact play, negotiation, limits, etc.)
- The difference between soft and hard limits — a critical practical concept
- Negotiation guides — how to actually have the conversation before a scene
- Aftercare specifics — what it is, why it matters, how to do it well (not just a mention)
- Risk-aware vs risk-free framing — RACK (Risk-Aware Consensual Kink) vs SSC and when each applies
- Common beginner mistakes — this is high-value educational content
- Role-specific guidance — what a dominant/submissive/switch responsibilities look like
- Equipment safety basics — if bondage or restraint is in scope, there are real safety considerations

**UX / feature gaps:**
- A glossary — searchable terminology reference
- A "new to this?" onboarding path — the app seems to assume some baseline knowledge
- Scenario-based learning — e.g., "what would you do if…" prompts to build practical judgment
- A check-in / debrief tool — structured post-scene reflection, not just aftercare notes
- Shared access between partners — everything being local-only means couples can't collaborate unless on the same device

**Structural gaps:**
- No clear distinction between *learning* content and *doing* tools — if the goal is education, the reading material needs more weight
- No sourcing or credibility markers — links to established community resources (The New Topping Book, FetLife community guides, etc.) would add trust

You are improving PowerApp, a private, safety-first educational guide and 
conversation tool for adult couples exploring BDSM and kink. The app is built 
with React + Vite, uses localStorage only (no backend), and is deployed on both 
GitHub Pages and Vercel.

Review all existing source files before making changes. Preserve the existing 
privacy model (local-only, no tracking, panic clear button).

---

## 1. CONTENT — Educational Depth

Add or expand the following content sections:

### Glossary
- Searchable A–Z glossary of common BDSM/kink terminology
- Terms should include: D/s, SSC, RACK, PRICK, bondage, impact play, 
  safewords, aftercare, negotiation, hard limit, soft limit, switch, 
  top/bottom, dominant/submissive, scene, drop (sub drop / dom drop), 
  collaring, protocol, and at least 30 more
- Each term: name, plain-English definition, and a "why it matters" note

### Limits & Negotiation
- Clear explanation of hard vs soft limits with examples
- A guided negotiation worksheet couples can fill out together
- A "yes / no / maybe" checklist (activities list) they can customise
- Guidance on revisiting limits over time

### Scene Safety
- RACK vs SSC explained with pros/cons of each framework
- Safeword systems: traffic light, tap-out, non-verbal alternatives
- Physical safety basics for common activities (bondage, restraint, 
  impact play) — no explicit imagery, safety-focused text only
- When to stop a scene and how to do it gracefully

### Aftercare
- What aftercare is and why it matters for both partners
- Dom drop and sub drop — symptoms and how to support each other
- Aftercare ideas organised by type (physical, emotional, solo, together)
- A structured post-scene debrief tool with reflection prompts

### Beginner Path
- A dedicated "New to This?" section that onboards users with zero 
  assumed knowledge
- Covers: what consent negotiation looks like in practice, how to bring 
  up the topic with a partner, what a first conversation might include
- Common beginner mistakes and how to avoid them

### Role Guidance
- Responsibilities and mindset for: Dominant, Submissive, Switch
- How power exchange works emotionally, not just practically
- Addressing misconceptions (dominance ≠ abuse, submission ≠ weakness)

---

## 2. UX — Structure & Navigation

### Onboarding
- First-launch welcome screen with brief purpose statement and 
  safety disclaimer
- Ask: "Are you new to this topic?" and route to Beginner Path if yes
- Keyboard-accessible, mobile-first

### Navigation
- Clear top-level sections: Learn / Tools / My Notes / Resources
- "Learn" contains: Glossary, Beginner Path, Concepts, Role Guidance
- "Tools" contains: Negotiation Worksheet, Yes/No/Maybe List, 
  Scene Planner, Aftercare Debrief, Check-in Tool
- "My Notes" contains: saved worksheets, personal notes, history
- "Resources" contains: crisis lines, recommended reading, community links

### Search
- Global search across glossary terms and content sections
- Keyboard shortcut (Cmd/Ctrl + K)

### Progress & Saved State
- Mark articles as read
- Save worksheet responses with timestamps
- All stored in localStorage, visible under My Notes

---

## 3. TOOLS — New Features

### Scene Planner
- Pre-scene checklist: activities agreed, limits confirmed, safewords set, 
  aftercare plan discussed
- Generates a plain-text summary couples can review together

### Check-in Tool
- During or after a scene: simple 1–5 rating on physical comfort, 
  emotional safety, and enjoyment
- Optional free-text notes
- Saves to history

### Post-Scene Debrief
- Structured reflection: what went well, what to adjust, aftercare received, 
  follow-up needed
- Option to share as plain text (copy to clipboard)

### Partner Sync (optional / stretch goal)
- Export/import data as an encrypted JSON file so two people on 
  different devices can sync their shared worksheets

---

## 4. RESOURCES — External Links & Credibility

Add a curated Resources section:
- Recommended books: The New Topping Book, The New Bottoming Book, 
  Different Loving, The Loving Dominant
- Community resources: FetLife (note: adult content), The NCSF 
  (National Coalition for Sexual Freedom), Scarleteen (for younger adults)
- Australian-specific: 1800RESPECT, Lifeline, MensLine, eSafety Commissioner
- Clearly label each resource type (book, website, helpline)
- Add a note that the app does not endorse any external site

---

## 5. DESIGN & POLISH

- Consistent design system: spacing, typography, colour tokens
- Dark mode support (respect system preference)
- Mobile-first responsive layout throughout
- Smooth transitions between sections (no jarring page jumps)
- Accessible: ARIA labels, focus rings, sufficient colour contrast (WCAG AA)
- Panic button: always visible, single tap, clears all data and redirects 
  to a neutral page (e.g. weather.com or a blank tab)
- Loading states for any async operations

---

## 6. CODE QUALITY

- Split large components into focused, single-responsibility files
- Add PropTypes or migrate to TypeScript if feasible
- Consistent file/folder naming convention
- Remove any console.logs before production build
- Add a basic README section documenting each major component

---

## Constraints to preserve

- No backend, no external API calls, no analytics
- All user data stays in localStorage
- No explicit imagery or graphic content
- Australian crisis resources must remain prominent
- Panic clear must remain functional

---

Start by auditing the existing /src files, then implement changes 
section by section. Confirm the app builds and runs after each major 
section before moving to the next.

PROMPT 1 — Audit the live PowerApp and identify what is missing

You are working on this repo and live app:

Repo:
https://github.com/joshuaparris-max/PowerApp

Live:
https://power-app-delta.vercel.app/
https://joshuaparris-max.github.io/PowerApp/

PowerApp is a private, safety-first, mobile-friendly React/Vite app for an adult married couple learning about beginner-level BDSM/kink in a careful, non-pornographic, consent-centred way.

Important: do not rebuild the app from scratch. First audit what is already present in the live code. The current app already appears to have multiple tabs/components, including Learn, Connect, Prepare, Session, Reflect, Resources, Privacy, theme support, localStorage, and panic clear. Your job is to improve and extend the current app using the uploaded/source documents, especially the beginner guide and research content, without duplicating existing content unnecessarily.

Core ethical boundaries:

* Keep the app educational, mature, respectful, pastoral, non-graphic, and safety-first.
* Do not add explicit erotic writing.
* Do not add “try everything” checklists.
* Do not gamify escalation.
* Do not reward intensity.
* Keep the guiding philosophy: “Stopping after an honest conversation is a complete and successful evening.”
* The app should slow the couple down, not push them forward.

Audit tasks:

1. Run the project locally.

   * npm install
   * npm run dev
   * npm run build
   * Fix any errors, warnings, broken imports, bad routes, console errors, or visual layout issues.

2. Compare the app against the supplied learning/research material.
   Identify what is missing or too thin in these areas:

   * What BDSM is and is not
   * Healthy vs unhealthy dynamics
   * Consent foundations
   * Safety frameworks: SSC, RACK, PRICK, 4Cs
   * Australian consent framing
   * Porn/fantasy vs reality
   * Emotional and nervous system safety
   * Freeze, fawn, dissociation, shutdown
   * Sub-drop and dom-drop
   * Safewords and non-verbal signals
   * Beginner physical safety
   * Practices to avoid as beginners
   * First-night plan
   * Aftercare
   * Morning-after debrief
   * Christian marriage reflection
   * Red flags
   * Recommended resources
   * Privacy and local data handling

3. Produce an internal TODO list in the repo as:
   docs/POWERAPP_GAP_AUDIT.md

The audit should include:

* Existing feature
* Source file/component
* What is currently good
* What is missing
* Recommended improvement
* Priority: High / Medium / Low
* Risk if left unfixed

High-priority gaps to look for:

* Any lack of clear Australian crisis/support resources.
* Any missing warning that marriage never replaces consent.
* Any missing “maybe is not permission” message.
* Any activity that could imply neck/breath/choking/pressure is acceptable.
* Any language that could be interpreted as pressure, persuasion, or escalation.
* Any saved localStorage content without clear privacy controls.
* Any worksheets that save sensitive data without clear “clear all data” controls.
* Any quiz or learning section that encourages memorising facts without applying them to real couple decisions.
* Any UI that makes “play/session” feel more prominent than “learn/connect/prepare/reflect.”

Acceptance criteria:

* docs/POWERAPP_GAP_AUDIT.md exists.
* npm run build passes.
* You do not remove existing useful features.
* You do not add explicit content.
* You list exactly what new content/features should be added next.

PROMPT 2 — Add missing learning, reflection, and safety content from the research documents

Use the gap audit you just created to improve PowerApp. Add new information, learning modules, ideas, suggestions, and practical tools from the supplied documents that are not already in the app.

Do not duplicate existing content. If something already exists, improve it instead of creating a second version.

Main goal:
Turn PowerApp from a basic safety toolkit into a guided learning and discernment app that helps a married couple move through:
Learn → Connect → Prepare → Session Safety → Reflect → Resources → Privacy

Content upgrades to add:

1. Learn tab upgrades

Add or improve learning modules for:

A. “What BDSM is and is not”
Include:

* B/D: bondage and discipline
* D/s: dominance and submission
* S/M: sadism and masochism
* Kink
* Power exchange
* Roleplay
* Sensation play
* Clear distinction from abuse, coercion, pornography, and unhealthy control
* Emphasise that beginner exploration does not require pain, intercourse, humiliation, or extreme practices.

B. “Marriage never replaces consent”
Add a prominent module explaining:

* Consent is still needed in marriage.
* Consent must be freely given, reversible, informed, enthusiastic, and specific.
* Silence, freezing, going quiet, not resisting, or wanting to avoid conflict are not consent.
* “I said yes once” does not mean ongoing permission.
* “Maybe” means “not tonight” unless it becomes a clear mutual yes later.

C. “Safewords are not magic”
Add a module explaining:

* Safewords only work if both people are trustworthy.
* The real safety system is character, sobriety, warmth, attention, and immediate willingness to stop.
* Red means: stop, drop the role, come close, be warm, check in.
* Red is not failure; it is the system working.

D. “Porn, fantasy, and reality”
Add a non-shaming but clear module:

* Porn is a poor teacher because it skips negotiation, check-ins, safewords, consent repair, and aftercare.
* Fantasy is not a plan.
* Do not copy scenes from porn, TikTok, Reddit, erotica, or Fifty Shades.
* Real intimacy may include awkwardness, laughter, stopping, prayer, changing your mind, and talking.

E. “Emotional and nervous system safety”
Add content explaining:

* Vulnerability
* Shame
* Fear
* Rejection sensitivity
* Freeze response
* Fawn response
* Dissociation
* Shutdown
* Emotional drop
* Signs someone is pleasing rather than consenting
* How to stop warmly and ground together

F. “Practices to avoid as beginners”
Make this impossible to miss:

* Breath play
* Choking
* Neck compression
* Anything that restricts breathing
* Suspension bondage
* Complex rope work
* Cutting, blood, needles
* Electrical play
* Heavy impact
* Degradation/humiliation designed to wound dignity
* Punishment dynamics
* CNC/free-use scenarios
* Anything involving fear, coercion, intoxication, inability to speak, or inability to communicate clearly
* Anything copied from porn

Use high-contrast warning cards. Do not provide technique instructions for these.

2. Connect tab upgrades

Improve the conversation tools.

Add a “Motive before acts” conversation flow:

* What am I curious about?
* What scares me?
* What would make me feel pressured?
* What would make me feel cherished afterwards?
* What does tenderness look like for me?
* What would make me feel free to say “not tonight”?
* Is there anything I am agreeing to just to avoid disappointing you?
* How do our faith and values shape what feels loving here?
* What would make this strengthen our marriage?
* What would make this harm our marriage?

Add “Pass” and “Pause” buttons:

* Pass: skip this question kindly
* Pause: save progress and end the conversation for now
* Include language that pausing is a good and safe outcome.

Upgrade the Yes/No/Maybe worksheet:

* Add categories:

  * Atmosphere & Tone
  * Sensory & Sensation
  * Gentle Restraint
  * Power & Direction
  * Language & Words
  * Roleplay
  * Care & Aftercare
  * Faith/Conscience
* Add hard limits and soft limits for both partners.
* Add “Not now, maybe later” distinct from “Maybe tonight.”
* Add compare mode that only surfaces mutual “Yes” items.
* Anything marked “Maybe,” “No,” “Hard Limit,” or unanswered must be excluded from tonight’s plan.
* Add plain-language reminders:

  * “Maybe is not permission.”
  * “The slower partner sets the pace.”
  * “No persuasion.”
  * “A conversation-only night is success.”

3. Prepare tab upgrades

Add a “Tonight Plan Builder.”

It should generate a simple plan only from mutual yes items.

Required sections:

* Tonight’s shared goal
* Mutual yes items only
* Hard limits
* Soft limits / not-now items
* Safeword
* Non-verbal signal
* Stop conditions
* Aftercare plan
* Morning-after check-in time
* “Not tonight” option

Add buttons:

* Save tonight’s plan locally
* Copy as plain text
* Export as .txt
* Clear tonight’s plan

Rules:

* The plan cannot include anything from a Maybe, No, Hard Limit, or unanswered item.
* The plan should not include advanced or high-risk practices.
* The plan should display a warning if unresolved conflict, alcohol/substances, pressure, fear, or spiritual unease is present.
* Include a “stop here” option that says: “Tonight’s wise choice is connection, rest, and no further exploration.”

4. Session tab upgrades

Keep this tab practical, calm, and non-explicit.

Add:

* Traffic light dashboard: Green / Yellow / Red
* Non-verbal signal reminder
* “Check colour now” button
* “Pause and breathe” button
* “End session now” button
* “Move to aftercare” button
* Tiny breathing/grounding tool:

  * Inhale 4
  * Hold 4
  * Exhale 4
  * Hold 4
  * Repeat
* Grounding prompts:

  * “Can you feel the bed/chair/floor?”
  * “Look at me — are you here with me?”
  * “What do you need right now?”
  * “Would you like water, warmth, quiet, or closeness?”

Do not add explicit scene instructions. The Session tab is a safety dashboard, not an activity guide.

5. Reflect tab upgrades

Add “Aftercare for both partners.”
Include:

* Water
* Warmth
* Food/snack if needed
* Comfort touch if wanted
* No immediate analysis
* Reassurance
* Prayer if desired
* Check for numbness, pain, tenderness, emotional flatness, or unease
* “I love you. You are safe. I’m glad you trusted me. We can stop anytime.”

Add morning-after debrief:

* What felt connecting?
* What felt awkward?
* Did anything feel unsafe?
* Did you feel any pressure?
* Did either of us push past a yellow?
* Did this bring us closer or create distance?
* What should we never repeat?
* What do we need today?
* How do we feel before God / in our conscience this morning?

Add a “red flag detected” flow:
If a user answers that they felt pressured, unsafe, dissociated, ashamed, panicked, or more alone, the app should suggest:

* Stop exploring for now.
* Talk gently.
* Consider a qualified counsellor/sex therapist/kink-aware therapist.
* Use Australian support resources if there is fear, coercion, abuse, or danger.

6. Christian reflection module

Add a thoughtful, non-legalistic section.

Include:

* Mutual self-giving love
* Honouring each other’s body
* Respecting conscience
* Avoiding porn-shaped lust
* Avoiding domination that becomes selfishness
* The fruit of the Spirit test:

  * love
  * joy
  * peace
  * patience
  * kindness
  * goodness
  * faithfulness
  * gentleness
  * self-control
* If either spouse cannot engage with a clean conscience, the faithful move is patience, not pressure.
* If this creates fear, contempt, secrecy, or spiritual dullness, stop.

7. Resources tab upgrades

Add Australian resources clearly:

* Emergency: 000
* 1800RESPECT: 1800 737 732
* Lifeline: 13 11 14
* Blue Knot Foundation
* MensLine Australia
* Full Stop Australia
* Consent.gov.au
* Qualified counsellor / couples therapist / sex therapist guidance

Add beginner learning resources:

* Consent guides
* Scarleteen-style Yes/No/Maybe concept
* NCSF-style consent/safety resources
* AASECT-style sex therapist directory concept
* The New Topping Book / The New Bottoming Book
* SM 101
* Add a warning that external resources may vary in tone and should be filtered through safety, conscience, and mutual respect.

8. Privacy tab upgrades

Add a clear privacy explanation:

* Data is stored locally in this browser only.
* Nothing is intentionally sent to a server.
* Anyone with device/browser access may see saved notes/plans.
* Use panic clear before lending/sharing the device.
* Sensitive data should not be entered on shared devices.
* Incognito/private browsing may delete saved data.
* Add individual clear buttons:

  * Clear worksheets
  * Clear tonight plan
  * Clear debrief answers
  * Clear all sensitive data

9. Learning-design upgrades

Add “guided practice” rather than only reading:

* Each Learn module should end with one short reflection question.
* Add optional “I understand this” checkbox, but do not gamify.
* Add “explain it back” prompts:

  * “In your own words, what does ongoing consent mean?”
  * “What would Yellow mean for us?”
  * “What would make tonight unwise?”
* Add confidence rating:

  * Low / Medium / High
* If confidence is Low, suggest returning to conversation rather than continuing.

Acceptance criteria:

* npm run build passes.
* No explicit content has been added.
* No high-risk practices are normalised.
* Advanced practices are clearly marked “do not attempt as beginners.”
* Maybe/No/Hard Limit items can never enter the Tonight Plan.
* Red/yellow logic is clear and warm.
* Australian resources are present.
* Privacy controls are clear and easy to find.
* App remains calm, mature, pastoral, mobile-friendly, and non-sleazy.

PROMPT 3 — Final QA, safety review, accessibility pass, and README update

Now perform a final safety, UX, accessibility, and deployment pass on PowerApp.

Do not add new explicit content. Do not expand into advanced technique instructions. This pass is about trust, clarity, reliability, and safety.

1. Safety language review

Search the whole codebase for language that could accidentally imply pressure or escalation.

Replace any language like:

* “unlock”
* “level up”
* “try more”
* “push limits”
* “complete the checklist to proceed”
* “failure”
* “must”
* “should try”

With safer language like:

* “slow down”
* “pause”
* “talk first”
* “only mutual yes”
* “stopping is success”
* “the slower partner sets the pace”
* “not tonight is a good outcome”
* “maybe is not permission”

Make sure all references to “Red” mean:

* stop immediately
* drop the role
* check in
* offer warmth
* no argument
* no sulking
* no persuasion
* no need to justify

Make sure “Yellow” means:

* slow down
* pause
* check in
* reduce intensity
* change course or stop if either person wants

2. High-risk content review

Search the app for:

* choking
* breath
* neck
* CNC
* free use
* punishment
* degradation
* humiliation
* electrical
* blood
* cutting
* rope
* suspension
* intoxication

Ensure all such references are in warning/avoidance sections only. Do not include practical instructions for these. Do not include them in any selectable Tonight Plan activity.

3. Consent logic review

Confirm:

* Marriage never replaces consent.
* Consent is active, ongoing, specific, reversible, informed, and enthusiastic.
* Silence, freezing, people-pleasing, fawning, shutdown, and fear of disappointing the other person are not consent.
* Maybe is treated as Not Tonight.
* Hard limits are always excluded.
* Soft limits are excluded from Tonight Plan unless both partners later move them to a clear Yes.
* Both partners can stop at any time.
* Stopping after conversation is framed as a successful outcome.

4. Privacy and data review

Confirm:

* All sensitive notes/plans are stored only in localStorage or equivalent browser storage.
* App clearly tells the user where data is stored.
* Panic clear works.
* Individual clear buttons work.
* The app reloads or updates state properly after clearing.
* JSON parsing is safe with fallback values.
* localStorage errors do not crash the app.
* No analytics, tracking, or external data sending is added.

5. Accessibility pass

Fix:

* Buttons need accessible labels.
* Focus states need to be visible.
* Colour contrast must be readable in light and dark mode.
* Tap targets must be large enough on mobile.
* Bottom navigation must not cover content.
* Forms need labels.
* Warning cards should not rely on colour alone.
* The app should be usable by keyboard.
* Text should remain readable on small phones.

6. UX polish

Improve:

* Clear section headings.
* Progress without gamification.
* Gentle empty states.
* Clear “Back” behaviour.
* No overwhelming walls of text on mobile.
* Accordions for long learning content.
* Short summary cards before detailed sections.
* Consistent naming: Learn, Connect, Prepare, Session, Reflect, Resources, Privacy.
* Keep the most important safety controls visible during Session.

7. Testing

Add or improve basic QA checks:

* npm run build
* If practical, add npm run lint
* If practical, add a basic test file for plan filtering:

  * mutual yes included
  * maybe excluded
  * no excluded
  * hard limit excluded
  * unanswered excluded
  * high-risk item excluded
* Check Vercel deploy path.
* Check GitHub Pages base path.
* Check /beginners-guide.html still works.

8. README update

Update README.md with:

* What PowerApp is
* What PowerApp is not
* Ethical boundaries
* Privacy/localStorage model
* Setup instructions
* Build instructions
* Deployment instructions
* Safety disclaimer
* Australian support resources
* Note that the app is educational and not medical, legal, psychological, crisis, or pastoral counselling advice
* Note that if anyone feels unsafe, coerced, pressured, afraid, or unable to say no, they should stop using the app and seek real-world support

9. Final output

When complete, provide:

* Summary of changes
* Files changed
* Safety improvements made
* Any remaining limitations
* Confirmation that npm run build passes
* Any issues that need manual review
