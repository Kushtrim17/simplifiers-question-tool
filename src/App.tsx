import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "./App.css";
import { QuestionsBuilder } from "./components/QuestionsBuilder/QuestionsBuilder";
import {
  Category,
  Question,
  STARTING_STRUCTURE,
  Structure,
} from "./components/QuestionsBuilder/types";
import { useEffect, useState } from "react";
import {
  addChildCategory,
  addQuestionToCategory,
  addRootCategory,
  addSiblingCategory,
  deleteCategory,
  deleteQuestion,
  updateCategoryById,
  updateQuestion,
} from "./components/QuestionsBuilder/questions";
import { QuestionsPreviewer } from "./components/QuestionsPreviewer/QuestionsPreviewer";
import { When } from "./components/QuestionsBuilder/components/When";
import { NoCategoriesYet } from "./components/QuestionsBuilder/components/NoQuestionsYet";
import { AppDateUtils } from "./lib/dateUtils";
import {
  loadQuestionnaireFromLocalStorage,
  saveQuestionnaireToLocalStorage,
} from "./localStorage";

function App() {
  const [structure, setStructure] = useState<Structure>(STARTING_STRUCTURE);

  const handleQuestionnaireUpdate = () => {
    const structureFromLocalStorage = loadQuestionnaireFromLocalStorage();
    setStructure(structureFromLocalStorage);
  };

  const handleAddFirstCategory = () => {
    const updatedQuestions = addRootCategory(structure.categories);
    saveQuestionnaireToLocalStorage({
      ...structure,
      categories: updatedQuestions,
    });
    handleQuestionnaireUpdate();
  };

  const handleOnEdit = (category: Category) => {
    const updatedQuestions = updateCategoryById(structure.categories, category);
    saveQuestionnaireToLocalStorage({
      ...structure,
      categories: updatedQuestions,
    });
    handleQuestionnaireUpdate();
  };

  const handleOnAddChildCategory = (parentId: string) => {
    const updatedQuestions = addChildCategory(structure.categories, parentId);
    saveQuestionnaireToLocalStorage({
      ...structure,
      categories: updatedQuestions,
    });
    handleQuestionnaireUpdate();
  };

  const handleOnAddSiblingCategory = (siblingId: string) => {
    const updatedQuestions = addSiblingCategory(
      structure.categories,
      siblingId
    );
    saveQuestionnaireToLocalStorage({
      ...structure,
      categories: updatedQuestions,
    });
    handleQuestionnaireUpdate();
  };

  const handleOnDelete = (categoryId: string) => {
    const updatedQuestions = deleteCategory(structure.categories, categoryId);
    saveQuestionnaireToLocalStorage({
      ...structure,
      categories: updatedQuestions,
    });
    handleQuestionnaireUpdate();
  };

  const handleOnAddQuestion = (categoryId: string) => {
    const updatedQuestions = addQuestionToCategory(
      structure.categories,
      categoryId
    );
    saveQuestionnaireToLocalStorage({
      ...structure,
      categories: updatedQuestions,
    });
    handleQuestionnaireUpdate();
  };

  const handleOnEditQuestion = (updatedQuestion: Question) => {
    const updatedQuestions = updateQuestion(
      structure.categories,
      updatedQuestion
    );
    saveQuestionnaireToLocalStorage({
      ...structure,
      categories: updatedQuestions,
    });
    handleQuestionnaireUpdate();
  };

  const handleOnDeleteQuestion = (questionId: string) => {
    const updatedQuestions = deleteQuestion(structure.categories, questionId);
    saveQuestionnaireToLocalStorage({
      ...structure,
      categories: updatedQuestions,
    });
    handleQuestionnaireUpdate();
  };

  useEffect(() => {
    const structureFromLocalStorage = loadQuestionnaireFromLocalStorage();
    saveQuestionnaireToLocalStorage(structureFromLocalStorage);
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1 className="text-4xl font-bold">Question Builder</h1>
        <h2 className="text-md pt-2">Create, edit and view questions</h2>
        <h2 className="text-sm pt-2 opacity-70">
          Last updated: {AppDateUtils.getFormattedDate(structure.lastUpdated)}
        </h2>
      </div>

      <Tabs defaultValue="builder" className="pt-5 w-full">
        <TabsList className="float-end">
          <TabsTrigger value="builder">Question Builder</TabsTrigger>
          <TabsTrigger value="viewer">JSON result</TabsTrigger>
        </TabsList>
        <TabsContent value="builder" className="pt-10 mb-20">
          <When
            isTrue={structure.categories.length > 0}
            fallback={<NoCategoriesYet onClick={handleAddFirstCategory} />}
          >
            <QuestionsBuilder
              questions={structure.categories}
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
          <QuestionsPreviewer questionnaire={structure.categories} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
