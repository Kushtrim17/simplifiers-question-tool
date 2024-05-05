import { marginClasses } from "../../../../constants";
import { Question } from "../../types";
import { useState } from "react";
import { QuestionEditMode } from "./QuestionEditMode";
import { Container } from "./Container";
import { Caption } from "@/components/ui/Typography";

type Props = {
  categoryLevel: number;
  question: Question;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  allQuestions: Question[];
  onEdit: (updatedQuestion: Question) => void;
  onDelete: (questionId: string) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onAddQuestionDependency: (questionId: string, dependencyId: string) => void;
};

export function QuestionItem(props: Props) {
  const [isEditMode, setIsEditMode] = useState(false);
  const {
    question,
    categoryLevel,
    isFirstQuestion,
    isLastQuestion,
    onDelete,
    allQuestions,
    onEdit,
    onMoveDown,
    onMoveUp,
    onAddQuestionDependency,
  } = props;
  const marginClass =
    marginClasses[Math.min(categoryLevel, marginClasses.length - 1)];

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  if (isEditMode) {
    return (
      <Container
        marginClass={marginClass}
        isEditMode={isEditMode}
        onDelete={() => onDelete(question.id)}
        onToggleEditMode={toggleEditMode}
        canMoveUp={!isFirstQuestion}
        canMoveDown={!isLastQuestion}
        onMoveDown={onMoveDown}
        onMoveUp={onMoveUp}
      >
        <QuestionEditMode
          question={question}
          onQuestionUpdate={onEdit}
          allQuestions={allQuestions}
          onAddQuestionDependency={onAddQuestionDependency}
        />
      </Container>
    );
  }

  return (
    <Container
      marginClass={marginClass}
      isEditMode={isEditMode}
      canMoveUp={!isFirstQuestion}
      canMoveDown={!isLastQuestion}
      onDelete={() => onDelete(question.id)}
      onToggleEditMode={toggleEditMode}
      onMoveDown={onMoveDown}
      onMoveUp={onMoveUp}
    >
      <Caption className="text-slate-700">
        {question.orderNumber}. {question.title}
      </Caption>
    </Container>
  );
}
