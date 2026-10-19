import {
  defineRouteMiddleware,
  type StarlightRouteData,
} from "@astrojs/starlight/route-data";
import type { APIContext } from "astro";
import { getMarkdownPath, getMarkdownSlug } from "./lib/markdown-slug";
import { buildStructuredData } from "./lib/structured-data";
import { findArchivedVersion, getArchivedSiteTitle } from "./lib/versions";

type Head = StarlightRouteData["head"];
type Entry = StarlightRouteData["entry"];
type Sidebar = StarlightRouteData["sidebar"];

export const onRequest = defineRouteMiddleware((context) => {
  const route = context.locals.starlightRoute;
  route.sidebar = removeEmptyGroups(route.sidebar);
  if (route.id === "404") return;
  const archivedVersion = findArchivedVersion(route.id);
  const searchTitle = getSearchTitle(route.entry);

  if (archivedVersion) {
    setArchivedSiteTitle(route, archivedVersion.slug, searchTitle);
  } else if (searchTitle !== undefined) {
    setOgTitle(route, searchTitle);
  }
  addMarkdownLinks(route.head, route.id);
  if (!archivedVersion) addStructuredData(route, context, searchTitle);
});

// Production builds skip draft pages, so a group of drafts has no entries.
// starlight-versions nests each version sidebar in a group, so the check is recursive.
function removeEmptyGroups(sidebar: Sidebar): Sidebar {
  return sidebar.flatMap<Sidebar[number]>((item) => {
    if (item.type !== "group") return [item];
    const entries = removeEmptyGroups(item.entries);
    return entries.length > 0 ? [{ ...item, entries }] : [];
  });
}

function getSearchTitle(entry: Entry) {
  const content = entry.data.head.find((tag) => tag.tag === "title")?.content;
  return typeof content === "string" ? content : undefined;
}

// The search title is a better headline than the short sidebar title.
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
  searchTitle: string | undefined,
) {
  const newSiteTitle = getArchivedSiteTitle(versionSlug);
  if (!newSiteTitle) return;
  setOgSiteName(head, newSiteTitle);
  if (searchTitle === undefined) {
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
  { id, head, entry }: StarlightRouteData,
  { url, site }: APIContext,
  searchTitle: string | undefined,
) {
  head.push({
    tag: "script",
    attrs: { type: "application/ld+json" },
    content: JSON.stringify(
      buildStructuredData({
        id: getMarkdownSlug(id),
        title: searchTitle ?? entry.data.title,
        description: entry.data.description,
        url: new URL(url.pathname, site).href,
        siteUrl: new URL("/", site).href,
      }),
    ),
  });
}
