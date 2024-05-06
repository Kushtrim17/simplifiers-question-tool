export type ExternalLink = { label: string; url: string };

export type QuestionType = "boolean" | "voucher" | "freeText";

export type Accounts = {
  title: string;
  description: string;
  creditRange: number[];
  debitRange: number[];
};

export type Question = {
  id: string;
  title: string;
  orderNumber: number;
  description: string;
  type: QuestionType;
  externalLinks: ExternalLink[];
  // an array of question ids that this question depends on
  dependsOnQuestions: string[];
  accounts?: Accounts;
};

export type Category = {
  id: string;
  parentId?: string;
  orderNumber: number;
  level: number;
  name: string;
  subCategories?: Category[];
  // an array of category ids that this category depends on
  dependsOnCategories: string[];
  questions: Question[];
  accounts?: Accounts;
};

export type Structure = {
  lastUpdated: string;
  categories: Category[];
};

export const STARTING_STRUCTURE: Structure = {
  lastUpdated: new Date().toISOString(),
  categories: [],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isStructureType(obj: any): obj is Structure {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.lastUpdated === "string" &&
    Array.isArray(obj.categories)
  );
}
