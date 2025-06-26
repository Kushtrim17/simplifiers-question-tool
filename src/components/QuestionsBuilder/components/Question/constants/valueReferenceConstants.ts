import AgoyTaxDocumentValues from './agoyTaxDocumentValues.json';

type ValueReference = {
  id: string;
  label: string;
};

type ValueReferences = {
  [key: string]: ValueReference[];
};

export const BALANCE_SHEET_REFERENCES: ValueReferences = {
  assets: [
    {
      id: "balanceSheet.section.assets.TillgangarAbstract",
      label: "Tillgångar",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.AnlaggningstillgangarAbstract",
      label: "Anläggningstillgångar",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.AnlaggningstillgangarAbstract.ImmateriellaAnlaggningstillgangarAbstract",
      label: "Immateriella anläggningstillgångar",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.AnlaggningstillgangarAbstract.ImmateriellaAnlaggningstillgangarAbstract.KoncessionerPatentLicenserVarumarkenLiknandeRattigheter",
      label: "KoncessionerPatentLicenserVarumarkenLiknandeRattigheter",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.AnlaggningstillgangarAbstract.ImmateriellaAnlaggningstillgangarAbstract.KoncessionerPatentLicenserVarumarkenLiknandeRattigheter.1010",
      label: "1010",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.AnlaggningstillgangarAbstract.ImmateriellaAnlaggningstillgangarAbstract.KoncessionerPatentLicenserVarumarkenLiknandeRattigheter.1011",
      label: "1011",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.AnlaggningstillgangarAbstract.ImmateriellaAnlaggningstillgangarAbstract.KoncessionerPatentLicenserVarumarkenLiknandeRattigheter.1012",
      label: "1012",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.AnlaggningstillgangarAbstract.ImmateriellaAnlaggningstillgangarAbstract.KoncessionerPatentLicenserVarumarkenLiknandeRattigheter.1028",
      label: "1028",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.AnlaggningstillgangarAbstract.ImmateriellaAnlaggningstillgangarAbstract.KoncessionerPatentLicenserVarumarkenLiknandeRattigheter.1029",
      label: "1029",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.AnlaggningstillgangarAbstract.ImmateriellaAnlaggningstillgangarAbstract.KoncessionerPatentLicenserVarumarkenLiknandeRattigheter.1030",
      label: "1030",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.AnlaggningstillgangarAbstract.ImmateriellaAnlaggningstillgangarAbstract.KoncessionerPatentLicenserVarumarkenLiknandeRattigheter.1038",
      label: "1038",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.AnlaggningstillgangarAbstract.ImmateriellaAnlaggningstillgangarAbstract.KoncessionerPatentLicenserVarumarkenLiknandeRattigheter.1040",
      label: "1040",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.AnlaggningstillgangarAbstract.ImmateriellaAnlaggningstillgangarAbstract.KoncessionerPatentLicenserVarumarkenLiknandeRattigheter.1050",
      label: "1050",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.AnlaggningstillgangarAbstract.ImmateriellaAnlaggningstillgangarAbstract.KoncessionerPatentLicenserVarumarkenLiknandeRattigheter.1059",
      label: "1059",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.AnlaggningstillgangarAbstract.ImmateriellaAnlaggningstillgangar",
      label: "Immateriella anläggningstillgångar",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.AnlaggningstillgangarAbstract.MateriellaAnlaggningstillgangarAbstract",
      label: "Materiella anläggningstillgångar",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.AnlaggningstillgangarAbstract.MateriellaAnlaggningstillgangarAbstract.ByggnaderMark",
      label: "Byggnader och mark",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.AnlaggningstillgangarAbstract.MateriellaAnlaggningstillgangarAbstract.ByggnaderMark.1110",
      label: "1110",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.AnlaggningstillgangarAbstract.MateriellaAnlaggningstillgangarAbstract.ByggnaderMark.1181",
      label: "1181",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.AnlaggningstillgangarAbstract.MateriellaAnlaggningstillgangarAbstract.MaskinerAndraTekniskaAnlaggningar",
      label: "MaskinerAndraTekniskaAnlaggningar",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.AnlaggningstillgangarAbstract.MateriellaAnlaggningstillgangarAbstract.MaskinerAndraTekniskaAnlaggningar.1210",
      label: "1210",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.AnlaggningstillgangarAbstract.MateriellaAnlaggningstillgangarAbstract.MaskinerAndraTekniskaAnlaggningar.1218",
      label: "1218",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.AnlaggningstillgangarAbstract.MateriellaAnlaggningstillgangarAbstract.MaskinerAndraTekniskaAnlaggningar.1219",
      label: "1219",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.AnlaggningstillgangarAbstract.MateriellaAnlaggningstillgangarAbstract.InventarierVerktygInstallationer",
      label: "InventarierVerktygInstallationer",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.AnlaggningstillgangarAbstract.MateriellaAnlaggningstillgangarAbstract.InventarierVerktygInstallationer.1232",
      label: "1232",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.AnlaggningstillgangarAbstract.MateriellaAnlaggningstillgangarAbstract.InventarierVerktygInstallationer.1259",
      label: "1259",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.AnlaggningstillgangarAbstract.MateriellaAnlaggningstillgangar",
      label: "Materiella anläggningstillgångar",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.Anlaggningstillgangar",
      label: "Anläggningstillgångar",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.OmsattningstillgangarAbstract",
      label: "Omsättningstillgångar",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.OmsattningstillgangarAbstract.KortfristigaFordringarAbstract",
      label: "Kortfristiga fordringar",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.OmsattningstillgangarAbstract.KortfristigaFordringarAbstract.Kundfordringar",
      label: "Kundfordringar",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.OmsattningstillgangarAbstract.KortfristigaFordringarAbstract.Kundfordringar.1510",
      label: "1510",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.OmsattningstillgangarAbstract.KortfristigaFordringarAbstract.Kundfordringar.1519",
      label: "1519",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.OmsattningstillgangarAbstract.KortfristigaFordringarAbstract.FordringarKoncernforetagKortfristiga.1663",
      label: "1663",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.OmsattningstillgangarAbstract.KortfristigaFordringarAbstract.OvrigaFordringarKortfristiga",
      label: "Övriga fordringar kortfristiga",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.OmsattningstillgangarAbstract.KortfristigaFordringarAbstract.OvrigaFordringarKortfristiga.1631",
      label: "1631",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.OmsattningstillgangarAbstract.KortfristigaFordringarAbstract.OvrigaFordringarKortfristiga.1650",
      label: "1650",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.OmsattningstillgangarAbstract.KortfristigaFordringarAbstract.OvrigaFordringarKortfristiga.1681",
      label: "1681",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.OmsattningstillgangarAbstract.KortfristigaFordringarAbstract.OvrigaFordringarKortfristiga.1685",
      label: "1685",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.OmsattningstillgangarAbstract.KortfristigaFordringar",
      label: "Kortfristiga fordringar",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.OmsattningstillgangarAbstract.KassaBankAbstract",
      label: "Kassa och bank",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.OmsattningstillgangarAbstract.KassaBankAbstract.KassaBankExklRedovisningsmedel",
      label: "Kassa och bank exkl. redovisningsmedel",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.OmsattningstillgangarAbstract.KassaBankAbstract.KassaBankExklRedovisningsmedel.1930",
      label: "1930",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.OmsattningstillgangarAbstract.KassaBankAbstract.KassaBankExklRedovisningsmedel.1931",
      label: "1931",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.OmsattningstillgangarAbstract.KassaBank",
      label: "Kassa och bank",
    },
    {
      id: "balanceSheet.section.assets.TillgangarAbstract.Omsattningstillgangar",
      label: "Omsättningstillgångar",
    },
    { id: "balanceSheet.section.assets.Tillgangar", label: "Tillgångar" },
  ],
  liabilities: [
    {
      id: "balanceSheet.section.equityAndLiabilities",
      label: "Eget kapital och skulder",
    },
    {
      id: "balanceSheet.section.equityAndLiabilities.EgetKapitalSkulderAbstract",
      label: "Eget kapital och skulder",
    },
    {
      id: "balanceSheet.section.equityAndLiabilities.EgetKapitalSkulderAbstract.EgetKapitalAbstract",
      label: "Eget kapital",
    },
    {
      id: "balanceSheet.section.equityAndLiabilities.EgetKapitalSkulderAbstract.EgetKapitalAbstract.BundetEgetKapitalAbstract",
      label: "Bundet eget kapital",
    },
    {
      id: "balanceSheet.section.equityAndLiabilities.EgetKapitalSkulderAbstract.EgetKapitalAbstract.BundetEgetKapitalAbstract.Aktiekapital",
      label: "Aktiekapital",
    },
    {
      id: "balanceSheet.section.equityAndLiabilities.EgetKapitalSkulderAbstract.EgetKapitalAbstract.BundetEgetKapitalAbstract.Aktiekapital.2081",
      label: "2081",
    },
    {
      id: "balanceSheet.section.equityAndLiabilities.EgetKapitalSkulderAbstract.EgetKapitalAbstract.BundetEgetKapital",
      label: "Bundet eget kapital",
    },
    {
      id: "balanceSheet.section.equityAndLiabilities.EgetKapitalSkulderAbstract.EgetKapitalAbstract.FrittEgetKapitalAbstract",
      label: "Fritt eget kapital",
    },
    {
      id: "balanceSheet.section.equityAndLiabilities.EgetKapitalSkulderAbstract.EgetKapitalAbstract.FrittEgetKapitalAbstract.Overkursfond",
      label: "Överkursfond",
    },
    {
      id: "balanceSheet.section.equityAndLiabilities.EgetKapitalSkulderAbstract.EgetKapitalAbstract.FrittEgetKapitalAbstract.Overkursfond.2097",
      label: "2097",
    },
    {
      id: "balanceSheet.section.equityAndLiabilities.EgetKapitalSkulderAbstract.EgetKapitalAbstract.FrittEgetKapitalAbstract.BalanseratResultat",
      label: "Balanserat resultat",
    },
    {
      id: "balanceSheet.section.equityAndLiabilities.EgetKapitalSkulderAbstract.EgetKapitalAbstract.FrittEgetKapitalAbstract.BalanseratResultat.2091",
      label: "2091",
    },
    {
      id: "balanceSheet.section.equityAndLiabilities.EgetKapitalSkulderAbstract.EgetKapitalAbstract.FrittEgetKapitalAbstract.BalanseratResultat.2093",
      label: "2093",
    },
    {
      id: "balanceSheet.section.equityAndLiabilities.EgetKapitalSkulderAbstract.EgetKapitalAbstract.FrittEgetKapitalAbstract.BalanseratResultat.2098",
      label: "2098",
    },
    {
      id: "balanceSheet.section.equityAndLiabilities.EgetKapitalSkulderAbstract.EgetKapitalAbstract.FrittEgetKapitalAbstract.AretsResultatEgetKapital",
      label: "Årets resultat eget kapital",
    },
    {
      id: "balanceSheet.section.equityAndLiabilities.EgetKapitalSkulderAbstract.EgetKapitalAbstract.FrittEgetKapitalAbstract.AretsResultatEgetKapital.2099",
      label: "2099",
    },
    {
      id: "balanceSheet.section.equityAndLiabilities.EgetKapitalSkulderAbstract.EgetKapitalAbstract.FrittEgetKapital",
      label: "Fritt eget kapital",
    },
    {
      id: "balanceSheet.section.equityAndLiabilities.EgetKapitalSkulderAbstract.EgetKapital",
      label: "Eget kapital",
    },
    {
      id: "balanceSheet.section.equityAndLiabilities.EgetKapitalSkulderAbstract.KortfristigaSkulderAbstract",
      label: "Kortfristiga skulder",
    },
    {
      id: "balanceSheet.section.equityAndLiabilities.EgetKapitalSkulderAbstract.KortfristigaSkulderAbstract.Leverantorsskulder",
      label: "Leverantörsskulder",
    },
    {
      id: "balanceSheet.section.equityAndLiabilities.EgetKapitalSkulderAbstract.KortfristigaSkulderAbstract.Leverantorsskulder.2440",
      label: "2440",
    },
    {
      id: "balanceSheet.section.equityAndLiabilities.EgetKapitalSkulderAbstract.KortfristigaSkulderAbstract.Leverantorsskulder.2442",
      label: "2442",
    },
    {
      id: "balanceSheet.section.equityAndLiabilities.EgetKapitalSkulderAbstract.KortfristigaSkulderAbstract.Skatteskulder",
      label: "Skatteskulder",
    },
    {
      id: "balanceSheet.section.equityAndLiabilities.EgetKapitalSkulderAbstract.KortfristigaSkulderAbstract.Skatteskulder.2510",
      label: "2510",
    },
    {
      id: "balanceSheet.section.equityAndLiabilities.EgetKapitalSkulderAbstract.KortfristigaSkulderAbstract.OvrigaKortfristigaSkulder",
      label: "Övriga kortfristiga skulder",
    },
    {
      id: "balanceSheet.section.equityAndLiabilities.EgetKapitalSkulderAbstract.KortfristigaSkulderAbstract.OvrigaKortfristigaSkulder.2641",
      label: "2641",
    },
    {
      id: "balanceSheet.section.equityAndLiabilities.EgetKapitalSkulderAbstract.KortfristigaSkulderAbstract.OvrigaKortfristigaSkulder.2650",
      label: "2650",
    },
    {
      id: "balanceSheet.section.equityAndLiabilities.EgetKapitalSkulderAbstract.KortfristigaSkulder",
      label: "Kortfristiga skulder",
    },
    {
      id: "balanceSheet.section.equityAndLiabilities.accountsNotAssigned",
      label: "Konton som inte är tilldelade",
    },
    {
      id: "balanceSheet.section.equityAndLiabilities.accountsNotAssigned.2010",
      label: "2010",
    },
    {
      id: "balanceSheet.section.equityAndLiabilities.accountsNotAssigned.2011",
      label: "2011",
    },
    {
      id: "balanceSheet.section.equityAndLiabilities.accountsNotAssigned.2012",
      label: "2012",
    },
    {
      id: "balanceSheet.section.equityAndLiabilities.accountsNotAssigned.2013",
      label: "2013",
    },
  ],
};

