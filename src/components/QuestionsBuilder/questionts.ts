import { Category } from "./types";

export function updateCategoryById(
  categories: Category[],
  id: string,
  updatedCategory: Partial<Category>
): Category[] {
  return categories.map((category) => {
    if (category.id === id) {
      // Merge the updated properties with the existing category using spread syntax
      return { ...category, ...updatedCategory };
    } else if (category.subCategories) {
      // Recursively update subcategories
      return {
        ...category,
        subCategories: updateCategoryById(
          category.subCategories,
          id,
          updatedCategory
        ),
      };
    }
    return category;
  });
}

export function addSiblingCategory(
  categories: Category[],
  categoryId: string,
  newCategory: Category
): Category[] {
  return categories.map((category) => {
    if (category.id === categoryId) {
      if (category.subCategories) {
        // Find the index of the category within its parent's subcategories
        const index = category.subCategories.findIndex(
          (subCategory) => subCategory.id === categoryId
        );
        // Insert the new category after the current category
        category.subCategories.splice(index + 1, 0, newCategory);
      } else {
        // If the category has no siblings, create a new array of subcategories
        category.subCategories = [newCategory];
      }
    } else if (category.subCategories) {
      // Recursively add the sibling category to subcategories
      category.subCategories = addSiblingCategory(
        category.subCategories,
        categoryId,
        newCategory
      );
    }
    return category;
  });
}

export function addChildCategory(
  categories: Category[],
  parentId: string,
  newCategory: Category
): Category[] {
  return categories.map((category) => {
    if (category.id === parentId) {
      // Add the new category as a subcategory
      if (!category.subCategories) {
        category.subCategories = []; // Initialize subcategories array if not already present
      }
      category.subCategories.push(newCategory);
    } else if (category.subCategories) {
      // Recursively add the child category to subcategories
      category.subCategories = addChildCategory(
        category.subCategories,
        parentId,
        newCategory
      );
    }
    return category;
  });
}
