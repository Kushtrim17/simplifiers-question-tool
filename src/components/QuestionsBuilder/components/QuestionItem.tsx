import { marginClasses } from "../consts";
import { Question } from "../types";

type Props = {
  categoryLevel: number;
  question: Question;
  onEdit: (updatedQuestion: Question) => void;
};

export function QuestionItem(props: Props) {
  const { question, categoryLevel } = props;
  const marginClass =
    marginClasses[Math.min(categoryLevel + 1, marginClasses.length - 1)];

  return (
    <div
      className={`cursor-pointer border border-transparent hover:border-gray-200 rounded-lg p-4 ${marginClass} flex flex-col`}
    >
      <h2>Question Item</h2>
      <h4>{question.title}</h4>
      <h6>{question.description}</h6>
    </div>
  );
}
