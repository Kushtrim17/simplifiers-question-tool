export type ExternalLink = { label: string; url: string };

export type QuestionType = "boolean" | "voucher" | "freeText";

export type AccountsHelper = {
  description?: string;
  debitNote?: string;
  creditNote?: string;
};

export type DependsOnQuestion = {
  questionId: string;
  answer: boolean | string;
};

export type Accounts = {
  title: string;
  //TODO: remove this
  creditDescription: string;
  //TODO: remove this
  debitDescription: string;
  helperDescriptions: AccountsHelper[];
  creditRange: (number[] | null[])[];
  debitRange: (number[] | null[])[];
  triggerAnswer?: string | null;
};

export type QuestionScope = "accounts" | "notes" | "tax" | "managementReport";

export type NoteOption = {
  id: string;
  name: string;
};

export type ValueReference = {
  cellId: string; // 'managementReport.resultsDisposition.toDispose.3.value'
  triggerAnswer: string; // 'yes'
};

export type DocumentReference = {
  tableId: string; // 'managementReport'
  type: "row" | "column" | "";
  id: string; // '3'
  triggerAnswer: "yes" | "no" | ""; // 'yes'
};

export type Question = {
  id: string;
  title: string;
  shortTitle: string;
  orderNumber: number;
  description: string;
  type: QuestionType;
  scope: QuestionScope;
  externalLinks: ExternalLink[];
  // an array of question ids that this question depends on
  dependsOnQuestions: DependsOnQuestion[];
  accounts?: Accounts;
  valueReferences?: ValueReference[];
  noteOptions?: NoteOption[];
  documentReferences?: DocumentReference[];
  constraints?: Record<string, unknown>; // Generic field for constraints
  taxForm?: {
    title?: string;
    description?: string;
  }
};

export type Category = {
  id: string;
  parentId?: string;
  orderNumber: number;
  level: number;
  name: string;
  subCategories?: Category[];
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
