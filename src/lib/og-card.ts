import type { CollectionEntry } from "astro:content";
import { siteConfig } from "../site.config";
import { isBlogPost } from "./blog";
import { getMarkdownSlug } from "./markdown-slug";
import { getOgImageHash, type OgCard } from "./og-image";
import { findArchivedVersion, getArchivedSiteTitle } from "./versions";

type Entry = Pick<CollectionEntry<"docs">, "id" | "data">;

export interface OgImage {
  slug: string;
  card: OgCard;
  alt: string;
}

const tagline = "Scroll reveal animations for React, Vue, Astro and JavaScript";

const createOgImage = (slug: string, card: OgCard, alt = card.title) => ({
  slug: `${slug}.${getOgImageHash(card)}`,
  card,
  alt,
});

const homeSlug = getMarkdownSlug("index");

/** The card of the home page. Pages without a docs entry, such as the 404 page and the blog lists, also use it. */
export const homeOgImage: OgImage = createOgImage(
  homeSlug,
  {
    layout: "hero",
    label: "@awesome-reveal/*",
    title: siteConfig.name,
    tagline,
  },
  `${siteConfig.name}: ${tagline}.`,
);

export function getOgImage(entry: Entry): OgImage {
  const slug = getMarkdownSlug(entry.id);
  if (slug === homeSlug) return homeOgImage;
  return createOgImage(slug, {
    layout: "page",
    label: getPageLabel(entry),
    title: entry.data.title,
  });
}

export const getOgImageUrl = ({ slug }: OgImage, site: URL | undefined) =>
  new URL(`/og/${slug}.png`, site).href;

function getPageLabel(entry: Entry) {
  const archivedVersion = findArchivedVersion(entry.id);
  if (archivedVersion) {
    const name = getArchivedSiteTitle(archivedVersion.slug) ?? siteConfig.name;
    return `${name} · ${archivedVersion.slug}`;
  }
  if (isBlogPost(entry)) return `${siteConfig.name} · ${siteConfig.blog.title}`;
  const group = siteConfig.sidebarGroups.find(({ directory }) =>
    entry.id.startsWith(`${directory}/`),
  );
  return `${siteConfig.name} · ${group?.label ?? "Docs"}`;
}
