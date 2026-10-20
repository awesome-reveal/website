/** The slug of the `.md` file of a docs page, from a docs entry ID or a Starlight route ID. */
export const getMarkdownSlug = (id: string) =>
  id.replace(/(^|\/)index$/, "") || "index";

/** The path of the `.md` file of a docs page, from a Starlight route ID. */
export const getMarkdownPath = (id: string) => `/${getMarkdownSlug(id)}.md`;

/** Starlight renders its 404 page without a docs entry, so that page has no `.md` file. */
export const hasMarkdownVersion = (id: string) => id !== "404";
