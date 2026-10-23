import type { APIRoute, InferGetStaticPropsType } from "astro";
import { entryToMarkdown } from "../lib/markdown";
import { getMarkdownEntries, getMarkdownSlug } from "../lib/markdown-slug";

export const getStaticPaths = async () =>
  (await getMarkdownEntries()).map((entry) => ({
    params: { slug: getMarkdownSlug(entry.id) },
    props: { entry },
  }));

export const GET: APIRoute<
  InferGetStaticPropsType<typeof getStaticPaths>
> = async (context) =>
  new Response(await entryToMarkdown(context.props.entry, context), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
