import { Reveal } from "@awesome-reveal/react";

export function PageIntro() {
  return (
    <>
      <Reveal as="h2" from="left" duration={800}>
        Welcome
      </Reveal>
      <Reveal as="p" from={{ opacity: 0 }} delay={200}>
        The text starts after the delay.
      </Reveal>
    </>
  );
}
