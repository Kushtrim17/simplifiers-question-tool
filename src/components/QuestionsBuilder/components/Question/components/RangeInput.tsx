import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

type RangeInputProps = {
  id?: string;
  range: string | undefined;
  onRangeChange: (newValue: string) => void;
};

export const RangeInput = ({ range, onRangeChange }: RangeInputProps) => {
  return (
    <InputOTP
      maxLength={8}
      pattern={REGEXP_ONLY_DIGITS}
      value={range}
      onChange={onRangeChange}
    >
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
        <InputOTPSlot index={6} />
        <InputOTPSlot index={7} />
      </InputOTPGroup>
    </InputOTP>
  );
};
