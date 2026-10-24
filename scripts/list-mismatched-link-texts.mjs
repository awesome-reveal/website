import { globSync, readFileSync } from "node:fs";
import path from "node:path";
import { parse } from "yaml";

const rootDir = path.resolve(import.meta.dirname, "..");
const docsDir = path.join("src", "content", "docs");
const internalLink =
  /\[([^\]]+)\]\((\/[^)\s#?]*)([#?][^)\s]*)?(?:\s+"[^"]*")?\)/g;

const parseFrontmatter = (source) =>
  parse(source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? "") ?? {};

const getPageUrl = (file, slug) => {
  if (slug !== undefined) return slug ? `/${slug}/` : "/";
  const { dir, name } = path.parse(path.relative(docsDir, file));
  const segments = [...dir.split(path.sep), name].filter(
    (segment) => segment && segment !== "index",
  );
  return segments.length ? `/${segments.join("/")}/` : "/";
};

// Starlight serves a page with and without the trailing slash.
const withTrailingSlash = (url) => (url.endsWith("/") ? url : `${url}/`);

// Prettier can wrap a link text onto the next line.
const collapseWhitespace = (text) => text.replace(/\s+/g, " ").trim();

const normalizeName = (text) =>
  collapseWhitespace(text.replaceAll("`", "")).toLowerCase();

const getLineNumber = (source, index) =>
  source.slice(0, index).split("\n").length;

const collectPageNames = (sources) =>
  new Map(
    [...sources]
      .filter(([file]) => file.startsWith(docsDir + path.sep))
      .map(([file, source]) => {
        const { title, sidebar, slug } = parseFrontmatter(source);
        return [getPageUrl(file, slug), { title, label: sidebar?.label }];
      }),
  );

const findMismatchedLinks = (sources, pageNames) =>
  [...sources].flatMap(([file, source]) =>
    [...source.matchAll(internalLink)].flatMap((match) => {
      const [, text, url, anchor] = match;
      const page = pageNames.get(withTrailingSlash(url));
      // An anchor link names a heading or uses prose, so it would bury the page names.
      if (!page || anchor) return [];
      const names = [page.label, page.title].filter(Boolean).map(normalizeName);
      if (names.includes(normalizeName(text))) return [];
      return [
        { file, line: getLineNumber(source, match.index), text, url, ...page },
      ];
    }),
  );

// The archived pages keep their text, so their links are out of scope.
const files = globSync("src/content/**/*.{md,mdx}", {
  cwd: rootDir,
  exclude: ["src/content/docs/v4/**"],
});
const sources = new Map(
  files.map((file) => [file, readFileSync(path.join(rootDir, file), "utf8")]),
);
const mismatches = findMismatchedLinks(sources, collectPageNames(sources));

for (const { file, line, text, url, label, title } of mismatches) {
  console.log(
    `${file}:${line}\t"${collapseWhitespace(text)}" -> ${url}\t(label: ${label ?? "none"}, title: ${title})`,
  );
}
console.error(
  `${mismatches.length} links have a text that is not the label or the title of their page.`,
);
