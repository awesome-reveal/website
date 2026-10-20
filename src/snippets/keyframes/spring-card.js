import { reveal } from "@awesome-reveal/core";

const spring = "linear(0, 0.62, 1.01, 1.12, 1.09, 1.03, 1 60%, 1)";

reveal(".card", {
  keyframes: [
    { opacity: 0, scale: 0.4, easing: spring },
    { opacity: 1, scale: 1 },
  ],
  duration: 1000,
});
