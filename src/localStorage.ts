import {
  STARTING_STRUCTURE,
  Structure,
} from "./components/QuestionsBuilder/types";

const STORAGE_KEY = "structure";

// Serialize the data and store in local storage
export function saveQuestionnaireToLocalStorage(structure: Structure): void {
  const serializedQuestionnaire = JSON.stringify({
    ...structure,
    lastUpdated: new Date().toISOString(),
  });
  localStorage.setItem(STORAGE_KEY, serializedQuestionnaire);
}

// Retrieve the data from local storage and deserialize
export function loadQuestionnaireFromLocalStorage(): Structure {
  const serializedQuestionnaire = localStorage.getItem(STORAGE_KEY);
  if (serializedQuestionnaire) {
    return JSON.parse(serializedQuestionnaire);
  }

  return STARTING_STRUCTURE;
}
