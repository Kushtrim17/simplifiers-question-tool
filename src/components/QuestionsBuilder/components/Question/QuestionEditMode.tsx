import { Small } from "@/components/ui/Typography";
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
import { AddExternalLinkForm } from "./AddExternalLinkForm";

type Props = {
  question: Question;
  allQuestions: Question[];
  onQuestionUpdate: (updatedQuestion: Question) => void;
  onAddQuestionDependency: (questionId: string, dependencyId: string) => void;
};

export function QuestionEditMode(props: Props) {
  const { question, allQuestions, onQuestionUpdate, onAddQuestionDependency } =
    props;
  const [currentQuestion, setCurrentQuestion] = useState(question);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnAddExternalLink = (label: string, url: string) => {
    onQuestionUpdate({
      ...question,
      externalLinks: [...question.externalLinks, { label, url }],
    });
  };

  const handleOnRemoveExternalLink = (label: string, url: string) => {
    onQuestionUpdate({
      ...question,
      externalLinks: question.externalLinks.filter(
        (link) => link.label !== label && link.url !== url
      ),
    });
  };

  const handleUpdate = () => {
    onQuestionUpdate(currentQuestion);
  };

  const handleQuestionTypeChange = (
    newType: "boolean" | "voucher" | "freeText"
  ) => {
    setCurrentQuestion({ ...currentQuestion, type: newType });
    onQuestionUpdate({
      ...currentQuestion,
      type: newType,
    });
  };

  const getQuestionName = (questionId: string) => {
    const foundQuestion = allQuestions.find((q) => q.id === questionId);
    return foundQuestion?.title || "";
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="w-full flex flex-col mr-40">
      <div className="flex flex-col">
        <Small>{question.orderNumber} Question</Small>
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
            handleQuestionTypeChange(value)
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

        <AddExternalLinkForm
          question={question}
          onAdd={handleOnAddExternalLink}
          onRemove={handleOnRemoveExternalLink}
        />

        <Small>Depends on questions</Small>
        <div className="mt-2">
          {question.dependsOnQuestions.map((questionId) => (
            <div key={questionId} className="mt-2">
              <Small>{getQuestionName(questionId)}</Small>
              <button
                onClick={() => console.log("test")}
                className="text-blue-500 underline ml-2"
              >
                <span className="italic">Remove</span>
              </button>
            </div>
          ))}
        </div>
        <Select
          defaultValue="no"
          onValueChange={(id: string) =>
            onAddQuestionDependency(question.id, id)
          }
          onOpenChange={(isOpen) => !isOpen && handleUpdate()}
        >
          <SelectTrigger className="mt-5 mb-5">
            <SelectValue placeholder="Select question type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="no">No dependency</SelectItem>
            {allQuestions.map((q) => (
              <SelectItem key={q.id} value={q.id}>
                {q.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
