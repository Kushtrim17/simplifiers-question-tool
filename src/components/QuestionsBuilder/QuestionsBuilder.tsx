import { Category, Question } from "./types";
import { CategoryItem } from "./components/Category/CategoryItem";
import { marginClasses } from "@/constants";

type Props = {
  categories: Category[];
  onEditCategory: (category: Category) => void;
  onAddChildCategory: (parentId: string) => void;
  onAddSiblingCategory: (siblingId: string) => void;
  onDeleteCategory: (categoryId: string) => void;
  onChangeCategoryOrder: (categoryId: string, newOrderNumber: number) => void;
  onAddQuestion: (categoryId: string) => void;
  onEditQuestion: (updatedQuestion: Question) => void;
  onDeleteQuestion: (questionId: string) => void;
  onChangeQuestionOrder: (
    categoryId: string,
    questionId: string,
    newOrderNumber: number
  ) => void;
  onAddQuestionDependency: (
    questionId: string,
    dependencyId: string,
    answer: string | boolean
  ) => void;
  onRemoveQuestionDependency: (
    questionId: string,
    dependencyId: string
  ) => void;
};
export function QuestionsBuilder(props: Props) {
  const {
    categories = [],
    onAddChildCategory,
    onAddSiblingCategory,
    onDeleteCategory,
    onEditCategory,
    onChangeCategoryOrder,
    onAddQuestion,
    onEditQuestion,
    onDeleteQuestion,
    onChangeQuestionOrder,
    onAddQuestionDependency,
    onRemoveQuestionDependency,
  } = props;

  const getMarginClass = (level: number) =>
    marginClasses[Math.min(level - 1, marginClasses.length - 1)];

  return (
    <div>
      {categories.map((category) => (
        <div
          key={category.id}
          className={`cursor-pointer border border-transparent hover:border-gray-200 rounded-lg p-4 ${getMarginClass(
            category?.level
          )}`}
        >
          <CategoryItem
            category={category}
            isFirstChild={category.orderNumber === 1}
            isLastChild={category.orderNumber === categories.length}
            onEdit={onEditCategory}
            onAddSibling={onAddSiblingCategory}
            onAddChild={onAddChildCategory}
            onDelete={() => onDeleteCategory(category.id)}
            onChangeCategoryOrder={(newOrderNumber: number) =>
              onChangeCategoryOrder(category.id, newOrderNumber)
            }
            onAddQuestion={() => onAddQuestion(category.id)}
            onEditQuestion={onEditQuestion}
            onDeleteQuestion={onDeleteQuestion}
            onChangeQuestionOrder={(
              questionId: string,
              newOrderNumber: number
            ) => onChangeQuestionOrder(category.id, questionId, newOrderNumber)}
            onAddQuestionDependency={onAddQuestionDependency}
            onRemoveQuestionDependency={onRemoveQuestionDependency}
          />

          {category.subCategories && (
            <QuestionsBuilder
              categories={category.subCategories}
              onEditCategory={onEditCategory}
              onAddChildCategory={onAddChildCategory}
              onAddSiblingCategory={onAddSiblingCategory}
              onDeleteCategory={onDeleteCategory}
              onChangeCategoryOrder={onChangeCategoryOrder}
              onAddQuestion={onAddQuestion}
              onEditQuestion={onEditQuestion}
              onDeleteQuestion={onDeleteQuestion}
              onChangeQuestionOrder={onChangeQuestionOrder}
              onAddQuestionDependency={onAddQuestionDependency}
              onRemoveQuestionDependency={onRemoveQuestionDependency}
            />
          )}
        </div>
      ))}
    </div>
  );
}
