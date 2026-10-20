---
paths:
  - "src/components/**/*"
  - "src/styles/**/*"
---

# Scoped styles and Starlight overrides

The Starlight component CSS is in `node_modules/@astrojs/starlight/dist/`.

- Starlight sets `scopedStyleStrategy: "where"`, so a scoped selector gets no extra specificity. The scope already limits a rule to the markup of its component. Do not add a parent class only to narrow the match.
- Astro does not scope a compound selector that starts with `:is()`, so the rule becomes global. Start the compound with a type or a class, for example `button:is(.copy, .more):hover`.
- A child component gets the scope class through its `class` prop. Starlight's `Badge` and `LinkButton` render that prop, so a scoped rule also matches their root element. For example, a bare `span` rule in `Hero.astro` also matches the `Badge`.
- Starlight puts its component styles in `@layer starlight.*`. Unlayered CSS in `theme.css` and in our components wins over them at any specificity. To override Starlight, do not add selector weight. A rule for the base state also wins over the Starlight `:hover` and `:focus` rules for the same property.
- These styles are not in a layer: the `starlight-versions` components (the search modal included), `Page.astro` of Starlight, the Pagefind UI CSS and `starlight-heading-badges`. Their rules compete by specificity, and a tie goes to the bundle order. Give an override more weight, such as a wrapper class or a `:root` prefix. For the same reason, do not put `theme.css` in a cascade layer: a layered rule always loses to these files.
- Style a Starlight or plugin component in our component that renders it, with `:global()` under a wrapper class, as `Header.astro` does for the search. Keep in `theme.css` only the tokens, the global and content styles, and the overrides for components that several places render or that no override of ours renders.
