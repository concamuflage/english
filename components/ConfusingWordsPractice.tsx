"use client";

import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { ConfusingWordPair, ConfusingWordQuestion } from "@/lib/confusingWords";
import { CONFUSING_WORDS_DESCRIPTION, CONFUSING_WORDS_PATH, CONFUSING_WORDS_TITLE, getConfusingWordMetadata, getConfusingWordPath } from "@/lib/confusingWordRoutes";

type FeedbackState = {
  choice: string;
  isCorrect: boolean;
};

type FeedbackByQuestion = Record<number, FeedbackState>;

type ConfusingWordsPracticeProps = {
  pairs: ConfusingWordPair[];
  initialSlug?: string;
};

const LAST_PAIR_STORAGE_KEY = "confusing-words:last-pair";

// Keep saved selections on their merged cards, e.g. ellipse-ellipsis resumes the new three-word group.
const MERGED_GROUP_SLUGS: Readonly<Record<string, string>> = {
  "jagged-ragged": "jagged-rugged-ragged",
  "rugged-ragged": "jagged-rugged-ragged",
  "ellipse-ellipsis": "ellipsis-ellipse-eclipse"
};

/** Normalizes word searches; e.g. ` MÉLANGE ` and `melange` both become `melange`. */
function normalizeWordSearch(value: string) {
  return value.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/** Accepts the primary answer or an alternative; e.g. both fathomless and unfathomable fit ocean depths. */
function isCorrectAnswer(question: ConfusingWordQuestion, choice: string) {
  return choice === question.answer || question.alternativeAnswers?.includes(choice) === true;
}

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
 * Renders text, comparison tables, and image notes inside a collapsed-by-default disclosure.
 *
 * Example: a `coma-comma` note can explain that `coma` is a medical state and `comma` is punctuation.
 * Expanding the `apothegm-apothem` note reveals the supplied diagram without a caption.
 * The expletive/invective note displays a table, then its key distinction and examples.
 * The emboss/deboss note keeps the embossed photo on the left and debossed photo on the right.
 * Wide diagrams, e.g. the quantile/quartile bars, use the available note width without cropping.
 * The quantile/quartile explanation renders paragraphs and bullet points above its diagram.
 */
function PracticeNote({ note, noteImage, noteImages }: Pick<ConfusingWordPair, "note" | "noteImage" | "noteImages">) {
  if (!note && !noteImage && !noteImages?.length) {
    return null;
  }

  return (
    <details className="practice-note">
      <summary>Note</summary>
      {typeof note === "string" && <p>{note}</p>}
      {note && typeof note !== "string" && "paragraphs" in note && (
        <>
          {note.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <ul>{note.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
        </>
      )}
      {note && typeof note !== "string" && "table" in note && (
        <>
          <table className="practice-note-table">
            <thead>
              <tr>{note.table.columns.map((column, index) => <th key={index} scope="col">{column}</th>)}</tr>
            </thead>
            <tbody>
              {note.table.rows.map(([label, ...cells]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  {cells.map((cell, index) => <td key={index}>{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
          <p><strong>{note.heading}</strong></p>
          <ul>{note.examples.map((example) => <li key={example}>{example}</li>)}</ul>
          <p>{note.conclusion}</p>
        </>
      )}
      {noteImage && (
        <Image
          className={noteImage.wide ? "practice-note-diagram" : "practice-note-image"}
          src={noteImage.src}
          alt={noteImage.alt}
          width={noteImage.width}
          height={noteImage.height}
        />
      )}
      {noteImages && (
        <div className="practice-note-gallery">
          {noteImages.map(({ caption, ...photo }) => (
            <figure key={photo.src}>
              <Image {...photo} sizes="(max-width: 860px) 40vw, 360px" />
              <figcaption>{caption}</figcaption>
            </figure>
          ))}
        </div>
      )}
    </details>
  );
}

/**
 * Renders the pair list and flashcard practice interaction for confusing words.
 *
 * Example: selecting `coma / comma` shows its questions; page scrolling hides pair buttons above the sticky card.
 * Every heading shows each word and its IPA on a separate line, e.g. `coma / ˈkoʊmə /`.
 * Three-word groups, e.g. jagged / rugged / ragged, show three choices for every question.
 * Saved selections for merged pairs, e.g. ellipse / ellipsis, resume the replacement group.
 * Reopening the page resumes a saved pair such as `blight-plight` with unanswered questions.
 * On mobile, tapping a pair opens a modal; closing it returns to the same place in the vertical list.
 * The mobile card's bottom Next button advances alphabetically with unanswered questions.
 * Its progress indicator shows list position, e.g. pair 1 of 245 with 244 pairs left, not completed practice.
 * Mobile actions place Next in the bottom center and the close icon at the lower right.
 * Mobile search filters any word in a group; e.g. `ragged` finds jagged / rugged / ragged.
 * Questions may accept multiple choices, e.g. fathomless and unfathomable for ocean depths.
 * Word links update the URL without replacing the card UI; direct URLs override saved progress.
 * Example: `/english/gre/confusing-words/factitious-facetious` starts with that group's content in HTML.
 */
export function ConfusingWordsPractice({ pairs, initialSlug }: ConfusingWordsPracticeProps) {
  const pathname = usePathname();
  const [selectedSlug, setSelectedSlug] = useState(initialSlug ?? pairs[0]?.slug ?? "");
  const [feedbackByQuestion, setFeedbackByQuestion] = useState<FeedbackByQuestion>({});
  const [pairToResume, setPairToResume] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(Boolean(initialSlug));
  const [searchQuery, setSearchQuery] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const activePairButtonRef = useRef<HTMLAnchorElement>(null);
  const hasRestoredSelectionRef = useRef(false);
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

  const visiblePairs = useMemo(() => {
    const query = normalizeWordSearch(searchQuery);
    // Filtering only changes the mobile list; the current card and saved selection stay intact.
    return isMobile && query
      ? pairs.filter((pair) => pair.words.some((word) => normalizeWordSearch(word).includes(query)))
      : pairs;
  }, [pairs, searchQuery, isMobile]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 860px)");
    /** Keeps modal behavior aligned with the layout; e.g. desktop resizing closes the mobile popup. */
    function updateMobileLayout() {
      setIsMobile(media.matches);
      if (!media.matches) setIsCardOpen(false);
    }
    updateMobileLayout();
    media.addEventListener("change", updateMobileLayout);
    return () => media.removeEventListener("change", updateMobileLayout);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isMobile || !isCardOpen || !dialog) return;

    // Native modal behavior traps focus and makes the underlying list inert.
    const scrollY = window.scrollY;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.style.overflow = "hidden";
    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
      activePairButtonRef.current?.focus({ preventScroll: true });
      window.scrollTo({ top: scrollY, behavior: "instant" });
    };
  }, [isMobile, isCardOpen]);

  useEffect(() => {
    // URL selection wins over saved progress. History retains the collection's selection on Back.
    const urlPair = pairs.find((pair) => getConfusingWordPath(pair.slug) === pathname);
    let savedSlug: string | null = null;
    try {
      savedSlug = window.localStorage.getItem(LAST_PAIR_STORAGE_KEY);
    } catch {
      // A direct group URL works even if browser storage is unavailable.
    }
    const resumedSlug = savedSlug ? MERGED_GROUP_SLUGS[savedSlug] ?? savedSlug : null;
    const historySlug = window.history.state?.practiceSlug;
    const pair = urlPair
      ?? pairs.find((item) => item.slug === historySlug)
      ?? pairs.find((item) => item.slug === resumedSlug)
      ?? pairs[0];
    if (!pair) return;

    setSelectedSlug(pair.slug);
    setFeedbackByQuestion({});
    setIsCardOpen(Boolean(urlPair) && window.matchMedia("(max-width: 860px)").matches);
    // Only initial arrival scrolls to the selected list entry; ordinary choices preserve page position.
    if (!hasRestoredSelectionRef.current) {
      hasRestoredSelectionRef.current = true;
      if (urlPair || savedSlug || historySlug) setPairToResume(pair.slug);
    }
    try {
      window.localStorage.setItem(LAST_PAIR_STORAGE_KEY, pair.slug);
    } catch {
      // Storage restrictions must not interfere with URL navigation or practice.
    }
  }, [pairs, pathname]);

  useEffect(() => {
    const pair = pairs.find((item) => getConfusingWordPath(item.slug) === pathname);
    const metadata = pair ? getConfusingWordMetadata(pair) : {
      title: CONFUSING_WORDS_TITLE,
      description: CONFUSING_WORDS_DESCRIPTION,
      canonical: `https://bumblebee.work${CONFUSING_WORDS_PATH}`
    };
    // Native history preserves the UI, so keep its metadata aligned with the exported destination HTML.
    document.title = metadata.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", metadata.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", metadata.canonical);
  }, [pairs, pathname]);

  useEffect(() => {
    if (!pairToResume || pairToResume !== selectedSlug) {
      return;
    }

    // Resume at the saved button, leaving the mobile popup closed until the user taps it.
    const frame = window.requestAnimationFrame(() => {
      const button = activePairButtonRef.current;
      button?.scrollIntoView({
        block: window.matchMedia("(max-width: 860px)").matches ? "center" : "end",
        inline: "nearest",
        behavior: "instant"
      });
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
  }, [selectedPair, isMobile]);

  if (!selectedPair) {
    return null;
  }

  const choices = selectedPair.words;
  const pairPosition = pairs.findIndex((pair) => pair.slug === selectedPair.slug) + 1;
  const nextPair = pairs[pairPosition];

  /**
   * Selects and remembers a pair while clearing the card's previous answers.
   *
   * Example: clicking `weather / whether` saves `weather-whether` locally and loads unanswered questions.
   * On mobile, the same tap opens the practice popup.
   * The URL becomes `/english/gre/confusing-words/weather-whether` without reloading or scrolling.
   */
  function selectPair(slug: string) {
    const path = getConfusingWordPath(slug);
    if (window.location.pathname !== path) {
      // Preserve the current selection in the history entry before adding the next group.
      window.history.replaceState({ ...window.history.state, practiceSlug: selectedSlug }, "");
      window.history.pushState({ practiceSlug: slug }, "", path);
    }
    setPairToResume(null);
    setSelectedSlug(slug);
    setFeedbackByQuestion({});
    if (window.matchMedia("(max-width: 860px)").matches) {
      setIsCardOpen(true);
    }
    try {
      window.localStorage.setItem(LAST_PAIR_STORAGE_KEY, slug);
    } catch {
      // A failed browser-storage write must not prevent selecting or studying a pair.
    }
  }

  /** Keeps normal new-tab links working; an ordinary click, e.g. coma / comma, updates the existing card. */
  function selectPairFromLink(event: MouseEvent<HTMLAnchorElement>, slug: string) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    selectPair(slug);
  }

  /** Closes mobile practice; e.g. Close or Escape returns to the selected pair in the list. */
  function closePracticeCard() {
    setIsCardOpen(false);
  }

  /**
   * Advances the mobile popup to the next pair and returns to its heading.
   *
   * Example: Next moves `abstruse / obstruct` to `abyssal / abysmal`, clearing answers
   * and saving the new slug. The button is disabled on the final pair.
   */
  function selectNextPair() {
    if (!nextPair) return;
    selectPair(nextPair.slug);
    // Wait for the new questions to render before resetting a long card's scroll position.
    window.requestAnimationFrame(() => {
      dialogRef.current?.scrollTo({ top: 0, behavior: "instant" });
      dialogRef.current?.querySelector<HTMLElement>(".pair-pronunciations")?.focus({ preventScroll: true });
    });
  }

  /**
   * Checks one sentence answer and stores visual-only feedback for its selection row.
   *
   * Example: choosing `comma` for `He fell into a ____.` marks question 1 as wrong.
   * A listed alternative, e.g. unfathomable for ocean depths, receives correct feedback too.
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
        isCorrect: isCorrectAnswer(question, choice)
      }
    }));
  }

  const practiceCard = (
        <div className="flashcard">
          <div className="flashcard-topline">
            <span className="pair-pronunciations" tabIndex={isMobile ? -1 : undefined}>
              {selectedPair.words.map((word, index) => (
                <span key={word}>{word} {selectedPair.pronunciations[index]}</span>
              ))}
            </span>
          </div>
          <div className="question-stack">
            {displayedQuestions.map((question, questionIndex) => {
              const feedback = feedbackByQuestion[questionIndex];

              return (
                <div className="flashcard-question" key={question.sentence}>
                  <div className="question-line">
                    <span className={`question-status${feedback ? (feedback.isCorrect ? " correct-status" : " incorrect-status") : ""}`}>
                      {feedback ? (feedback.isCorrect ? "✓" : "!") : questionIndex + 1}
                    </span>
                    <p className="flashcard-sentence">{question.sentence}</p>
                  </div>
                  <fieldset className="selection-row">
                    <legend>Question {questionIndex + 1}</legend>
                    <div className="selection-options">
                      {choices.map((choice) => {
                        const isSelected = feedback?.choice === choice;
                        const isCorrectChoice = feedback && isCorrectAnswer(question, choice);
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
          <PracticeNote note={selectedPair.note} noteImage={selectedPair.noteImage} noteImages={selectedPair.noteImages} />
          {isMobile && (
            <div className="practice-card-actions">
              <button className="practice-next-button" type="button" onClick={selectNextPair} disabled={!nextPair}>
                Next
              </button>
              <button className="practice-close-button" type="button" onClick={closePracticeCard} aria-label="Close practice card">
                <span aria-hidden="true">×</span>
              </button>
            </div>
          )}
        </div>
  );

  return (
    <div className="confusing-words-workspace">
      <aside ref={pairListRef} className="pair-list" aria-label="Confusing word pairs">
        {isMobile && (
          <div className="word-list-search">
            <input
              aria-label="Search words"
              aria-controls="word-list-results"
              autoComplete="off"
              placeholder="Search words…"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>
        )}
        <div id="word-list-results" className="word-list-results">
          {visiblePairs.map((pair) => (
            <a
              className={pair.slug === selectedPair.slug ? "pair-button pair-button-active" : "pair-button"}
              key={pair.slug}
              ref={pair.slug === selectedPair.slug ? activePairButtonRef : null}
              href={getConfusingWordPath(pair.slug)}
              onClick={(event) => selectPairFromLink(event, pair.slug)}
            >
              <span>
                {pair.words.join(" / ")}
              </span>
            </a>
          ))}
          {isMobile && visiblePairs.length === 0 && <p role="status">No matching words.</p>}
        </div>
      </aside>

      {!isMobile && (
        <section ref={cardShellRef} className="flashcard-shell" aria-live="polite">
          {practiceCard}
        </section>
      )}
      <dialog
        ref={dialogRef}
        className="practice-dialog"
        aria-label={`Practice ${selectedPair.words.join(", ")}`}
        onCancel={closePracticeCard}
        onClose={closePracticeCard}
      >
        <div className="practice-dialog-toolbar">
          <div className="practice-progress">
            <span>Pair {pairPosition} of {pairs.length} · {pairs.length - pairPosition} left</span>
            <progress
              value={pairPosition}
              max={pairs.length}
              aria-label="Word pair position"
              aria-valuetext={`Pair ${pairPosition} of ${pairs.length}, ${pairs.length - pairPosition} pairs left`}
            />
          </div>
        </div>
        {isMobile && practiceCard}
      </dialog>
    </div>
  );
}
