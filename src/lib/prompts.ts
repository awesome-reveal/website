import { getEntry } from "astro:content";

export async function getPrompt(promptId: string) {
  const entry = await getEntry("prompts", promptId);
  const text = entry?.body?.trim();
  if (!entry || !text) {
    throw new Error(`No agent prompt with the id "${promptId}".`);
  }
  return { title: entry.data.title, text };
}
