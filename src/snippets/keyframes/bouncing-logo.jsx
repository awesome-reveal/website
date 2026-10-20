import { Reveal } from "@awesome-reveal/react";

const bounceIn = [
  { opacity: 0, scale: 0.8, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
  { opacity: 1, scale: 1 },
];

export function BouncingLogo() {
  return (
    <Reveal keyframes={bounceIn}>
      <img src="/logo.svg" alt="Awesome Reveal" />
    </Reveal>
  );
}
