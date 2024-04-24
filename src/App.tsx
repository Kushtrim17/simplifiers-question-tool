import { v4 as uuidv4 } from "uuid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "./App.css";
import { QuestionsBuilder } from "./components/QuestionsBuilder/QuestionsBuilder";
import { Category } from "./components/QuestionsBuilder/types";

const questionnaire: Category[] = [
  {
    id: "1",
    level: 1,
    orderNumber: 1,
    name: "Category 1",
    subCategories: [
      {
        id: "11",
        level: 2,
        orderNumber: 1,
        name: "Category 1 Level 2",
        subCategories: [
          {
            id: "111",
            level: 3,
            orderNumber: 1,
            name: "Category 1 Level 3",
            subCategories: [
              {
                id: "1111",
                level: 4,
                orderNumber: 1,
                name: "Category 1 Level 4",
                questions: [
                  {
                    id: uuidv4(),
                    title: "Question 1",
                    description: "This is a multiple choice question",
                    answer: "Option 1",
                    options: ["Option 1", "Option 2", "Option 3"],
                  },
                  {
                    id: uuidv4(),
                    title: "Question 2",
                    description: "This is a multiple choice question2",
                    answer: "Option 2",
                    options: ["Option 1", "Option 2", "Option 3"],
                  },
                ],
              },
            ],
            questions: [
              {
                id: uuidv4(),
                title: "Question 1",
                description: "This is a multiple choice question",
                answer: "Option 1",
                options: ["Option 1", "Option 2", "Option 3"],
              },
              {
                id: uuidv4(),
                title: "Question 2",
                description: "This is a multiple choice question2",
                answer: "Option 2",
                options: ["Option 1", "Option 2", "Option 3"],
              },
            ],
          },
        ],
      },
      {
        id: "12",
        level: 2,
        orderNumber: 3,
        name: "Category 2 Level 1",
      },
      {
        id: "13",
        level: 2,
        orderNumber: 3,
        name: "Category 3 Level 1",
      },
    ],
  },
  {
    id: "2",
    orderNumber: 2,
    level: 1,
    name: "Category 2",
  },
  {
    id: "3",
    orderNumber: 3,
    level: 1,
    name: "Category 3",
  },
  {
    id: "4",
    orderNumber: 4,
    level: 1,
    name: "Category 4",
  },
];

function App() {
  return (
    <div className="container">
      <div className="header">
        <h1 className="text-4xl font-bold">Question Builder</h1>
        <h2 className="text-md pt-2">Create, edit and view questions</h2>
      </div>

      <Tabs defaultValue="account" className="pt-5 w-full">
        <TabsList className="float-end">
          <TabsTrigger value="account">Question Builder</TabsTrigger>
          <TabsTrigger value="password">JSON result</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="pt-10">
          <QuestionsBuilder questions={questionnaire} />
        </TabsContent>
        <TabsContent value="password" className="pt-10">
          We will be able to see the JSON result here
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
