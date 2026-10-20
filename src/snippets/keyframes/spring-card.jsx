import { Reveal } from "@awesome-reveal/react";

const spring = "linear(0, 0.62, 1.01, 1.12, 1.09, 1.03, 1 60%, 1)";

const springIn = [
  { opacity: 0, scale: 0.4, easing: spring },
  { opacity: 1, scale: 1 },
];

export function SpringCard() {
  return (
    <Reveal className="card" keyframes={springIn} duration={1000}>
      A card
    </Reveal>
  );
}
