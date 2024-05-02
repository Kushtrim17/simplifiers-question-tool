import { marginClasses } from "../../../../constants";
import { Question } from "../../types";
import { useState } from "react";
import { QuestionEditMode } from "./QuestionEditMode";
import { Container } from "./Container";
import { Caption } from "@/components/ui/Typography";

type Props = {
  categoryLevel: number;
  question: Question;
  onEdit: (updatedQuestion: Question) => void;
  onDelete: (questionId: string) => void;
};

export function QuestionItem(props: Props) {
  const [isEditMode, setIsEditMode] = useState(false);
  const { question, categoryLevel, onDelete, onEdit } = props;
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
      >
        <QuestionEditMode question={question} onQuestionUpdate={onEdit} />
      </Container>
    );
  }

  return (
    <Container
      marginClass={marginClass}
      isEditMode={isEditMode}
      onDelete={() => onDelete(question.id)}
      onToggleEditMode={toggleEditMode}
      onContainerClick={toggleEditMode}
    >
      <Caption className="text-slate-700">
        {question.orderNumber}. {question.title}
      </Caption>
    </Container>
  );
}
