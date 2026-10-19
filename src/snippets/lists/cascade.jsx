import { Cascade } from "@awesome-reveal/react";

export const Cards = ({ cards }) => (
  <Cascade as="ul" className="cards" interval={80}>
    {cards.map((card) => (
      <li key={card.id}>{card.title}</li>
    ))}
  </Cascade>
);
