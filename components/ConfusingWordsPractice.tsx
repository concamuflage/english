"use client";

import { useMemo, useState } from "react";
import type { ConfusingWordPair } from "@/lib/confusingWords";

type FeedbackState = {
  choice: string;
  isCorrect: boolean;
};

type FeedbackByQuestion = Record<number, FeedbackState>;

type ConfusingWordsPracticeProps = {
  pairs: ConfusingWordPair[];
};

/**
 * Produces a stable numeric sort weight for a question on a selected card.
 *
 * Example: `getQuestionSortWeight("coma-comma", "Add a ____ after the phrase.")` always returns the same weight.
 */
function getQuestionSortWeight(cardSlug: string, sentence: string) {
  return [...`${cardSlug}:${sentence}`].reduce((hash, character) => {
    return (hash * 31 + character.charCodeAt(0)) >>> 0;
  }, 2166136261);
}

/**
 * Returns a stable shuffled copy of the selected card's questions.
 *
 * Example: passing the `coma / comma` card can render its comma sentence before its coma sentence.
 */
function shuffleQuestions(cardSlug: string, questions: ConfusingWordPair["questions"]) {
  return [...questions].sort((leftQuestion, rightQuestion) => {
    return (
      getQuestionSortWeight(cardSlug, leftQuestion.sentence) -
      getQuestionSortWeight(cardSlug, rightQuestion.sentence)
    );
  });
}

/**
 * Renders an expandable note for a practice card when note text exists.
 *
 * Example: a `coma-comma` note can explain that `coma` is a medical state and `comma` is punctuation.
 */
function PracticeNote({ note }: { note?: string }) {
  if (!note) {
    return null;
  }

  return (
    <details className="practice-note">
      <summary>Note</summary>
      <p>{note}</p>
    </details>
  );
}

/**
 * Renders the pair list and flashcard practice interaction for confusing words.
 *
 * Example: selecting `coma / comma` shows every sentence on that card with `coma` and `comma` as choices.
 */
export function ConfusingWordsPractice({ pairs }: ConfusingWordsPracticeProps) {
  const [selectedSlug, setSelectedSlug] = useState(pairs[0]?.slug ?? "");
  const [feedbackByQuestion, setFeedbackByQuestion] = useState<FeedbackByQuestion>({});

  const selectedPair = useMemo(
    () => pairs.find((pair) => pair.slug === selectedSlug) ?? pairs[0],
    [pairs, selectedSlug]
  );

  const displayedQuestions = useMemo(
    () => (selectedPair ? shuffleQuestions(selectedPair.slug, selectedPair.questions) : []),
    [selectedPair]
  );

  if (!selectedPair) {
    return null;
  }

  const choices = [selectedPair.wordOne, selectedPair.wordTwo];

  /**
   * Selects a pair and clears the card's previous answers.
   *
   * Example: clicking `weather / whether` loads its single pair card with no selected answers.
   */
  function selectPair(slug: string) {
    setSelectedSlug(slug);
    setFeedbackByQuestion({});
  }

  /**
   * Checks one sentence answer and stores visual-only feedback for its selection row.
   *
   * Example: choosing `comma` for `He fell into a ____.` marks question 1 as wrong.
   */
  function selectAnswer(questionIndex: number, choice: string) {
    const question = displayedQuestions[questionIndex];

    // Ignore stale clicks from a previous card if this row no longer exists.
    if (!question) {
      return;
    }

    setFeedbackByQuestion((currentFeedback) => ({
      ...currentFeedback,
      [questionIndex]: {
        choice,
        isCorrect: choice === question.answer
      }
    }));
  }

  return (
    <div className="confusing-words-workspace">
      <aside className="pair-list" aria-label="Confusing word pairs">
        {pairs.map((pair) => (
          <button
            className={pair.slug === selectedPair.slug ? "pair-button pair-button-active" : "pair-button"}
            key={pair.slug}
            onClick={() => selectPair(pair.slug)}
            type="button"
          >
            <span>
              {pair.wordOne} / {pair.wordTwo}
            </span>
          </button>
        ))}
      </aside>

      <section className="flashcard-shell" aria-live="polite">
        <div className="flashcard">
          <div className="flashcard-topline">
            <span>
              {selectedPair.wordOne} / {selectedPair.wordTwo}
            </span>
          </div>
          <div className="question-stack">
            {displayedQuestions.map((question, questionIndex) => {
              const feedback = feedbackByQuestion[questionIndex];

              return (
                <div className="flashcard-question" key={question.sentence}>
                  <div className="question-line">
                    <span className={feedback?.isCorrect ? "question-status correct-status" : "question-status"}>
                      {feedback ? (feedback.isCorrect ? "✓" : "!") : questionIndex + 1}
                    </span>
                    <p className="flashcard-sentence">{question.sentence}</p>
                  </div>
                  <fieldset className="selection-row">
                    <legend>Question {questionIndex + 1}</legend>
                    <div className="selection-options">
                      {choices.map((choice) => {
                        const isSelected = feedback?.choice === choice;
                        const isCorrectChoice = feedback && choice === question.answer;
                        const selectionClassName = [
                          "selection-option",
                          isSelected ? "selection-option-selected" : "",
                          isSelected && !feedback.isCorrect ? "selection-option-wrong" : "",
                          isCorrectChoice ? "selection-option-correct" : ""
                        ]
                          .filter(Boolean)
                          .join(" ");

                        return (
                          <label className={selectionClassName} key={choice}>
                            <input
                              checked={isSelected}
                              name={`${selectedPair.slug}-question-${questionIndex}`}
                              onChange={() => selectAnswer(questionIndex, choice)}
                              type="radio"
                              value={choice}
                            />
                            <span>{choice}</span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                </div>
              );
            })}
          </div>
          <PracticeNote note={selectedPair.note} />
        </div>
      </section>
    </div>
  );
}
