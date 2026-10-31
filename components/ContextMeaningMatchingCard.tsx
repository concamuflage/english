import type { ContextDependentWord } from "@/lib/contextDependentWords";

type MatchingCardProps = {
  entry: ContextDependentWord;
  selections: Readonly<Record<number, string>>;
  checked: boolean;
  onSelect: (index: number, meaningId: string) => void;
  onCheck: () => void;
  onReset: () => void;
  onClose?: () => void;
};

/**
 * Matches numbered sentences to lettered meanings without revealing feedback before Check matches.
 * Example: ingenuous sentence 1 pairs with meaning C, "frank"; each meaning can be selected once.
 * Controlled selections preserve progress between desktop and the mobile dialog, and Reset clears all pairs.
 */
export function ContextMeaningMatchingCard({ entry, selections, checked, onSelect, onCheck, onReset, onClose }: MatchingCardProps) {
  const complete = entry.sentences.every((_, index) => Boolean(selections[index]));
  const correctCount = entry.sentences.filter((sentence, index) => selections[index] === sentence.meaningId).length;

  return (
    <div className="flashcard context-matching-card">
      <h2 className="context-meaning-word-title">{entry.word}</h2>
      <p className="context-meaning-instructions">Match each sentence with its meaning. Use each meaning once.</p>
      <div className="context-matching-layout">
        <ol className="context-matching-sentences" aria-label="Sentences to match">
          {entry.sentences.map((sentence, index) => {
            const correct = selections[index] === sentence.meaningId;
            return (
              <li className="context-match-row" key={sentence.sentence}>
                <span className={`question-status${checked ? (correct ? " correct-status" : " incorrect-status") : ""}`} aria-label={checked ? `Sentence ${index + 1}: ${correct ? "correct" : "incorrect"}` : `Sentence ${index + 1}`}>
                  {checked ? (correct ? "✓" : "!") : index + 1}
                </span>
                <div>
                  <p id={`context-sentence-${index}`}>{sentence.sentence}</p>
                  <label className="context-match-select-label">
                    Meaning
                    <select
                      aria-label={`Meaning for sentence ${index + 1}`}
                      aria-describedby={`context-sentence-${index}`}
                      aria-invalid={checked && !correct ? true : undefined}
                      value={selections[index] ?? ""}
                      onChange={(event) => onSelect(index, event.target.value)}
                    >
                      <option value="">Choose a meaning…</option>
                      {entry.meanings.map((meaning, meaningIndex) => (
                        <option
                          key={meaning.id}
                          value={meaning.id}
                          disabled={Object.entries(selections).some(([otherIndex, meaningId]) => Number(otherIndex) !== index && meaningId === meaning.id)}
                        >
                          {String.fromCharCode(65 + meaningIndex)}. {meaning.text}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </li>
            );
          })}
        </ol>
        <aside className="context-matching-meanings" aria-labelledby="context-meanings-title">
          <h3 id="context-meanings-title">Meanings</h3>
          <ol aria-label="Meanings to pair with sentences">
            {entry.meanings.map((meaning, index) => (
              <li key={meaning.id}><span className="context-meaning-letter">{String.fromCharCode(65 + index)}</span><span>{meaning.text}</span></li>
            ))}
          </ol>
        </aside>
      </div>
      <p className={`context-matching-result${checked ? (correctCount === entry.sentences.length ? " context-matching-result-correct" : " context-matching-result-wrong") : ""}`} role="status">
        {checked && `${correctCount} of ${entry.sentences.length} correctly matched.${correctCount === entry.sentences.length ? " Well done!" : " Review the pairs marked with ! and try again."}`}
      </p>
      <div className="context-matching-actions">
        <button className="practice-next-button" type="button" disabled={!complete} onClick={onCheck}>Check matches</button>
        <button className="context-matching-reset" type="button" onClick={onReset}>Reset</button>
        {onClose && <button className="practice-close-button" type="button" onClick={onClose} aria-label="Close practice card"><span aria-hidden="true">×</span></button>}
      </div>
      <p><small>Meaning reference: <a href={entry.reference.href}>{entry.reference.label}</a>.</small></p>
    </div>
  );
}
