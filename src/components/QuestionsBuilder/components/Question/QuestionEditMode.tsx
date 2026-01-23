import { Medium } from "@/components/ui/Typography";
import {
  DocumentReference,
  NoteConnection,
  NoteOption,
  Question,
  ValueReference,
} from "../../types";
import { useEffect, useRef, useState } from "react";
import { AddExternalLinkForm } from "./AddExternalLinkForm";
import { Separator } from "@/components/ui/separator";
import { QuestionTypeSelector } from "./QuestionTypeSelector";
import { QuestionDependencySelector } from "./QuestionDependencySelector";
import { QuestionBasicInfo } from "./QuestionBasicInfo";
import { AccountingHelp } from "./AccountingHelp";
import { QuestionScopeSelector } from "./QuestionScopeSelector";
import { NoteSelector } from "./NoteSelector";
import { ValueReferenceSelector } from "./ValueReferenceSelector";
import { ManagementReportValueReferenceSelector } from "./ManagementReportValueReferenceSelector";
import { DocumentReferenceSelector } from "./DocumentReferenceSelector";
import { TaxForm } from "@/components/QuestionsBuilder/components/Question/TaxForm";
import { Grid } from "@/components/ui/grid.tsx";
import { ConstraintSelector } from "@/components/QuestionsBuilder/components/Question/ConstraintSelector";
import { QuestionNoteConnectionTrigger } from "./QuestionNoteConnectionTrigger";
import { InfoBanner } from "./InfoBanner";

