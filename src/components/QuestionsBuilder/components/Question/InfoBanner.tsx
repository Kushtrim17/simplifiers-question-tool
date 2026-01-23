import { Medium, Small } from "@/components/ui/Typography";
import { Question } from "../../types";
import { Input } from "@/components/ui/input";
import { RichTextEditor } from "./components/RichTextEditor";

type Props = {
  question: Question;
  onQuestionUpdate: (question: Question) => void;
};

export const InfoBanner = ({ question, onQuestionUpdate }: Props) => {
  const info = question.info ?? {};

  const updateInfo = (patch: Partial<NonNullable<Question["info"]>>) => {
    onQuestionUpdate({
      ...question,
      info: { ...info, ...patch },
    });
  };

  return (
    <div className="mb-5">
      <Medium className="font-extrabold mb-2 block">Banner information</Medium>
      <small className="mb-2 block">This is the blue banner that appears in the simplifiers app.</small>
      <Small className="font-extrabold mb-2 block">Enter banner title</Small>
      <Input
        placeholder="Banner title"
        value={info.title ?? ""}
        onChange={(e) => updateInfo({ title: e.target.value || undefined })}
        className="mt-2 mb-5"
      />

      <Medium className="font-extrabold mb-2 block">Banner body</Medium>
      <small>Rich text supported, including lists.</small>
      <div className="mb-5 mt-2">
        <RichTextEditor
          title="Description"
          value={info.body ?? ""}
          onChange={(value) => updateInfo({ body: value || undefined })}
        />
      </div>

      <Small className="font-extrabold mb-2 block">Enter banner footnote</Small>
      <Input
        placeholder="Information footnote"
        value={info.footnote ?? ""}
        onChange={(e) => updateInfo({ footnote: e.target.value || undefined })}
        className="mt-2 mb-5"
      />
    </div>
  );
};
