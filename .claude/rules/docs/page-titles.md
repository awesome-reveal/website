---
paths:
  - "src/content/docs/**/*.mdx"
---

# Page titles and descriptions

The frontmatter `title` is the `<h1>` of the page. Put the main search keywords in it. Starlight makes `<title>` from it as `title | Awesome Reveal`, and also uses it for `og:title`. The route middleware in `src/routeData.ts` uses it for the JSON-LD headline. Put the short name of the page in `sidebar.label`, because the sidebar and the previous and next links use it:

```yaml
title: Staggered list animations with Cascade
sidebar:
  label: Animate a list
```

- Start the `title` with the words that people search for, such as the framework, the API or the effect.
- Write the `title` in 43 characters or fewer, so that `<title>` has 60 characters or fewer.
- Use sentence case, as the section headings do. Keep the capitals of names, such as `Cascade` and `Next.js`.
- Give each page a different `title`.
- Write the `description` in 140–160 characters. Use the keywords of the page, and describe only what the page contains.

A `title` entry in the frontmatter `head` replaces `<title>`. On current pages, the route middleware also copies it into `og:title` and the JSON-LD headline. Use the entry only where `<title>` must be different from the `<h1>`:

- On the home page, the `<h1>` is the hero text, and the `title` is the product name.
- On archived pages, such as `src/content/docs/v4/`, use the entry only to keep the old `<title>` of the page, as the v4 index does. Without the entry, the `<title>` is the `title` and the product name of the version.

The `archiving-docs-versions` skill (step 7 and its checks) and the head title logic in `src/routeData.ts` depend on this convention. When you change the convention, update them in the same change.

To check, run `pnpm build`. Then compare `<h1>`, `<title>` and `og:title` in `dist/<page>/index.html`.
