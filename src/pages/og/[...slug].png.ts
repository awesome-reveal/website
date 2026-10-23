import type { APIRoute, GetStaticPaths } from "astro";
import { getBlogPosts, getOgImageSlug } from "../../lib/blog";
import { renderPostOgImage } from "../../lib/og-image";

export const getStaticPaths = (async () =>
  (await getBlogPosts()).map((post) => ({
    params: { slug: getOgImageSlug(post) },
    props: { title: post.data.title },
  }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) =>
  new Response(await renderPostOgImage(props.title), {
    headers: { "Content-Type": "image/png" },
  });
