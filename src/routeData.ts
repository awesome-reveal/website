import {
  defineRouteMiddleware,
  type StarlightRouteData,
} from "@astrojs/starlight/route-data";
import type { APIContext } from "astro";
import {
  getMarkdownPath,
  getMarkdownSlug,
  hasMarkdownVersion,
} from "./lib/markdown-slug";
import { buildStructuredData } from "./lib/structured-data";
import { findArchivedVersion, getArchivedSiteTitle } from "./lib/versions";
import { siteConfig } from "./site.config";

type Head = StarlightRouteData["head"];
type Entry = StarlightRouteData["entry"];
type Sidebar = StarlightRouteData["sidebar"];

export const onRequest = defineRouteMiddleware(async (context, next) => {
  const route = context.locals.starlightRoute;
  // starlight-versions runs later and replaces the sidebar with the one of the current version.
  await next();
  route.sidebar = removeEmptyGroups(route.sidebar);
  const hasMarkdown = await hasMarkdownVersion(route.id);
  if (isBlogPage(route.id) && !hasMarkdown) {
    setDescription(route.head, getBlogListDescription(route));
  }
  if (!hasMarkdown) return;
  const archivedVersion = findArchivedVersion(route.id);
  const headTitle = getHeadTitle(route.entry);

  if (archivedVersion) {
    setArchivedSiteTitle(route, archivedVersion.slug, headTitle);
  } else if (headTitle !== undefined) {
    setOgTitle(route, headTitle);
  }
  addMarkdownLinks(route.head, route.id);
  if (!archivedVersion) addStructuredData(route, context, headTitle);
});

// Production builds skip draft pages, so a group of drafts has no entries.
function removeEmptyGroups(sidebar: Sidebar): Sidebar {
  return sidebar.filter(
    (item) => item.type !== "group" || item.entries.length > 0,
  );
}

const isBlogPage = (id: string) => `/${id}/`.startsWith(siteConfig.blog.path);

// The blog plugin renders its lists with the description of the site.
function getBlogListDescription({ id, entry }: StarlightRouteData) {
  const [list] = `/${id}/`.slice(siteConfig.blog.path.length).split("/");
  const { title } = entry.data;
  if (list === "tags")
    return `Awesome Reveal blog posts with the tag ${title}.`;
  if (list === "authors") return `Awesome Reveal blog posts by ${title}.`;
  return siteConfig.blog.description;
}

function setDescription(head: Head, description: string) {
  for (const tag of head) {
    const isDescription =
      tag.attrs?.name === "description" ||
      tag.attrs?.property === "og:description";
    if (isDescription && tag.attrs) tag.attrs.content = description;
  }
}

function getHeadTitle(entry: Entry) {
  const content = entry.data.head.find((tag) => tag.tag === "title")?.content;
  return typeof content === "string" ? content : undefined;
}

// A head title entry replaces <title>, so og:title must show the same text.
function setOgTitle({ head, entry }: StarlightRouteData, title: string) {
  const ogTitle = head.find((tag) => tag.attrs?.property === "og:title");
  if (!ogTitle?.attrs) return;
  ogTitle.attrs.content = title;
  head.splice(head.indexOf(ogTitle), 1);
  // Starlight puts frontmatter metas last. Keep og:title before them.
  head.splice(head.length - countFrontmatterMetas(entry), 0, ogTitle);
}

function countFrontmatterMetas(entry: Entry) {
  return entry.data.head.filter((tag) => tag.tag === "meta").length;
}

// Starlight builds these tags before route middleware, so setting siteTitle does not change them.
function setArchivedSiteTitle(
  { head, siteTitle }: StarlightRouteData,
  versionSlug: string,
  headTitle: string | undefined,
) {
  const newSiteTitle = getArchivedSiteTitle(versionSlug);
  if (!newSiteTitle) return;
  setOgSiteName(head, newSiteTitle);
  if (headTitle === undefined) {
    replaceTitleSuffix(head, siteTitle, newSiteTitle);
  }
}

function setOgSiteName(head: Head, siteTitle: string) {
  const ogSiteName = head.find((tag) => tag.attrs?.property === "og:site_name");
  if (ogSiteName?.attrs) ogSiteName.attrs.content = siteTitle;
}

function replaceTitleSuffix(head: Head, oldSuffix: string, newSuffix: string) {
  const title = head.find((tag) => tag.tag === "title");
  if (title?.content?.endsWith(oldSuffix)) {
    title.content = title.content.slice(0, -oldSuffix.length) + newSuffix;
  }
}

function addMarkdownLinks(head: Head, id: string) {
  head.push(
    {
      tag: "link",
      attrs: {
        rel: "alternate",
        type: "text/markdown",
        href: getMarkdownPath(id),
      },
    },
    { tag: "link", attrs: { rel: "describedby", href: "/llms.txt" } },
  );
}

function addStructuredData(
  route: StarlightRouteData,
  { url, site }: APIContext,
  headTitle: string | undefined,
) {
  const { id, head, entry } = route;
  head.push({
    tag: "script",
    attrs: { type: "application/ld+json" },
    content: JSON.stringify(
      buildStructuredData({
        id: getMarkdownSlug(id),
        title: headTitle ?? entry.data.title,
        description: entry.data.description,
        url: new URL(url.pathname, site).href,
        siteUrl: new URL("/", site).href,
        post: isBlogPage(id) ? getPostData(route) : undefined,
      }),
    ),
  });
}

function getPostData({
  entry: { data },
  head,
  lastUpdated,
}: StarlightRouteData) {
  if (!data.date) return undefined;
  const image = head.find((tag) => tag.attrs?.property === "og:image")?.attrs
    ?.content;
  return {
    published: data.date,
    modified: lastUpdated,
    tags: data.tags ?? [],
    image: typeof image === "string" ? image : undefined,
  };
}