export const INCOME_STATEMENT_REFERENCES: ValueReferences = {
  RorelseresultatAbstract: [
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract",
      label: "Rörelseresultat",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsensIntakterLagerforandringarMmAbstract",
      label: "Rörelsens intäkter och lagerförändringar m.m.",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsensIntakterLagerforandringarMmAbstract.Nettoomsattning",
      label: "Nettoomsättning",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsensIntakterLagerforandringarMmAbstract.Nettoomsattning.3041",
      label: "3041",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsensIntakterLagerforandringarMmAbstract.Nettoomsattning.3042",
      label: "3042",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsensIntakterLagerforandringarMmAbstract.Nettoomsattning.3051",
      label: "3051",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsensIntakterLagerforandringarMmAbstract.Nettoomsattning.3052",
      label: "3052",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsensIntakterLagerforandringarMmAbstract.Nettoomsattning.3740",
      label: "3740",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsensIntakterLagerforandringarMmAbstract.ForandringLagerProdukterIArbeteFardigaVarorPagaendeArbetenAnnansRakning",
      label:
        "Förändring lager produkter i arbete, färdiga varor, pågående arbeten annans räkning",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsensIntakterLagerforandringarMmAbstract.AktiveratArbeteEgenRakning",
      label: "Aktiverat arbete egen räkning",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsensIntakterLagerforandringarMmAbstract.AktiveratArbeteEgenRakning.3850",
      label: "3850",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsensIntakterLagerforandringarMmAbstract.OvrigaRorelseintakter",
      label: "Övriga rörelseintäkter",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsensIntakterLagerforandringarMmAbstract.OvrigaRorelseintakter.3988",
      label: "3988",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsensIntakterLagerforandringarMmAbstract.OvrigaRorelseintakter.3990",
      label: "3990",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelseintakterLagerforandringarMm",
      label: "Rörelseintäkter och lagerförändringar m.m.",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract",
      label: "Rörelsekostnader",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.RavarorFornodenheterKostnader",
      label: "Råvaror, förnödenheter och kostnader",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.RavarorFornodenheterKostnader.4010",
      label: "4010",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.RavarorFornodenheterKostnader.4011",
      label: "4011",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.RavarorFornodenheterKostnader.4012",
      label: "4012",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.RavarorFornodenheterKostnader.4600",
      label: "4600",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.HandelsvarorKostnader",
      label: "Handelsvaror kostnader",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.OvrigaExternaKostnader",
      label: "Övriga externa kostnader",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.OvrigaExternaKostnader.5010",
      label: "5010",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.OvrigaExternaKostnader.5020",
      label: "5020",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.OvrigaExternaKostnader.5060",
      label: "5060",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.OvrigaExternaKostnader.5070",
      label: "5070",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.OvrigaExternaKostnader.5090",
      label: "5090",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.OvrigaExternaKostnader.5220",
      label: "5220",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.OvrigaExternaKostnader.5290",
      label: "5290",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.OvrigaExternaKostnader.5410",
      label: "5410",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.OvrigaExternaKostnader.5460",
      label: "5460",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.OvrigaExternaKostnader.5480",
      label: "5480",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.OvrigaExternaKostnader.5611",
      label: "5611",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.OvrigaExternaKostnader.5613",
      label: "5613",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.OvrigaExternaKostnader.5800",
      label: "5800",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.OvrigaExternaKostnader.5910",
      label: "5910",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.OvrigaExternaKostnader.5930",
      label: "5930",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.OvrigaExternaKostnader.6010",
      label: "6010",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.OvrigaExternaKostnader.6040",
      label: "6040",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.OvrigaExternaKostnader.6064",
      label: "6064",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.OvrigaExternaKostnader.6090",
      label: "6090",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.OvrigaExternaKostnader.6110",
      label: "6110",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.OvrigaExternaKostnader.6212",
      label: "6212",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.OvrigaExternaKostnader.6230",
      label: "6230",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.OvrigaExternaKostnader.6250",
      label: "6250",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.OvrigaExternaKostnader.6310",
      label: "6310",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.OvrigaExternaKostnader.6410",
      label: "6410",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.OvrigaExternaKostnader.6490",
      label: "6490",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.OvrigaExternaKostnader.6530",
      label: "6530",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.OvrigaExternaKostnader.6540",
      label: "6540",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.OvrigaExternaKostnader.6570",
      label: "6570",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.OvrigaExternaKostnader.6590",
      label: "6590",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.OvrigaExternaKostnader.6991",
      label: "6991",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.OvrigaExternaKostnader.6992",
      label: "6992",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.Personalkostnader",
      label: "Personalkostnader",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.Personalkostnader.7010",
      label: "7010",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.Personalkostnader.7220",
      label: "7220",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.Personalkostnader.7510",
      label: "7510",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.Personalkostnader.7570",
      label: "7570",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.Personalkostnader.7571",
      label: "7571",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.Personalkostnader.7690",
      label: "7690",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.AvskrivningarNedskrivningarMateriellaImmateriellaAnlaggningstillgangar",
      label:
        "Avskrivningar och nedskrivningar på materiella och immateriella anläggningstillgångar",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.NedskrivningarOmsattningstillgangarUtoverNormalaNedskrivningar",
      label:
        "Nedskrivningar omsättningstillgångar utöver normala nedskrivningar",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.RorelsekostnaderAbstract.OvrigaRorelsekostnader",
      label: "Övriga rörelsekostnader",
    },
    {
      id: "incomeStatement.section.table.RorelseresultatAbstract.Rorelsekostnader",
      label: "Rörelsekostnader",
    },
    {
      id: "incomeStatement.section.table.Rorelseresultat",
      label: "Rörelseresultat",
    },
  ],
  FinansiellaPosterAbstract: [
    {
      id: "incomeStatement.section.table.FinansiellaPosterAbstract",
      label: "Finansiella poster",
    },
    {
      id: "incomeStatement.section.table.FinansiellaPosterAbstract.ResultatAndelarKoncernforetag",
      label: "Resultat andelar koncernföretag",
    },
    {
      id: "incomeStatement.section.table.FinansiellaPosterAbstract.ResultatAndelarIntresseforetagGemensamtStyrda",
      label: "Resultat andelar intresseföretag och gemensamt styrda företag",
    },
    {
      id: "incomeStatement.section.table.FinansiellaPosterAbstract.ResultatOvrigaforetagAgarintresse",
      label: "Resultat övriga företag ägarintresse",
    },
    {
      id: "incomeStatement.section.table.FinansiellaPosterAbstract.ResultatOvrigaFinansiellaAnlaggningstillgangar",
      label: "Resultat övriga finansiella anläggningstillgångar",
    },
    {
      id: "incomeStatement.section.table.FinansiellaPosterAbstract.OvrigaRanteintakterLiknandeResultatposter",
      label: "Övriga ränteintäkter och liknande resultatposter",
    },
    {
      id: "incomeStatement.section.table.FinansiellaPosterAbstract.NedskrivningarFinansiellaAnlaggningstillgangarKortfristigaPlaceringar",
      label:
        "Nedskrivningar finansiella anläggningstillgångar och kortfristiga placeringar",
    },
    {
      id: "incomeStatement.section.table.FinansiellaPosterAbstract.RanteintakterLiknandeResultatposter",
      label: "Ränteintäkter och liknande resultatposter",
    },
    {
      id: "incomeStatement.section.table.FinansiellaPosterAbstract.RantekostnaderLiknandeResultatposter.8422",
      label: "8422",
    },
    {
      id: "incomeStatement.section.table.FinansiellaPosterAbstract.RantekostnaderLiknandeResultatposter.8423",
      label: "8423",
    },
  ],
  FinansiellaPoster: [
    {
      id: "incomeStatement.section.table.FinansiellaPoster",
      label: "Finansiella poster",
    },
    {
      id: "incomeStatement.section.table.ResultatEfterFinansiellaPoster",
      label: "Resultat efter finansiella poster",
    },
  ],
  BokslutsdispositionerAbstract: [
    {
      id: "incomeStatement.section.table.BokslutsdispositionerAbstract",
      label: "Bokslutsdispositioner",
    },
    {
      id: "incomeStatement.section.table.BokslutsdispositionerAbstract.ErhallnaKoncernbidrag",
      label: "Erhållna koncernbidrag",
    },
    {
      id: "incomeStatement.section.table.BokslutsdispositionerAbstract.LamnadeKoncernbidrag",
      label: "Lämnade koncernbidrag",
    },
    {
      id: "incomeStatement.section.table.BokslutsdispositionerAbstract.ForandringPeriodiseringsfond",
      label: "Förändring periodiseringsfond",
    },
    {
      id: "incomeStatement.section.table.BokslutsdispositionerAbstract.ForandringOveravskrivningar",
      label: "Förändring överavskrivningar",
    },
    {
      id: "incomeStatement.section.table.BokslutsdispositionerAbstract.OvrigaBokslutsdispositioner",
      label: "Övriga bokslutsdispositioner",
    },
    {
      id: "incomeStatement.section.table.Bokslutsdispositioner",
      label: "Bokslutsdispositioner",
    },
  ],
  ResultatForeSkatt: [
    {
      id: "incomeStatement.section.table.ResultatForeSkatt",
      label: "Resultat före skatt",
    },
  ],
  SkatterAbstract: [
    { id: "incomeStatement.section.table.SkatterAbstract", label: "Skatter" },
    {
      id: "incomeStatement.section.table.SkatterAbstract.SkattAretsResultat",
      label: "Skatt årets resultat",
    },
    {
      id: "incomeStatement.section.table.SkatterAbstract.SkattAretsResultat.8910",
      label: "8910",
    },
    {
      id: "incomeStatement.section.table.SkatterAbstract.OvrigaSkatter",
      label: "Övriga skatter",
    },
  ],
  AretsResultat: [
    {
      id: "incomeStatement.section.table.AretsResultat",
      label: "Årets resultat",
    },
    { id: "incomeStatement.section.table.AretsResultat.8999", label: "8999" },
  ],
};

