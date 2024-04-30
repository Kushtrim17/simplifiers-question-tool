import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "./App.css";
import { QuestionsBuilder } from "./components/QuestionsBuilder/QuestionsBuilder";
import { Category, Question } from "./components/QuestionsBuilder/types";
import { useEffect, useState } from "react";
import {
  addChildCategory,
  addQuestionToCategory,
  addRootCategory,
  addSiblingCategory,
  deleteCategory,
  deleteQuestion,
  loadQuestionnaireFromLocalStorage,
  saveQuestionnaireToLocalStorage,
  updateCategoryById,
  updateQuestion,
} from "./components/QuestionsBuilder/questions";
import { QuestionsPreviewer } from "./components/QuestionsPreviewer/QuestionsPreviewer";
import { When } from "./components/QuestionsBuilder/components/When";
import { NoCategoriesYet } from "./components/QuestionsBuilder/components/NoQuestionsYet";

function App() {
  const [questionnaire, setQuestionnaire] = useState<Category[]>([]);

  const handleQuestionnaireUpdate = () => {
    const questionsFromLocalStorage = loadQuestionnaireFromLocalStorage();
    setQuestionnaire(questionsFromLocalStorage);
  };

  const handleAddFirstCategory = () => {
    const updatedQuestions = addRootCategory(questionnaire);
    saveQuestionnaireToLocalStorage(updatedQuestions);
    handleQuestionnaireUpdate();
  };

  const handleOnEdit = (category: Category) => {
    const updatedQuestions = updateCategoryById(questionnaire, category);
    saveQuestionnaireToLocalStorage(updatedQuestions);
    handleQuestionnaireUpdate();
  };

  const handleOnAddChildCategory = (parentId: string) => {
    const updatedQuestions = addChildCategory(questionnaire, parentId);
    saveQuestionnaireToLocalStorage(updatedQuestions);
    handleQuestionnaireUpdate();
  };

  const handleOnAddSiblingCategory = (siblingId: string) => {
    const updatedQuestions = addSiblingCategory(questionnaire, siblingId);
    saveQuestionnaireToLocalStorage(updatedQuestions);
    handleQuestionnaireUpdate();
  };

  const handleOnDelete = (categoryId: string) => {
    const updatedQuestions = deleteCategory(questionnaire, categoryId);
    saveQuestionnaireToLocalStorage(updatedQuestions);
    handleQuestionnaireUpdate();
  };

  const handleOnAddQuestion = (categoryId: string) => {
    const updatedQuestions = addQuestionToCategory(questionnaire, categoryId);
    saveQuestionnaireToLocalStorage(updatedQuestions);
    handleQuestionnaireUpdate();
  };

  const handleOnEditQuestion = (updatedQuestion: Question) => {
    const updatedQuestions = updateQuestion(questionnaire, updatedQuestion);
    saveQuestionnaireToLocalStorage(updatedQuestions);
    handleQuestionnaireUpdate();
  };

  const handleOnDeleteQuestion = (questionId: string) => {
    const updatedQuestions = deleteQuestion(questionnaire, questionId);
    saveQuestionnaireToLocalStorage(updatedQuestions);
    handleQuestionnaireUpdate();
  };

  useEffect(() => {
    const questionsFromLocalStorage = loadQuestionnaireFromLocalStorage();
    setQuestionnaire(questionsFromLocalStorage);
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1 className="text-4xl font-bold">Question Builder</h1>
        <h2 className="text-md pt-2">Create, edit and view questions</h2>
      </div>

      <Tabs defaultValue="builder" className="pt-5 w-full">
        <TabsList className="float-end">
          <TabsTrigger value="builder">Question Builder</TabsTrigger>
          <TabsTrigger value="viewer">JSON result</TabsTrigger>
        </TabsList>
        <TabsContent value="builder" className="pt-10">
          <When
            isTrue={questionnaire.length > 0}
            fallback={<NoCategoriesYet onClick={handleAddFirstCategory} />}
          >
            <QuestionsBuilder
              questions={questionnaire}
              onEdit={handleOnEdit}
              onAddChildCategory={handleOnAddChildCategory}
              onAddSiblingCategory={handleOnAddSiblingCategory}
              onDelete={handleOnDelete}
              onAddQuestion={handleOnAddQuestion}
              onEditQuestion={handleOnEditQuestion}
              onDeleteQuestion={handleOnDeleteQuestion}
            />
          </When>
        </TabsContent>
        <TabsContent value="viewer" className="pt-10">
          <QuestionsPreviewer questionnaire={questionnaire} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
