import { Caption } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import { UploadJSON } from "./UploadJSON";
import { Structure } from "../types";

type Props = {
  onAddFirstCategory: () => void;
  onUpload: (structure: Structure) => void;
};

export function NoCategoriesYet(props: Props) {
  const { onAddFirstCategory, onUpload } = props;

  return (
    <div className="flex flex-col items-center justify-center h-[600px]">
      <Caption className="text-gray-400 mb-20">
        No categories/questions added yet!
      </Caption>
      <Button className="ml-4 mb-4" onClick={onAddFirstCategory}>
        Add first category
      </Button>
      <Caption>OR</Caption>
      <UploadJSON onUpload={onUpload} />
    </div>
  );
}
