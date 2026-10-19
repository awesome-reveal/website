import { useReveal } from "@awesome-reveal/react";

export function Card() {
  const { getProps, revealed } = useReveal();
  return <article {...getProps()}>{revealed ? "Hello" : "Waiting"}</article>;
}
