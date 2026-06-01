import { beginnerActivities, highRiskActivities } from "../data/activities.js";

export function isHighRiskActivity(activity) {
  const text = `${activity?.id || ""} ${activity?.label || ""}`.toLowerCase();
  return highRiskActivities.some(item => text.includes(item.toLowerCase()));
}

export function getMutualYesActivities(partnerA = {}, partnerB = {}, activities = beginnerActivities) {
  return activities.filter(activity => (
    partnerA[activity.id] === "yes" &&
    partnerB[activity.id] === "yes" &&
    !isHighRiskActivity(activity)
  ));
}

export function getExcludedActivities(partnerA = {}, partnerB = {}, activities = beginnerActivities) {
  return activities.filter(activity => !getMutualYesActivities(partnerA, partnerB, [activity]).length);
}

export function buildPlanText(plan = {}, mutualActivities = []) {
  return [
    "POWERAPP TONIGHT PLAN",
    "",
    `Shared goal: ${plan.goal || "Connection, honesty, and care. Conversation-only is success."}`,
    `Mutual yes items only: ${mutualActivities.map(a => a.label).join(", ") || "None selected"}`,
    `Selected for tonight: ${(plan.activities || []).join(", ") || "None selected"}`,
    `Hard limits: ${plan.hardLimits || "Not recorded in this plan"}`,
    `Soft limits / not-now items: ${plan.softLimits || "Excluded from tonight"}`,
    `Safeword: ${plan.safeword || "Not set"}`,
    `Non-verbal signal: ${plan.nonVerbal || "Not set"}`,
    `Stop conditions: ${plan.stopConditions || "Any yellow, red, pressure, fear, shutdown, substance use, conflict, or unease."}`,
    `Aftercare plan: ${plan.aftercare || "Water, warmth, reassurance, and no immediate analysis."}`,
    `Morning-after check-in: ${plan.checkInTime || "Not set"}`,
    "",
    "Rules: Maybe is not permission. No persuasion. The slower partner sets the pace. Not tonight is a good outcome.",
  ].join("\n");
}
