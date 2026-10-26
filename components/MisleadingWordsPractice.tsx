"use client";

import { useEffect, useRef, useState } from "react";
import { QuestionCard } from "@/components/QuestionCard";
import { misleadingWords } from "@/lib/misleadingWords";

/**
 * Pairs a selectable word list with meaning practice, matching the Confusing Words layout.
 * Example: spendthrift opens beside the list on desktop and in a dialog on mobile.
 * Numbered questions use the Confusing Words card, with no explanation after choosing an answer.
 * Example: spendthrift's two mnemonics appear only when Note is expanded.
 * Reopening a word starts an unanswered exercise.
 */
export function MisleadingWordsPractice() {
  const [selectedWord, setSelectedWord] = useState(misleadingWords[0].word);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [selections, setSelections] = useState<Record<number, string>>({});
  const dialogRef = useRef<HTMLDialogElement>(null);
  const selected = misleadingWords.find((entry) => entry.word === selectedWord) ?? misleadingWords[0];
  const visibleWords = misleadingWords.filter((entry) => entry.word.includes(searchQuery.trim().toLowerCase()));

  useEffect(() => {
    const media = window.matchMedia("(max-width: 860px)");

    /** Matches the shared CSS breakpoint; for example, resizing to 900px closes the mobile dialog. */
    function syncViewport() {
      setIsMobile(media.matches);
      if (!media.matches) dialogRef.current?.close();
    }

    syncViewport();
    media.addEventListener("change", syncViewport);
    return () => media.removeEventListener("change", syncViewport);
  }, []);

  /** Opens a fresh exercise; for example, tapping spendthrift on a phone shows its two answer choices. */
  function selectWord(word: string) {
    setSelectedWord(word);
    setSelections({});
    if (isMobile) dialogRef.current?.showModal();
  }

  /** Stores an answer for feedback; for example, question 0 accepts `not thrifty`. */
  function selectAnswer(index: number, choice: string) {
    setSelections((current) => ({ ...current, [index]: choice }));
  }

  /** Closes the native dialog and restores focus to its word button, including after Escape. */
  function closeCard() {
    dialogRef.current?.close();
  }

  const practiceCard = (
    <QuestionCard
      name={`misleading-${selected.word}`}
      questions={selected.questions}
      selections={selections}
      onSelect={selectAnswer}
      header={
        <div className="flashcard-topline">
          <span className="pair-pronunciations"><span>{selected.word}</span></span>
        </div>
      }
      footer={
        <>
          <details className="practice-note" key={selected.word}>
            <summary>Note</summary>
            <p><strong>Mnemonics</strong></p>
            {selected.mnemonics.map((mnemonic, index) => <p key={mnemonic}>{index + 1}. {mnemonic}</p>)}
          </details>
          {isMobile && (
            <div className="practice-card-actions">
              <button className="practice-close-button" type="button" onClick={closeCard} aria-label="Close practice card">
                <span aria-hidden="true">×</span>
              </button>
            </div>
          )}
        </>
      }
    />
  );

  return (
    <div className="confusing-words-workspace">
      <aside className="pair-list" aria-label="Misleading words">
        {isMobile && (
          <div className="word-list-search">
            <input
              aria-label="Search words"
              aria-controls="misleading-word-results"
              autoComplete="off"
              placeholder="Search words…"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>
        )}
        <div id="misleading-word-results" className="word-list-results">
          {visibleWords.map((entry) => (
            <button
              className={`pair-button${entry.word === selectedWord ? " pair-button-active" : ""}`}
              key={entry.word}
              type="button"
              aria-pressed={entry.word === selectedWord}
              onClick={() => selectWord(entry.word)}
            >
              {entry.word}
            </button>
          ))}
          {visibleWords.length === 0 && <p role="status">No matching words.</p>}
        </div>
      </aside>
      {!isMobile && <section className="flashcard-shell" aria-label="Selected word practice" aria-live="polite">{practiceCard}</section>}
      <dialog ref={dialogRef} className="practice-dialog" aria-label={`Practice ${selected.word}`}>
        {isMobile && practiceCard}
      </dialog>
    </div>
  );
}
