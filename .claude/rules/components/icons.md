---
paths:
  - "src/components/**"
  - "src/assets/**"
  - "src/content/docs/index.mdx"
---

# Icons

- `@lucide/astro` is the only icon package. Import one icon per file, for example `@lucide/astro/icons/heart`. Do not set `size`: `theme.css` sizes `.lucide` to `1em`, so the icon follows the font size.
- A decorative Lucide icon gets no a11y props: `@lucide/astro` adds `aria-hidden="true"` when the icon has no `aria-*`, `role` or `title` prop. An SVG component from `src/assets/` passes only the props it gets, so a decorative logo needs `aria-hidden="true"`.
- Do not use the Starlight `Icon` component or the `icon` prop of `Card` in our code.
- Lucide has no brand icons. Brand logos are single-path SVG files in `src/assets/`, with `fill="currentColor"`, taken from Simple Icons. Simple Icons removed OpenAI in v16, so `openai.svg` comes from v15.22.0. Ask the user before you add a brand logo.
- The hero schema of Starlight accepts only its own icon names in frontmatter. `Hero.astro` maps those names to our icons. To add a hero icon, add its name to the map in `Hero.astro`.
- Starlight draws its own icons inside its components: asides, search, sidebar and the code copy button. We keep them.
- The archived pages in `src/content/docs/v4/` keep their Starlight `Card` icons. See `archived-versions.md`.
