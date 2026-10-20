import { useReveal } from "@awesome-reveal/react";

export function RevealedCard() {
  const { getProps, revealed } = useReveal();
  return <article {...getProps()}>{revealed ? "Hello" : "Waiting"}</article>;
}
