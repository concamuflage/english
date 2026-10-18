"use client";

import { useState } from "react";

/**
 * Reveals the contact address only after activation, displaying a space instead of @.
 * Example: clicking Reveal email displays `apple_banana_2026 proton.me` and explains
 * that the space before `proton.me` should be replaced with `@`.
 */
export function ContactEmail() {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div>
      <button
        className="contact-reveal-link"
        type="button"
        aria-expanded={isRevealed}
        aria-controls="contact-email"
        onClick={() => setIsRevealed(true)}
      >
        Reveal email
      </button>
      <div id="contact-email" aria-live="polite">
        {isRevealed && (
          <>
            <p>apple_banana_2026 proton.me</p>
            <p>Replace the space before proton.me with @.</p>
          </>
        )}
      </div>
    </div>
  );
}
