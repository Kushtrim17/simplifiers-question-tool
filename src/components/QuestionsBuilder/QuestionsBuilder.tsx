import { Category, Question } from "./types";
import { CategoryItem } from "./components/CategoryItem";
import { QuestionItem } from "./components/Questions/QuestionItem";

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

  return (
    <div>
      {categories.map((category) => (
        <div key={category.id}>
          <CategoryItem
            category={category}
            onEdit={onEditCategory}
            onAddSibling={(siblingId: string) =>
              onAddSiblingCategory(siblingId)
            }
            onAddChild={(parentId: string) => onAddChildCategory(parentId)}
            onDelete={() => onDeleteCategory(category.id)}
            onAddQuestion={() => onAddQuestion(category.id)}
          />
          <div className="mt-4">
            {category?.questions?.map((q) => (
              <QuestionItem
                key={q.id}
                categoryLevel={category.level}
                question={q}
                onEdit={onEditQuestion}
                onDelete={(questionId: string) => onDeleteQuestion(questionId)}
              />
            ))}
          </div>

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
