import assert from "node:assert/strict";
import { getMutualYesActivities } from "./plan.js";

const activities = [
  { id: "mutual", label: "Mutual yes" },
  { id: "maybe", label: "Maybe item" },
  { id: "no", label: "No item" },
  { id: "hard", label: "Hard limit item" },
  { id: "blank", label: "Unanswered item" },
  { id: "risk", label: "Choking or breath restriction" },
];

const result = getMutualYesActivities(
  { mutual: "yes", maybe: "maybe_tonight", no: "no", hard: "hard_limit", risk: "yes" },
  { mutual: "yes", maybe: "yes", no: "yes", hard: "yes", risk: "yes" },
  activities
);

assert.deepEqual(result.map(item => item.id), ["mutual"]);

console.log("Plan filtering tests passed.");
