import type { APIRoute, InferGetStaticPropsType } from "astro";
import { getCollection } from "astro:content";
import { entryToMarkdown } from "../lib/markdown";
import { getMarkdownSlug } from "../lib/markdown-slug";

export const getStaticPaths = async () =>
  (await getCollection("docs")).map((entry) => ({
    params: { slug: getMarkdownSlug(entry.id) },
    props: { entry },
  }));

export const GET: APIRoute<
  InferGetStaticPropsType<typeof getStaticPaths>
> = async (context) =>
  new Response(await entryToMarkdown(context.props.entry, context), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
