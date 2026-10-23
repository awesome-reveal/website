---
name: updating-og-image
description: Renders the Open Graph image `public/og.png` and the GitHub social preview from one HTML template, and changes the image URL, so that social sites fetch the new image. Use when you change the OG image or the GitHub social preview, or when the site name, the hero headline or the theme colors change.
---

# Update the OG image

[`assets/og-image.html`](assets/og-image.html) is the source of `public/og.png` (1200×630) and `.github/social-preview.png` (1280×640). The window size of the render selects the size. It copies the tokens of `src/styles/theme.css` and the fonts of `astro.config.mjs`, because it renders outside Astro.

Each blog post gets its own card, with the post title as the headline. `src/lib/og-image.ts` renders it at build time with Takumi, from the same tokens. Its headline and mark are smaller, and the headline gets smaller again for a long title. When you change the design in the template, make the same change there, and look at the post card in the dev server: the `og:image` of the post gives its URL. The file name has the digest of the post file, so it needs no `?v=`. A change to the card design does not change the digest: to make social sites fetch the new cards, also change each post file. The [Constraints](#constraints) apply to both cards.

1. Edit `assets/og-image.html`. Keep the constraints in [Constraints](#constraints).
2. Run `${CLAUDE_SKILL_DIR}/scripts/render.sh`. It needs Google Chrome, `pngquant` and network access for the Google Fonts. When the PNG changes, the script increases the `?v=` query of the image URL in `astro.config.mjs`. Social sites cache the image by its URL, so each new image needs a new version.
3. Look at `public/og.png` and `.github/social-preview.png` at full size. Then look at `public/og.png` at phone size: `sips -Z 360 public/og.png --out <scratchpad>/og-mobile.png`. All text must be readable at 360 px.
4. Run `pnpm build`. Make sure that `og:image` in `dist/index.html` has the new `?v=`.
5. If `.github/social-preview.png` changed, tell the user after the merge to upload `.github/social-preview.png` in Settings > General > Social preview of `awesome-reveal/awesome-reveal`. The website repo keeps the default card of GitHub.

Do not change `og.png` without `render.sh`: a new image with an old `?v=` stays hidden behind the cached image.

## Constraints

- Keep 1200×630 PNG, under 1 MB. Meta and LinkedIn show 1.91:1, and Meta does not list WebP for `og:image`.
- Keep the text inside the padding, with equal space on each side. Only the mark can bleed off the right edge. Measure the text: `magick public/og.png -crop 760x630+0+0 -fuzz 12% -trim -format '%wx%h%O' info:`. X shows the card at 2:1 and crops about 15 px at the top and the bottom.
- Keep the text above about y 520. X shows the post title in a dark box on the bottom left of the image.
- Keep the text large: a phone shows the card at about 30% of its size. X shows no title under the card, so the image must give the name and what the packages do.
- Keep the GitHub social preview 1280×640, under 1 MB. GitHub recommends a solid background, because the image shows on dark and light pages.
- If you change the size, also change `og:image:width` and `og:image:height` in `astro.config.mjs`.
