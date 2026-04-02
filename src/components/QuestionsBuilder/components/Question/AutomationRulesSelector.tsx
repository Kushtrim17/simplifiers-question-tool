import { Medium, Small } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IoTrashBinOutline } from "react-icons/io5";
import { Separator } from "@/components/ui/separator";
import {
  Question,
  RuleType,
  MatchMode,
  TriggerAnswer,
} from "../../types";
import { RangeInput } from "./components/RangeInput";
import { Grid } from "@/components/ui/grid.tsx";

type ConditionType = "positive" | "zero" | "negative";

type Props = {
  question: Question;
  onAddRule: () => void;
  onDeleteRule: () => void;
  onRuleTypeChange: (ruleType: RuleType) => void;
  onAccountRangeChange: (index: number, newValue: string) => void;
  onAccountRangeRemove: (index: number) => void;
  onAccountRangeAdd: () => void;
  onConditionToggle: (conditionType: ConditionType, enabled: boolean) => void;
  onConditionChange: (
    conditionType: ConditionType,
    field: "answer" | "accountMatchMode",
    value: TriggerAnswer | MatchMode
  ) => void;
};

const RULE_TYPE_OPTIONS: { value: string; label: string }[] = [
  { value: "-", label: "-" },
  { value: "ib", label: "IB (Ingoing balance)" },
  { value: "ub", label: "UB (Outgoing balance)" },
  { value: "ibub", label: "IB/UB (Both)" },
  { value: "vouchers", label: "Vouchers" },
];

const MATCH_MODE_OPTIONS: { value: string; label: string }[] = [
  { value: "-", label: "-" },
  { value: "any", label: "Any" },
  { value: "all", label: "All" },
];

const ANSWER_OPTIONS: { value: string; label: string }[] = [
  { value: "-", label: "-" },
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

const CONDITION_TYPES: ConditionType[] = ["positive", "zero", "negative"];

export function AutomationRulesSelector({
  question,
  onAddRule,
  onDeleteRule,
  onRuleTypeChange,
  onAccountRangeChange,
  onAccountRangeRemove,
  onAccountRangeAdd,
  onConditionToggle,
  onConditionChange,
}: Props) {
  const rule = question.automationRule;

  const getAccountRanges = () => {
    if (!rule || !rule.accountRanges || rule.accountRanges.length === 0) {
      return [];
    }
    return rule.accountRanges;
  };

  return (
    <div>
      <Medium className="font-extrabold">Automation Rule</Medium>

      {!rule && (
        <>
          <Small className="text-gray-500 mt-2 block">No automation rule defined</Small>
          <div className="mt-4">
            <Button variant="outline" onClick={onAddRule}>
              + Add Rule
            </Button>
          </div>
        </>
      )}

      {rule && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-50">
          <div className="flex align-center justify-end mb-2">
            <IoTrashBinOutline
              className="mt-2 ml-2 cursor-pointer"
              size={24}
              onClick={onDeleteRule}
            />
          </div>

          <div className="mb-4">
            <Small className="font-semibold mb-2">Rule Type</Small>
            <Select
              value={rule.ruleType}
              onValueChange={(value: string) => onRuleTypeChange(value as RuleType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select rule type" />
              </SelectTrigger>
              <SelectContent>
                {RULE_TYPE_OPTIONS.map((option) => (
                  <SelectItem key={option.value || "empty"} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mb-4">
            <Small className="block font-semibold mb-2">Account Ranges</Small>
            <Small className="block mb-4 opacity-70">(Starting range - Ending Range)</Small>
            <div className="space-y-2">
              {getAccountRanges().map((range, index) => (
                <div key={index} className="flex">
                  <RangeInput
                    id={`automation-rule-range-${index}`}
                    range={range?.join("")}
                    onRangeChange={(newValue: string) => onAccountRangeChange(index, newValue)}
                  />
                  <IoTrashBinOutline
                    className="mt-2 ml-2 cursor-pointer"
                    size={24}
                    onClick={() => onAccountRangeRemove(index)}
                  />
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={onAccountRangeAdd}
              >
                Add new range
              </Button>
            </div>
          </div>

          <Separator className="my-4" />

          <div>
            <Small className="block font-semibold mb-4">Conditions</Small>
            <div className="space-y-3">
              {CONDITION_TYPES.map((conditionType) => {
                const condition = rule.conditions[conditionType];
                const isEnabled = !!condition;

                return (
                  <div key={conditionType} className="p-3 border rounded bg-white">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isEnabled}
                        onChange={(e) => onConditionToggle(conditionType, e.target.checked)}
                      />
                      <Small className="font-medium uppercase">
                        {conditionType}
                      </Small>
                    </div>

                    {isEnabled && (
                      <Grid columns={2} className={"mt-4 mb-4 gap-6"}>
                        <div>
                          <Small className="block text-gray-600">Match Mode</Small>
                          <Small className="text-gray-400">(whether the condition applies to all or any)</Small>
                          <Select
                            value={condition.accountMatchMode}
                            onValueChange={(value: string) =>
                              onConditionChange(conditionType, "accountMatchMode", value as MatchMode)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select mode" />
                            </SelectTrigger>
                            <SelectContent>
                              {MATCH_MODE_OPTIONS.map((option) => (
                                <SelectItem key={option.value || "empty"} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Small className="block text-gray-600">Answer</Small>
                          <Small className="text-gray-400">(when condition is met)</Small>
                          <Select
                            value={condition.answer}
                            onValueChange={(value: string) =>
                              onConditionChange(conditionType, "answer", value as TriggerAnswer)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select answer" />
                            </SelectTrigger>
                            <SelectContent>
                              {ANSWER_OPTIONS.map((option) => (
                                <SelectItem key={option.value || "empty"} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </Grid>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
