import { Medium, Small } from "@/components/ui/Typography";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Textarea } from "@/components/ui/textarea";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Question } from "../../types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { IoTrashBinOutline } from "react-icons/io5";

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
    if (question.accounts?.creditRange?.length === 0) {
      return [];
    }

    const ranges = question.accounts?.creditRange || [];
    if (ranges.length === 2 && !Array.isArray(ranges[0])) {
      onQuestionUpdate({
        ...question,
        accounts: {
          ...question.accounts,
          creditRange: [ranges],
        },
      });

      return [ranges];
    }

    return ranges;
  };

  const getDebitRanges = () => {
    if (question.accounts?.debitRange?.length === 0) {
      return [];
    }

    const ranges = question.accounts?.debitRange || [];
    if (ranges.length === 2 && !Array.isArray(ranges[0])) {
      onQuestionUpdate({
        ...question,
        accounts: {
          ...question.accounts,
          debitRange: [ranges],
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
            creditRange: [],
            debitRange: [],
          }
        : { ...question.accounts, title: e.currentTarget.value };

    onQuestionUpdate({ ...question, accounts });
  };

  const handleUpdateCreditDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const accounts =
      question?.accounts == null
        ? {
            title: "",
            creditDescription: e.currentTarget.value,
            debitDescription: "",
            creditRange: [],
            debitRange: [],
          }
        : { ...question.accounts, creditDescription: e.currentTarget.value };

    onQuestionUpdate({ ...question, accounts });
  };

  const handleUpdateDebitDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const accounts =
      question?.accounts == null
        ? {
            title: "",
            creditDescription: "",
            debitDescription: e.currentTarget.value,
            creditRange: [],
            debitRange: [],
          }
        : { ...question.accounts, debitDescription: e.currentTarget.value };

    onQuestionUpdate({ ...question, accounts });
  };

  const getAnswerOptions = () => {
    if (question.type === "boolean") {
      return ["True", "False"];
    }

    return [];
  };

  const handleOnAnswerTriggerChange = (answer: string) => {
    const accounts =
      question?.accounts == null
        ? {
            title: "",
            creditDescription: "",
            debitDescription: "",
            creditRange: [],
            debitRange: [],
            triggerAnswer: answer,
          }
        : { ...question.accounts, triggerAnswer: answer };

    onQuestionUpdate({ ...question, accounts });
  };

  return (
    <>
      <Medium className="font-extrabold mb-4">Accounting help</Medium>

      <Small className="font-extrabold mb-2">
        Answer that triggers the voucher
      </Small>

      <Select
        defaultValue={question?.accounts?.triggerAnswer?.toString() || ""}
        onValueChange={handleOnAnswerTriggerChange}
        onOpenChange={(isOpen) => !isOpen}
      >
        <SelectTrigger className="mt-5 mb-5">
          <SelectValue placeholder="Select answer trigger" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="no">No dependency</SelectItem>
          {getAnswerOptions().map((d) => (
            <SelectItem key={d.toString()} value={d.toString()}>
              {d.toString()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Small className="font-extrabold mb-2">Accounting help title</Small>
      <Input
        type="text"
        placeholder="Title"
        className="mb-4"
        width={300}
        value={question.accounts?.title || ""}
        onChange={handleUpdateTitle}
      />

      <Small className="font-extrabold mb-4">
        Accounting debit help description
      </Small>
      <Textarea
        value={question.accounts?.debitDescription || ""}
        placeholder="Add the debit accounts help text here..."
        onChange={handleUpdateDebitDescription}
        className="mt-2 mb-5 min-h-[100px]"
        cols={40}
      />

      <Small className="font-extrabold mb-4">
        Accounting credit help description
      </Small>
      <Textarea
        value={question.accounts?.creditDescription || ""}
        placeholder="Add the credit accounts help text here..."
        onChange={handleUpdateCreditDescription}
        className="mt-2 mb-5 min-h-[100px]"
        cols={40}
      />

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
