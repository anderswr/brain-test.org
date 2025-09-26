// data/icar16.ts
// ICAR 16-item short form scaffold (public-domain items).
// Source: ICAR Project (public-domain). See /LICENSES/ICAR_NOTICE.md for guidance.

export type Choice = { id: string; textKey: string };
export type IQItem = {
  id: string;
  kind: "mcq";
  domain: "letter" | "number" | "matrix" | "3d";
  promptKey: string;
  choices: Choice[];
  correctId: string;
  // optional: urls to static images (for matrix/3d items)
  image?: string;
};

export const ICAR16: IQItem[] = [
  // NOTE: These are placeholders – fill with actual ICAR public-domain items.
  { id: "i1",  kind: "mcq", domain: "number", promptKey: "icar.i1.prompt",
    choices: [
      { id: "a", textKey: "icar.i1.a" },
      { id: "b", textKey: "icar.i1.b" },
      { id: "c", textKey: "icar.i1.c" },
      { id: "d", textKey: "icar.i1.d" },
      { id: "e", textKey: "icar.i1.e" },
      { id: "f", textKey: "icar.i1.f" },
    ],
    correctId: "d"
  },
  // ... add i2–i16
];

// Per‑item time recommendation, total 16 minutes max (Dworak et al., 2021; ICAR Guidelines).
export const TEST_TIME_SECONDS = 16 * 60;
