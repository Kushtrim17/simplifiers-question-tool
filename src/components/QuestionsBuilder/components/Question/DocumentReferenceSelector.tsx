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
import { Small } from "@/components/ui/Typography";

type Props = {
  question: Question;
  onDocumentReferenceChanged: (newDocumentReference: DocumentReference) => void;
};

export const DocumentReferenceSelector = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { question, onDocumentReferenceChanged } = props;

  const [documentReference, setDocumentReference] = useState<DocumentReference>(
    {
      tableId: question.documentReference?.tableId || "",
      type: question.documentReference?.type || "",
      id: question.documentReference?.id || "",
      triggerAnswer: question.documentReference?.triggerAnswer || "",
    }
  );

  const handleSave = (updatedDocumentReference: DocumentReference) => {
    onDocumentReferenceChanged({
      tableId: updatedDocumentReference.tableId,
      type: updatedDocumentReference.type,
      id: updatedDocumentReference.id,
      triggerAnswer: updatedDocumentReference.triggerAnswer,
    });

    setDocumentReference(updatedDocumentReference);
  };

  const handleSaveInput = () => {
    onDocumentReferenceChanged({
      tableId: documentReference.tableId,
      type: documentReference.type,
      id: documentReference.id,
      triggerAnswer: documentReference.triggerAnswer,
    });
  };

  return (
    <>
      <Small className="font-extrabold">Document table id reference</Small>
      {/* Maybe we can have this as a dropdown instead  */}
      <Input
        ref={inputRef}
        value={documentReference.tableId}
        placeholder="Enter the table id"
        onChange={(e) =>
          setDocumentReference({
            ...documentReference,
            tableId: e.currentTarget.value,
          })
        }
        onBlur={handleSaveInput}
        className="mt-2 mb-5"
      />

      <Small className="font-extrabold">Document type reference</Small>
      <Select
        defaultValue={documentReference.type}
        onValueChange={(newValue: string) => {
          handleSave({
            ...documentReference,
            type: newValue as "row" | "column",
          });
        }}
        onOpenChange={(isOpen) => !isOpen}
      >
        <SelectTrigger className="mt-5 mb-5">
          <SelectValue placeholder="Select type reference" />
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

      <Small className="font-extrabold">Document id reference</Small>
      <Input
        ref={inputRef}
        value={documentReference.id}
        placeholder="Enter the id"
        onChange={(e) =>
          setDocumentReference({
            ...documentReference,
            id: e.currentTarget.value,
          })
        }
        onBlur={handleSaveInput}
        className="mt-2 mb-5"
      />

      <Small className="font-extrabold">
        Document trigger answer reference
      </Small>
      <Select
        defaultValue={documentReference.triggerAnswer}
        onValueChange={(newValue: string) => {
          handleSave({
            ...documentReference,
            triggerAnswer: newValue as "yes" | "no",
          });
        }}
        onOpenChange={(isOpen) => !isOpen}
      >
        <SelectTrigger className="mt-5 mb-5">
          <SelectValue placeholder="Select answer trigger" />
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
    </>
  );
};
