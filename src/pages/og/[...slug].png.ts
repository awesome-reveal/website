import type { APIRoute, InferGetStaticPropsType } from "astro";
import { getMarkdownEntries } from "../../lib/markdown-slug";
import { getOgImage } from "../../lib/og-card";
import { renderOgImage } from "../../lib/og-image";

export const getStaticPaths = async () =>
  (await getMarkdownEntries()).map(getOgImage).map(({ slug, card }) => ({
    params: { slug },
    props: { card },
  }));

export const GET: APIRoute<
  InferGetStaticPropsType<typeof getStaticPaths>
> = async ({ props }) =>
  new Response(await renderOgImage(props.card), {
    headers: { "Content-Type": "image/png" },
  });
