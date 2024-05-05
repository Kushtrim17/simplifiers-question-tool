import { Category } from "../../types";

type Props = {
  category: Category;
};

export function CategoryItemEditMode(props: Props) {
  const { category } = props;

  return (
    <>
      <h2>Category item edit mode</h2>
      <h3>{category.name}</h3>
    </>
  );
}
