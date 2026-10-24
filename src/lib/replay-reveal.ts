import { getReveal } from "@awesome-reveal/astro";

export function replayReveal(element: Element) {
  const reveal = getReveal(element);
  reveal.when = false;
  reveal.when = true;
}
