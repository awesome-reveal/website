---
paths:
  - "src/lib/og-image.ts"
  - "src/lib/og-card.ts"
  - "src/pages/og/**"
---

# OG cards

The build renders a 1200×630 card for each docs page with Takumi, at `/og/<slug>.<hash>.png`. The hash comes from the markup, the CSS, the font file names and the size limits of the card, so a change to the design or to a title gives a new URL, and social sites fetch the new image. `/og/*` has an `immutable` cache header, so an input that changes the image must be in the hash. The takumi-js version is not in the hash: if an upgrade changes the images, change the CSS or the markup to get new URLs. Pages without a docs entry, such as the 404 page and the blog lists, get the home card.

## Design constraints

- Keep 1200×630 PNG, under 1 MB. Meta and LinkedIn show 1.91:1, and Meta does not list WebP for `og:image`.
- Keep the text inside the padding, with equal space on each side. Only the mark can bleed off the right edge. X shows the card at 2:1 and crops about 15 px at the top and the bottom.
- Keep the text above about y 520. X shows the page title in a dark box on the bottom left of the image. `renderOgImage` tries smaller headline sizes until the text fits, and fails the build when no size fits.
- Keep the text large: a phone shows the card at about 30% of its size. X shows no title under the card, so the home card must give the name and what the packages do.

## Check a change

1. Run `pnpm build`. The cards are in `dist/og/`.
2. Look at the home card, the card with the longest title and a `dist/og/v4/` card at full size.
3. Look at the home card at phone size: `sips -Z 360 dist/og/index.*.png --out <scratchpad>/og-mobile.png`. All text must be readable at 360 px.
4. Measure the text box: `magick <card>.png -crop 760x630+0+0 -fuzz 12% -trim -format '%wx%h%O' info:`.

The GitHub social preview of `awesome-reveal/awesome-reveal` is a manual upload in Settings > General > Social preview. When the home card changes, tell the user to upload `dist/og/index.*.png` there.

## Takumi gotchas

- Takumi ignores `text-box`. Negative margins in `em` trim each line box to the cap height and the baseline. When you change a font, a font size or a `line-height`, calculate the margins again from the formula in the CSS comment. `fromBuffer` of `@capsizecss/unpack` (in `node_modules/.pnpm`, a dependency of Astro) reads the ascent, the descent and the cap height from the `.woff2` files in `node_modules/.astro/fonts/`.
- `var()`, `color-mix()`, descendant selectors, `text-wrap: balance`, and `font-weight` and `font-stretch` on variable fonts work.
- `text-fit` cannot choose the headline size. It scales only a line that is wider than its box, and it ignores the box height.
- `measure()` gives the box of each element and the `runs` of each text, with `x` and `width`. A run that is wider than its box overflows: `white-space: nowrap` does not wrap, so the box keeps its `max-width` and the text goes out of it.
- A font loads only if its CSS variable is in `fontVariables`. Takumi takes the family name from the font file.
- Takumi draws text a little lighter than Chrome on macOS at the same weight. Do not increase the weight to match a Chrome screenshot.
- To test CSS outside Astro, import `takumi-js` in a script in the scratchpad, and load the fonts from `dist/_astro/fonts/` after a build.
