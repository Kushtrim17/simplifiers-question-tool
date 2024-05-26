import { Medium } from "@/components/ui/Typography";
import { Question } from "../../types";
import { useEffect, useRef, useState } from "react";
import { AddExternalLinkForm } from "./AddExternalLinkForm";
import { Separator } from "@/components/ui/separator";
import { QuestionTypeSelector } from "./QuestionTypeSelector";
import { QuestionDependencySelector } from "./QuestionDependencySelector";
import { QuestionBasicInfo } from "./QuestionBasicInfo";
import { AccountingHelp } from "./AccountingHelp";

type Props = {
  question: Question;
  allQuestions: Question[];
  onQuestionUpdate: (updatedQuestion: Question) => void;
  onAddQuestionDependency: (
    questionId: string,
    dependencyId: string,
    answer: string | boolean
  ) => void;
  onRemoveQuestionDependency: (
    questionId: string,
    dependencyId: string
  ) => void;
};

export function QuestionEditMode(props: Props) {
  const {
    question,
    allQuestions,
    onQuestionUpdate,
    onAddQuestionDependency,
    onRemoveQuestionDependency,
  } = props;
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

  const removePreviousDependencies = () => {
    const dependencies = question.dependsOnQuestions;
    if (dependencies.length === 0) {
      return;
    }

    dependencies.forEach((dependency) => {
      onRemoveQuestionDependency(question.id, dependency.questionId);
    });
  };

  const handleOnDependencyChange = (
    dependencyId: string,
    answer: string | boolean
  ) => {
    removePreviousDependencies();

    if (dependencyId === "no") {
      return;
    }

    return onAddQuestionDependency(question.id, dependencyId, answer);
  };

  const getRangeFromValue = (value: string) => {
    const rangeStartString = value
      .split("")
      .map(Number)
      .slice(0, 4)
      .map(Number)
      .join("");
    const rangeStart = Number(rangeStartString);

    const rangeEndString = value
      .split("")
      .map(Number)
      .slice(4, 8)
      .map(Number)
      .join("");
    const rangeEnd = Number(rangeEndString);

    const range = [];
    if (rangeStart > 0) {
      range.push(rangeStart);
    }

    if (rangeEnd > 0) {
      range.push(rangeEnd);
    }

    return range;
  };

  const handleCreditRangeChange = (newValue: string) => {
    const range = getRangeFromValue(newValue);
    const initialAccount = {
      title: "",
      creditDescription: "",
      debitDescription: "",
      creditRange: range,
      debitRange: [],
    };

    const accounts =
      question.accounts == null
        ? initialAccount
        : {
            ...question.accounts,
            creditRange: range,
          };

    onQuestionUpdate({ ...question, accounts });
  };

  const handleDebitRangeChange = (newValue: string) => {
    const range = getRangeFromValue(newValue);
    const initialAccount = {
      title: "",
      creditDescription: "",
      debitDescription: "",
      creditRange: [],
      debitRange: range,
    };

    const accounts =
      question.accounts == null
        ? initialAccount
        : {
            ...question.accounts,
            debitRange: range,
          };

    onQuestionUpdate({ ...question, accounts });
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="w-full flex flex-col mr-40">
      <Medium className="font-extrabold">
        {question.orderNumber} Question
      </Medium>

      <QuestionBasicInfo
        question={currentQuestion}
        onQuestionUpdate={setCurrentQuestion}
        handleSave={handleUpdate}
      />

      <QuestionTypeSelector
        question={currentQuestion}
        onQuestionTypeChange={handleQuestionTypeChange}
      />

      <AddExternalLinkForm
        question={question}
        onAdd={handleOnAddExternalLink}
        onRemove={handleOnRemoveExternalLink}
      />

      <QuestionDependencySelector
        question={question}
        allQuestions={allQuestions}
        onDependencyChange={handleOnDependencyChange}
      />

      <Separator className="mt-5 mb-5" />

      <AccountingHelp
        question={question}
        onQuestionUpdate={onQuestionUpdate}
        onCreditRangeChange={handleCreditRangeChange}
        onDebitRangeChange={handleDebitRangeChange}
      />
    </div>
  );
}
