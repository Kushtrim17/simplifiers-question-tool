export const FIRST_NOTE = {
  id: "id(notes.note1.number)",
  name: "Redovisningsprinciper",
};

export const FIRST_NOTE_OPTIONS = [
  {
    id: "notes.note1.data.RedovisningsVarderingsprinciper.value",
    name: "Redovisningsprinciper",
  },
  {
    id: "notes.note1.data.RedovisningsprinciperImmateriellaAnlaggningstillgangar.value",
    name: "Immateriella anläggningstillgångar",
  },
  {
    id: "notes.note1.data.RedovisningsprinciperImmateriellaAnlaggningstillgangar.RedovisningsprinciperAvskrivningImmateriellaAnlaggningstillgangar.value",
    name: "Avskrivning",
  },
  {
    id: "notes.note1.data.RedovisningsprinciperImmateriellaAnlaggningstillgangar.RedovisningsprinciperAvskrivningImmateriellaAnlaggningstillgangar.RedovisningsprinciperAvskrivningImmateriellaAnlaggningstillgangar.table",
    name: "Avskrivningsprinciper",
  },
  {
    id: "notes.note1.data.RedovisningsprinciperMateriellaAnlaggningstillgangar.value",
    name: "Materiella anläggningstillgångar",
  },
  {
    id: "notes.note1.data.RedovisningsprinciperMateriellaAnlaggningstillgangar.RedovisningsprinciperAvskrivningMateriellaAnlaggningstillgangar.value",
    name: "Avskrivning",
  },
  {
    id: "notes.note1.data.RedovisningsprinciperMateriellaAnlaggningstillgangar.RedovisningsprinciperAvskrivningMateriellaAnlaggningstillgangar.RedovisningsprinciperAvskrivningMateriellaAnlaggningstillgangar.table",
    name: "Avskrivningsprinciper",
  },
  {
    id: "notes.note1.data.RedovisningsprinciperTjansteOchEntreprenaduppdrag.value",
    name: "Tjänste- och entreprenaduppdrag",
  },
  {
    id: "notes.note1.data.RedovisningsprinciperAnskaffningsvardeEgentillverkadevaror.value",
    name: "Anskaffningsvärde för egentillverkade varor",
  },
  {
    id: "notes.note1.data.RedovisningsprinciperBristandeJamforbarhetAndradePrinciper.value",
    name: "Bristande jämförbarhet vid ändrade principer",
  },
];

export const INCOME_STATEMENT_NOTES = [
  {
    id: "id(notes.note10.number)",
    name: "Medelantalet anställda",
  },
  {
    id: "id(notes.note49.number)",
    name: "Exceptionella intäkter och kostnader",
  },
  {
    id: "id(notes.note60.number)",
    name: "Övriga upplysningar till resultaträkningen",
  },
];

export const BALANCE_SHEET_NOTES = [
  {
    id: "id(notes.note6.number)",
    name: "Koncessioner, patent, licenser, varumärken samt liknande rättigheter",
  },
  {
    id: "id(notes.note35.number)",
    name: "Hyresrätter och liknande rättigheter",
  },
  {
    id: "id(notes.note36.number)",
    name: "Goodwill",
  },
  {
    id: "id(notes.note37.number)",
    name: "Förskott avseende immateriella anläggningstillgångar",
  },
  {
    id: "id(notes.note38.number)",
    name: "Byggnader och mark",
  },
  {
    id: "id(notes.note40.number)",
    name: "Maskiner och andra tekniska anläggningar",
  },
  {
    id: "id(notes.note41.number)",
    name: "Inventarier, verktyg och installationer",
  },
  {
    id: "id(notes.note42.number)",
    name: "Förbättringsutgifter på annans fastighet",
  },
  {
    id: "id(notes.note44.number)",
    name: "Övriga materiella anläggningstillgångar",
  },
  {
    id: "id(notes.note43.number)",
    name: "Pågående nyanläggningar och förskott avseende materiella anläggningstillgångar",
  },
  {
    id: "id(notes.note59.number)",
    name: "Lån till delägare eller närstående",
  },
  {
    id: "id(notes.note61.number)",
    name: "Andra långfristiga fordringar",
  },
  {
    id: "id(notes.note60.number)",
    name: "Lån, säkerheter, åtaganden m.m. till förmån för ledande befattningshavare",
  },
  {
    id: "id(notes.note63.number)",
    name: "Pågående arbete för annans räkning",
  },
  {
    id: "id(notes.note67.number)",
    name: "Uppskrivningsfond",
  },
  {
    id: "id(notes.note75.number)",
    name: "Långfristiga skulder",
  },
  {
    id: "id(notes.note77.number)",
    name: "Checkräkningskredit",
  },
  {
    id: "id(notes.note82.number)",
    name: "Ställda säkerheter",
  },
  {
    id: "id(notes.note83.number)",
    name: "Eventualförpliktelser",
  },
  {
    id: "id(notes.note85.number)",
    name: "Tillgångar, avsättningar och skulder som avser flera poster",
  },
  {
    id: "id(notes.note87.number)",
    name: "Övriga upplysningar till balansräkningen",
  },
];

export const OTHER_NOTES = [
  {
    id: "id(notes.note95.number)",
    name: "Väsentliga händelser efter räkenskapsårets slut",
  },
  {
    id: "id(notes.note96.number)",
    name: "Ekonomiska arrangemang som inte redovisas i balansräkningen",
  },
  {
    id: "id(notes.note100.number)",
    name: "Andra övriga upplysningar",
  },
];

export const ALL_NOTES = [
  FIRST_NOTE,
  ...FIRST_NOTE_OPTIONS,
  ...INCOME_STATEMENT_NOTES,
  ...BALANCE_SHEET_NOTES,
  ...OTHER_NOTES,
];
