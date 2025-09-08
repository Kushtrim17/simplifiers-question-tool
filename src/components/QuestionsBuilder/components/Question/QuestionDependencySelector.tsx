import { Small, Medium } from "@/components/ui/Typography";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Question } from "../../types";
import { When } from "@/components/ui/When/When";

type Props = {
  question: Question;
  allQuestions: Question[];
  onDependencyChange: (questionId: string, answer: boolean | string) => void;
};
export function QuestionDependencySelector(props: Props) {
  const { question, allQuestions, onDependencyChange } = props;

  const getQuestionDependency = () => {
    if (question.dependsOnQuestions.length === 0) {
      return "-";
    }
    return question.dependsOnQuestions[0].questionId;
  };

  const getAnswerDependency = () => {
    if (question?.dependsOnQuestions?.length === 0) {
      return "no";
    }

    const dependencyQuestion = question.dependsOnQuestions[0];
    return dependencyQuestion?.answer.toString() || "no";
  };

  const getDependencyQuestionAnswerOptions = () => {
    if (question.dependsOnQuestions.length === 0) {
      return [];
    }

    const dependencyQuestion = allQuestions.find(
      (q) => q.id === question.dependsOnQuestions[0].questionId
    );

    if (!dependencyQuestion) {
      return [];
    }

    if (dependencyQuestion.type === "boolean") {
      return ["yes", "no"];
    }

    return [];
  };

  const handleOnQuestionDependencyChange = (questionId: string) => {
    const defaultAnswer = question.type === "boolean" ? "yes" : "";
    onDependencyChange(questionId, defaultAnswer);
  };

  const handleOnAnswerDependencyChange = (answer: boolean | string) => {
    onDependencyChange(
      question.dependsOnQuestions[0].questionId,
      answer.toString().toLowerCase()
    );
  };

  return (
    <>
      <Medium className="mb-2">Dependency</Medium>
      <Small className="font-extrabold">Depends on question</Small>
      <Select
        defaultValue={getQuestionDependency()}
        onValueChange={handleOnQuestionDependencyChange}
        onOpenChange={(isOpen) => !isOpen}
      >
        <SelectTrigger className="mt-5 mb-5">
          <SelectValue placeholder="Select question type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="-">No dependency</SelectItem>
          {allQuestions.map((q) => (
            <SelectItem key={q.id} value={q.id}>
              {q.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <When isTrue={getAnswerDependency() != null}>
        <Small className="font-extrabold">Depends on answer</Small>
        <Select
          defaultValue={getAnswerDependency()}
          onValueChange={handleOnAnswerDependencyChange}
          onOpenChange={(isOpen) => !isOpen}
        >
          <SelectTrigger className="mt-5 mb-5">
            <SelectValue placeholder="Select question type" />
          </SelectTrigger>
          <SelectContent>
            {getDependencyQuestionAnswerOptions().map((d) => (
              <SelectItem key={d.toString()} value={d.toString().toLowerCase()}>
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </When>
    </>
  );
}
