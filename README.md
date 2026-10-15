# Personal Blog

A static Next.js personal blog deployed to Cloudflare Workers at `https://bumblebee.work`. The site has no database; articles and GRE study items live in local TypeScript data files.

## Local Development

```bash
npm install
npm run dev
```

Example local URL: `http://localhost:3000`

## Cloudflare Workers

Authenticate with your Cloudflare account, then build and deploy:

```bash
npx wrangler login
npm run deploy
```

The `next.config.ts` file uses `output: "export"`. Wrangler uploads the `out` directory as Worker static assets and connects the `bumblebee.work` custom domain. The domain must be an active zone in the authenticated Cloudflare account.
