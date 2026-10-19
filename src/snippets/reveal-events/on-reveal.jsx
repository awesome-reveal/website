import { Reveal } from "@awesome-reveal/react";

export const Pricing = () => (
  <Reveal onReveal={(element) => console.log("Revealed", element)}>
    <h2>Pricing</h2>
  </Reveal>
);
