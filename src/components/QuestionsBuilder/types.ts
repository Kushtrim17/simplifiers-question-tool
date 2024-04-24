export type Question = {
  id: string;
  title: string;
  description: string;
  answer: string;
  options: string[];
};

export type Category = {
  id: string;
  orderNumber: number;
  level: number;
  name: string;
  subCategories?: Category[];
  questions?: Question[];
};
