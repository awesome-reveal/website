import { Cascade } from "@awesome-reveal/react";

export function HeadingWords() {
  return (
    <Cascade as="h2" className="words" interval={60}>
      <span>Reveal</span> <span>each</span> <span>word</span>
    </Cascade>
  );
}