type Props = {
  question: Question;
  allQuestions: Question[];
  onQuestionUpdate: (updatedQuestion: Question) => void;
  onAddQuestionDependency: (
    questionId: string,
    dependencyId: string,
    answer: boolean | string
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

  const handleQuestionTypeChange = (newType: Question["type"]) => {
    setCurrentQuestion({ ...currentQuestion, type: newType });
    onQuestionUpdate({
      ...currentQuestion,
      type: newType,
    });
  };

  const handleQuestionScopeChange = (
    newScope: "accounts" | "notes" | "tax" | "managementReport"
  ) => {
    onQuestionUpdate({
      ...currentQuestion,
      scope: newScope,
    });

    if (currentQuestion.scope === "notes" && newScope !== "notes") {
      // we reset the noteOptions since the scope is not notes anymore
      setCurrentQuestion({
        ...currentQuestion,
        scope: newScope,
        noteOptions: [],
      });
    } else {
      setCurrentQuestion({ ...currentQuestion, scope: newScope });
    }
  };

  const handleUpdateNoteOptions = (newNoteOptions: NoteOption[]) => {
    setCurrentQuestion({ ...currentQuestion, noteOptions: newNoteOptions });
    onQuestionUpdate({
      ...currentQuestion,
      noteOptions: newNoteOptions,
    });
  };

  const handleOnUpdateValueReferences = (
    newValueReferences: ValueReference[] | null
  ) => {
    onQuestionUpdate({
      ...currentQuestion,
      valueReferences: newValueReferences ?? [],
    });
    setCurrentQuestion({
      ...currentQuestion,
      valueReferences: newValueReferences ?? [],
    });
  };

  const handleOnDocumentReferencesChanged = (
    updatedDocumentReferences: DocumentReference[]
  ) => {
    onQuestionUpdate({
      ...currentQuestion,
      documentReferences: updatedDocumentReferences,
    });
  };

  const handleOnNoteConnectionChanged = (
    updatedNoteConnection: NoteConnection
  ) => {
    onQuestionUpdate({
      ...currentQuestion,
      noteConnection: updatedNoteConnection,
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
    answer: boolean | string
  ) => {
    removePreviousDependencies();

    if (dependencyId.length < 3) {
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

  const updateRange = (
    allRanges: (number[] | null[])[],
    index: number,
    newRange: number[]
  ) => {
    const ranges = [...allRanges];
    ranges[index] = newRange;
    return ranges;
  };

  const handleCreditRangeChange = (index: number, newValue: string) => {
    const range = getRangeFromValue(newValue);
    const initialAccount = {
      title: "",
      creditDescription: "",
      debitDescription: "",
      description: "",
      helperDescriptions: [],
      creditRange: [range],
      debitRange: [],
    };

    const accounts =
      question.accounts == null
        ? initialAccount
        : {
            ...question.accounts,
            creditRange: updateRange(
              question.accounts.creditRange,
              index,
              range
            ),
          };

    onQuestionUpdate({ ...question, accounts });
  };

  const handleCreditChangeRemove = (index: number) => {
    if (question?.accounts?.creditRange == null) {
      return;
    }

    const accounts = {
      ...question.accounts,
      creditRange: question?.accounts?.creditRange.filter(
        (_, i) => i !== index
      ),
    };

    onQuestionUpdate({ ...question, accounts });
  };

  const handleAddCreditRange = () => {
    let accounts;
    if (question?.accounts == null) {
      accounts = {
        title: "",
        creditDescription: "",
        debitDescription: "",
        helperDescriptions: [],
        creditRange: [[null, null]],
        debitRange: [],
      };
    } else {
      accounts = {
        ...question.accounts,
        creditRange: [...(question.accounts?.creditRange || []), [null, null]],
      };
    }

    onQuestionUpdate({ ...question, accounts });
  };

  const handleDebitRangeChange = (index: number, newValue: string) => {
    const range = getRangeFromValue(newValue);
    const initialAccount = {
      title: "",
      creditDescription: "",
      debitDescription: "",
      description: "",
      helperDescriptions: [],
      creditRange: [],
      debitRange: [range],
    };

    const accounts =
      question.accounts == null
        ? initialAccount
        : {
            ...question.accounts,
            debitRange: updateRange(question.accounts.debitRange, index, range),
          };

    onQuestionUpdate({ ...question, accounts });
  };

  const handleDebitChangeRemove = (index: number) => {
    if (question?.accounts?.debitRange == null) {
      return;
    }

    const accounts = {
      ...question.accounts,
      debitRange: question?.accounts?.debitRange.filter((_, i) => i !== index),
    };

    onQuestionUpdate({ ...question, accounts });
  };

  const handleAddDebitRange = () => {
    let accounts;
    if (question?.accounts == null) {
      accounts = {
        title: "",
        creditDescription: "",
        debitDescription: "",
        helperDescriptions: [],
        creditRange: [],
        debitRange: [[null, null]],
      };
    } else {
      accounts = {
        ...question.accounts,
        debitRange: [...(question.accounts?.debitRange || []), [null, null]],
      };
    }

    onQuestionUpdate({ ...question, accounts });
  };

  const handleConstraintChange = (newConstraints: Record<string, unknown>) => {
    onQuestionUpdate({
      ...currentQuestion,
      constraints: newConstraints,
    });
    setCurrentQuestion({
      ...currentQuestion,
      constraints: newConstraints,
    });
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  console.log({ question });

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

      <Grid columns={2}>
        <QuestionTypeSelector
          question={currentQuestion}
          onQuestionTypeChange={handleQuestionTypeChange}
        />
        <QuestionScopeSelector
          question={currentQuestion}
          onQuestionScopeChange={handleQuestionScopeChange}
        />

        {currentQuestion.scope === "notes" &&
          currentQuestion.type === "boolean" && (
            <>
              <QuestionNoteConnectionTrigger
                question={currentQuestion}
                onNoteConnectionChanged={handleOnNoteConnectionChanged}
              />
            </>
          )}
      </Grid>
      <Separator className="mt-5 mb-5" />

      {currentQuestion.scope === "notes" && (
        <>
          <NoteSelector
            question={currentQuestion}
            onQuestionNoteOptionsChanged={handleUpdateNoteOptions}
          />
        </>
      )}

      <InfoBanner
        question={currentQuestion}
        onQuestionUpdate={(updatedQuestion) => {
          setCurrentQuestion(updatedQuestion);
          onQuestionUpdate(updatedQuestion);
        }}
      />

      <Separator className="mt-5 mb-5" />

      <ConstraintSelector
        question={question}
        onConstraintsChanged={handleConstraintChange}
      />

      {currentQuestion.scope != null &&
        ["notes", "tax"].includes(currentQuestion.scope) && (
          <ValueReferenceSelector
            question={currentQuestion}
            onQuestionValueReferencesChanged={handleOnUpdateValueReferences}
          />
        )}

      {currentQuestion.scope != null &&
        currentQuestion.scope === "managementReport" && (
          <>
            <ManagementReportValueReferenceSelector
              question={currentQuestion}
              onQuestionValueReferencesChanged={handleOnUpdateValueReferences}
            />
            <Separator className="mt-5 mb-5" />
          </>
        )}

      <Separator className="mt-5 mb-5" />

      {currentQuestion.scope != null &&
        currentQuestion.scope === "managementReport" && (
          <>
            <DocumentReferenceSelector
              question={currentQuestion}
              onDocumentReferencesChanged={handleOnDocumentReferencesChanged}
            />
            <Separator className="mt-5 mb-5" />
          </>
        )}

      <AddExternalLinkForm
        question={question}
        onAdd={handleOnAddExternalLink}
        onRemove={handleOnRemoveExternalLink}
      />

      <Separator className="mt-5 mb-5" />

      <QuestionDependencySelector
        question={question}
        allQuestions={allQuestions}
        onDependencyChange={handleOnDependencyChange}
      />

      <Separator className="mt-5 mb-5" />

      {(question.scope === "accounts" || question.scope === "tax") && (
        <>
          <AccountingHelp
            question={question}
            onQuestionUpdate={onQuestionUpdate}
            onCreditRangeChange={handleCreditRangeChange}
            onCreditRangeRemove={handleCreditChangeRemove}
            onCreditRangeAdd={handleAddCreditRange}
            onDebitRangeChange={handleDebitRangeChange}
            onDebitRangeRemove={handleDebitChangeRemove}
            onDebitRangeAdd={handleAddDebitRange}
          />
        </>
      )}

      {question.scope === "tax" && (
        <TaxForm
          question={currentQuestion}
          onQuestionUpdate={setCurrentQuestion}
          handleSave={handleUpdate}
        />
      )}
    </div>
  );
}
