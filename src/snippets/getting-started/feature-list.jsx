import { Cascade } from "@awesome-reveal/react";

export function FeatureList() {
  return (
    <Cascade as="ul" interval={120}>
      <li>Small</li>
      <li>Native</li>
      <li>Accessible</li>
    </Cascade>
  );
}
