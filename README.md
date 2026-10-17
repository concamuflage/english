# Personal Blog

A static Next.js personal blog deployed to Cloudflare Workers at `https://bumblebee.work`. The site has no database; articles and GRE study items live in local TypeScript data files.

## Local Development

```bash
npm install
npm run dev
```

Example local URL: `http://localhost:3000`

## Sitemap generation

`npm run build` generates `out/sitemap.xml` and `out/robots.txt` for
`https://bumblebee.work`. During development, preview them at
`http://localhost:3000/sitemap.xml` and `http://localhost:3000/robots.txt`.
The sitemap includes public destination pages and every article in
`lib/content.ts`; redirect aliases are excluded. Add any new standalone page
to the paths in `app/sitemap.ts`. For example, adding an article with slug
`new-study-note` automatically adds `/articles/new-study-note` on the next build.

Cloudflare's connected deployment builds and publishes the site on pushes,
including the generated sitemap and robots file. For example, deploying a new
article publishes its sitemap entry in the same deployment. Generated files
stay untracked. This repository has no GitHub Actions build workflow.

Local commits and pushes do not run builds. Run `npm run build` for a local
check, or `npm run deploy` to rebuild and upload directly to Cloudflare.
The earlier automatic build hooks have been removed. In older checkouts,
if `git config --local --get core.hooksPath` prints `.githooks`, remove that
old setting with `git config --local --unset core.hooksPath`.

## Cloudflare Workers

Authenticate with your Cloudflare account, then build and deploy:

```bash
npx wrangler login
npm run deploy
```

The `next.config.ts` file uses `output: "export"`. Wrangler uploads the `out` directory as Worker static assets and connects the `bumblebee.work` custom domain. The domain must be an active zone in the authenticated Cloudflare account.
