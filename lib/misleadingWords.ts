import type { CardQuestion } from "@/components/QuestionCard";

/** A misleading-looking word and its hint-free exercise; for example, spendthrift tests `not thrifty`. */
export type MisleadingWord = {
  word: string;
  questions: readonly CardQuestion[];
  /** Memory aids shown only in Note; for example, spendthrift puts “spend” before “thrift.” */
  mnemonics: readonly string[];
};

/** Word-list entries; add future words here to include their selection button and practice card together. */
export const misleadingWords: readonly MisleadingWord[] = [
  {
    word: "spendthrift",
    questions: [{
      sentence: "Daniel is a spendthrift. This means he is ____.",
      choices: ["thrifty", "not thrifty"],
      answer: "not thrifty"
    }],
    mnemonics: [
      "“Spend” and “thrift” contradict each other, but “spend” comes first, so a spendthrift likes spending!",
      "A spendthrift is the opposite of someone who spends thriftily."
    ]
  }
];
