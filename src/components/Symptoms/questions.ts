export const symptomQuestions = {
  title: 'Millaisia oireita sinulla on?',
  options: [
    {
      label: 'Ei',
      value: 'no',
    },
    {
      label: 'Hieman',
      value: 'some',
    },
    {
      label: 'Paljon',
      value: 'yes',
    },
  ],
  rows: [
    { id: 'fever', label: 'Kuume' },
    { id: 'cough', label: 'Yskä' },
    { id: 'soreThroat', label: 'Kurkkukipu' },
    { id: 'shortOfBreath', label: 'Hengenahdistus' },
    { id: 'musclePain', label: 'Lihaskipu' },
    { id: 'fatigue', label: 'Väsymys' },
  ],
}

export const otherQuestions = [
  {
    id: 'hasInfection',
    title: 'Onko sinulta testattu koronavirustanrunta?',
    options: [
      {
        label: 'Kyllä, positiivinen',
        value: 'yesPositive',
      },
      {
        label: 'Kyllä, negatiivinen',
        value: 'yesNegative',
      },
      { label: 'Ei', value: 'no' },
    ],
  },
  {
    id: 'hasBeenInContact',
    title:
      'Oletko ollut kontaktissa koronavirukseen sairastuneen tai sille altistuneen kanssa?',
    options: [
      { label: 'Kyllä', value: 'yes' },
      { label: 'En', value: 'no' },
    ],
  },
  {
    id: 'isInRiskGroup',
    title: 'Kuulutko riskiryhmään?',
    options: [
      { label: 'Kyllä', value: 'yes' },
      {
        label: 'En tiedä',
        value: 'dontKnow',
      },
      {
        label: 'En kuulu',
        value: 'no',
      },
    ],
  },
]
