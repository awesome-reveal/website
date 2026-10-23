---
paths:
  - "src/content/docs/**/*.mdx"
---

# Page URLs

The path of a file under `src/content/docs/` gives the URL of the page: `guides/lists.mdx` gives `/guides/lists/`. Name a new file in this way:

- Use one to four readable, lowercase English words, with hyphens between them. The [Google URL guide](https://developers.google.com/search/docs/crawling-indexing/url-structure) recommends readable words and hyphens. The word count is a convention of this site.
- Use the name that the reader knows for the topic, such as `nextjs` or `manual-control`. The directory gives the group, so do not repeat the group in the file name.
- Put the search keywords in the `title` and the `description`, not in the file name. See `page-titles.md`. The [Google SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) says that keywords in the URL path "alone have hardly any effect" on ranking.

To rename a page, change its file name, and update the internal links. `starlight-links-validator` fails the build on a broken link.

Until the packages publish a stable 1.0.0, you can rename any page and add no redirect. Until then, `npm view @awesome-reveal/core dist-tags.latest` gives a prerelease version.

After the stable release, do not rename a page in production to add keywords. A page is in production when it is on `main` without `draft: true`. [Google](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes) asks for a 301 or 308 redirect to the new URL for at least one year. Rename the page only when its topic changes. Then ask the user about a redirect in `public/_redirects` before you add it. See `.claude/rules/deploy/cloudflare.md`.
