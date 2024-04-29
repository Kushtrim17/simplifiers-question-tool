import { v4 as uuIdv4 } from "uuid";
import { Category, Question } from "./types";

export function addRootCategory(allCategories: Category[]) {
  const category: Category = {
    id: uuIdv4(),
    level: 1,
    orderNumber: allCategories.length + 1,
    name: `New root category ${allCategories.length + 1}`,
  };

  return [...allCategories, category];
}

export function addChildCategory(allCategories: Category[], parentId: string) {
  const categories = [...allCategories];

  categories.forEach((category) => {
    if (category.id === parentId) {
      const orderNumber = category.subCategories
        ? category.subCategories.length + 1
        : 1;
      const newCategory: Category = {
        id: uuIdv4(),
        parentId,
        level: category.level + 1,
        orderNumber,
        name: `Child ${orderNumber} category level ${category.level + 1}`,
      };

      if (category.subCategories) {
        category.subCategories.push(newCategory);
      } else {
        category.subCategories = [newCategory];
      }
    } else {
      if (category.subCategories) {
        category.subCategories = addChildCategory(
          category.subCategories,
          parentId
        );
      }
    }

    return category;
  });

  return categories;
}

export function addSiblingCategory(
  allCategories: Category[],
  siblingId: string
) {
  const siblingCategory = getCategory(allCategories, siblingId);

  if (!siblingCategory) {
    throw Error("Sibling category not found");
  }

  const parentId = siblingCategory.parentId || "";
  if (!parentId) {
    return addRootCategory(allCategories);
  }

  return addChildCategory(allCategories, parentId);
}

export function deleteCategory(allCategories: Category[], categoryId: string) {
  const categories = [...allCategories];

  return categories.filter((category) => {
    if (category.id === categoryId) {
      return false;
    }

    if (category.subCategories) {
      category.subCategories = deleteCategory(
        category.subCategories,
        categoryId
      );
    }

    return true;
  });
}

export function updateCategoryById(
  allCategories: Category[],
  updatedCategory: Category
) {
  const categories = [...allCategories];

  return categories.map((category) => {
    if (category.id === updatedCategory.id) {
      return { ...category, ...updatedCategory };
    }

    if (category.subCategories) {
      category.subCategories = updateCategoryById(
        category.subCategories,
        updatedCategory
      );
    }

    return category;
  });
}

export function addQuestionToCategory(
  allCategories: Category[],
  categoryId: string,
  newQuestion: Question
) {
  const categories = [...allCategories];

  return categories.map((category) => {
    if (category.id === categoryId) {
      if (!category.questions) {
        category.questions = [];
      }

      category.questions.push(newQuestion);
    }

    if (category.subCategories) {
      category.subCategories = addQuestionToCategory(
        category.subCategories,
        categoryId,
        newQuestion
      );
    }

    return category;
  });
}

export function updateQuestion(
  allCategories: Category[],
  updatedQuestion: Question
) {
  const categories = [...allCategories];

  return categories.map((category) => {
    if (category.questions) {
      category.questions = category.questions.map((question) => {
        if (question.id === updatedQuestion.id) {
          return { ...question, ...updatedQuestion };
        }

        return question;
      });
    }

    if (category.subCategories) {
      category.subCategories = updateQuestion(
        category.subCategories,
        updatedQuestion
      );
    }

    return category;
  });
}

function getCategory(
  categories: Category[],
  categoryId: string
): Category | null {
  for (const category of categories) {
    if (category.id === categoryId) {
      return category;
    }

    if (category.subCategories) {
      const foundCategory = getCategory(category.subCategories, categoryId);
      if (foundCategory !== null) {
        return foundCategory;
      }
    }
  }

  return null;
}

// Serialize the data and store in local storage
export function saveQuestionnaireToLocalStorage(
  questionnaire: Category[]
): void {
  const serializedQuestionnaire = JSON.stringify(questionnaire);
  localStorage.setItem("questionnaire", serializedQuestionnaire);
}

// Retrieve the data from local storage and deserialize
export function loadQuestionnaireFromLocalStorage(): Category[] {
  const serializedQuestionnaire = localStorage.getItem("questionnaire");
  if (serializedQuestionnaire) {
    return JSON.parse(serializedQuestionnaire);
  }
  return []; // If no data found in local storage
}
