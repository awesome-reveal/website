import type { CollectionEntry } from "astro:content";
import { siteConfig } from "../site.config";
import { getMarkdownEntries } from "./markdown-slug";

type Entry = Pick<CollectionEntry<"docs">, "id" | "digest" | "data">;

export type BlogPost<T extends Entry = Entry> = T & { data: { date: Date } };

/** True for the posts and for the lists of the blog. */
export const isBlogPage = (id: string) =>
  `/${id}/`.startsWith(siteConfig.blog.path);

export const isBlogIndex = (id: string) => `/${id}/` === siteConfig.blog.path;

export const isBlogPost = <T extends Entry>(entry: T): entry is BlogPost<T> =>
  isBlogPage(entry.id) && entry.data.date !== undefined;

export const getBlogPosts = async () =>
  (await getMarkdownEntries()).filter(isBlogPost);

// `digest` is a hash of the post file. Social sites cache an image by its URL, so an edited post needs a new URL.
export function getOgImageSlug({ id, digest }: Entry) {
  if (digest === undefined) throw new Error(`The entry ${id} has no digest.`);
  return `${id}.${String(digest).slice(0, 8)}`;
}

export const getOgImageUrl = (post: Entry, site: URL | undefined) =>
  new URL(`/og/${getOgImageSlug(post)}.png`, site).href;
