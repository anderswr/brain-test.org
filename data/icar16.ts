
// data/icar16.ts
export type Choice = { id: string; textKey: string };
export type IQItem = {
  id: string;
  kind: "mcq";
  domain: "letter" | "number" | "matrix" | "3d";
  promptKey: string;
  choices: Choice[];
  correctId: string;
  image?: string;
};

export const ICAR16: IQItem[] = [
  {
    id: "i1",
    kind: "mcq",
    domain: "number",
    promptKey: "icar.i1.prompt",
    choices: [
      { id: "a", textKey: "icar.i1.a" },
      { id: "b", textKey: "icar.i1.b" },
      { id: "c", textKey: "icar.i1.c" },
      { id: "d", textKey: "icar.i1.d" },
      { id: "e", textKey: "icar.i1.e" },
      { id: "f", textKey: "icar.i1.f" }
    ],
    correctId: "d"
  }
  // TODO: add i2..i16
];

export const TEST_TIME_SECONDS = 16 * 60;
