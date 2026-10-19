---
name: archiving-docs-versions
description: Archives the current docs as a version with starlight-versions, so that docs for a new major version can replace them. Use when a major release of the packages needs new docs, or when you add a version to the picker.
---

# Archive a docs version

`starlight-versions` keeps each archived version as a copy of the pages under `src/content/docs/<slug>/`. The v4 archive is an example.

1. Fix the errors in the current pages first, such as broken links and anchors. The archive copies them.
2. Make sure that no fenced code block is inside a JSX tag (see `.claude/rules/docs/mdx-prettier.md`). The plugin prints each page again, and Prettier then breaks such a block.
3. Add the version to `versions` in `astro.config.mjs`, with `{ slug: "v<major>", redirect: "root" }`. The picker lists the versions after "Latest", in the order of the array. Put the new one first, so that the list goes from the newest to the oldest.
4. Run `pnpm build`. When `astro dev` or `astro build` starts and `src/content/docs/<slug>/` does not exist, the plugin writes it and `src/content/versions/<slug>.json`. It creates one new version at a time. Keep a copy of `dist/` for step 6.
5. Run `pnpm exec prettier --write src/content/docs/<slug>`.
6. Run `pnpm build` again. Check that the rendered text of each archived page did not change, for example with a text diff of the built HTML against the copy.
7. Remove the `title` entries of `head` from the archived pages. The plugin copies the frontmatter, so the archived pages have the same search titles as the current pages. Without the entries, the archived pages use their short `title`.
8. If the archived version has a different product name, add it to `archivedSiteTitles` in `src/lib/versions.ts`. The route middleware then puts it in the `<title>` suffix and `og:site_name` of the archived pages.
9. Read the notices in `src/content/i18n/en.json`. One key serves all archived versions through `{{slug}}`, so the text must fit each of them. If it names the package of one version only, rewrite it.

## Check

- `pnpm check` and `pnpm build` pass.
- The picker shows the new version, and its pages show the notice.
- The `<title>` of each archived page without a `title` entry is `<short title> | <product name>`.
- The links on the archived pages stay under `/<slug>/`.
- Old URLs of pages that the new docs remove need redirects to the archive. Ask the user where to put them before you add them.
