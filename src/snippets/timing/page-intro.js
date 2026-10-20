import { reveal } from "@awesome-reveal/core";

reveal(".intro h2", { from: "left", duration: 800 });
reveal(".intro p", { from: { opacity: 0 }, delay: 200 });
