import {
  experimental_getFontFileURL as getFontFileURL,
  fontData,
} from "astro:assets";
import { createHash } from "node:crypto";
import { measure, render } from "takumi-js";

export type OgCard =
  | { layout: "hero"; label: string; title: string; tagline: string }
  | { layout: "page"; label: string; title: string };

export const ogImageSize = { width: 1200, height: 630 };

// X covers the card below y 520 with the page title.
const maxTextBottom = 520;

const headlineSizes: Record<OgCard["layout"], number[]> = {
  hero: [136],
  page: [104, 88, 76],
};

const fontVariables = [
  "--font-bricolage",
  "--font-hanken",
  "--font-jetbrains",
] as const;

const mark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="72 152 368 208"><g fill="#ffd23f"><circle cx="176" cy="256" r="104" opacity=".25"/><circle cx="256" cy="256" r="104" opacity=".5"/><circle cx="336" cy="256" r="104"/></g></svg>`;

// The tokens copy src/styles/theme.css.
const css = `
  .card {
    --ink: #181b36;
    --paper: #eef0f7;
    --pencil: #9fd3e6;
    --pad: 80px;
    --cell: 60px;

    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: var(--pad);
    background-color: var(--ink);
    background-image:
      linear-gradient(
        color-mix(in oklab, var(--pencil) 7%, transparent) 2px,
        transparent 2px
      ),
      linear-gradient(
        90deg,
        color-mix(in oklab, var(--pencil) 7%, transparent) 2px,
        transparent 2px
      );
    background-size: var(--cell) var(--cell);
    background-position: center;
    color: var(--paper);
  }

  .text {
    display: flex;
    flex-direction: column;
    gap: 36px;
  }

  /*
   * Takumi ignores text-box, so negative margins trim each line box to the cap height and the baseline.
   * Top: (line-height - ascent - descent) / 2 + ascent - cap height. Bottom: the same half-leading + descent.
   * The ascent, descent and cap height come from the font file.
   */
  .label {
    margin: -0.29em 0 -0.3em;
    color: var(--pencil);
    font-family: "JetBrains Mono";
    font-size: 34px;
    font-weight: 500;
  }

  h1 {
    max-width: 760px;
    margin: -0.13em 0;
    font-family: "Bricolage Grotesque";
    font-weight: 800;
    font-stretch: 78%;
    font-variation-settings: "opsz" 96;
    line-height: 0.92;
    letter-spacing: -0.01em;
    text-wrap: balance;
  }

  .tagline {
    margin: -0.277em 0;
    color: color-mix(in oklab, var(--paper) 82%, var(--ink));
    font-family: "Hanken Grotesk";
    font-size: 40px;
    font-weight: 500;
    line-height: 1.25;
    text-wrap: balance;
  }

  .nowrap {
    white-space: nowrap;
  }

  .mark {
    position: absolute;
    top: 50%;
    right: -150px;
    width: 420px;
    translate: 0 -50%;
  }

  .hero h1 {
    margin: -0.12em 0;
    line-height: 0.9;
  }

  .hero .mark {
    right: -110px;
    width: 520px;
  }
`;

const escapeHtml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Takumi loads each URL once, and takes the family name from the font file.
const fontURLs = fontVariables.flatMap((cssVariable) =>
  fontData[cssVariable].flatMap((font) =>
    font.src.map(({ url }) => getFontFileURL(url)),
  ),
);

const renderOptions = { ...ogImageSize, css, fonts: fontURLs };

// A break after a hyphen splits a package name, such as react-awesome-reveal.
const keepHyphenatedWords = (html: string) =>
  html.replace(/\S+-\S+/g, (word) => `<span class="nowrap">${word}</span>`);

const cardHtml = (card: OgCard, headlineSize: number) => `
  <div class="card ${card.layout}">
    <div class="text">
      <div class="label">${escapeHtml(card.label)}</div>
      <h1 style="font-size: ${headlineSize}px">${keepHyphenatedWords(escapeHtml(card.title))}</h1>
      ${card.layout === "hero" ? `<p class="tagline">${escapeHtml(card.tagline)}</p>` : ""}
    </div>
    <img class="mark" src="data:image/svg+xml,${encodeURIComponent(mark)}" />
  </div>`;

const cardHtmlVariants = (card: OgCard) =>
  headlineSizes[card.layout].map((size) => cardHtml(card, size));

/** Changes when the text, the design or the fonts of the card change. Social sites cache an image by its URL. */
export const getOgImageHash = (card: OgCard) =>
  createHash("sha256")
    .update(JSON.stringify({ renderOptions, maxTextBottom }))
    .update(cardHtmlVariants(card).join())
    .digest("hex")
    .slice(0, 8);

export async function renderOgImage(card: OgCard) {
  for (const html of cardHtmlVariants(card)) {
    if (await fitsCard(html)) return render(html, renderOptions);
  }
  throw new Error(
    `The OG image has no room for the title "${card.title}". Make the title shorter.`,
  );
}

async function fitsCard(html: string) {
  const [text] = (await measure(html, renderOptions)).children;
  const headline = text?.children[1];
  if (!text || !headline)
    throw new Error("The OG card has no headline to measure.");
  const [, , , , , textTop] = text.transform;
  // A word that is wider than the headline box overflows it. A nowrap word can do this.
  const overflows = headline.runs.some(
    ({ x, width }) => x + width > headline.width,
  );
  return textTop + text.height <= maxTextBottom && !overflows;
}
