import { ChangeEvent, useState } from "react";
import { Medium, Small } from "@/components/ui/Typography";
import { Question } from "../../types";

type Props = {
  question: Question;
  onConstraintsChanged: (newConstraints: Record<string, unknown>) => void;
};

export function ConstraintSelector({ question, onConstraintsChanged }: Props) {
  const constraints = question.constraints || {};
  const [constraintDescription, setConstraintDescription] = useState<string>(
    (constraints["requireStop"] as { description?: string })?.description || "",
  );

  const constraintOptions = [{ value: "requireStop", label: "Require Stop" }];

  const handleAddConstraint = (constraintName: string) => {
    if (!constraints[constraintName]) {
      const updatedConstraints = {
        ...constraints,
        [constraintName]: {
          description: "",
          triggerAnswer: "no", // default
        },
      };
      onConstraintsChanged(updatedConstraints);
    }
  };

  const handleRemoveConstraint = (constraintName: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [constraintName]: _, ...updatedConstraints } = constraints;
    onConstraintsChanged(updatedConstraints);
  };

  const handleRequireStopDescriptionChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const newDescription = e.target.value;
    setConstraintDescription(newDescription);
    onConstraintsChanged({
      ...constraints,
      requireStop: {
        ...constraints["requireStop"] as { triggerAnswer: string; description?: string },
        description: newDescription,
      },
    });
  };

  const handleAnswerChange = (constraintName: string, newAnswer: string) => {
    onConstraintsChanged({
      ...constraints,
      [constraintName]: {
        ...constraints[constraintName] as { triggerAnswer: string; description?: string },
        triggerAnswer: newAnswer,
      },
    });
  };

  return (
    <div>
      <Medium className="font-extrabold">Constraints</Medium>
      <div className="mt-4">
        {constraintOptions.map((option) => (
          <div key={option.value} className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              checked={!!constraints[option.value]}
              onChange={(e) =>
                e.target.checked
                  ? handleAddConstraint(option.value)
                  : handleRemoveConstraint(option.value)
              }
            />
            <label>{option.label}</label>
          </div>
        ))}
      </div>

      {typeof constraints["requireStop"] === "object" &&
        constraints["requireStop"] !== null && (
          <div className="mt-4">
            <Small className="font-extrabold">
              Require Stop - User needs to answer yes as a result of the
              previous question's answer (for example)
            </Small>
            <textarea
              className="w-full mt-2 p-2 border rounded"
              placeholder="Enter description for the 'requireStop' constraint"
              value={constraintDescription}
              onChange={handleRequireStopDescriptionChange}
            />
            <div className="mt-2">
              <label className="font-bold mr-2">Answer:</label>
              <select
                className="p-2 border rounded"
                value={
                  (constraints["requireStop"] as { triggerAnswer: string })
                    .triggerAnswer
                }
                onChange={(e) =>
                  handleAnswerChange("requireStop", e.target.value)
                }
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>
        )}

      {Object.keys(constraints).length === 0 && (
        <Small className="opacity-65 mt-4">No constraints selected</Small>
      )}
    </div>
  );
}
