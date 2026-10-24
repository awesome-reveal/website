import { globSync, readFileSync } from "node:fs";
import path from "node:path";
import { parse } from "yaml";

interface Frontmatter {
  title?: string;
  slug?: string;
  sidebar?: { label?: string };
}

interface PageNames {
  title: string | undefined;
  label: string | undefined;
}

interface MismatchedLink extends PageNames {
  file: string;
  line: number;
  linkText: string;
  target: string;
}

const repoRoot = path.resolve(import.meta.dirname, "..");
const docsDir = path.join("src", "content", "docs");
const placeholderOrigin = "https://example.com";
// A target that starts with `//` is an external link.
const internalLinkPattern = /\[([^\]]+)\]\((\/(?!\/)[^)\s]*)(?:\s+"[^"]*")?\)/g;

const readSourcesByFile = () => {
  // The archived pages keep their text, so their links are out of scope.
  const files = globSync("src/content/**/*.{md,mdx}", {
    cwd: repoRoot,
    exclude: [path.join(docsDir, "v4", "**")],
  });
  return new Map(
    files.map((file) => [
      file,
      readFileSync(path.join(repoRoot, file), "utf8"),
    ]),
  );
};

const parseFrontmatter = (source: string): Frontmatter =>
  parse(source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? "") ?? {};

const getPageUrl = (file: string, slug: string | undefined) => {
  if (slug !== undefined) return path.posix.join("/", slug, "/");
  const { dir, name } = path.parse(path.relative(docsDir, file));
  const segments = [...dir.split(path.sep), name].filter(
    (segment) => segment && segment !== "index",
  );
  return path.posix.join("/", ...segments, "/");
};

// Starlight serves a page with and without the trailing slash.
const withTrailingSlash = (pathname: string) =>
  pathname.endsWith("/") ? pathname : `${pathname}/`;

// Prettier can wrap a link text onto the next line.
const collapseWhitespace = (text: string) => text.replace(/\s+/g, " ").trim();

const normalizeName = (text: string) =>
  collapseWhitespace(text.replaceAll("`", "")).toLowerCase();

const matchesPageName = (linkText: string, page: PageNames) =>
  [page.label, page.title]
    .filter((name) => name !== undefined)
    .map(normalizeName)
    .includes(normalizeName(linkText));

const getLineNumber = (source: string, index: number) =>
  source.slice(0, index).split("\n").length;

const collectPageNamesByUrl = (sourcesByFile: Map<string, string>) =>
  new Map(
    sourcesByFile
      .entries()
      .filter(([file]) => path.matchesGlob(file, path.join(docsDir, "**")))
      .map(([file, source]): [string, PageNames] => {
        const { title, sidebar, slug } = parseFrontmatter(source);
        return [getPageUrl(file, slug), { title, label: sidebar?.label }];
      }),
  );

const findMismatchedLinks = (
  sourcesByFile: Map<string, string>,
  pageNamesByUrl: Map<string, PageNames>,
): MismatchedLink[] =>
  sourcesByFile
    .entries()
    .flatMap(([file, source]) =>
      source.matchAll(internalLinkPattern).flatMap((match) => {
        const [, linkText = "", target = ""] = match;
        const { pathname, hash } = new URL(target, placeholderOrigin);
        const page = pageNamesByUrl.get(withTrailingSlash(pathname));
        // An anchor link names a heading or uses prose, so it would bury the page names.
        if (!page || hash || matchesPageName(linkText, page)) return [];
        const line = getLineNumber(source, match.index);
        return [{ file, line, linkText, target, ...page }];
      }),
    )
    .toArray();

const formatMismatchedLink = (link: MismatchedLink) =>
  `${link.file}:${link.line}\t"${collapseWhitespace(link.linkText)}" -> ${link.target}\t(label: ${link.label ?? "none"}, title: ${link.title})`;

const sourcesByFile = readSourcesByFile();
const mismatchedLinks = findMismatchedLinks(
  sourcesByFile,
  collectPageNamesByUrl(sourcesByFile),
);

for (const link of mismatchedLinks) console.log(formatMismatchedLink(link));
console.error(
  `${mismatchedLinks.length} links have a text that is not the label or the title of their page.`,
);
