import { v4 as uuidv4 } from "uuid";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Category } from "../types";
import { useState } from "react";
import { When } from "./When";
import { Input } from "@/components/ui/input";
import { marginClasses } from "../consts";

type CategoryProps = {
  label: string;
};

function CategoryName(props: CategoryProps) {
  const { label } = props;

  return (
    <h2 className="text-xl font-semibold text-gray-800 hover:text-gray-900">
      {label}
    </h2>
  );
}

type Props = {
  category: Category;
  onEdit: (updatedCategory: Category) => void;
  onAddSibling: (newCategory: Category) => void;
  onAddChild: (newCategory: Category) => void;
};

export function CategoryItem(props: Props) {
  const { category, onEdit, onAddSibling } = props;
  const [isEditMode, setIsEditMode] = useState(false);
  const [categoryName, setCategoryName] = useState(category.name);

  const marginClass =
    marginClasses[Math.min(category.level - 1, marginClasses.length - 1)];

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  const handleUpdateCategoryName = (name: string) => {
    setCategoryName(name);
    onEdit({ ...category, name });
  };

  const handleAddSiblingCategory = () => {
    const newCategory: Category = {
      id: uuidv4(),
      level: category.level,
      orderNumber: category.orderNumber + 1,
      name: "New Category",
    };

    onAddSibling(newCategory);
  };

  const handleAddChildCategory = () => {
    const newCategory: Category = {
      id: uuidv4(),
      level: category.level + 1,
      // TODO: figure the category number properly
      orderNumber: 1,
      name: "New sub category",
    };

    props.onAddChild(newCategory);
  };

  return (
    <div>
      <div
        className={`cursor-pointer border border-transparent hover:border-gray-200 rounded-lg p-4 ${marginClass} flex items-center`}
      >
        <DropdownMenu>
          <DropdownMenuTrigger className="pr-2">
            <IoEllipsisVerticalSharp size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={toggleEditMode}>
              {isEditMode ? (
                <span className="mr-2">Read</span>
              ) : (
                <span className="mr-2">Edit</span>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleAddSiblingCategory}>
              Add sibling category
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleAddChildCategory}>
              Add subcategory
            </DropdownMenuItem>
            <DropdownMenuItem>Add question</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <When
          isTrue={isEditMode}
          fallback={<CategoryName label={categoryName} />}
        >
          <Input
            type="text"
            placeholder="Category"
            width={100}
            value={categoryName}
            onChange={(e) => handleUpdateCategoryName(e.currentTarget.value)}
          />
        </When>
      </div>
    </div>
  );
}
