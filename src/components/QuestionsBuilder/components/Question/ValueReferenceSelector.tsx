import { Small } from "@/components/ui/Typography";
import { Question, ValueReference } from "../../types";
import { badgeVariants } from "@/components/ui/badge";
import { IoClose } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  BALANCE_SHEET_REFERENCES,
  INCOME_STATEMENT_REFERENCES,
  TAX_DOCUMENT_REFERENCES,
} from "./constants/valueReferenceConstants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  question: Question;
  onQuestionValueReferenceChanged: (
     newValueReference: ValueReference | null
  ) => void;
};

export function ValueReferenceSelector(props: Props) {
  const { question } = props;

  const handleOnAddNoteOption = (valueReference: ValueReference) => {
    const selectedReference =
       question.valueReference?.cellId === valueReference.cellId;
    if (selectedReference) {
      return props.onQuestionValueReferenceChanged(null);
    }

    return props.onQuestionValueReferenceChanged({
      cellId: valueReference.cellId,
      triggerAnswer: valueReference.triggerAnswer,
    });
  };

  const handleOnValueReferenceTriggerChange = (
     valueReference: ValueReference
  ) => {
    return props.onQuestionValueReferenceChanged(valueReference);
  };

  const handleOnRemoveNoteOption = () => {
    props.onQuestionValueReferenceChanged(null);
  };

  const isChecked = (valueReferenceId: string) => {
    return valueReferenceId === question.valueReference?.cellId;
  };

  const getDefaultValue = () => {
    if (!question.valueReference?.triggerAnswer) {
      return "null";
    }

    return question.valueReference?.triggerAnswer ? "yes" : "no";
  };

  const getAnswerOptions = () => {
    if (question.type === "boolean" || question.type === "numberField") {
      return ["yes", "no"];
    }

    return [];
  };

  const title = question.scope === 'tax' ? 'Which value in Tax document should this question refer to?' : 'Which value in Annual Report this question refers to?';

  return (
     <>
       <Small className="font-extrabold">
         {title}
       </Small>

       <div className="mt-4 flex flex-row flex-wrap gap-x-4 gap-y-2">
         {question.valueReference && question.valueReference.cellId != null ? (
            <div className="flex flex-row mr-4 group">
              <a
                 href={question.valueReference.cellId}
                 target="_blank"
                 className={`${badgeVariants({
                   variant: "outline",
                 })} h-[40px] min-w-[100px] justify-center items-center`}
              >
                {question.valueReference.cellId}
              </a>
              <IoClose
                 size={20}
                 className="mt-2"
                 onClick={() => handleOnRemoveNoteOption()}
              />
            </div>
         ) : (
            <Small className="font-extrabold opacity-65">
              No reference selected
            </Small>
         )}
       </div>
       <br />
       <DropdownMenu>
         <DropdownMenuTrigger asChild>
           <Button variant="outline">Add reference</Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="w-56">
           <DropdownMenuLabel>Available sections</DropdownMenuLabel>
           <DropdownMenuSeparator />
           {question.scope === "tax" ? (
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <span>Agoy tax document</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <span>Values</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="max-h-96 overflow-y-auto">
                        {TAX_DOCUMENT_REFERENCES.values.map((part) => (
                           <DropdownMenuCheckboxItem
                              key={part.id}
                              checked={isChecked(part.id)}
                              onCheckedChange={() =>
                                 isChecked(part.id)
                                    ? handleOnRemoveNoteOption()
                                    : handleOnAddNoteOption({
                                      cellId: part.id,
                                      triggerAnswer:
                                         question.accounts?.triggerAnswer || "",
                                    })
                              }
                           >
                             {part.label}
                           </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
           ) : (
              <>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <span>Balance sheet</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      {Object.keys(BALANCE_SHEET_REFERENCES).map((section) => (
                         <DropdownMenuSub key={section}>
                           <DropdownMenuSubTrigger>
                             <span>{section}</span>
                           </DropdownMenuSubTrigger>
                           <DropdownMenuSubContent className="max-h-96 overflow-y-auto">
                             {BALANCE_SHEET_REFERENCES[section].map((part) => (
                                <DropdownMenuCheckboxItem
                                   key={part.id}
                                   checked={isChecked(part.id)}
                                   onCheckedChange={() =>
                                      isChecked(part.id)
                                         ? handleOnRemoveNoteOption()
                                         : handleOnAddNoteOption({
                                           cellId: part.id,
                                           triggerAnswer:
                                              question.accounts?.triggerAnswer || "",
                                         })
                                   }
                                >
                                  {part.label}
                                </DropdownMenuCheckboxItem>
                             ))}
                           </DropdownMenuSubContent>
                         </DropdownMenuSub>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <span>Income statement</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      {Object.keys(INCOME_STATEMENT_REFERENCES).map((section) => (
                         <DropdownMenuSub key={section}>
                           <DropdownMenuSubTrigger>
                             <span>{section}</span>
                           </DropdownMenuSubTrigger>
                           <DropdownMenuSubContent className="max-h-96 overflow-y-auto">
                             {INCOME_STATEMENT_REFERENCES[section].map((note) => (
                                <DropdownMenuCheckboxItem
                                   key={note.id}
                                   checked={isChecked(note.id)}
                                   onCheckedChange={() =>
                                      isChecked(note.id)
                                         ? handleOnRemoveNoteOption()
                                         : handleOnAddNoteOption({
                                           cellId: note.id,
                                           triggerAnswer:
                                              question.accounts?.triggerAnswer || "",
                                         })
                                   }
                                >
                                  {note.label}
                                </DropdownMenuCheckboxItem>
                             ))}
                           </DropdownMenuSubContent>
                         </DropdownMenuSub>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </>
           )}
         </DropdownMenuContent>
       </DropdownMenu>
       <br />

       {question.valueReference && question.valueReference.cellId != null && (
          <>
            <Small className="font-extrabold mb-2">
              Which question answer should enable this reference?
            </Small>

            <Select
               defaultValue={getDefaultValue()}
               onValueChange={(newValue: string) =>
                  handleOnValueReferenceTriggerChange({
                    cellId: question.valueReference?.cellId || "",
                    triggerAnswer: newValue,
                  })
               }
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
          </>
       )}
     </>
  );
}
