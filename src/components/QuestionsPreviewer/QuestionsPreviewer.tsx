import { Category } from "../QuestionsBuilder/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "../ui/button";
import { useState } from "react";

type Props = {
  questionnaire: Category[];
};
export function QuestionsPreviewer(props: Props) {
  const { questionnaire } = props;
  const stringifiedQuestionnaire = JSON.stringify(questionnaire, null, 2);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(stringifiedQuestionnaire);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

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
        </div>
      </CardHeader>
      <ScrollArea className={`h-[1000px]`}>
        <CardContent>
          <pre>{stringifiedQuestionnaire}</pre>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
