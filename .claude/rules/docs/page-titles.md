---
paths:
  - "src/content/docs/**/*.mdx"
---

# Page titles and descriptions

The frontmatter `title` is the `<h1>` of the page. Put the main search keywords in it. Starlight makes `<title>` from it as `title | Awesome Reveal`, and also uses it for `og:title`. When the `title` starts with the product name, such as in a release post, the route middleware removes the `| Awesome Reveal` suffix. Google recommends the site name one time, at the start or the end of `<title>`. The route middleware in `src/routeData.ts` uses it for the JSON-LD headline. Put the short name of the page in `sidebar.label`, because the sidebar and the previous and next links use it:

```yaml
title: Staggered list animations with Cascade
sidebar:
  label: Animate a list
```

- Start the `title` with the words that people search for, such as the framework, the API or the effect. [Google](https://developers.google.com/search/docs/appearance/title-link) and [Bing](https://blogs.bing.com/webmaster/2014/6/How-Does-Bing-Choose-The-Title-For-My-Web-Page/) set no length limit, but they truncate a long title link to the available width.
- Make the `title` descriptive and concise. Write each search term one time.
- Use sentence case, as the section headings do. Keep the capitals of names, such as `Cascade` and `Next.js`.
- Give each page a different `title`.
- Write the `description` in 140–160 characters. Use the keywords of the page, and describe only what the page contains.

Write the `sidebar.label` in the form that the [Google style guide](https://developers.google.com/style/headings) gives for headings:

- A task page (Get started and the guides): start with a bare verb, such as `Animate a list` or `Trigger the reveal`.
- A concept page: a noun phrase that names the topic, such as `Server rendering`. A benefit, such as "No flash on load", hides the topic. `How it works` is a noun clause, and it is the usual name of an overview page, so it stays.
- A framework or reference page: the name of the tool or the API, such as `Next.js` or `React API`.
- Do not start the label with an `-ing` word. Google permits a gerund when no better word exists, as for `Billing`. `Troubleshooting` stays for this reason: `Troubleshoot` has no object.

Link text that names a page uses its `sidebar.label` or its `title`. `pnpm exec node scripts/list-mismatched-link-texts.ts` lists the Markdown links whose text is neither. Most results are prose links, such as `[manually](/guides/manual-control/)`, and they are correct. Fix only a result that names the page, such as a "See" link or a list of pages. The script reads only inline Markdown links to a root path, such as `[text](/guides/lists/)`, and it skips the links with an anchor. It does not read frontmatter such as `hero.actions`, or components.

When you change a `sidebar.label` or a `title`:

1. Search `src/` for the old text, with `\s+` between the words: `rg -i -U 'getting\s+started' src/`. Prettier can wrap a link text onto the next line. This search also finds anchor links, frontmatter and components.
2. Update each result, except the pages in `src/content/docs/v4/`.
3. Run `pnpm exec node scripts/list-mismatched-link-texts.ts`. Fix the results that name the page.
4. Run `gh pr list`. For each open PR, search the lines that it adds: `gh pr diff <number> | rg -i -U '^\+.*getting\s+\+?\s*started'`. The `\+?` matches the diff prefix of a wrapped line. A PR that started before the change can add a link with the old text.

A `title` entry in the frontmatter `head` replaces `<title>`. On current pages, the route middleware also copies it into `og:title` and the JSON-LD headline. Use the entry only in these cases:

- On the home page, the `<h1>` is the hero text, and the `title` is the product name.
- On archived pages, such as `src/content/docs/v4/`, use the entry only to keep the old `<title>` of the page, as the v4 index does. Without the entry, the `<title>` is the `title` and the product name of the version.

The `archiving-docs-versions` skill (step 7 and its checks) and the head title logic in `src/routeData.ts` depend on this convention. When you change the convention, update them in the same change.

To check, run `pnpm build`. Then compare `<h1>`, `<title>` and `og:title` in `dist/<page>/index.html`.
