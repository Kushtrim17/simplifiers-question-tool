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
  onQuestionTypeChange: (type: Question["type"]) => void;
};

export function QuestionTypeSelector(props: Props) {
  const { question, onQuestionTypeChange } = props;

  return (
    <>
      <Small className="font-extrabold">Question Type</Small>
      <Select
        defaultValue={question.type}
        onValueChange={onQuestionTypeChange}
        onOpenChange={(isOpen) => !isOpen}
      >
        <SelectTrigger className="mt-5 mb-5">
          <SelectValue placeholder="Select question type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="boolean">Yes or No</SelectItem>
          <SelectItem value="freeText">Free text</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
