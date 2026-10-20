---
paths:
  - "src/components/**/*"
  - "src/styles/**/*"
---

# Hover and focus states

## Focus

The global `:root :focus-visible` rule in `src/styles/theme.css` draws a 2px accent ring. On a control, set only `outline-offset`, from the shape of the control:

- A control with a 1px border: `-1px`. The ring covers the border, so the ring stays 2px wide. With the default offset of 0, the border and the ring make a 3px band.
- A control with a fill and no border: `2px`. The gap keeps the ring visible on an accent fill.
- A control in a group with little padding, such as an option of `ChoiceControl`: a smaller gap, so that the ring does not touch the border of the group.

Starlight puts the Expressive Code CSS in a cascade layer, so the global ring wins over the focus style of Expressive Code. Change the ring of a code block in `theme.css`. A `styleOverrides` value in `astro.config.mjs`, such as `focusBorder`, has no effect on it.

## Hover

- A control with a border changes its border to `--sl-color-text-accent`, with a `--hover-duration` transition. The sponsor link in `SiteCredits.astro` uses `--sl-color-red`, the color of its heart icon.
- An icon or text control changes its color from `--sl-color-gray-2` to `--sl-color-white`.
- Put the `:hover` rule of a button, a select or a toggle in `@media (hover: hover)`. After a tap on a touch screen, `:hover` stays on until the next tap in a different place, and these controls stay on the page. A link that opens a new page does not need this media query.
