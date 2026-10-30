
# SEO 

- Always follow the best onsite SEO optimization practices.

# Practice Sentences

- When writing practice sentences, always give enough context so the user knows which one to choose. 

# Mathematical Notation

- Always use curly braces for explanatory braces beneath or above formulas, rather than square brackets. For example, label `f(a + Δx, b + Δy) − f(a, b)` with a curly underbrace and “total real height change” beneath it.
- Display equations and formulas without rectangular borders or boxes. For example, show `E_total = E_step 1 + E_step 2` as an unboxed equation.


# Site Color Theme







- Use shades of bumblebee yellow where general UI color accents are needed, including headings, active navigation, borders, and focus indicators. Use the shared palette in `app/globals.css`.
- Exception: keep correct-answer feedback green and incorrect-answer feedback red, including status icons, option borders, text, and radio indicators. Do not recolor these states yellow.
- Preserve existing background colors unless the user explicitly requests a background change. This includes the page, header, cards, notes, and feedback backgrounds.
- Keep text readable: use dark yellow/ochre shades rather than bright yellow text where a colored accent is appropriate. Preserve check/exclamation symbols so answer feedback does not rely on color alone.
- Preserve the approved logo and favicon colors unless the user requests recoloring those assets.
- Example: use `var(--accent-deep)` for a note heading while leaving its existing background unchanged.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
