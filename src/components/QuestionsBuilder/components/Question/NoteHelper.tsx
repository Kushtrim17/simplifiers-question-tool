import { Small } from "@/components/ui/Typography";
import { Question } from "../../types";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  question: Question;
  onQuestionUpdate: (question: Question) => void;
};

export const NoteHelper = (props: Props) => {
  const { question, onQuestionUpdate } = props;

  const handleUpdateNoteHelper = (newValue: string) => {
    onQuestionUpdate({
      ...question,
      noteHelper: newValue,
    });
  };

  return (
    <div className="mb-5">
      <Small className="font-extrabold mb-2 block">Note Helper:</Small>
      <Textarea
        placeholder="Helper text rendered as an info alert in the app"
        value={question.noteHelper || ""}
        onChange={(e) => handleUpdateNoteHelper(e.target.value)}
        className="min-h-[100px] mt-2"
      />
    </div>
  );
};
