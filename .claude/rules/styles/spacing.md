---
paths:
  - "src/components/**"
  - "src/layouts/**"
  - "src/styles/**"
---

# Spacing

The spacing tokens are `--space-N` in `src/styles/theme.css`. Each token is a multiple of `--space` (0.25rem), as in Tailwind CSS v4.

- Write each rem margin, padding, gap and inset with a token, so that all spacing changes with one base unit. For a value that you compute, use `calc()` with tokens, for example `calc(var(--space-3) + var(--label-icon-size))`.
- The scale has fewer steps above 6 on purpose: the larger gaps between the larger steps keep the rhythm visible. Do not add a step. Round an off-scale value to the nearest step. A value exactly between two steps rounds up.
- Keep spacing that belongs to text in em, for example the padding of a badge or a `kbd`, because it must grow with the text. Use quarter-em steps.
- Put `var(--space-2)` between the icon and the label of a control. Starlight uses 0.5rem in its controls, such as the search button and the pagination links, so all controls look the same.
- Use logical properties, such as `padding-inline`, `margin-block-start` and `inset-inline-start`.
- Keep raw values for things that are not spacing:
  - sizes, such as `block-size` and icon sizes
  - 1px border overlaps
  - optical offsets of 1–2px
  - motion offsets
