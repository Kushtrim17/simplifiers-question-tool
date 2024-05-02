import { useRef, useState, useEffect } from "react";
import {
  IoEllipsisVerticalSharp,
  IoTrashBinOutline,
  IoPencilSharp,
  IoCheckmarkSharp,
  IoChevronUpSharp,
} from "react-icons/io5";
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
import { When } from "@/components/ui/When/When";
import { Input } from "@/components/ui/input";
import { Caption } from "@/components/ui/Typography";
import { Category, Question } from "../types";
import { QuestionItem } from "./Questions/QuestionItem";

type CategoryProps = {
  label: string;
  handleOnEditClicked: () => void;
};

function CategoryName(props: CategoryProps) {
  const { label, handleOnEditClicked } = props;

  return (
    <>
      <Caption>{label}</Caption>
      <div
        className="ml-5 cursor-pointer border border-gray-200 rounded-lg p-3 h-[40px] mb-[-5px]"
        onClick={handleOnEditClicked}
      >
        <IoPencilSharp size={15} />
      </div>
    </>
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
          <span className="mr-2">{isEditMode ? "Read" : "Edit"}</span>
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
  onEditQuestion: (updatedQuestion: Question) => void;
  onDeleteQuestion: (questionId: string) => void;
};

export function CategoryItem(props: Props) {
  const {
    category,
    onEdit,
    onAddSibling,
    onAddChild,
    onDelete,
    onAddQuestion,
    onEditQuestion,
    onDeleteQuestion,
  } = props;
  const [isCategoryCollapsed, setIsCategoryCollapsed] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [categoryName, setCategoryName] = useState(category.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus on the input element when entering edit mode
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

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

  if (isCategoryCollapsed) {
    return (
      <div className="flex flex-row">
        <Caption>{categoryName}</Caption>
        <IoChevronUpSharp
          size={20}
          onClick={() => setIsCategoryCollapsed(false)}
          className="cursor-pointer ml-2 mt-1"
        />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center group relative">
        <div className="flex flex-row w-[800px]">
          <ActionMenu
            isEditMode={isEditMode}
            toggleEditMode={toggleEditMode}
            handleAddSiblingCategory={handleAddSiblingCategory}
            handleAddChildCategory={handleAddChildCategory}
            handleAddQuestion={onAddQuestion}
          />
          <When
            isTrue={isEditMode}
            fallback={
              <CategoryName
                label={categoryName}
                handleOnEditClicked={toggleEditMode}
              />
            }
          >
            <Input
              type="text"
              placeholder="Category"
              width={300}
              value={categoryName}
              onChange={(e) => handleUpdateCategoryName(e.currentTarget.value)}
              ref={inputRef}
            />
            <div
              className="ml-5 cursor-pointer border border-gray-200 rounded-lg p-4 h-[40px]"
              onClick={toggleEditMode}
            >
              <IoCheckmarkSharp size={15} />
            </div>
          </When>
        </div>
        <div className="hidden group-hover:block">
          <DeleteButton onDelete={onDelete} />
        </div>
      </div>
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
    </div>
  );
}
