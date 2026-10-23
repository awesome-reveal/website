import type { APIContext } from "astro";
import { getContainerRenderer as getMdxRenderer } from "@astrojs/mdx/container-renderer";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { loadRenderers } from "astro:container";
import { render, type CollectionEntry } from "astro:content";
import type { Element, ElementContent, Root } from "hast";
import { matches, select, selectAll } from "hast-util-select";
import { toString } from "hast-util-to-string";
import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";
import remarkGfm from "remark-gfm";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { remove } from "unist-util-remove";

const container = await AstroContainer.create({
  renderers: await loadRenderers([getMdxRenderer()]),
});

const element = (tagName: string, children: ElementContent[]): Element => ({
  type: "element",
  tagName,
  properties: {},
  children,
});

const removeNoise = (tree: Root) =>
  remove(
    tree,
    (node) =>
      node.type === "comment" ||
      matches(
        "[data-markdown-ignore], .sr-only, .sl-anchor-link, script, style",
        node as Element,
      ),
  );

const codeBlocks = (tree: Root) => {
  for (const frame of selectAll(".expressive-code", tree)) {
    const pre = select("pre", frame);
    const code = select("code", frame);
    const language = pre?.properties.dataLanguage;
    if (code && typeof language === "string") {
      code.properties.className = [`language-${language}`];
      // Each line is a block element, so the text of the code has no line breaks of its own.
      const lines = selectAll(".ec-line", code).map((line) =>
        toString(line).replace(/\n$/, ""),
      );
      code.children = [{ type: "text", value: lines.join("\n") }];
    }
    // The caption holds the file title, which would print as loose text.
    remove(frame, (node) => matches("figcaption", node as Element));
  }
};

const asides = (tree: Root) => {
  for (const aside of selectAll(".starlight-aside", tree)) {
    const title = select(".starlight-aside__title", aside);
    const content = select(".starlight-aside__content", aside);
    if (!title || !content) continue;
    aside.tagName = "blockquote";
    aside.properties = {};
    aside.children = [
      element("p", [element("strong", title.children)]),
      ...content.children,
    ];
  }
};

const linkCards = (tree: Root) => {
  for (const card of selectAll(".sl-link-card", tree)) {
    const link = select("a", card);
    const description = select(".description", card);
    if (!link) continue;
    card.tagName = "p";
    card.properties = {};
    card.children = [
      link,
      ...(description
        ? [{ type: "text" as const, value: ": " }, ...description.children]
        : []),
    ];
  }
};

const tabs = (tree: Root) => {
  for (const group of selectAll("starlight-tabs", tree)) {
    const panels = selectAll('[role="tabpanel"]', group);
    group.tagName = "ul";
    group.properties = {};
    group.children = selectAll('[role="tab"]', group).flatMap((tab, i) =>
      panels[i]
        ? [
            element("li", [
              element("p", [{ type: "text", value: toString(tab).trim() }]),
              panels[i],
            ]),
          ]
        : [],
    );
  }
};

const pipeline = unified()
  .use(rehypeParse, { fragment: true })
  .use(() => (tree: Root) => {
    removeNoise(tree);
    codeBlocks(tree);
    asides(tree);
    linkCards(tree);
    tabs(tree);
  })
  .use(rehypeRemark)
  .use(remarkGfm)
  .use(remarkStringify);

export async function entryToMarkdown(
  entry: CollectionEntry<"docs">,
  { request, locals }: Pick<APIContext, "request" | "locals">,
) {
  const { Content } = await render(entry);
  const html = await container.renderToString(Content, { request, locals });
  const body = String(await pipeline.process(html)).trim();
  const { title, description, hero } = entry.data;
  const actions = hero?.actions.map(({ text, link }) => `- [${text}](${link})`);
  return `${[
    `# ${hero?.title ?? title}`,
    `> ${hero?.tagline ?? description}`,
    actions?.join("\n"),
    body,
  ]
    .filter(Boolean)
    .join("\n\n")}\n`;
}
