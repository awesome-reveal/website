import { Cascade } from "@awesome-reveal/react";

export function HeadingLetters({ text }) {
  return (
    <Cascade as="h2" aria-label={text} from={{ opacity: 0 }} interval={40}>
      {Array.from(text, (letter, index) => (
        <span key={index} aria-hidden="true">
          {letter}
        </span>
      ))}
    </Cascade>
  );
}
