export const FIRST_NOTE = {
  id: "id(notes.note1.number)",
  label: "Redovisningsprinciper",
};

export const INCOME_STATEMENT_NOTES = [
  {
    id: "notes.note2.number",
    label: "Medelantalet anställda",
  },
  {
    id: "notes.note49.number",
    label: "Exceptionella intäkter och kostnader",
  },
  {
    id: "notes.note60.number",
    label: "Övriga upplysningar till resultaträkningen",
  },
];

export const BALANCE_SHEET_NOTES = [
  {
    id: "id(notes.note6.number)",
    label:
      "Koncessioner, patent, licenser, varumärken samt liknande rättigheter",
  },
  {
    id: "id(notes.note35.number)",
    label: "Hyresrätter och liknande rättigheter",
  },
  {
    id: "id(notes.note36.number)",
    label: "Goodwill",
  },
  {
    id: "id(notes.note37.number)",
    label: "Förskott avseende immateriella anläggningstillgångar",
  },
  {
    id: "id(notes.note38.number)",
    label: "Byggnader och mark",
  },
  {
    id: "id(notes.note40.number)",
    label: "Maskiner och andra tekniska anläggningar",
  },
  {
    id: "id(notes.note41.number)",
    label: "Inventarier, verktyg och installationer",
  },
  {
    id: "id(notes.note42.number)",
    label: "Förbättringsutgifter på annans fastighet",
  },
  {
    id: "id(notes.note44.number)",
    label: "Övriga materiella anläggningstillgångar",
  },
  {
    id: "id(notes.note43.number)",
    label:
      "Pågående nyanläggningar och förskott avseende materiella anläggningstillgångar",
  },
  {
    id: "id(notes.note59.number)",
    label: "Lån till delägare eller närstående",
  },
  {
    id: "id(notes.note61.number)",
    label: "Andra långfristiga fordringar",
  },
  {
    id: "id(notes.note60.number)",
    label:
      "Lån, säkerheter, åtaganden m.m. till förmån för ledande befattningshavare",
  },
  {
    id: "id(notes.note63.number)",
    label: "Pågående arbete för annans räkning",
  },
  {
    id: "id(notes.note67.number)",
    label: "Uppskrivningsfond",
  },
  {
    id: "id(notes.note75.number)",
    label: "Långfristiga skulder",
  },
  {
    id: "id(notes.note77.number)",
    label: "Checkräkningskredit",
  },
  {
    id: "id(notes.note82.number)",
    label: "Ställda säkerheter",
  },
  {
    id: "id(notes.note83.number)",
    label: "Eventualförpliktelser",
  },
  {
    id: "id(notes.note85.number)",
    label: "Tillgångar, avsättningar och skulder som avser flera poster",
  },
  {
    id: "id(notes.note87.number)",
    label: "Övriga upplysningar till balansräkningen",
  },
];

export const OTHER_NOTES = [
  {
    id: "id(notes.note95.number)",
    label: "Väsentliga händelser efter räkenskapsårets slut",
  },
  {
    id: "id(notes.note96.number)",
    label: "Ekonomiska arrangemang som inte redovisas i balansräkningen",
  },
  {
    id: "id(notes.note100.number)",
    label: "Andra övriga upplysningar",
  },
];

export const ALL_NOTES = [
  FIRST_NOTE,
  ...INCOME_STATEMENT_NOTES,
  ...BALANCE_SHEET_NOTES,
  ...OTHER_NOTES,
];
