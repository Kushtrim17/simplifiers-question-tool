import { marginClasses } from "../../consts";
import { Question } from "../../types";
import { useState } from "react";
import { QuestionEditMode } from "./QuestionEditMode";
import { Container } from "./Container";
import { Caption } from "@/components/ui/Typography/Caption";

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
    marginClasses[Math.min(categoryLevel + 1, marginClasses.length - 1)];

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
    >
      <Caption>
        {question.orderNumber}. {question.title}
      </Caption>
    </Container>
  );
}
