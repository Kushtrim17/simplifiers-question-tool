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

type Props = {
  question: Question;
  onQuestionUpdate: (question: Question) => void;
  onCreditRangeChange: (newValue: string) => void;
  onDebitRangeChange: (newValue: string) => void;
};

export function AccountingHelp(props: Props) {
  const {
    question,
    onQuestionUpdate,
    onCreditRangeChange,
    onDebitRangeChange,
  } = props;

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
        Accounting credit help description
      </Small>
      <Textarea
        value={question.accounts?.creditDescription || ""}
        placeholder="Add the credit accounts help text here..."
        onChange={handleUpdateCreditDescription}
        className="mt-2 mb-5 min-h-[100px]"
        cols={40}
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

      <Small className="font-extrabold mb-1">Credit account range</Small>
      <Small className="mb-4 opacity-70">(Starting range - Ending Range)</Small>
      <InputOTP
        maxLength={8}
        pattern={REGEXP_ONLY_DIGITS}
        value={getCreditRange()}
        onChange={(newValue: string) => onCreditRangeChange(newValue)}
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
      <Small className="mb-4 opacity-70">(Starting range - Ending Range)</Small>
      <InputOTP
        maxLength={8}
        pattern={REGEXP_ONLY_DIGITS}
        value={getDebitRange()}
        onChange={(newValue: string) => onDebitRangeChange(newValue)}
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
    </>
  );
}
