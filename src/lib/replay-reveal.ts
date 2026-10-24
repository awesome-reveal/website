import { getReveal } from "@awesome-reveal/astro";

export function revealedElementsIn(root: ParentNode) {
  return root.querySelectorAll("awesome-reveal > :first-child");
}

// All resets come before the first start, so the entrances restart in step.
export function replayReveals(elements: Iterable<Element>) {
  const reveals = [...elements].map(getReveal);
  for (const reveal of reveals) reveal.when = false;
  for (const reveal of reveals) reveal.when = true;
}
