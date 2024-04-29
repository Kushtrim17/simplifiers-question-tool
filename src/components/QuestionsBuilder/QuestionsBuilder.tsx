import { Category } from "./types";
import { CategoryItem } from "./components/CategoryItem";
import { QuestionItem } from "./components/QuestionItem";

type Props = {
  questions: Category[];
  onUpdate: () => void;
  handleOnEdit: (category: Category) => void;
  handleOnAddChildCategory: (parentId: string) => void;
  handleOnAddSiblingCategory: (siblingId: string) => void;
  handleOnDelete: (categoryId: string) => void;
  handleOnAddQuestion: () => void;
};
export function QuestionsBuilder(props: Props) {
  const {
    questions = [],
    onUpdate,
    handleOnAddChildCategory,
    handleOnAddQuestion,
    handleOnAddSiblingCategory,
    handleOnDelete,
    handleOnEdit,
  } = props;

  return (
    <div>
      {questions.map((category) => (
        <div key={category.id}>
          <CategoryItem
            category={category}
            onEdit={handleOnEdit}
            onAddSibling={(siblingId: string) =>
              handleOnAddSiblingCategory(siblingId)
            }
            onAddChild={(parentId: string) =>
              handleOnAddChildCategory(parentId)
            }
            onDelete={() => handleOnDelete(category.id)}
            onAddQuestion={() => handleOnAddQuestion()}
          />
          <div className="mt-4">
            {category?.questions?.map((q) => (
              <QuestionItem
                key={q.id}
                categoryLevel={category.level}
                question={q}
                onEdit={() => console.log("question edited")}
              />
            ))}
          </div>

          {category.subCategories && (
            <QuestionsBuilder
              questions={category.subCategories}
              onUpdate={onUpdate}
              handleOnEdit={handleOnEdit}
              handleOnAddChildCategory={handleOnAddChildCategory}
              handleOnAddSiblingCategory={handleOnAddSiblingCategory}
              handleOnDelete={handleOnDelete}
              handleOnAddQuestion={handleOnAddQuestion}
            />
          )}
        </div>
      ))}
    </div>
  );
}
