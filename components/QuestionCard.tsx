"use client";

import { useId, useState, type ReactNode } from "react";

export type CardQuestion = {
  sentence: string;
  /** Optional choice instruction; e.g. "Choose the meaning of put on a clinic" for a meaning question. */
  choicePrompt?: string;
  choices: readonly string[];
  answer: string;
  alternativeAnswers?: readonly string[];
  explanation?: ReactNode;
};

type SelectionHandler = (index: number, choice: string) => void;

type QuestionCardProps = {
  name: string;
  questions: readonly CardQuestion[];
  selections?: Readonly<Record<number, string>>;
  onSelect?: SelectionHandler;
  layout?: "rows" | "single";
  header?: ReactNode;
  footer?: ReactNode;
};

/**
 * Renders one controlled question with shared radios and correct/incorrect styling.
 * Example: either listed answer in a pliant/pliable question receives green feedback.
 * Row layout retains numbered status icons; single layout reveals any supplied explanation after a choice.
 * Example: the inform exercise explains guide/influence only after selecting inform or announce.
 * Meaning questions can supply a choicePrompt, e.g. clinic asks for a phrase's meaning instead of a missing word.
 */
function Question({ question, selection, index, name, onSelect, layout }: {
  question: CardQuestion;
  selection?: string;
  index: number;
  name: string;
  onSelect: SelectionHandler;
  layout: "rows" | "single";
}) {
  const sentenceId = useId();
  const answered = selection !== undefined;
  const correctChoices = [question.answer, ...(question.alternativeAnswers ?? [])];
  const isCorrect = answered && correctChoices.includes(selection);
  const options = (
    <fieldset className="selection-row" aria-describedby={sentenceId}>
      <legend>{question.choicePrompt ?? (layout === "rows" ? `Question ${index + 1}` : "Choose the word that fits the blank")}</legend>
      <div className="selection-options">
        {question.choices.map((choice) => (
          <label
            className={[
              "selection-option",
              selection === choice ? "selection-option-selected" : "",
              answered && correctChoices.includes(choice) ? "selection-option-correct" : "",
              selection === choice && !isCorrect ? "selection-option-wrong" : ""
            ].filter(Boolean).join(" ")}
            key={choice}
          >
            <input
              checked={selection === choice}
              name={`${name}-question-${index}`}
              onChange={() => onSelect(index, choice)}
              type="radio"
              value={choice}
            />
            <span>{choice}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );

  if (layout === "single") {
    return (
      <>
        <p className="flashcard-sentence" id={sentenceId}>{question.sentence}</p>
        {options}
        <p className="meaning-question-feedback" role="status">
          {answered && (
            <><strong>{isCorrect ? "Correct." : `Incorrect. The answer is ${question.answer}.`}</strong> {question.explanation}</>
          )}
        </p>
      </>
    );
  }

  return (
    <div className="flashcard-question">
      <div className="question-line">
        <span className={`question-status${answered ? (isCorrect ? " correct-status" : " incorrect-status") : ""}`}>
          {answered ? (isCorrect ? "✓" : "!") : index + 1}
        </span>
        <p className="flashcard-sentence" id={sentenceId}>{question.sentence}</p>
      </div>
      {options}
    </div>
  );
}

/**
 * Shares the card shell, questions, answer choices, and feedback across vocabulary exercises.
 * Example: GRE supplies pronunciation headers, multiple rows, and a note footer;
 * the inform exercise supplies one question with two choices in single layout.
 * GRE keeps parent-controlled selections so switching pairs retains its existing reset behavior.
 * Standalone questions omit selections/onSelect to manage answers locally, e.g. the inform card needs no wrapper.
 */
export function QuestionCard({ name, questions, selections, onSelect, layout = "rows", header, footer }: QuestionCardProps) {
  const [localSelections, setLocalSelections] = useState<Record<number, string>>({});
  const currentSelections = selections ?? localSelections;

  /** Stores standalone answers or notifies a controlled parent; e.g. GRE handles question 0's `comma` selection. */
  function selectAnswer(index: number, choice: string) {
    if (selections === undefined) {
      setLocalSelections((current) => ({ ...current, [index]: choice }));
    }
    onSelect?.(index, choice);
  }

  const Card = layout === "single" ? "section" : "div";
  const content = questions.map((question, index) => (
    <Question
      key={question.sentence}
      question={question}
      selection={currentSelections[index]}
      index={index}
      name={name}
      onSelect={selectAnswer}
      layout={layout}
    />
  ));

  return (
    <Card className={`flashcard${layout === "single" ? " meaning-question-card" : ""}`} aria-label={layout === "single" ? "Word meaning question" : undefined}>
      {header}
      {layout === "rows" ? <div className="question-stack">{content}</div> : content}
      {footer}
    </Card>
  );
}
