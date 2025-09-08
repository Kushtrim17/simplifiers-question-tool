import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Small } from "@/components/ui/Typography";
import { NoteConnection, Question, TriggerAnswer } from "../../types";
import { Separator } from "@/components/ui/separator";
import {
  TRIGGER_ANSWER,
  TRIGGER_ANSWER_OPTIONS,
} from "./constants/triggerAnswer";

type Props = {
  question: Question;
  onNoteConnectionChanged: (updatedNoteConnection: NoteConnection) => void;
};

export function QuestionNoteConnectionTrigger(props: Props) {
  const { question, onNoteConnectionChanged } = props;
  const getDefaultValue = () => {
    if (!question.noteConnection?.triggerAnswer) {
      return "null";
    }

    return question.noteConnection?.triggerAnswer;
  };

  const getAnswerOptions = () => {
    if (question.type === "boolean") {
      return TRIGGER_ANSWER_OPTIONS;
    }

    return [];
  };

  const handleOnAnswerTriggerChange = (triggerAnswer: string) => {
    onNoteConnectionChanged({
      triggerAnswer:
        triggerAnswer === "null" ? "" : (triggerAnswer as TriggerAnswer),
    });
  };

  return (
    <div>
      <Small className="font-extrabold mb-2">
        Answer that triggers the note connection
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
          {/* Select cannot take an empty string as a value that's why we convert empty string to null
          and back to empty string when we store the value */}
          <SelectItem value="null">No trigger</SelectItem>
          {getAnswerOptions()
            .filter((d) => d !== TRIGGER_ANSWER.NULL)
            .map((d) => (
              <SelectItem key={d.toString()} value={d.toString()}>
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
}
