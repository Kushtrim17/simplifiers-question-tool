import { Category, Question } from "./types";
import { CategoryItem } from "./components/CategoryItem";
import { QuestionItem } from "./components/Questions/QuestionItem";

type Props = {
  questions: Category[];
  onEdit: (category: Category) => void;
  onAddChildCategory: (parentId: string) => void;
  onAddSiblingCategory: (siblingId: string) => void;
  onDelete: (categoryId: string) => void;
  onAddQuestion: (categoryId: string) => void;
  onEditQuestion: (updatedQuestion: Question) => void;
  onDeleteQuestion: (questionId: string) => void;
};
export function QuestionsBuilder(props: Props) {
  const {
    questions = [],
    onAddChildCategory,
    onAddSiblingCategory,
    onDelete,
    onEdit,
    onAddQuestion,
    onEditQuestion,
    onDeleteQuestion,
  } = props;

  return (
    <div>
      {questions.map((category) => (
        <div key={category.id}>
          <CategoryItem
            category={category}
            onEdit={onEdit}
            onAddSibling={(siblingId: string) =>
              onAddSiblingCategory(siblingId)
            }
            onAddChild={(parentId: string) => onAddChildCategory(parentId)}
            onDelete={() => onDelete(category.id)}
            onAddQuestion={() => onAddQuestion(category.id)}
          />
          <div className="mt-4">
            {category?.questions?.map((q) => (
              <>
                <QuestionItem
                  key={q.id}
                  categoryLevel={category.level}
                  question={q}
                  onEdit={onEditQuestion}
                  onDelete={(questionId: string) =>
                    onDeleteQuestion(questionId)
                  }
                />
              </>
            ))}
          </div>

          {category.subCategories && (
            <QuestionsBuilder
              questions={category.subCategories}
              onEdit={onEdit}
              onAddChildCategory={onAddChildCategory}
              onAddSiblingCategory={onAddSiblingCategory}
              onDelete={onDelete}
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
