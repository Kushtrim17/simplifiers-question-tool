import { Input } from "@/components/ui/input";
import { Small, Caption } from "@/components/ui/Typography";
import { Grid } from "@/components/ui/grid";
import { ValueReference } from "../../types";

type Props = {
  valueReference: ValueReference;
  onValidationChange: (updatedValidation: ValueReference["validation"]) => void;
};

const parseNumberOrUndefined = (value: string): number | undefined => {
  if (value === "") return undefined;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? undefined : parsed;
};

export const ValidationRules = ({ valueReference, onValidationChange }: Props) => {
  const validation = valueReference.validation;

  const handleValueChange = (type: "min" | "max", value: string) => {
    const numValue = parseNumberOrUndefined(value);
    onValidationChange({
      ...validation,
      [type]: {
        value: numValue as number,
        message: validation?.[type]?.message ?? "",
      },
    } as ValueReference["validation"]);
  };

  const handleMessageChange = (type: "min" | "max", message: string) => {
    onValidationChange({
      ...validation,
      [type]: {
        value: validation?.[type]?.value as number,
        message,
      },
    } as ValueReference["validation"]);
  };

  return (
    <div className="col-span-2 mt-4 border-t pt-4">
      <Caption className="font-extrabold mb-3">Validation Rules</Caption>
      <Grid columns={2}>
        <div>
          <Small className="font-extrabold">Min value</Small>
          <Input
            type="number"
            value={validation?.min?.value ?? ""}
            onChange={(e) => handleValueChange("min", e.currentTarget.value)}
            className="mt-2 mb-2"
          />
        </div>
        <div>
          <Small className="font-extrabold">Min error message</Small>
          <Input
            value={validation?.min?.message ?? ""}
            placeholder="Only positive values are allowed"
            onChange={(e) => handleMessageChange("min", e.currentTarget.value)}
            className="mt-2 mb-2"
          />
        </div>
        <div>
          <Small className="font-extrabold">Max value</Small>
          <Input
            type="number"
            value={validation?.max?.value ?? ""}
            onChange={(e) => handleValueChange("max", e.currentTarget.value)}
            className="mt-2 mb-2"
          />
        </div>
        <div>
          <Small className="font-extrabold">Max error message</Small>
          <Input
            value={validation?.max?.message ?? ""}
            placeholder="Only negative values are allowed"
            onChange={(e) => handleMessageChange("max", e.currentTarget.value)}
            className="mt-2 mb-2"
          />
        </div>
      </Grid>
    </div>
  );
};

