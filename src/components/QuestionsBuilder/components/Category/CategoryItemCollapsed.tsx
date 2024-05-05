import { Caption } from "@/components/ui/Typography";
import { Category } from "../../types";

type Props = {
  category: Category;
};

export function CategoryItemCollapsed(props: Props) {
  const { category } = props;

  return (
    <>
      <Caption>{category.name}</Caption>
    </>
  );
}
