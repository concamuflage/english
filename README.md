# English Learning Blog

A static Next.js blog for English learners, ready for Cloudflare Pages. The site has no database; articles and GRE study items live in local TypeScript data files.

## Local Development

```bash
npm install
npm run dev
```

Example local URL: `http://localhost:3000`

## Cloudflare Pages

Use these settings in Cloudflare Pages:

- Build command: `npm run build`
- Build output directory: `out`
- Framework preset: `Next.js`

The `next.config.ts` file uses `output: "export"`, so the production build is a static site suitable for Cloudflare Pages.
