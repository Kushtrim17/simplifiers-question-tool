import { Small } from "@/components/ui/Typography";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Question } from "../../types";

type Props = {
  question: Question;
  onQuestionScopeChange: (type: Question["scope"]) => void;
};

const scopes = [
  {
    value: "accounts",
    label: "Accounts",
  },
  {
    value: "notes",
    label: "Notes",
  },
  {
    value: "tax",
    label: "Tax",
  },
  {
    value: "managementReport",
    label: "Management Report",
  },
];

export function QuestionScopeSelector(props: Props) {
  const { question, onQuestionScopeChange } = props;

  return (
    <>
      <Small className="font-extrabold">Question Scope</Small>
      <Select
        defaultValue={question.scope}
        onValueChange={onQuestionScopeChange}
        onOpenChange={(isOpen) => !isOpen}
      >
        <SelectTrigger className="mt-5 mb-5">
          <SelectValue placeholder="Select question scope" />
        </SelectTrigger>
        <SelectContent>
          {scopes.map((scope) => (
            <SelectItem key={scope.value} value={scope.value}>
              {scope.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
