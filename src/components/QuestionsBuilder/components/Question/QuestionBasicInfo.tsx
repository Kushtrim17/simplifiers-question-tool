import { Small } from "@/components/ui/Typography";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRef } from "react";
import { Question } from "../../types";

type Props = {
  question: Question;
  onQuestionUpdate: (question: Question) => void;
  handleSave: () => void;
};

export function QuestionBasicInfo(props: Props) {
  const { question, onQuestionUpdate, handleSave } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Input
        ref={inputRef}
        value={question.title}
        placeholder="Enter question title"
        onChange={(e) =>
          onQuestionUpdate({
            ...question,
            title: e.currentTarget.value,
          })
        }
        onBlur={handleSave}
        className="mt-2 mb-5"
      />

      <Small className="font-extrabold">Description</Small>
      <Textarea
        value={question.description}
        placeholder="Enter question explanation"
        onChange={(e) =>
          onQuestionUpdate({
            ...question,
            description: e.currentTarget.value,
          })
        }
        onBlur={handleSave}
        className="mt-2 mb-5 min-h-[300px]"
        cols={130}
      />
    </>
  );
}
