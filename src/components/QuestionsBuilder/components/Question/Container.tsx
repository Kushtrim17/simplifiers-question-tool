import {
  IoArrowDownSharp,
  IoArrowUpSharp,
  IoChevronDownSharp,
  IoChevronUpSharp,
  IoTrashBinOutline,
} from "react-icons/io5";
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
import { When } from "../../../ui/When/When";

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
  marginClass: string;
  isEditMode: boolean;
  children: React.ReactNode;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onDelete: () => void;
  onToggleEditMode: () => void;
  onContainerClick?: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
};

export function Container(props: Props) {
  const {
    marginClass,
    isEditMode,
    children,
    canMoveUp,
    canMoveDown,
    onDelete,
    onToggleEditMode,
    onContainerClick,
    onMoveUp,
    onMoveDown,
  } = props;

  return (
    <>
      <div
        className={`cursor-pointer border border-transparent hover:border-gray-200 rounded-lg p-4 ${marginClass} flex justify-between group relative`}
        onClick={onContainerClick}
      >
        <div className="flex-2 flex flex-col p-1 w-[40px]">
          <When isTrue={canMoveUp}>
            <IoArrowUpSharp size={20} onClick={onMoveUp} />
          </When>
          <When isTrue={canMoveDown}>
            <IoArrowDownSharp size={20} onClick={onMoveDown} />
          </When>
        </div>
        <div className="flex-1 flex items-center">{children}</div>
        <div
          className="flex-2 flex w-[50px] pt-2 pl-1"
          onClick={onToggleEditMode}
        >
          <When isTrue={isEditMode} fallback={<IoChevronUpSharp size={24} />}>
            <IoChevronDownSharp size={24} />
          </When>
        </div>
        <div className="flex-2 flex w-[50px] pl-1 max-h-[40px]">
          <DeleteButton onDelete={onDelete} />
        </div>
      </div>
    </>
  );
}
