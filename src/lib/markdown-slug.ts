import { getCollection } from "astro:content";

/** The slug of the `.md` file of a docs page, from a docs entry ID or a Starlight route ID. */
export const getMarkdownSlug = (id: string) =>
  id.replace(/(^|\/)index$/, "") || "index";

/** The path of the `.md` file of a docs page, from a Starlight route ID. */
export const getMarkdownPath = (id: string) => `/${getMarkdownSlug(id)}.md`;

/** The docs entries that get a `.md` file. Production builds skip draft pages. */
export const getMarkdownEntries = () =>
  getCollection(
    "docs",
    ({ data }) => import.meta.env.MODE !== "production" || !data.draft,
  );

/** Pages without a docs entry, such as the 404 page and the blog lists, have no `.md` file. */
export const hasMarkdownVersion = async (id: string) => {
  const slug = getMarkdownSlug(id);
  const entries = await getMarkdownEntries();
  return entries.some((entry) => getMarkdownSlug(entry.id) === slug);
};
