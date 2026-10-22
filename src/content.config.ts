import { docsLoader, i18nLoader } from "@astrojs/starlight/loaders";
import { docsSchema, i18nSchema } from "@astrojs/starlight/schema";
import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { docsVersionsLoader } from "starlight-versions/loader";

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        scrollCueTarget: z
          .string()
          .optional()
          .describe(
            'The id of the section that the "Scroll down" link of the hero opens.',
          ),
        footer: z
          .boolean()
          .default(true)
          .describe(
            "Show the page footer: the edit link, the last-updated date, the pagination and the site credits.",
          ),
        hero: z
          .object({
            actions: z
              .object({
                prompt: reference("prompts")
                  .optional()
                  .describe(
                    "The agent prompt that the action copies. Starlight and its plugins still need `link`.",
                  ),
              })
              .array()
              .default([]),
          })
          .optional(),
      }),
    }),
  }),
  prompts: defineCollection({
    loader: glob({ pattern: "*.md", base: "./src/content/prompts" }),
    schema: z.object({
      title: z
        .string()
        .describe("The title of the aside that offers the prompt."),
    }),
  }),
  i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
  versions: defineCollection({ loader: docsVersionsLoader() }),
};
