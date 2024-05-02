import { useState } from "react";
import { Structure } from "../QuestionsBuilder/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button, buttonVariants } from "@/components/ui/button";
import { DateUtils } from "@/lib/dateUtils";

type Props = {
  structure: Structure;
};
export function QuestionsPreviewer(props: Props) {
  const { structure } = props;
  const stringifiedStructure = JSON.stringify(structure, null, 2);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(stringifiedStructure);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const SUBJECT = `Questionnaire update ${DateUtils.getFormattedDate(
    new Date().toISOString()
  )}`;

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>JSON structure preview</CardTitle>
          <CardDescription>
            This structure will be used by the developers in the main app
          </CardDescription>
        </div>
        <div>
          <Button onClick={copyToClipboard}>
            {copied ? "Copied to clipboard" : "Copy to clipboard"}
          </Button>

          <a
            className={`${buttonVariants({ variant: "outline" })} ml-4`}
            href={`https://mail.google.com/mail/?view=cm&fs=1&su=${SUBJECT}`}
            target="_blank"
            onClick={copyToClipboard}
          >
            Send to developers
          </a>
        </div>
      </CardHeader>
      <ScrollArea className={`h-[1000px]`}>
        <CardContent>
          <pre>{stringifiedStructure}</pre>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
