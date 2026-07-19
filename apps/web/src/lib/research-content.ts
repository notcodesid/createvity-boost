/** Research-backed copy + prompts for Createvity studio. */

export const LOOP_STEPS = [
  {
    id: "capture",
    title: "Capture",
    blurb: "Record now. Judge later.",
    science: "Ideas die from not being written down — not from aging (Epstein).",
  },
  {
    id: "diverge",
    title: "Diverge",
    blurb: "Generate volume before quality.",
    science: "Default Mode Network lights up when you mind-wander and recombine.",
  },
  {
    id: "walk",
    title: "Walk",
    blurb: "Phone-free walk when stuck.",
    science: "Stanford: ~60% more creative output while walking (and briefly after).",
  },
  {
    id: "scamper",
    title: "SCAMPER",
    blurb: "Constraints beat blank pages.",
    science: "Structured prompts (Substitute…Rearrange) train divergent thinking.",
  },
  {
    id: "converge",
    title: "Converge",
    blurb: "Keep, kill, or ship.",
    science: "Executive network evaluates — never during generation.",
  },
] as const;

export const CAPTURE_SEEDS = [
  "What if we removed the hardest requirement?",
  "A product only useful at 2am",
  "Steal a mechanic from a game I love",
  "Something that should exist for people like me",
  "A tool that makes boredom useful",
  "Half-baked thought I keep avoiding",
  "Idea from a conversation this week",
  "Opposite of my usual approach",
];

export const DIVERGE_PROMPTS = [
  "List 10 bad versions of this idea (bad = free).",
  "Who would hate this? Design for them for 3 minutes.",
  "Combine this with the last thing you ate / watched.",
  "What would this look like as a 10-second interaction?",
  "Write the press headline if it worked perfectly.",
  "What if you only had $0 and 48 hours?",
  "How would a 12-year-old explain it?",
  "What if the constraint was the feature?",
];

export const WALK_RULES = [
  "Phone in pocket or left behind — no notifications.",
  "No podcasts / music if you’re stuck on a problem (let mind wander).",
  "Walk 5–15 minutes; effect holds briefly after you sit.",
  "When back: capture immediately — don’t open chat or email first.",
];

export const SCAMPER_PROMPTS = [
  {
    key: "S",
    label: "Substitute",
    q: "What materials, people, or steps can you swap?",
    tip: "Classic: phone + camera → smartphone.",
  },
  {
    key: "C",
    label: "Combine",
    q: "What can you merge with this from another field?",
    tip: "Ideas are networks of older ideas (Johnson).",
  },
  {
    key: "A",
    label: "Adapt",
    q: "What else is like this? What could you copy from nature or another industry?",
    tip: "Adaptation is remixing, not theft (Kleon).",
  },
  {
    key: "M",
    label: "Modify / Magnify",
    q: "What if 10× bigger, 10× smaller, or a different shape/emotion?",
    tip: "Exaggerate one dimension until it breaks.",
  },
  {
    key: "P",
    label: "Put to other uses",
    q: "Who else could use this? What new job could it do?",
    tip: "Same object, new context = new product.",
  },
  {
    key: "E",
    label: "Eliminate",
    q: "What can you remove, simplify, or stop doing?",
    tip: "Constraints catalyze; freedom often freezes.",
  },
  {
    key: "R",
    label: "Rearrange / Reverse",
    q: "What if you reverse the order, roles, or flow?",
    tip: "Start from the end-state and work backward.",
  },
] as const;

export const CONVERGE_RUBRIC = [
  {
    action: "Keep",
    when: "Still curious; worth another diverge or SCAMPER pass.",
  },
  {
    action: "Kill",
    when: "You’re clinging from ego, not energy. Let it go.",
  },
  {
    action: "Ship",
    when: "Someone else could get value from a public version today.",
  },
] as const;

export const SUCCESS_EXAMPLES = [
  "Ship one real thing every week",
  "Make something people finish using",
  "Be known for honest craft, not volume",
  "Help 100 people think clearer",
];

export const DREAM_EXAMPLES = [
  "A studio that funds itself from shipped work",
  "People cite my systems, not just my outputs",
  "Creative practice that doesn’t require suffering",
];

export const INPUT_DIET = [
  { label: "Unrelated art / poetry", why: "Cross-domain input improves ideation (An & Youn)." },
  { label: "One TED / short essay outside your field", why: "Ideas as recombination, not lightning bolts." },
  { label: "5–10 min true boredom", why: "Protect DMN — constant stimulation crowds insight." },
  { label: "Phone out of sight while generating", why: "Presence alone can tax cognitive capacity." },
] as const;

export const FIRST_RUN = [
  { id: 1, text: "Write your definition of success (sidebar)", mode: "capture" as const },
  { id: 2, text: "Capture 3 messy ideas (no judging)", mode: "capture" as const },
  { id: 3, text: "Do one phone-free walk + capture", mode: "walk" as const },
  { id: 4, text: "Run SCAMPER on your favorite raw idea", mode: "scamper" as const },
  { id: 5, text: "Converge: keep / kill, then ship one", mode: "converge" as const },
];
