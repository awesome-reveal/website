/** The slug of the `.md` file of a docs page, from a docs entry ID or a Starlight route ID. */
export const getMarkdownSlug = (id: string) =>
  id.replace(/(^|\/)index$/, "") || "index";

/** The path of the `.md` file of a docs page, from a Starlight route ID. */
export const getMarkdownPath = (id: string) => `/${getMarkdownSlug(id)}.md`;
