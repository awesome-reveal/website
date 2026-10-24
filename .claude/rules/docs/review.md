---
paths:
  - "src/content/docs/**/*.mdx"
  - "src/snippets/**"
---

# Review a docs change

Give the review of a docs change to a subagent. In its prompt, name this file, the changed pages and the request of the user. Tell it to report each problem with `file:line`, the evidence and a fix, and to write "no findings" for each check that passes.

1. **Package claims**: each API name, option default and code sample matches the `next` branch. See `content-sources.md`.
2. **Framework claims**: each claim about Astro, Next.js, Nuxt, Vue, React or a browser matches the official docs of that tool. For Astro, use the `astro-docs` MCP server.
3. **One place for each fact**: no other current page states the same fact or contradicts it. Link to the page that states the fact.
4. **Copy**: see `site-copy.md`. For the `title` and `description`, see `page-titles.md`. For file names, see `page-urls.md`.
5. **Internal links**: each link goes to a page without `draft: true`. The production build skips draft pages, so their URLs return 404. Each link that names a page uses the `sidebar.label` or the `title` of that page. `pnpm exec node scripts/list-mismatched-link-texts.mjs` lists the links whose text is neither. See `page-titles.md`.
6. **External links**: each link returns 200 with no redirect, and its anchor exists. `starlight-links-validator` does not check external links. A 3xx status means a redirect: link to the final URL.

   ```sh
   curl -s -o page.html -w '%{http_code}\n' '<url without #anchor>'
   rg -c 'id="<anchor>"' page.html
   ```

   A page that renders in the browser can have no `id` in its HTML. Then open the link in the browser.
