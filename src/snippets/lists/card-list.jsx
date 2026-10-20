import { Cascade } from "@awesome-reveal/react";

export function CardList({ cards }) {
  return (
    <Cascade as="ul" className="cards" interval={80}>
      {cards.map((card) => (
        <li key={card.id}>{card.title}</li>
      ))}
    </Cascade>
  );
}
