import {
  experimental_getFontFileURL as getFontFileURL,
  fontData,
} from "astro:assets";
import { measure, render } from "takumi-js";
import { siteConfig } from "../site.config";

const ogImageSize = { width: 1200, height: 630 };

// X covers the card below y 520 with the post title.
const maxTextBottom = 520;
const headlineSizes = [104, 88, 76];

const fontVariables = ["--font-bricolage", "--font-jetbrains"] as const;

const mark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="72 152 368 208"><g fill="#ffd23f"><circle cx="176" cy="256" r="104" opacity=".25"/><circle cx="256" cy="256" r="104" opacity=".5"/><circle cx="336" cy="256" r="104"/></g></svg>`;

// The tokens copy the template of the updating-og-image skill.
const css = `
  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 36px;
    width: 100%;
    height: 100%;
    padding: 80px;
    background-color: #181b36;
    background-image:
      linear-gradient(rgb(159 211 230 / 7%) 2px, transparent 2px),
      linear-gradient(90deg, rgb(159 211 230 / 7%) 2px, transparent 2px);
    background-size: 60px 60px;
    background-position: center;
    color: #eef0f7;
  }

  .label {
    color: #9fd3e6;
    font-family: "JetBrains Mono";
    font-size: 34px;
    font-weight: 500;
  }

  h1 {
    max-width: 760px;
    margin: 0;
    font-family: "Bricolage Grotesque";
    font-weight: 800;
    font-stretch: 78%;
    font-variation-settings: "opsz" 96;
    line-height: 0.92;
    letter-spacing: -0.01em;
    text-wrap: balance;
  }

  .mark {
    position: absolute;
    top: 196px;
    right: -150px;
    width: 420px;
    height: 238px;
  }
`;

const escapeHtml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function renderPostOgImage(title: string) {
  const options = { ...ogImageSize, css, fonts: getFontURLs() };
  for (const size of headlineSizes) {
    const html = cardHtml(title, size);
    const [, headline] = (await measure(html, options)).children;
    if (!headline) throw new Error("The OG card has no headline to measure.");
    const [, , , , , headlineTop] = headline.transform;
    if (headlineTop + headline.height <= maxTextBottom)
      return render(html, options);
  }
  throw new Error(
    `The OG image has no room for the title "${title}". Make the title shorter.`,
  );
}

const cardHtml = (title: string, headlineSize: number) => `
  <div class="card">
    <div class="label">${escapeHtml(`${siteConfig.name} ${siteConfig.blog.title.toLowerCase()}`)}</div>
    <h1 style="font-size: ${headlineSize}px">${escapeHtml(title)}</h1>
    <img class="mark" src="data:image/svg+xml,${encodeURIComponent(mark)}" />
  </div>`;

// Takumi loads each URL once, and takes the family name from the font file.
const getFontURLs = () =>
  fontVariables.flatMap((cssVariable) =>
    fontData[cssVariable].flatMap((font) =>
      font.src.map(({ url }) => getFontFileURL(url)),
    ),
  );
