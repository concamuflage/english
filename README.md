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

`npm install` and `npm ci` install the versioned Git hooks through the `prepare`
script. For an existing checkout, run `npm run setup:hooks` once. These hooks
run a build before every commit and push; a failed build blocks that operation.
They validate the current working checkout. Hook installation sets this
repository's `core.hooksPath` to `.githooks`.

GitHub Actions also builds the site on pushes and pull requests and saves the
generated `out/` folder as the `static-site` artifact. Generated files stay
untracked. Building does not publish them: `npm run deploy` rebuilds and uploads
the site, sitemap, and robots file to Cloudflare.

## Cloudflare Workers

Authenticate with your Cloudflare account, then build and deploy:

```bash
npx wrangler login
npm run deploy
```

The `next.config.ts` file uses `output: "export"`. Wrangler uploads the `out` directory as Worker static assets and connects the `bumblebee.work` custom domain. The domain must be an active zone in the authenticated Cloudflare account.
