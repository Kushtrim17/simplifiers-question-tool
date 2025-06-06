import { useState } from 'react';
import { Small } from "@/components/ui/Typography";
import { Question, ValueReference } from "../../types";
import { badgeVariants } from "@/components/ui/badge";
import { IoClose } from "react-icons/io5";
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
import * as Popover from '@radix-ui/react-popover';
import { Checkbox } from '@/components/ui/checkbox';

type Props = {
  question: Question;
  onQuestionValueReferencesChanged: (
    newValueReferences: ValueReference[] | null
  ) => void;
};

// Helper to map a constant ValueReference (id, label) to the main ValueReference (cellId, triggerAnswer)
const toMainValueReference = (ref: { id: string; label: string }, triggerAnswer: string): ValueReference => {
  return { cellId: ref.id, triggerAnswer };
}

export function ValueReferenceSelector(props: Props) {
  const { question } = props;
  const valueReferences = question.valueReferences || [];

  const [openSection, setOpenSection] = useState<string | null>(null);

  const handleOnAddNoteOption = (ref: { id: string; label: string }) => {
    const exists = valueReferences.some((r) => r.cellId === ref.id);
    if (!exists) {
      props.onQuestionValueReferencesChanged([
        ...valueReferences,
        toMainValueReference(ref, question.accounts?.triggerAnswer ?? ""),
      ]);
    }
  };

  const handleOnValueReferenceTriggerChange = (
    cellId: string,
    triggerAnswer: string
  ) => {
    props.onQuestionValueReferencesChanged(
      valueReferences.map((ref) =>
        ref.cellId === cellId ? { ...ref, triggerAnswer } : ref
      )
    );
  };

  const handleOnRemoveNoteOption = (cellId: string) => {
    props.onQuestionValueReferencesChanged(
      valueReferences.filter((ref) => ref.cellId !== cellId)
    );
  };

  const isChecked = (id: string) => {
    return valueReferences.some((ref) => ref.cellId === id);
  };

  const getDefaultValue = (cellId: string) => {
    const ref = valueReferences.find((r) => r.cellId === cellId);
    if (!ref || !ref.triggerAnswer) {
      return "null";
    }
    return ref.triggerAnswer ? ref.triggerAnswer : "null";
  };

  const getAnswerOptions = () => {
    if (["boolean", "numberField"].includes(question.type)) {
      return ["yes", "no"];
    }
    return [];
  };

  const title =
    question.scope === "tax"
      ? "Which value in Tax document should this question refer to?"
      : "Which value in Annual Report this question refers to?";

  // Helper to render a group of checkboxes with a section selector
  const renderReferenceGroupWithSection = (
    group: { [key: string]: { id: string; label: string }[] },
    groupLabel: string
  ) => {
    const sections = Object.keys(group);
    return (
      <div>
        <div className="font-semibold mb-2">{groupLabel}</div>
        <div className="flex flex-col gap-1">
          {openSection == null ? (
            sections.map((section) => (
              <button
                key={section}
                className="text-left px-2 py-1 rounded hover:bg-gray-100 font-medium"
                onClick={() => setOpenSection(section)}
                type="button"
              >
                {section}
              </button>
            ))
          ) : (
            <>
              <button
                className="text-xs text-blue-600 mb-2 underline"
                onClick={() => setOpenSection(null)}
                type="button"
              >
                ← Back to sections
              </button>
              <div className="flex flex-col gap-1">
                {group[openSection].map((part) => (
                  <label key={part.id} className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={isChecked(part.id)}
                      onCheckedChange={() =>
                        isChecked(part.id)
                          ? handleOnRemoveNoteOption(part.id)
                          : handleOnAddNoteOption(part)
                      }
                    />
                    <span>{part.label}</span>
                  </label>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const renderTaxDocumentReferencesWithSection = () => {
    const section = 'Agoy tax document';
    return (
      <div>
        <div className="font-semibold mb-2">Tax document</div>
        <div className="flex flex-col gap-1">
          {openSection == null ? (
            <button
              className="text-left px-2 py-1 rounded hover:bg-gray-100 font-medium"
              onClick={() => setOpenSection(section)}
              type="button"
            >
              {section}
            </button>
          ) : (
            <>
              <button
                className="text-xs text-blue-600 mb-2 underline text-left font-medium"
                onClick={() => setOpenSection(null)}
                type="button"
              >
                ← Back to sections
              </button>
              <div className="flex flex-col gap-1">
                {TAX_DOCUMENT_REFERENCES.values.map((part) => (
                  <label key={part.id} className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={isChecked(part.id)}
                      onCheckedChange={() =>
                        isChecked(part.id)
                          ? handleOnRemoveNoteOption(part.id)
                          : handleOnAddNoteOption(part)
                      }
                    />
                    <span>{part.label}</span>
                  </label>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <Small className="font-extrabold">{title}</Small>
      <div className="mt-4 flex flex-row flex-wrap gap-x-4 gap-y-2">
        {valueReferences.length > 0 ? (
          valueReferences.map((ref) => (
            <div className="flex flex-row mr-4 group" key={ref.cellId}>
              <a
                href={ref.cellId}
                target="_blank"
                className={`${badgeVariants({ variant: "outline" })} h-[40px] min-w-[100px] justify-center items-center`}
              >
                {ref.cellId}
              </a>
              <IoClose
                size={20}
                className="mt-2 cursor-pointer"
                onClick={() => handleOnRemoveNoteOption(ref.cellId)}
              />
            </div>
          ))
        ) : (
          <Small className="font-extrabold opacity-65">No reference selected</Small>
        )}
      </div>
      <br />
      <Popover.Root>
        <Popover.Trigger asChild>
          <Button variant="outline">Add reference</Button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className="bg-white border rounded shadow-lg p-4 w-80 max-h-96 overflow-y-auto z-50">
            <div className="font-bold mb-2">Available references</div>
            {question.scope === "tax"
              ? renderTaxDocumentReferencesWithSection()
              : (
                <>
                  {renderReferenceGroupWithSection(BALANCE_SHEET_REFERENCES, 'Balance sheet')}
                  {renderReferenceGroupWithSection(INCOME_STATEMENT_REFERENCES, 'Income statement')}
                </>
              )}
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
      <br />
      {valueReferences.length > 0 && (
        <>
          <Small className="font-extrabold mb-2">
            Which question answer should enable each reference?
          </Small>
          {valueReferences.map((ref) => (
            <div key={ref.cellId} className="mb-2">
              <span className="mr-2 font-semibold">{ref.cellId}</span>
              <Select
                defaultValue={getDefaultValue(ref.cellId)}
                onValueChange={(newValue: string) =>
                  handleOnValueReferenceTriggerChange(ref.cellId, newValue)
                }
                onOpenChange={(isOpen) => !isOpen}
              >
                <SelectTrigger className="mt-2 mb-2">
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
            </div>
          ))}
        </>
      )}
    </>
  );
}
