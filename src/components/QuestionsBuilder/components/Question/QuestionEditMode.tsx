import { Medium, Small } from "@/components/ui/Typography";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { AddExternalLinkForm } from "./AddExternalLinkForm";
import { Separator } from "@/components/ui/separator";

type Props = {
  question: Question;
  allQuestions: Question[];
  onQuestionUpdate: (updatedQuestion: Question) => void;
  onAddQuestionDependency: (questionId: string, dependencyId: string) => void;
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
      onRemoveQuestionDependency(question.id, dependency);
    });
  };

  const handleOnDependencyChange = (dependencyId: string) => {
    removePreviousDependencies();

    if (dependencyId === "no") {
      return;
    }

    return onAddQuestionDependency(question.id, dependencyId);
  };

  const getQuestionDependency = () => {
    const dependency = question.dependsOnQuestions;

    if (dependency.length === 0) {
      return "no";
    }

    const dependencyId = dependency[0];
    const foundQuestion = allQuestions.find((q) => q.id === dependencyId);
    if (!foundQuestion) {
      return "no";
    }

    return foundQuestion.id;
  };

  const getCreditRange = () => {
    if (question.accounts?.creditRange.length === 0) {
      return "";
    }

    return question.accounts?.creditRange.join("");
  };

  const getDebitRange = () => {
    if (question.accounts?.debitRange.length === 0) {
      return "";
    }

    return question.accounts?.debitRange.join("");
  };

  const handleCreditRangeChange = (newValue: string) => {
    const newCreditRange = newValue.split("").map(Number);
    onQuestionUpdate({
      ...question,
      accounts:
        question.accounts == null
          ? {
              title: "",
              description: "",
              creditRange: newCreditRange,
              debitRange: [],
            }
          : {
              ...question.accounts,
              creditRange: newCreditRange,
            },
    });
  };

  const handleDebitRangeChange = (newValue: string) => {
    const newDebitRange = newValue.split("").map(Number);
    onQuestionUpdate({
      ...question,
      accounts:
        question.accounts == null
          ? {
              title: "",
              description: "",
              creditRange: [],
              debitRange: newDebitRange,
            }
          : {
              ...question.accounts,
              debitRange: newDebitRange,
            },
    });
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="w-full flex flex-col mr-40">
      <div className="flex flex-col">
        <Medium className="font-extrabold">
          {question.orderNumber} Question
        </Medium>
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

        <Small className="font-extrabold">Description</Small>
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

        <Small className="font-extrabold">Question Type</Small>
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

        <Small className="font-extrabold">Depends on questions</Small>
        <Select
          defaultValue={getQuestionDependency()}
          onValueChange={handleOnDependencyChange}
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
        <Separator className="mt-5 mb-5" />

        <Medium className="font-extrabold mb-4">Accounting help</Medium>

        <Small className="font-extrabold mb-2">Accounting help title</Small>
        <Input
          type="text"
          placeholder="Title"
          className="mb-4"
          width={300}
          value={question.accounts?.title || ""}
          onChange={(e) =>
            onQuestionUpdate({
              ...question,
              accounts:
                question?.accounts == null
                  ? {
                      title: e.currentTarget.value,
                      creditDescription: "",
                      debitDescription: "",
                      creditRange: [],
                      debitRange: [],
                    }
                  : { ...question.accounts, title: e.currentTarget.value },
            })
          }
        />

        <Small className="font-extrabold mb-4">
          Accounting credit help description
        </Small>
        <Textarea
          value={question.accounts?.creditDescription || ""}
          onChange={(e) =>
            onQuestionUpdate({
              ...question,
              accounts:
                question?.accounts == null
                  ? {
                      title: "",
                      creditDescription: e.currentTarget.value,
                      debitDescription: "",
                      creditRange: [],
                      debitRange: [],
                    }
                  : {
                      ...question.accounts,
                      creditDescription: e.currentTarget.value,
                    },
            })
          }
          className="mt-2 mb-5 min-h-[100px]"
          cols={40}
        />

        <Small className="font-extrabold mb-4">
          Accounting debit help description
        </Small>
        <Textarea
          value={question.accounts?.debitDescription || ""}
          onChange={(e) =>
            onQuestionUpdate({
              ...question,
              accounts:
                question?.accounts == null
                  ? {
                      title: "",
                      creditDescription: "",
                      debitDescription: e.currentTarget.value,
                      creditRange: [],
                      debitRange: [],
                    }
                  : {
                      ...question.accounts,
                      debitDescription: e.currentTarget.value,
                    },
            })
          }
          className="mt-2 mb-5 min-h-[100px]"
          cols={40}
        />

        <Small className="font-extrabold mb-1">Credit account range</Small>
        <Small className="mb-4 opacity-70">
          (Starting range - Ending Range)
        </Small>
        <InputOTP
          maxLength={8}
          pattern={REGEXP_ONLY_DIGITS}
          value={getCreditRange()}
          onChange={(newValue: string) => handleCreditRangeChange(newValue)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
            <InputOTPSlot index={6} />
            <InputOTPSlot index={7} />
          </InputOTPGroup>
        </InputOTP>

        <Small className="font-extrabold mt-4 mb-1">Debit account range</Small>
        <Small className="mb-4 opacity-70">
          (Starting range - Ending Range)
        </Small>
        <InputOTP
          maxLength={8}
          pattern={REGEXP_ONLY_DIGITS}
          value={getDebitRange()}
          onChange={(newValue: string) => handleDebitRangeChange(newValue)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
            <InputOTPSlot index={6} />
            <InputOTPSlot index={7} />
          </InputOTPGroup>
        </InputOTP>
      </div>
    </div>
  );
}
