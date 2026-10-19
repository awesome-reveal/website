import { reveal } from "@awesome-reveal/core";

reveal(".fade", { from: { opacity: 0 } });
reveal(".scale", { from: { scale: 0.9 } });
reveal(".all", { from: { opacity: 0, x: "-100%", rotate: "-5deg", blur: 8 } });
