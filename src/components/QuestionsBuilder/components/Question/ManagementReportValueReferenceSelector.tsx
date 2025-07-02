import { useRef, useState } from "react";
import { Question, ValueReference } from '../../types';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Grid } from "@/components/ui/grid.tsx";
import { Small, Medium } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button.tsx";
import { IoTrashBinOutline } from "react-icons/io5";

type Props = {
  question: Question;
  onQuestionValueReferencesChanged: (newValueReferences: ValueReference[]) => void;
};

const emptyValueReference: ValueReference = {
  cellId: "",
  triggerAnswer: ""
}

export const ManagementReportValueReferenceSelector = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { question, onQuestionValueReferencesChanged } = props;

  const [valueReferences, setValueReferences] = useState<ValueReference[]>(question.valueReferences || []);

  const getNewReferences = (i: number, updatedValueReference: ValueReference) => valueReferences.map((valueReference, index) => (i === index ? updatedValueReference : valueReference))

  const updateValueReference = (i: number, updatedValueReference: ValueReference) => {
    setValueReferences(getNewReferences(i, updatedValueReference));
  }

  const handleSave = (i: number, updatedValueReference: ValueReference) => {
    const newRefs = getNewReferences(i, updatedValueReference)
    onQuestionValueReferencesChanged(newRefs);

    updateValueReference(i, updatedValueReference);
  };

  const handleAdd = () => {
    const updated = [...valueReferences, emptyValueReference] as ValueReference[];
    onQuestionValueReferencesChanged(updated);
    setValueReferences(updated);
  }

  const handleDelete = (i: number) => {
    const updated = valueReferences.filter((_, index) => index !== i);
    onQuestionValueReferencesChanged(updated);
    setValueReferences(updated);
  }

  const handleSaveInput = () => {
    onQuestionValueReferencesChanged(valueReferences);
  };

  return (
    <>
      <Medium className="pb-4">Which value in Management Report this question refers to?</Medium>
      {valueReferences.map((valueReference, i) => (
        <div className="border border-gray-200 rounded-lg p-4 mb-4">
          <div className="flex align-center justify-between mb-2">
            <Medium>Value Reference {i + 1}</Medium>
            <IoTrashBinOutline size={24} onClick={() => handleDelete(i)} className="cursor-pointer" />
          </div>

          <Grid columns={2} key={i}>
            <div>
              <Small className="font-extrabold">Cell id</Small>
              {/* Maybe we can have this as a dropdown instead  */}
              <Input
                ref={inputRef}
                value={valueReference.cellId}
                placeholder="Enter the table id"
                onChange={(e) =>
                  updateValueReference(i, {
                    ...valueReference,
                    cellId: e.currentTarget.value,
                  })
                }
                onBlur={handleSaveInput}
                className="mt-2 mb-5"
              />
            </div>

            <div>
              <Small className="font-extrabold">
                Trigger answer
              </Small>
              <Select
                defaultValue={valueReference.triggerAnswer}
                onValueChange={(newValue: string) => {
                  handleSave(i, {
                    ...valueReference,
                    triggerAnswer: newValue as "yes" | "no",
                  });
                }}
                onOpenChange={(isOpen) => !isOpen}
              >
                <SelectTrigger className="mt-5 mb-5">
                  <SelectValue placeholder="Select answer trigger"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="null">No trigger</SelectItem>
                  {["yes", "no"].map((d) => (
                    <SelectItem key={d.toString()} value={d.toString()}>
                      {d.charAt(0).toUpperCase() + d.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
          </Grid>
        </div>
      ))}

      <Button variant="secondary" onClick={handleAdd}>Add value reference</Button>
    </>
  );
};
