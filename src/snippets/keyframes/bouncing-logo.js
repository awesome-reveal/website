import { reveal } from "@awesome-reveal/core";

reveal(".logo", {
  keyframes: [
    { opacity: 0, scale: 0.8, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
    { opacity: 1, scale: 1 },
  ],
});
