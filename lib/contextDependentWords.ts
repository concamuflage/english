/** A word and its matching exercise; e.g. ingenuous pairs five supplied sentences with five meaning IDs. */
export type ContextDependentWord = {
  word: string;
  sentences: readonly { sentence: string; meaningId: string }[];
  meanings: readonly { id: string; text: string }[];
  reference: { label: string; href: string };
};

/** Shared list and matching content; meanings use a different order from sentences, e.g. "frank" is choice C. */
export const contextDependentWords: readonly ContextDependentWord[] = [
  {
    word: "ingenuous",
    sentences: [
      {
        sentence: "She gave an ingenuous answer when asked why she had missed the meeting.",
        meaningId: "frank"
      },
      {
        sentence: "She was too ingenuous to realize that the salesman was lying to her.",
        meaningId: "trusting"
      },
      {
        sentence: "His ingenuous question embarrassed everyone in the room.",
        meaningId: "social"
      },
      {
        sentence: "The child's ingenuous remarks made the adults laugh.",
        meaningId: "honest"
      },
      {
        sentence: "Her ingenuous smile made everyone trust her.",
        meaningId: "sincere"
      }
    ],
    meanings: [
      { id: "social", text: "innocent and unaware of social sensitivities" },
      { id: "sincere", text: "genuine, innocent, and sincere" },
      { id: "frank", text: "frank" },
      { id: "honest", text: "innocently honest and straightforward" },
      { id: "trusting", text: "naive, overly trusting" }
    ],
    reference: { label: "Collins Dictionary", href: "https://www.collinsdictionary.com/dictionary/english/ingenuous" }
  }
];
