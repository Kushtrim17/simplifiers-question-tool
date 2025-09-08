export const TRIGGER_ANSWER = {
  YES: "yes",
  NO: "no",
  NULL: "",
} as const;

export const TRIGGER_ANSWER_OPTIONS = [
  TRIGGER_ANSWER.YES,
  TRIGGER_ANSWER.NO,
  TRIGGER_ANSWER.NULL,
] as const;
