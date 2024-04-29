import { Button } from "@/components/ui/button";

type Props = {
  onClick: () => void;
};

export function NoCategoriesYet(props: Props) {
  const { onClick } = props;

  return (
    <div className="flex flex-col items-center justify-center h-48">
      <h2 className="text-gray-400 mb-4">No categories/questions yet</h2>
      <Button className="ml-4" onClick={onClick}>
        Add first category
      </Button>
    </div>
  );
}
