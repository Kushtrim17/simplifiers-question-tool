import {
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
import { When } from "../When";

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
  onDelete: () => void;
  onToggleEditMode: () => void;
};

export function Container(props: Props) {
  const { marginClass, isEditMode, children, onDelete, onToggleEditMode } =
    props;

  return (
    <>
      <div
        className={`cursor-pointer border border-transparent hover:border-gray-200 rounded-lg p-4 ${marginClass} flex justify-between items-center group relative`}
      >
        <div className="absolute top-2 right-[80px]" onClick={onToggleEditMode}>
          <When isTrue={isEditMode} fallback={<IoChevronUpSharp size={24} />}>
            <IoChevronDownSharp size={24} />
          </When>
        </div>
        <div className="absolute top-2 right-5">
          <DeleteButton onDelete={onDelete} />
        </div>
        {children}
      </div>
    </>
  );
}
