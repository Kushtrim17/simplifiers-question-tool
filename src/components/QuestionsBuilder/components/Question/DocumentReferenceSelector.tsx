import { useRef, useState } from "react";
import { DocumentReference, Question } from "../../types";
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
  onDocumentReferencesChanged: (newDocumentReferences: DocumentReference[]) => void;
};

const emptyDocumentReference: DocumentReference = {
  tableId: "",
  type: "",
  id: "",
  triggerAnswer: ""
}

export const DocumentReferenceSelector = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { question, onDocumentReferencesChanged } = props;

  const [documentReferences, setDocumentReferences] = useState<DocumentReference[]>(question.documentReferences || []);

  const getNewReferences = (i: number, updatedDocumentReference: DocumentReference) => documentReferences.map((documentReference, index) => (i === index ? updatedDocumentReference : documentReference))

  const updateDocumentReference = (i: number, updatedDocumentReference: DocumentReference) => {
    setDocumentReferences(getNewReferences(i, updatedDocumentReference));
  }

  const handleSave = (i: number, updatedDocumentReference: DocumentReference) => {
    const newRefs = getNewReferences(i, updatedDocumentReference)
    onDocumentReferencesChanged(newRefs);

    updateDocumentReference(i, updatedDocumentReference);
  };

  const handleAdd = () => {
    const updated = [...documentReferences, emptyDocumentReference] as DocumentReference[];
    onDocumentReferencesChanged(updated);
    setDocumentReferences(updated);
  }

  const handleDelete = (i: number) => {
    const updated = documentReferences.filter((_, index) => index !== i);
    onDocumentReferencesChanged(updated);
    setDocumentReferences(updated);
  }

  const handleSaveInput = () => {
    onDocumentReferencesChanged(documentReferences);
  };

  return (
    <>
      <Medium className="pb-4">Which part of the Management Report Document this question refers to?</Medium>
      {documentReferences.map((documentReference, i) => (
        <div className="border border-gray-200 rounded-lg p-4 mb-4">
          <div className="flex align-center justify-between mb-2">
            <Medium>Document Reference {i + 1}</Medium>
            <IoTrashBinOutline size={24} onClick={() => handleDelete(i)} className="cursor-pointer" />
          </div>

          <Grid columns={2} key={i}>
            <div>
              <Small className="font-extrabold">Table id</Small>
              {/* Maybe we can have this as a dropdown instead  */}
              <Input
                ref={inputRef}
                value={documentReference.tableId}
                placeholder="Enter the table id"
                onChange={(e) =>
                  updateDocumentReference(i, {
                    ...documentReference,
                    tableId: e.currentTarget.value,
                  })
                }
                onBlur={handleSaveInput}
                className="mt-2 mb-5"
              />
            </div>

            <div>
              <Small className="font-extrabold">Id </Small>
              <Input
                ref={inputRef}
                value={documentReference.id}
                placeholder="Enter the id"
                onChange={(e) =>
                  updateDocumentReference(i, {
                    ...documentReference,
                    id: e.currentTarget.value,
                  })
                }
                onBlur={handleSaveInput}
                className="mt-2 mb-5"
              />
            </div>

            <div>
              <Small className="font-extrabold">Type</Small>
              <Select
                defaultValue={documentReference.type}
                onValueChange={(newValue: string) => {
                  handleSave(i, {
                    ...documentReference,
                    type: newValue as "row" | "column",
                  });
                }}
                onOpenChange={(isOpen) => !isOpen}
              >
                <SelectTrigger className="mt-5 mb-5">
                  <SelectValue placeholder="Select type reference"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="null">No type reference</SelectItem>
                  {["row", "column"].map((d) => (
                    <SelectItem key={d.toString()} value={d.toString()}>
                      {d.charAt(0).toUpperCase() + d.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Small className="font-extrabold">
                Trigger answer
              </Small>
              <Select
                defaultValue={documentReference.triggerAnswer}
                onValueChange={(newValue: string) => {
                  handleSave(i, {
                    ...documentReference,
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

      <Button variant="secondary" onClick={handleAdd}>Add document reference</Button>
    </>
  );
};
