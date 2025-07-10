import { cn } from "@/lib/utils";

type GridProps = {
  columns?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  gap?: string;
  className?: string;
  children: React.ReactNode;
};

const columnClasses: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  7: "grid-cols-7",
  8: "grid-cols-8",
  9: "grid-cols-9",
  10: "grid-cols-10",
  11: "grid-cols-11",
  12: "grid-cols-12",
};

export function Grid({ columns = 1, gap = "gap-4", className, children }: GridProps) {
  return (
    <div className={cn("grid", columnClasses[columns], gap, className)}>
      {children}
    </div>
  );
}