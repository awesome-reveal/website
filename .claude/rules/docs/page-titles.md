---
paths:
  - "src/content/docs/**/*.mdx"
---

# Page titles and descriptions

Starlight uses the frontmatter `title` for the sidebar label, the `<h1>`, `<title>` and `og:title`. Keep `title` short for the sidebar. Put the search title in a `title` entry of the frontmatter `head` of each current page:

```yaml
head:
  - tag: title
    content: "Fade, Slide and Spring Keyframes | Awesome Reveal"
```

- The entry replaces the Starlight `<title>`. The route middleware in `src/routeData.ts` copies it into `og:title` and the JSON-LD headline.
- Write the title in 60 characters or fewer. Start with the words that people search for, and end with `| Awesome Reveal` when it fits.
- Write the `description` in 140–160 characters. Use the keywords of the page, and describe only what the page contains.
- On archived pages, such as `src/content/docs/v4/`, use a `title` entry only to keep the old title of the page, as the v4 index does. Without the entry, the `<title>` is the short `title` and the product name of the version.

To check, run `pnpm build`. Then compare `<title>` and `og:title` in `dist/<page>/index.html`.
