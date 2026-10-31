"use client";

import { useEffect, useRef, useState } from "react";
import { ContextMeaningMatchingCard } from "@/components/ContextMeaningMatchingCard";
import { contextDependentWords } from "@/lib/contextDependentWords";

/**
 * Pairs a selectable word list with context questions using the existing vocabulary layouts.
 * Example: ingenuous pairs five supplied sentences with meanings beside the list or in a phone dialog.
 * Selecting a word resets its answers; the mobile search filters the list without changing the exercise.
 */
export function ContextDependentWordsPractice() {
  const [selectedWord, setSelectedWord] = useState(contextDependentWords[0].word);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [selections, setSelections] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const selected = contextDependentWords.find((entry) => entry.word === selectedWord) ?? contextDependentWords[0];
  const visibleWords = contextDependentWords.filter((entry) => entry.word.toLowerCase().includes(searchQuery.trim().toLowerCase()));

  useEffect(() => {
    const media = window.matchMedia("(max-width: 860px)");

    /** Matches the shared CSS breakpoint; e.g. resizing to 900px closes the dialog and shows the side card. */
    function syncViewport() {
      setIsMobile(media.matches);
      if (!media.matches) dialogRef.current?.close();
    }

    syncViewport();
    media.addEventListener("change", syncViewport);
    return () => media.removeEventListener("change", syncViewport);
  }, []);

  /** Opens an unanswered exercise; e.g. tapping ingenuous on a phone opens its five-pair dialog. */
  function selectWord(word: string) {
    setSelectedWord(word);
    setSelections({});
    setChecked(false);
    if (isMobile) dialogRef.current?.showModal();
  }

  /** Updates a pair and clears the prior score; e.g. assigning C to sentence 1 leaves the other pairs intact. */
  function selectAnswer(index: number, meaningId: string) {
    setSelections((current) => ({ ...current, [index]: meaningId }));
    setChecked(false);
  }

  /** Grades only after the reader submits all pairs, e.g. five matching meaning IDs produce 5 of 5. */
  function checkMatches() {
    if (selected.sentences.every((_, index) => Boolean(selections[index]))) setChecked(true);
  }

  /** Clears all pairs and their feedback; e.g. Reset returns all five selects to Choose a meaning. */
  function resetMatches() {
    setSelections({});
    setChecked(false);
  }

  /** Closes the practice dialog and restores focus to its word button, including after keyboard use. */
  function closeCard() {
    dialogRef.current?.close();
  }

  const practiceCard = (
    <ContextMeaningMatchingCard
      entry={selected}
      selections={selections}
      checked={checked}
      onSelect={selectAnswer}
      onCheck={checkMatches}
      onReset={resetMatches}
      onClose={isMobile ? closeCard : undefined}
    />
  );

  return (
    <div className="confusing-words-workspace context-meaning-practice">
      <aside className="pair-list" aria-label="Words whose meaning depends on context">
        <h2 className="context-meaning-list-title">Words</h2>
        {isMobile && (
          <div className="word-list-search">
            <input
              aria-label="Search words"
              aria-controls="context-word-results"
              autoComplete="off"
              placeholder="Search words…"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>
        )}
        <div id="context-word-results" className="word-list-results">
          {visibleWords.map((entry) => (
            <button
              className={`pair-button${entry.word === selectedWord ? " pair-button-active" : ""}`}
              key={entry.word}
              type="button"
              aria-pressed={entry.word === selectedWord}
              aria-haspopup={isMobile ? "dialog" : undefined}
              onClick={() => selectWord(entry.word)}
            >
              {entry.word}
            </button>
          ))}
          {visibleWords.length === 0 && <p role="status">No matching words.</p>}
        </div>
      </aside>
      {!isMobile && <section className="flashcard-shell" aria-label="Selected word practice">{practiceCard}</section>}
      <dialog ref={dialogRef} className="practice-dialog" aria-label={`Practice ${selected.word}`}>
        {isMobile && practiceCard}
      </dialog>
    </div>
  );
}