// Representation of the endpoint specifically for tax document /agoy-document/{clientId}/{documentId}/values/
export const TAX_DOCUMENT_REFERENCES: ValueReferences = {
  values: AgoyTaxDocumentValues,
}

export const MANAGEMENT_REPORT_REFERENCES: ValueReferences = {
  "Resultatdisposition Disposal": [
    {
      id: "managementReport.resultsDisposition.toDispose.3.value",
      label: "Fri överkusfond",
    },
    {
      id: "managementReport.resultsDisposition.toDispose.1.value",
      label: "Balanserat resultat",
    },
    {
      id: "managementReport.resultsDisposition.toDispose.2.value",
      label: "Årets resultat",
    },
    {
      id: "managementReport.resultsDisposition.total",
      label: "Summa",
    },
  ],
  "Resultatdisposition Proposal": [
    {
      id: "managementReport.resultsDisposition.proposal.repaymentOfConditionalShareholderContribution.value",
      label: "Återbetalning av villkorat aktieägartillskott",
    },
    {
      id: "managementReport.resultsDisposition.proposal.otherDividend.value",
      label: "Annan utdelning",
    },
    {
      id: "managementReport.resultsDisposition.proposal.1.value",
      label: "Utdelning",
    },
    {
      id: "managementReport.resultsDisposition.proposal.2.value",
      label: "Fondemission",
    },
    {
      id: "managementReport.resultsDisposition.proposal.3.value",
      label: "Avsättning till reservfond",
    },
    {
      id: "managementReport.resultsDisposition.proposal.4.value",
      label: "Ianspråktagande av reservfond",
    },
    {
      id: "managementReport.resultsDisposition.proposal.5.value",
      label: "Ianspråktagande av bunden överkursfond",
    },
    {
      id: "managementReport.resultsDisposition.proposal.6.value",
      label: "Ianspråkstagande av uppskrivningsfond",
    },
    {
      id: "managementReport.resultsDisposition.toTransfer.value",
      label: "Balanseras i ny räkning",
    },
    {
      id: "managementReport.resultsDisposition.inTotal.value",
      label: "Summa",
    },
  ],
  "Förändringar i eget kapital": [
    {
      id: "managementReport.changesInEquity.table.main.content.dividendToShareHolders.balanseratResultat.value",
      label: "Utdelning Balanserat resultat",
    },
  ],
}