/* eslint-disable @typescript-eslint/no-unused-vars */
import { v4 as uuIdv4 } from "uuid";
import {
  addChildCategory,
  addQuestionToCategory,
  addRootCategory,
  addSiblingCategory,
  deleteCategory,
  updateCategoryById,
  updateQuestion,
} from "./questions";
import { Category } from "./types";

describe("Add Category", () => {
  describe("Add a root category", () => {
    test("add a root category", () => {
      const categories: Category[] = [
        {
          id: uuIdv4(),
          orderNumber: 1,
          level: 1,
          name: "First Category",
        },
      ];

      const updatedCategory = addRootCategory(categories);
      expect(updatedCategory.length).toBe(2);
      expect(updatedCategory[1].level).toBe(1);
      expect(updatedCategory[1].orderNumber).toBe(2);
      expect(updatedCategory[1]?.parentId).toBe(undefined);
    });
  });

  describe("Add a sub category", () => {
    test("add a sub category - 2nd level", () => {
      const categories: Category[] = [
        {
          id: "1",
          orderNumber: 1,
          level: 1,
          name: "First Category",
          subCategories: [
            {
              id: "2",
              parentId: "1",
              orderNumber: 1,
              level: 2,
              name: "Sub Category 1",
            },
          ],
        },
      ];

      const updatedCategory = addChildCategory(categories, categories[0].id);
      const subCategories = updatedCategory[0].subCategories || [];
      expect(subCategories.length).toBe(2);
      const subcategorySecond = subCategories[1];
      expect(subcategorySecond.level).toBe(2);
      expect(subcategorySecond.orderNumber).toBe(2);
      expect(subcategorySecond.parentId).toBe("1");
    });

    test("add a sub category - 3rd level", () => {
      const categories: Category[] = [
        {
          id: "1",
          orderNumber: 1,
          level: 1,
          name: "First Category",
          subCategories: [
            {
              id: "2",
              parentId: "1",
              orderNumber: 1,
              level: 2,
              name: "Sub Category 1",
            },
          ],
        },
      ];

      const updatedCategory = addChildCategory(categories, "2");
      expect(updatedCategory[0].id).toBe("1");
      if (updatedCategory[0].subCategories?.length != null) {
        const level2 = updatedCategory[0].subCategories[0] || [];
        expect(level2.subCategories?.length).toBe(1);
        expect(level2.parentId).toBe("1");

        expect(level2.subCategories?.length).toBe(1);
        if (level2.subCategories?.length != null) {
          const level3 = level2.subCategories?.[0] || [];
          expect(level3.level).toBe(3);
          expect(level3.orderNumber).toBe(1);
          expect(level3.parentId).toBe("2");
        }
      }
    });

    test("add a sub category - 4rd level", () => {
      const categories: Category[] = [
        {
          id: "1",
          orderNumber: 1,
          level: 1,
          name: "First Category",
          subCategories: [
            {
              id: "2",
              orderNumber: 1,
              parentId: "1",
              level: 2,
              name: "Sub Category 1",
              subCategories: [
                {
                  id: "3",
                  parentId: "2",
                  orderNumber: 1,
                  level: 3,
                  name: "Sub Category 1",
                },
              ],
            },
          ],
        },
      ];

      addChildCategory(categories, "3");
      const updatedCategory = addChildCategory(categories, "3");
      if (updatedCategory[0].subCategories?.length != null) {
        const level2 = updatedCategory[0].subCategories[0] || [];
        if (level2.subCategories?.length != null) {
          const level3 = level2.subCategories[0] || [];
          expect(level3.subCategories?.length).toBe(2);

          if (level3.subCategories?.length != null) {
            const level4 = level3.subCategories?.[1] || [];
            expect(level4.level).toBe(4);
            expect(level4.orderNumber).toBe(2);
            expect(level4.parentId).toBe("3");
          }
        }
      }
    });

    test("add sub category - 1st, 2nd, 3rd level", () => {
      const categories: Category[] = [];

      const updatedCategory = addRootCategory(categories);
      const root = updatedCategory[0];
      expect(updatedCategory.length).toBe(1);
      expect(root.level).toBe(1);
      expect(root.orderNumber).toBe(1);
      expect(root?.parentId).toBe(undefined);

      const updatedCategory2 = addChildCategory(updatedCategory, root.id);
      const levelTwo = updatedCategory2[0].subCategories?.[0];
      if (levelTwo == null) {
        return;
      }

      const updatedCategory3 = addChildCategory(updatedCategory2, levelTwo?.id);
      const levelThree =
        updatedCategory3[0].subCategories?.[0]?.subCategories?.[0];
      expect(levelThree?.level).toBe(3);
      expect(levelThree?.orderNumber).toBe(1);
      expect(levelThree?.parentId).toBe(levelTwo?.id);
      const updatedLevel2 = updatedCategory3[0].subCategories?.[0];
      expect(updatedLevel2?.subCategories?.length).toBe(1);
      expect(updatedLevel2?.id).toBe(levelTwo?.id);
      expect(updatedCategory3[0].id).toBe(root.id);
    });
  });

  describe("Add a sibling category", () => {
    test("add a sibling category - 2nd level", () => {
      const categories: Category[] = [
        {
          id: "1",
          orderNumber: 1,
          level: 1,
          name: "First Category",
          subCategories: [
            {
              id: "2",
              parentId: "1",
              orderNumber: 1,
              level: 2,
              name: "Sub Category 1",
            },
          ],
        },
      ];

      const updatedCategory = addSiblingCategory(categories, "2");
      const rootCategory = updatedCategory[0];
      expect(rootCategory?.subCategories?.length).toBe(2);
      const siblingCategory = rootCategory?.subCategories?.[1];
      expect(siblingCategory).not.toBe(undefined);
      expect(rootCategory?.subCategories?.length).toBe(2);
    });
  });
});

