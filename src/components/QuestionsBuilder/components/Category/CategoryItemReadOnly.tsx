import { Caption } from "@/components/ui/Typography";
import { Category } from "../../types";
import {
  IoPencilSharp,
  IoChevronDownSharp,
  IoChevronUpSharp,
} from "react-icons/io5";
import { DeleteButtonWithAlert } from "./DeleteButtonWithAlert";
import { Button } from "@/components/ui/button";
import { When } from "@/components/ui/When/When";

type PropsShownOnHover = {
  children: React.ReactNode;
};
function ShownOnHover(props: PropsShownOnHover) {
  const { children } = props;

  return (
    <div className="hidden group-hover:block pt-1 ml-2 flex-row">
      <div className="flex flex-row">{children}</div>
    </div>
  );
}

type Props = {
  category: Category;
  isCollapsed: boolean;
  ontoggleCollapse: () => void;
  onToggleEditMode: () => void;
};

export function CategoryItemReadOnly(props: Props) {
  const { category, isCollapsed, ontoggleCollapse, onToggleEditMode } = props;

  return (
    <div className="flex flex-row items-center group relative h-[40px]">
      <Caption>{category.name} RO</Caption>
      <ShownOnHover>
        <Button
          variant="outline"
          size="icon"
          className="ml-2"
          onClick={onToggleEditMode}
        >
          <IoPencilSharp size={15} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="ml-2"
          onClick={ontoggleCollapse}
        >
          <When
            isTrue={isCollapsed}
            fallback={<IoChevronDownSharp size={15} />}
          >
            <IoChevronUpSharp size={15} />
          </When>
        </Button>
        <Button variant="destructive" size="icon" className="ml-2">
          <DeleteButtonWithAlert
            onDelete={() => console.log("it was clicked")}
          />
        </Button>
      </ShownOnHover>
    </div>
  );
}
