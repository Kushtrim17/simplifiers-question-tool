import { useEffect, useState } from "react";
import { Category } from "./types";
import { CategoryItem } from "./components/CategoryItem";
import {
  addChildCategory,
  addSiblingCategory,
  updateCategoryById,
} from "./questionts";
import { QuestionItem } from "./components/QuestionItem";

type Props = {
  questions: Category[];
};
export function QuestionsBuilder(props: Props) {
  const { questions } = props;
  const [questionnaire, setQuestionnaire] = useState<Category[]>([]);

  useEffect(() => {
    setQuestionnaire(questions);
  }, [questions]);

  const handleUpdateCategory = (
    id: string,
    updatedCategory: Partial<Category>
  ) => {
    const updatedQuestionnaire = updateCategoryById(
      questionnaire,
      id,
      updatedCategory
    );

    setQuestionnaire(updatedQuestionnaire);
  };

  const handleAddSiblingCategory = (
    categoryId: string,
    newCategory: Category
  ) => {
    const updatedQuestionnaire = addSiblingCategory(
      questionnaire,
      categoryId,
      newCategory
    );

    setQuestionnaire(updatedQuestionnaire);
  };

  const handleAddChildCategory = (parentId: string, newCategory: Category) => {
    const updatedQuestionnaire = addChildCategory(
      questionnaire,
      parentId,
      newCategory
    );

    setQuestionnaire(updatedQuestionnaire);
  };

  return (
    <div>
      {questionnaire.map((category) => (
        <div key={category.id}>
          <CategoryItem
            category={category}
            onEdit={(updatedCategory) =>
              handleUpdateCategory(category.id, updatedCategory)
            }
            onAddSibling={(newCategory) =>
              handleAddSiblingCategory(category.id, newCategory)
            }
            onAddChild={(newCategory) =>
              handleAddChildCategory(category.id, newCategory)
            }
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
            <QuestionsBuilder questions={category.subCategories} />
          )}
        </div>
      ))}
    </div>
  );
}
