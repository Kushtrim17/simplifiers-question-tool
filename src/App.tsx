import { useEffect, useState } from "react";
import "./App.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuestionsBuilder } from "@/components/QuestionsBuilder/QuestionsBuilder";
import {
  Category,
  Question,
  STARTING_STRUCTURE,
  Structure,
} from "@/components/QuestionsBuilder/types";
import {
  addChildCategory,
  addQuestionToCategory,
  addRootCategory,
  addSiblingCategory,
  deleteCategory,
  deleteQuestion,
  updateCategoryById,
  updateQuestion,
} from "@/components/QuestionsBuilder/questions";
import { QuestionsPreviewer } from "@/components/QuestionsPreviewer/QuestionsPreviewer";
import { When } from "@/components/ui/When/When";
import { NoCategoriesYet } from "@/components/QuestionsBuilder/components/NoQuestionsYet";
import { Large, Medium, Small } from "@/components/ui/Typography";
import { DateUtils } from "@/lib/dateUtils";
import {
  loadQuestionnaireFromLocalStorage,
  saveQuestionnaireToLocalStorage,
} from "./localStorage";

function App() {
  const [structure, setStructure] = useState<Structure>(STARTING_STRUCTURE);

  const fetchStructureFromLocalStorage = () => {
    const structureFromLocalStorage = loadQuestionnaireFromLocalStorage();
    setStructure(structureFromLocalStorage);
  };

  const getLastUpdated = () => {
    return DateUtils.getFormattedDate(structure.lastUpdated);
  };

  const saveUpdatedStructure = (updatedStructure: Structure) => {
    saveQuestionnaireToLocalStorage(updatedStructure);
    fetchStructureFromLocalStorage();
  };

  const hasAtLeastOneRootCategory = structure?.categories?.length > 0;

  const handleOnAddFirstCategory = () => {
    const updatedCategories = addRootCategory(structure.categories);
    saveUpdatedStructure({
      ...structure,
      categories: updatedCategories,
    });
  };

  const handleOnUploadStructure = (structure: Structure) => {
    saveQuestionnaireToLocalStorage(structure);
    fetchStructureFromLocalStorage();
  };

  const handleOnEditCategory = (category: Category) => {
    const categories = updateCategoryById(structure.categories, category);
    saveUpdatedStructure({ ...structure, categories });
  };

  const handleOnAddChildCategory = (parentId: string) => {
    const categories = addChildCategory(structure.categories, parentId);
    saveUpdatedStructure({ ...structure, categories });
  };

  const handleOnAddSiblingCategory = (siblingId: string) => {
    const categories = addSiblingCategory(structure.categories, siblingId);
    saveUpdatedStructure({ ...structure, categories });
  };

  const handleOnDeleteCategory = (categoryId: string) => {
    const categories = deleteCategory(structure.categories, categoryId);
    saveUpdatedStructure({ ...structure, categories });
  };

  const handleOnAddQuestion = (categoryId: string) => {
    const categories = addQuestionToCategory(structure.categories, categoryId);
    saveUpdatedStructure({ ...structure, categories });
  };

  const handleOnEditQuestion = (updatedQuestion: Question) => {
    const categories = updateQuestion(structure.categories, updatedQuestion);
    saveUpdatedStructure({ ...structure, categories });
  };

  const handleOnDeleteQuestion = (questionId: string) => {
    const categories = deleteQuestion(structure.categories, questionId);
    saveUpdatedStructure({ ...structure, categories });
  };

  useEffect(() => {
    fetchStructureFromLocalStorage();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <Large>Question Builder</Large>
        <Medium className="pt-2 opacity-75">
          Create, edit and view questions
        </Medium>
        <Small className="pt-2 opacity-70">
          Last updated: {getLastUpdated()}
        </Small>
      </div>

      <Tabs defaultValue="builder" className="pt-5 w-full">
        <TabsList className="float-end">
          <TabsTrigger value="builder">Question Builder</TabsTrigger>
          <TabsTrigger value="viewer">JSON result</TabsTrigger>
        </TabsList>
        <TabsContent value="builder" className="pt-10 mb-20">
          <When
            isTrue={hasAtLeastOneRootCategory}
            fallback={
              <NoCategoriesYet
                onAddFirstCategory={handleOnAddFirstCategory}
                onUpload={handleOnUploadStructure}
              />
            }
          >
            <QuestionsBuilder
              categories={structure.categories}
              onEditCategory={handleOnEditCategory}
              onAddChildCategory={handleOnAddChildCategory}
              onAddSiblingCategory={handleOnAddSiblingCategory}
              onDeleteCategory={handleOnDeleteCategory}
              onAddQuestion={handleOnAddQuestion}
              onEditQuestion={handleOnEditQuestion}
              onDeleteQuestion={handleOnDeleteQuestion}
            />
          </When>
        </TabsContent>
        <TabsContent value="viewer" className="pt-10">
          <QuestionsPreviewer structure={structure} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
