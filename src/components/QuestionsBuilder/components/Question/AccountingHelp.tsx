import React from "react";
import { Medium, Small } from "@/components/ui/Typography";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
// import { Textarea } from "@/components/ui/textarea";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { AccountsHelper, Question } from "../../types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { IoTrashBinOutline } from "react-icons/io5";
import { Separator } from "@/components/ui/separator";
import { RichTextEditor } from "./components/RichTextEditor";
// import { RichTextEditor } from "./components/RichTextEditor";

type RangeInputProps = {
  range: string | undefined;
  onRangeChange: (newValue: string) => void;
};
const RangeInput = (props: RangeInputProps) => {
  const { range, onRangeChange } = props;

  return (
    <InputOTP
      maxLength={8}
      pattern={REGEXP_ONLY_DIGITS}
      value={range}
      onChange={onRangeChange}
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
  );
};

type Props = {
  question: Question;
  onQuestionUpdate: (question: Question) => void;
  onCreditRangeChange: (index: number, newValue: string) => void;
  onCreditRangeRemove: (index: number) => void;
  onCreditRangeAdd: () => void;
  onDebitRangeChange: (index: number, newValue: string) => void;
  onDebitRangeRemove: (index: number) => void;
  onDebitRangeAdd: () => void;
};

export function AccountingHelp(props: Props) {
  const {
    question,
    onQuestionUpdate,
    onCreditRangeChange,
    onCreditRangeRemove,
    onCreditRangeAdd,
    onDebitRangeChange,
    onDebitRangeAdd,
    onDebitRangeRemove,
  } = props;

  const getCreditRanges = () => {
    const { accounts } = question || {};

    if (
      !accounts ||
      !accounts.creditRange ||
      accounts.creditRange.length === 0
    ) {
      return [];
    }

    const ranges = accounts.creditRange;

    if (
      ranges.length === 2 &&
      !Array.isArray(ranges[0]) &&
      !Array.isArray(ranges[1])
    ) {
      onQuestionUpdate({
        ...question,
        accounts: {
          ...accounts,
          creditRange: [[ranges[0], ranges[1]]],
        },
      });

      return [ranges];
    }

    return ranges;
  };

  const getDebitRanges = () => {
    const { accounts } = question || {};

    if (!accounts || !accounts.debitRange || accounts.debitRange.length === 0) {
      return [];
    }

    const ranges = accounts.debitRange;

    if (
      ranges.length === 2 &&
      !Array.isArray(ranges[0]) &&
      !Array.isArray(ranges[1])
    ) {
      onQuestionUpdate({
        ...question,
        accounts: {
          ...accounts,
          debitRange: [[ranges[0], ranges[1]]],
        },
      });

      return [ranges];
    }

    return ranges;
  };

  const handleUpdateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const accounts =
      question?.accounts == null
        ? {
            title: e.currentTarget.value,
            creditDescription: "",
            debitDescription: "",
            helperDescriptions: [],
            creditRange: [],
            debitRange: [],
          }
        : { ...question.accounts, title: e.currentTarget.value };

    onQuestionUpdate({ ...question, accounts });
  };

  const getAnswerOptions = () => {
    if (question.type === "boolean") {
      return ["yes", "no"];
    }

    return [];
  };

  const getDefaultValue = () => {
    if (!question.accounts?.triggerAnswer) {
      return "null";
    }

    return question.accounts?.triggerAnswer;
  };

  const handleOnAnswerTriggerChange = (answer: string) => {
    const getAnswer = () => {
      if (answer === "null") {
        return null;
      }

      return answer.toLowerCase();
    };

    const accounts =
      question?.accounts == null
        ? {
            title: "",
            creditDescription: "",
            debitDescription: "",
            helperDescriptions: [],
            creditRange: [],
            debitRange: [],
            triggerAnswer: getAnswer(),
          }
        : {
            ...question.accounts,
            triggerAnswer: getAnswer(),
          };

    onQuestionUpdate({ ...question, accounts });
  };

  const handleAddHelperDescription = () => {
    const newHelperDescription = {
      description: "",
      debitNote: "",
      creditNote: "",
    };

    const accounts =
      question?.accounts == null
        ? {
            title: "",
            creditDescription: "",
            debitDescription: "",
            helperDescriptions: [newHelperDescription],
            creditRange: [],
            debitRange: [],
          }
        : question.accounts;

    if (accounts.helperDescriptions == null) {
      accounts.helperDescriptions = [newHelperDescription];
    } else {
      accounts.helperDescriptions.push(newHelperDescription);
    }

    onQuestionUpdate({ ...question, accounts });
  };

  const handleUpdateHelperDescription = (
    index: number,
    key: keyof AccountsHelper,
    newValue: string
  ) => {
    if (question.accounts?.helperDescriptions == null) {
      return;
    }

    const descriptionHelper = question.accounts?.helperDescriptions[index];

    if (descriptionHelper == null) {
      return;
    }

    descriptionHelper[key] = newValue;

    const descriptionsUpdated = question.accounts.helperDescriptions.map(
      (description, i) => {
        if (i === index) {
          return descriptionHelper;
        }

        return description;
      }
    );

    onQuestionUpdate({
      ...question,
      accounts: {
        ...question.accounts,
        helperDescriptions: descriptionsUpdated,
      },
    });
  };

  const handleDeleteDescription = (index: number) => {
    if (question.accounts?.helperDescriptions == null) {
      return;
    }

    const descriptionsUpdated = question.accounts.helperDescriptions.filter(
      (_, i) => i !== index
    );

    onQuestionUpdate({
      ...question,
      accounts: {
        ...question.accounts,
        helperDescriptions: descriptionsUpdated,
      },
    });
  };

  return (
    <>
      <Medium className="font-extrabold mb-4">Accounting help</Medium>

      <Small className="font-extrabold mb-2">
        Answer that triggers the voucher
      </Small>

      <Select
        defaultValue={getDefaultValue()}
        onValueChange={handleOnAnswerTriggerChange}
        onOpenChange={(isOpen) => !isOpen}
      >
        <SelectTrigger className="mt-5 mb-5">
          <SelectValue placeholder="Select answer trigger" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="null">No trigger</SelectItem>
          {getAnswerOptions().map((d) => (
            <SelectItem key={d.toString()} value={d.toString()}>
              {d.charAt(0).toUpperCase() + d.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Small className="font-extrabold mb-2">Accounting help title</Small>
      <Input
        type="text"
        placeholder="Title"
        className="mb-10"
        width={300}
        value={question.accounts?.title || ""}
        onChange={handleUpdateTitle}
      />

      <Medium className="font-extrabold mb-4">
        Accounting helper descriptions
      </Medium>
      {question.accounts?.helperDescriptions?.map((helper, index) => (
        <React.Fragment key={index}>
          <Input
            key={`${index}-subTitle`}
            type="text"
            placeholder={`Subtitle ${index + 1}`}
            className="mb-4"
            width={300}
            value={helper.description || ""}
            onChange={(e) =>
              handleUpdateHelperDescription(
                index,
                "description",
                e.target.value
              )
            }
          />
          <RichTextEditor
            key={`${index}-credit`}
            title="Credit helper text"
            value={helper.creditNote || ""}
            onChange={(value) =>
              handleUpdateHelperDescription(index, "creditNote", value)
            }
          />
          <RichTextEditor
            key={`${index}-debit`}
            title="Debit helper text"
            value={helper.debitNote || ""}
            onChange={(value) =>
              handleUpdateHelperDescription(index, "debitNote", value)
            }
          />

          <div className="flex justify-center" key={`${index}-delete`}>
            <Button
              // key={`${index}-delete`}
              variant="destructive"
              className="mt-2 mb-4 max-w-[200px]"
              onClick={() => handleDeleteDescription(index)}
            >
              Delete
            </Button>
          </div>
          {question.accounts?.helperDescriptions &&
            question.accounts?.helperDescriptions?.length - 1 !== index && (
              <Separator className="mb-2" />
            )}
        </React.Fragment>
      ))}

      <Button
        variant="secondary"
        className="mt-2 mb-4"
        onClick={handleAddHelperDescription}
      >
        Add new helper description
      </Button>

      <Small className="font-extrabold mt-4 mb-1">Debit account range</Small>
      <Small className="mb-4 opacity-70">(Starting range - Ending Range)</Small>
      {getDebitRanges().map((range, index) => (
        <div key={index} className="mb-2 flex">
          <RangeInput
            range={range?.join("")}
            onRangeChange={(newValue: string) =>
              onDebitRangeChange(index, newValue)
            }
          />
          <IoTrashBinOutline
            className="mt-2 ml-2"
            size={24}
            onClick={() => onDebitRangeRemove(index)}
          />
        </div>
      ))}
      <Button
        variant="secondary"
        className="mt-2 w-[120px]"
        onClick={onDebitRangeAdd}
      >
        Add new range
      </Button>

      <Small className="font-extrabold mt-4 mb-1">Credit account range</Small>
      <Small className="mb-4 opacity-70">(Starting range - Ending Range)</Small>
      {getCreditRanges().map((range, index) => (
        <div key={index} className="mb-2 flex">
          <RangeInput
            range={range?.join("")}
            onRangeChange={(newValue: string) =>
              onCreditRangeChange(index, newValue)
            }
          />
          <IoTrashBinOutline
            className="mt-2 ml-2"
            size={24}
            onClick={() => onCreditRangeRemove(index)}
          />
        </div>
      ))}
      <Button
        variant="secondary"
        className="mt-2 w-[120px]"
        onClick={onCreditRangeAdd}
      >
        Add new range
      </Button>
    </>
  );
}
