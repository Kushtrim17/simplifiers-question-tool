// import { debounce } from "lodash";
import { IoEllipsisVerticalSharp, IoTrashBinOutline } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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

type ActionMenuProps = {
  isEditMode: boolean;
  toggleEditMode: () => void;
  handleAddSiblingCategory: () => void;
  handleAddChildCategory: () => void;
  handleAddQuestion: () => void;
};

function ActionMenu(props: ActionMenuProps) {
  const {
    isEditMode,
    toggleEditMode,
    handleAddSiblingCategory,
    handleAddChildCategory,
    handleAddQuestion,
  } = props;

  return (
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
        <DropdownMenuItem onClick={handleAddQuestion}>
          Add question
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
type DeleteProps = {
  onDelete: () => void;
};

function DeleteButton(props: DeleteProps) {
  const { onDelete } = props;

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <IoTrashBinOutline size={24} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            All of the category data will be permanently deleted, including sub
            categories and questions
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>Yes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

type Props = {
  category: Category;
  onEdit: (updatedCategory: Category) => void;
  onAddSibling: (siblingId: string) => void;
  onAddChild: (parentId: string) => void;
  onDelete: () => void;
  onAddQuestion: () => void;
};

export function CategoryItem(props: Props) {
  const {
    category,
    onEdit,
    onAddSibling,
    onAddChild,
    onDelete,
    onAddQuestion,
  } = props;
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
    onAddSibling(category.id);
  };

  const handleAddChildCategory = () => {
    onAddChild(category.id);
  };

  return (
    <div
      className={`cursor-pointer border border-transparent hover:border-gray-200 rounded-lg p-4 ${marginClass} flex justify-between items-center group inline-block relative`}
    >
      <div className="flex flex-row">
        <ActionMenu
          isEditMode={isEditMode}
          toggleEditMode={toggleEditMode}
          handleAddSiblingCategory={handleAddSiblingCategory}
          handleAddChildCategory={handleAddChildCategory}
          handleAddQuestion={onAddQuestion}
        />
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
      <div className="hidden group-hover:block">
        <DeleteButton onDelete={onDelete} />
      </div>
    </div>
  );
}
