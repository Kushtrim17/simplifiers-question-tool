export type ExternalLink = { label: string; url: string };

export type Question = {
  id: string;
  title: string;
  orderNumber: number;
  description: string;
  type: "boolean" | "voucher" | "freeText";
  externalLinks?: ExternalLink[];
};

export type Category = {
  id: string;
  parentId?: string;
  orderNumber: number;
  level: number;
  name: string;
  subCategories?: Category[];
  questions?: Question[];
};

export type Structure = {
  lastUpdated: string;
  categories: Category[];
};
