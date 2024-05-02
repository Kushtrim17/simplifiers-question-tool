import { Category, Question } from "./types";
import { CategoryItem } from "./components/CategoryItem";
import { marginClasses } from "@/constants";

type Props = {
  categories: Category[];
  onEditCategory: (category: Category) => void;
  onAddChildCategory: (parentId: string) => void;
  onAddSiblingCategory: (siblingId: string) => void;
  onDeleteCategory: (categoryId: string) => void;
  onAddQuestion: (categoryId: string) => void;
  onEditQuestion: (updatedQuestion: Question) => void;
  onDeleteQuestion: (questionId: string) => void;
};
export function QuestionsBuilder(props: Props) {
  const {
    categories = [],
    onAddChildCategory,
    onAddSiblingCategory,
    onDeleteCategory,
    onEditCategory,
    onAddQuestion,
    onEditQuestion,
    onDeleteQuestion,
  } = props;

  const getMarginClass = (level: number) =>
    marginClasses[Math.min(level - 1, marginClasses.length - 1)];

  return (
    <div>
      {categories.map((category) => (
        <div
          key={category.id}
          className={`cursor-pointer border border-transparent hover:border-gray-200 rounded-lg p-4 ${getMarginClass(
            category.level
          )}`}
        >
          <CategoryItem
            category={category}
            onEdit={onEditCategory}
            onAddSibling={(siblingId: string) =>
              onAddSiblingCategory(siblingId)
            }
            onAddChild={(parentId: string) => onAddChildCategory(parentId)}
            onDelete={() => onDeleteCategory(category.id)}
            onAddQuestion={() => onAddQuestion(category.id)}
            onEditQuestion={onEditQuestion}
            onDeleteQuestion={onDeleteQuestion}
          />

          {category.subCategories && (
            <QuestionsBuilder
              categories={category.subCategories}
              onEditCategory={onEditCategory}
              onAddChildCategory={onAddChildCategory}
              onAddSiblingCategory={onAddSiblingCategory}
              onDeleteCategory={onDeleteCategory}
              onAddQuestion={onAddQuestion}
              onEditQuestion={onEditQuestion}
              onDeleteQuestion={onDeleteQuestion}
            />
          )}
        </div>
      ))}
    </div>
  );
}
