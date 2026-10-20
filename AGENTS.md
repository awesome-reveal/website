# website

The docs site for the `@awesome-reveal/*` packages, at <https://awesome-reveal.dev>. It uses Astro with Starlight. The packages are in [awesome-reveal/awesome-reveal](https://github.com/awesome-reveal/awesome-reveal). Their development branch is `next`.

## Map

- `src/content/docs/`: the current docs.
- `src/content/docs/v4/` and `src/content/versions/v4.json`: the archived docs of `react-awesome-reveal` v4. `starlight-versions` generates them.
- `src/styles/theme.css`: the theme, on the Starlight tokens. The code colors are in `src/code-themes.ts`.
- `src/components/`: overrides of Starlight components. A font in `fonts` of `astro.config.mjs` loads only when `Head.astro` renders its `<Font>` tag.
- `src/content/i18n/en.json`: overrides of the UI strings, such as the notice on archived pages.
- `astro.config.mjs`: the site URL, the sidebar, the archived versions and the head tags (Open Graph).

## Commands

Use the Node version in `.nvmrc` and the pnpm version in `packageManager`. A shell can start with an older Node: check `node -v` first, because Astro 7.4 needs Node 22.22 or later.

- `pnpm dev`: start the dev server. When Astro detects an AI agent, it runs the server in the background and prints its URL. If a dev server already runs, it prints that URL. `/_astro/status` returns `{"ok": true}` when the server is ready. Stop it with `pnpm astro dev stop`.
- `pnpm build`: run `astro check`, then build to `dist/`. `starlight-links-validator` fails the build on a broken internal link or anchor. It does not check external links. If the build fails with "Cannot find native binding", run `rm -rf node_modules && pnpm install --frozen-lockfile`. A cache clear or a plain install does not fix it.
- `pnpm astro build --timings`: build, and show the time of each build phase, Vite plugin, Markdown plugin, page and integration. Use it to find a slow build step.
- `pnpm check`: run `astro check`, ESLint and Prettier `--check`. A warning fails it.
- `pnpm exec prettier --write .` to format.

The repo has no tests. The `Check` workflow in `.github/workflows/` runs `pnpm check` on each PR and on each push to `main`. Workers Builds runs `pnpm build` on each push. Before a PR, run both, and look at the changed pages in the dev server, on a narrow (about 400 px) and a wide viewport.

## Docs lookup

Search the Astro docs with the `astro-docs` MCP server in `.mcp.json`.

## Deploys

Cloudflare Workers serves `dist/` as static assets, with no adapter and no Worker code. `wrangler.jsonc` has the config. Workers Builds builds each push: `main` deploys to production, and other branches get a preview URL. Run `pnpm build && pnpm exec wrangler dev` to serve the build with the production routing.

Before a change to the deploy, the headers, the redirects or the zone (DNS, rules, analytics, AI bot policies), read `.claude/rules/deploy/cloudflare.md`.

## Rules

- Ask the user before each change in Cloudflare (Workers, DNS, rules) or another external service. Reading is fine.
- Work on a branch, named `<type>/<description>`. Use Conventional Commits, and squash-merge PRs.
- Add an official Astro integration with `pnpm astro add <name>`, and other packages with `pnpm add`. Do not edit the dependencies in `package.json` by hand.
- Use `@lucide/astro` for every icon that our code renders. The details and the one exception are in `.claude/rules/components/icons.md`.
- Take API names, option defaults and examples from the `next` branch of the packages repo, not from the v4 archive.
