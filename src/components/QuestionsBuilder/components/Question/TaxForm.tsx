import { Input } from "@/components/ui/input.tsx";
import { Small } from "@/components/ui/Typography";
import { Question } from "../../types";
import {Textarea} from "@/components/ui/textarea.tsx";

type Props = {
   question: Question;
   onQuestionUpdate: (question: Question) => void;
   handleSave: () => void;
};


export function TaxForm(props: Props) {
   const { question, onQuestionUpdate, handleSave } = props;

  return (
     <>
        <Small className="font-extrabold">Tax meta data</Small>
        <br/>
        <Small className="font-extrabold">Title</Small>
        <Input
           value={question?.taxForm?.title}
           placeholder="Enter tax field title"
           onChange={(e) =>
              onQuestionUpdate({
                 ...question,
                 taxForm: {
                    ...question.taxForm,
                    title: e.currentTarget.value,
                 },
              })
           }
           onBlur={handleSave}
           className="mt-2 mb-5"
        />

        <Small className="font-extrabold">description</Small>
        <Textarea
           value={question.taxForm?.description}
           placeholder="Enter tax field description"
           onChange={(e) =>
              onQuestionUpdate({
                 ...question,
                 taxForm: {
                    ...question.taxForm,
                    description: e.currentTarget.value,
                 },
              })
           }
           onBlur={handleSave}
           className="mt-2 mb-5 min-h-[300px]"
           cols={130}
        />
     </>
  );
}
