import { Small } from "@/components/ui/Typography/Small";
import { Question } from "../../types";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddExternalLinkForm } from "../AddExternalLinkForm";

type Props = {
  question: Question;
  onQuestionUpdate: (updatedQuestion: Question) => void;
};

export function QuestionEditMode(props: Props) {
  const { question, onQuestionUpdate } = props;
  const [currentQuestion, setCurrentQuestion] = useState(question);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleOnAddExternalLink = (label: string, url: string) => {
    console.log(`adding label ${label} and url ${url}`);
  };

  const handleUpdate = () => {
    onQuestionUpdate(currentQuestion);
  };

  return (
    <div className="w-full flex flex-col mr-40">
      <div className="flex flex-col">
        <Small>Question</Small>
        <Input
          ref={inputRef}
          value={currentQuestion.title}
          onChange={(e) =>
            setCurrentQuestion({
              ...currentQuestion,
              title: e.currentTarget.value,
            })
          }
          onBlur={handleUpdate}
          className="mt-2 mb-5"
        />

        <Small>Description</Small>
        <Textarea
          value={currentQuestion.description}
          onChange={(e) =>
            setCurrentQuestion({
              ...currentQuestion,
              description: e.currentTarget.value,
            })
          }
          onBlur={handleUpdate}
          className="mt-2 mb-5 min-h-[300px]"
          cols={130}
        />

        <Small>Question Type</Small>
        <Select
          defaultValue={currentQuestion.type}
          onValueChange={(value: "boolean" | "voucher" | "freeText") =>
            setCurrentQuestion({ ...currentQuestion, type: value })
          }
          onOpenChange={(isOpen) => !isOpen && handleUpdate()}
        >
          <SelectTrigger className="mt-5 mb-5">
            <SelectValue placeholder="Select question type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="boolean">Yes or No</SelectItem>
            <SelectItem value="voucher">Voucher</SelectItem>
            <SelectItem value="freeText">Free text</SelectItem>
          </SelectContent>
        </Select>

        <AddExternalLinkForm onAdd={handleOnAddExternalLink} />
      </div>
    </div>
  );
}
