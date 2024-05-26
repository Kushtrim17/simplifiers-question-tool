import { Small } from "@/components/ui/Typography";
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
  onDependencyChange: (questionId: string, answer: string | boolean) => void;
};
export function QuestionDependencySelector(props: Props) {
  const { question, allQuestions, onDependencyChange } = props;

  const getQuestionDependency = () => {
    if (question.dependsOnQuestions.length === 0) {
      return "no";
    }
    return question.dependsOnQuestions[0].questionId;
  };

  const getAnswerDependency = () => {
    if (question?.dependsOnQuestions?.length === 0) {
      return "no";
    }

    return question.dependsOnQuestions[0]?.answer?.toString();
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
      return ["True", "False"];
    }

    return [];
  };

  const handleOnQuestionDependencyChange = (questionId: string) => {
    const defaultAnswer = question.type === "boolean" ? true : "";
    onDependencyChange(questionId, defaultAnswer);
  };

  const handleOnAnswerDependencyChange = (answer: string) => {
    const answerWithCorrectType =
      question.type === "boolean" ? answer.toLowerCase() === "true" : answer;
    onDependencyChange(
      question.dependsOnQuestions[0].questionId,
      answerWithCorrectType
    );
  };

  return (
    <>
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
          <SelectItem value="no">No dependency</SelectItem>
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
            <SelectItem value="no">No dependency</SelectItem>
            {getDependencyQuestionAnswerOptions().map((d) => (
              <SelectItem key={d.toString()} value={d.toString()}>
                {d.toString()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </When>
    </>
  );
}
