"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import type { ConfusingWordPair } from "@/lib/confusingWords";

type FeedbackState = {
  choice: string;
  isCorrect: boolean;
};

type FeedbackByQuestion = Record<number, FeedbackState>;

type ConfusingWordsPracticeProps = {
  pairs: ConfusingWordPair[];
};

const LAST_PAIR_STORAGE_KEY = "confusing-words:last-pair";

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
 * Renders text and image notes inside the same collapsed-by-default disclosure.
 *
 * Example: a `coma-comma` note can explain that `coma` is a medical state and `comma` is punctuation.
 * Expanding the `apothegm-apothem` note reveals the supplied diagram without a caption.
 */
function PracticeNote({ note, noteImage }: Pick<ConfusingWordPair, "note" | "noteImage">) {
  if (!note && !noteImage) {
    return null;
  }

  return (
    <details className="practice-note">
      <summary>Note</summary>
      {note && <p>{note}</p>}
      {noteImage && <Image className="practice-note-image" {...noteImage} />}
    </details>
  );
}

/**
 * Renders the pair list and flashcard practice interaction for confusing words.
 *
 * Example: selecting `coma / comma` shows its questions; page scrolling hides pair buttons above the sticky card.
 * Every heading shows each word and its IPA on a separate line, e.g. `coma / ˈkoʊmə /`.
 * Reopening the page resumes a saved pair such as `blight-plight` with unanswered questions.
 */
export function ConfusingWordsPractice({ pairs }: ConfusingWordsPracticeProps) {
  const [selectedSlug, setSelectedSlug] = useState(pairs[0]?.slug ?? "");
  const [feedbackByQuestion, setFeedbackByQuestion] = useState<FeedbackByQuestion>({});
  const [pairToResume, setPairToResume] = useState<string | null>(null);
  const activePairButtonRef = useRef<HTMLButtonElement>(null);
  const pairListRef = useRef<HTMLElement>(null);
  const cardShellRef = useRef<HTMLElement>(null);

  const selectedPair = useMemo(
    () => pairs.find((pair) => pair.slug === selectedSlug) ?? pairs[0],
    [pairs, selectedSlug]
  );

  const displayedQuestions = useMemo(
    () => (selectedPair ? shuffleQuestions(selectedPair.slug, selectedPair.questions) : []),
    [selectedPair]
  );

  useEffect(() => {
    // Read after hydration so the server and initial browser render both use the first pair.
    try {
      const savedSlug = window.localStorage.getItem(LAST_PAIR_STORAGE_KEY);
      if (!savedSlug) {
        return;
      }

      const slug = pairs.find((pair) => pair.slug === savedSlug)?.slug ?? pairs[0]?.slug;
      if (!slug) {
        return;
      }

      setSelectedSlug(slug);
      setFeedbackByQuestion({});
      setPairToResume(slug);
      // Replace a deleted pair's saved slug with the first available pair, e.g. coma-comma.
      if (slug !== savedSlug) {
        window.localStorage.setItem(LAST_PAIR_STORAGE_KEY, slug);
      }
    } catch {
      // Storage may be blocked; the page still works with its default selection.
    }
  }, [pairs]);

  useEffect(() => {
    if (!pairToResume || pairToResume !== selectedSlug) {
      return;
    }

    // Align the button with the viewport bottom so late-list cards retain room below the sticky header.
    const frame = window.requestAnimationFrame(() => {
      activePairButtonRef.current?.scrollIntoView({ block: "end", inline: "nearest", behavior: "instant" });
      setPairToResume(null);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pairToResume, selectedSlug]);

  useEffect(() => {
    const pairList = pairListRef.current;
    const cardShell = cardShellRef.current;

    if (!pairList || !cardShell) {
      return;
    }

    /**
     * Clips the scrolling list at the sticky card's actual top edge on desktop.
     *
     * Example: a list top of -100px and card top of 138px hide the first 238px of the list.
     */
    function updateListClip() {
      if (!pairList || !cardShell) {
        return;
      }

      const clipTop = window.matchMedia("(min-width: 861px)").matches
        ? Math.max(0, cardShell.getBoundingClientRect().top - pairList.getBoundingClientRect().top)
        : 0;

      // Clipping preserves the full list height, so the page keeps its normal right-side scrollbar.
      pairList.style.setProperty("--pair-list-clip-top", `${clipTop}px`);
    }

    updateListClip();
    window.addEventListener("scroll", updateListClip, { passive: true });
    window.addEventListener("resize", updateListClip);
    const observer = new ResizeObserver(updateListClip);
    observer.observe(cardShell);
    observer.observe(pairList);

    return () => {
      window.removeEventListener("scroll", updateListClip);
      window.removeEventListener("resize", updateListClip);
      observer.disconnect();
    };
  }, [selectedPair]);

  if (!selectedPair) {
    return null;
  }

  const choices = [selectedPair.wordOne, selectedPair.wordTwo];

  /**
   * Selects and remembers a pair while clearing the card's previous answers.
   *
   * Example: clicking `weather / whether` saves `weather-whether` locally and loads unanswered questions.
   */
  function selectPair(slug: string) {
    setPairToResume(null);
    setSelectedSlug(slug);
    setFeedbackByQuestion({});
    try {
      window.localStorage.setItem(LAST_PAIR_STORAGE_KEY, slug);
    } catch {
      // A failed browser-storage write must not prevent selecting or studying a pair.
    }
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
      <aside ref={pairListRef} className="pair-list" aria-label="Confusing word pairs">
        {pairs.map((pair) => (
          <button
            className={pair.slug === selectedPair.slug ? "pair-button pair-button-active" : "pair-button"}
            key={pair.slug}
            ref={pair.slug === selectedPair.slug ? activePairButtonRef : null}
            onClick={() => selectPair(pair.slug)}
            type="button"
          >
            <span>
              {pair.wordOne} / {pair.wordTwo}
            </span>
          </button>
        ))}
      </aside>

      <section ref={cardShellRef} className="flashcard-shell" aria-live="polite">
        <div className="flashcard">
          <div className="flashcard-topline">
            <span className="pair-pronunciations">
              <span>{selectedPair.wordOne} {selectedPair.pronunciations[0]}</span>
              <span>{selectedPair.wordTwo} {selectedPair.pronunciations[1]}</span>
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
          <PracticeNote note={selectedPair.note} noteImage={selectedPair.noteImage} />
        </div>
      </section>
    </div>
  );
}
