import { Reveal } from "@awesome-reveal/react";

export function PricingTitle() {
  return (
    <Reveal onReveal={(element) => console.log("Revealed", element)}>
      <h2>Pricing</h2>
    </Reveal>
  );
}