describe("Update a category", () => {
  test("Update a root category", () => {
    const categories: Category[] = [
      {
        id: "1",
        orderNumber: 1,
        level: 1,
        name: "First Category",
        subCategories: [
          {
            id: "2",
            parentId: "1",
            orderNumber: 1,
            level: 2,
            name: "Sub Category 1",
          },
        ],
      },
    ];

    const updatedCategory = updateCategoryById(categories, {
      id: "1",
      name: "Updated Category",
      orderNumber: 1,
      level: 1,
    });
    expect(updatedCategory[0].name).toBe("Updated Category");
    expect(updatedCategory[0].subCategories?.length).toBe(1);
  });
});

describe("Delete a category", () => {
  test("Delete a category - 2nd level", () => {
    const categories: Category[] = [
      {
        id: "1",
        orderNumber: 1,
        level: 1,
        name: "First Category",
        subCategories: [
          {
            id: "2",
            parentId: "1",
            orderNumber: 1,
            level: 2,
            name: "Sub Category 1",
          },
        ],
      },
    ];

    const updatedCategory = deleteCategory(categories, "2");
    expect(updatedCategory[0].subCategories?.length).toBe(0);
  });

  test("Delete a category - 3d level", () => {
    const categories: Category[] = [
      {
        id: "1",
        orderNumber: 1,
        level: 1,
        name: "First Category",
        subCategories: [
          {
            id: "2",
            parentId: "1",
            orderNumber: 1,
            level: 2,
            name: "Sub Category 1",
            subCategories: [
              {
                id: "3",
                parentId: "2",
                orderNumber: 1,
                level: 3,
                name: "Sub Category 1",
              },
            ],
          },
        ],
      },
    ];

    const updatedCategory = deleteCategory(categories, "3");
    const secondLevel = updatedCategory[0].subCategories?.[0];
    expect(secondLevel?.subCategories?.length).toBe(0);
  });

  test("Delete a category - 1st level", () => {
    const categories: Category[] = [
      {
        id: "1",
        orderNumber: 1,
        level: 1,
        name: "First Category",
        subCategories: [
          {
            id: "2",
            parentId: "1",
            orderNumber: 1,
            level: 2,
            name: "Sub Category 1",
          },
        ],
      },
    ];

    const updatedCategory = deleteCategory(categories, "1");
    expect(updatedCategory.length).toBe(0);
  });
});

describe("Add question to category", () => {
  test("Add question to root category", () => {
    const categories: Category[] = [
      {
        id: "1",
        orderNumber: 1,
        level: 1,
        name: "First Category",
        subCategories: [
          {
            id: "2",
            parentId: "1",
            orderNumber: 1,
            level: 2,
            name: "Sub Category 1",
            subCategories: [
              {
                id: "3",
                parentId: "2",
                orderNumber: 1,
                level: 3,
                name: "Sub Category 1",
              },
            ],
          },
        ],
      },
    ];

    const updatedCategory = addQuestionToCategory(categories, "1");

    expect(updatedCategory[0].questions?.length).toBe(1);
  });

  test("Add question to 2nd level category", () => {
    const categories: Category[] = [
      {
        id: "1",
        orderNumber: 1,
        level: 1,
        name: "First Category",
        subCategories: [
          {
            id: "2",
            parentId: "1",
            orderNumber: 1,
            level: 2,
            name: "Sub Category 1",
            subCategories: [
              {
                id: "3",
                parentId: "2",
                orderNumber: 1,
                level: 3,
                name: "Sub Category 1",
              },
            ],
          },
        ],
      },
    ];

    const updatedCategory = addQuestionToCategory(categories, "2");

    const secondLevel = updatedCategory[0].subCategories?.[0];
    expect(secondLevel?.questions?.length).toBe(1);
  });

  test("Update question to 2nd level category", () => {
    const categories: Category[] = [
      {
        id: "1",
        orderNumber: 1,
        level: 1,
        name: "First Category",
        subCategories: [
          {
            id: "2",
            parentId: "1",
            orderNumber: 1,
            level: 2,
            name: "Sub Category 1",
            subCategories: [
              {
                id: "3",
                parentId: "2",
                orderNumber: 1,
                level: 3,
                name: "Sub Category 1",
              },
            ],
            questions: [
              {
                id: "1",
                title: "Question",
                orderNumber: 1,
                description: "Question description",
                externalLinks: [],
                type: "boolean",
              },
            ],
          },
        ],
      },
    ];

    const updatedCategory = updateQuestion(categories, {
      id: "1",
      title: "Updated Question",
      orderNumber: 1,
      description: "Question description",
      externalLinks: [],
      type: "boolean",
    });

    const secondLevel = updatedCategory[0].subCategories?.[0];
    expect(secondLevel?.questions?.length).toBe(1);
    expect(secondLevel?.questions?.[0].title).toBe("Updated Question");
  });
});
