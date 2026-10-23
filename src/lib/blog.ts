import type { CollectionEntry } from "astro:content";
import { siteConfig } from "../site.config";

type Entry = Pick<CollectionEntry<"docs">, "id" | "data">;

export type BlogPost<T extends Entry = Entry> = T & { data: { date: Date } };

/** True for the posts and for the lists of the blog. */
export const isBlogPage = (id: string) =>
  `/${id}/`.startsWith(siteConfig.blog.path);

export const isBlogIndex = (id: string) => `/${id}/` === siteConfig.blog.path;

export const isBlogPost = <T extends Entry>(entry: T): entry is BlogPost<T> =>
  isBlogPage(entry.id) && entry.data.date !== undefined;
