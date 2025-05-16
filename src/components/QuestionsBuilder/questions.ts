import { v4 as uuIdv4 } from "uuid";
import { Category, Question } from "./types";

export function addRootCategory(allCategories: Category[]) {
  const category: Category = {
    id: uuIdv4(),
    level: 1,
    orderNumber: allCategories.length + 1,
    name: `New root category ${allCategories.length + 1}`,
    questions: [],
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
        questions: [],
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

export function updateCategoryOrder(
  allCategories: Category[],
  allSubCategories: Category[],
  categoryId: string,
  newOrderNumber: number
) {
  return allSubCategories.map((category: Category) => {
    if (category.id === categoryId) {
      if (category?.parentId == null) {
        // it is a root category we should update the order number of all root categories
        return category;
      }

      const parentCategory = getCategory(allCategories, category.parentId);
      if (parentCategory == null) {
        return category;
      }

      const categoryIndex = parentCategory.subCategories?.findIndex(
        (category) => category.id === categoryId
      );

      if (
        parentCategory.subCategories == null ||
        categoryIndex == null ||
        categoryIndex === -1
      ) {
        return category;
      }

      const [updatedCategory] = parentCategory.subCategories.splice(
        categoryIndex,
        1
      );

      parentCategory.subCategories?.splice(
        newOrderNumber - 1,
        0,
        updatedCategory
      );

      parentCategory.subCategories = parentCategory.subCategories?.map(
        (category, index) => ({ ...category, orderNumber: index + 1 })
      );
    }

    if (category.subCategories) {
      category.subCategories = updateCategoryOrder(
        allCategories,
        category.subCategories,
        categoryId,
        newOrderNumber
      );
    }

    return category;
  });
}

export function addQuestionToCategory(
  allCategories: Category[],
  categoryId: string
) {
  const categories = [...allCategories];

  return categories.map((category) => {
    if (category.id === categoryId) {
      if (!category.questions) {
        category.questions = [];
      }

      const orderNumber = category?.questions?.length + 1 || 1;

      const newQuestion: Question = {
        id: uuIdv4(),
        shortTitle: `Short title ${category.name}`,
        title: `Question ${category.name} and ${category.level} level`,
        orderNumber,
        description: "Question description",
        type: "boolean",
        scope: "accounts",
        externalLinks: [],
        dependsOnQuestions: [],
      };

      category.questions.push(newQuestion);
    }

    if (category.subCategories) {
      category.subCategories = addQuestionToCategory(
        category.subCategories,
        categoryId
      );
    }

    return category;
  });
}

export function updateQuestionOrderInCategory(
  categories: Category[],
  categoryId: string,
  questionId: string,
  newOrderNumber: number
) {
  return categories.map((category) => {
    if (category.id === categoryId) {
      if (!category.questions) {
        return category;
      }

      const questions = [...category.questions];
      const questionIndex = questions.findIndex(
        (question) => question.id === questionId
      );
      if (questionIndex === -1) {
        return category;
      }

      const [question] = questions.splice(questionIndex, 1);
      questions.splice(newOrderNumber - 1, 0, question);

      category.questions = questions.map((question, index) => ({
        ...question,
        orderNumber: index + 1,
      }));
    }

    if (category.subCategories) {
      category.subCategories = updateQuestionOrderInCategory(
        category.subCategories,
        categoryId,
        questionId,
        newOrderNumber
      );
    }

    return category;
  });
}

export function addQuestionDependency(
  categories: Category[],
  questionId: string,
  dependencyId: string,
  answer: boolean | string
) {
  console.log({
    answer,
  });
  return categories.map((category) => {
    if (category.questions) {
      category.questions = category.questions.map((question) => {
        if (question.id === questionId) {
          return {
            ...question,
            dependsOnQuestions: [
              ...question.dependsOnQuestions,
              { questionId: dependencyId, answer },
            ],
          };
        }

        return question;
      });
    }

    if (category.subCategories) {
      category.subCategories = addQuestionDependency(
        category.subCategories,
        questionId,
        dependencyId,
        answer
      );
    }

    return category;
  });
}

// export function updateQuestionDependency(
//   categories: Category[],
//   questionId: string,
//   dependencyId: string,
//   answer: boolean
// ) {
//   return categories.map((category) => {
//     if (category.questions) {
//       category.questions = category.questions.map((question) => {
//         if (question.id === questionId) {
//           return {
//             ...question,
//             dependsOnQuestions: question.dependsOnQuestions.map(
//               (dependency) => {
//                 if (dependency.questionId === dependencyId) {
//                   return { ...dependency, answer };
//                 }

//                 return dependency;
//               }
//             ),
//           };
//         }

//         return question;
//       });
//     }

//     if (category.subCategories) {
//       category.subCategories = updateQuestionDependency(
//         category.subCategories,
//         questionId,
//         dependencyId,
//         answer
//       );
//     }

//     return category;
//   });
// }

export function removeQuestionDependency(
  categories: Category[],
  questionId: string,
  dependencyId: string
) {
  return categories.map((category) => {
    if (category.questions) {
      category.questions = category.questions.map((question) => {
        if (question.id === questionId) {
          return {
            ...question,
            dependsOnQuestions: question.dependsOnQuestions.filter(
              (dependency) => dependency.questionId !== dependencyId
            ),
          };
        }

        return question;
      });
    }

    if (category.subCategories) {
      category.subCategories = removeQuestionDependency(
        category.subCategories,
        questionId,
        dependencyId
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

  console.log({
    updatedQuestion,
  });
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

export function deleteQuestion(allCategories: Category[], questionId: string) {
  const categories = [...allCategories];

  return categories.map((category) => {
    if (category.questions) {
      category.questions = category.questions.filter(
        (question) => question.id !== questionId
      );
    }

    if (category.subCategories) {
      category.subCategories = deleteQuestion(
        category.subCategories,
        questionId
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
