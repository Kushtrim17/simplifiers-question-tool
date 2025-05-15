import { Input } from "@/components/ui/input.tsx";
import { Small } from "@/components/ui/Typography";
import { Question } from "../../types";

type Props = {
   question: Question;
   onQuestionUpdate: (question: Question) => void;
   handleSave: () => void;
};


export function NumberFieldMeta(props: Props) {
   const { question, onQuestionUpdate, handleSave } = props;

  return (
     <>
        <Small className="font-extrabold">Number field meta data</Small>
        <br/>
        <Small className="font-extrabold">Title</Small>
        <Input
           value={question?.numberFieldMetaData?.title}
           placeholder="Enter number field title"
           onChange={(e) =>
              onQuestionUpdate({
                 ...question,
                 numberFieldMetaData: {
                    ...question.numberFieldMetaData,
                    title: e.currentTarget.value,
                 },
              })
           }
           onBlur={handleSave}
           className="mt-2 mb-5"
        />
        <Small className="font-extrabold">description</Small>
        <Input
           value={question.numberFieldMetaData?.description}
           placeholder="Enter number field description"
           onChange={(e) =>
              onQuestionUpdate({
                 ...question,
                 numberFieldMetaData: {
                    ...question.numberFieldMetaData,
                    description: e.currentTarget.value,
                 },
              })
           }
           onBlur={handleSave}
           className="mt-2 mb-5"
        />
     </>
  );
}
