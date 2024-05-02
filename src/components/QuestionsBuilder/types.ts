export type ExternalLink = { label: string; url: string };

export type QuestionType = "boolean" | "voucher" | "freeText";

export type Question = {
  id: string;
  title: string;
  orderNumber: number;
  description: string;
  type: QuestionType;
  externalLinks: ExternalLink[];
  // an array of question ids that this question depends on
  dependsOnQuestions: string[];
};

export type Category = {
  id: string;
  parentId?: string;
  orderNumber: number;
  level: number;
  name: string;
  subCategories?: Category[];
  questions: Question[];
  dependsOnCategories: string[];
};

export type Structure = {
  lastUpdated: string;
  categories: Category[];
};

export const STARTING_STRUCTURE: Structure = {
  lastUpdated: new Date().toISOString(),
  categories: [],
};
