export const symptomQuestions = {
  title: "Millaisia oireita sinulla on?",
  options: [
    {
      label: "Ei",
      value: "no"
    },
    {
      label: "Hieman",
      value: "some"
    },
    {
      label: "Paljon",
      value: "yes"
    }
  ],
  rows: [
    { label: "Kuume" },
    { label: "Yskä" },
    { label: "Kurkkukipu" },
    { label: "Hengenahdistus" },
    { label: "Lihaskipu" },
    { label: "Väsymys" }
  ]
};

export const otherQuestions = [
  {
    title: "Onko sinulta testattu koronavirustanrunta?",
    options: [
      {
        label: "Kyllä, positiivinen",
        value: "yesPositive"
      },
      {
        label: "Kyllä, negatiivinen",
        value: "yesNegative"
      },
      { label: "Ei", value: "no" }
    ]
  },
  {
    title:
      "Oletko ollut kontaktissa koronavirukseen sairastuneen tai sille altistuneen kanssa?",
    options: [
      { label: "Kyllä", value: "yes" },
      { label: "En", value: "no" }
    ]
  },
  {
    title: "Kuulutko riskiryhmään?",
    options: [
      { label: "Kyllä", value: "yes" },
      {
        label: "En tiedä",
        value: "dontKnow"
      },
      {
        label: "En kuulu",
        value: "no"
      }
    ]
  }
];
