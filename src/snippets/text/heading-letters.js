import { cascade } from "@awesome-reveal/core";

for (const heading of document.querySelectorAll("h2.letters")) {
  const text = heading.textContent.trim();
  const letters = Array.from(text, (character) => {
    const letter = document.createElement("span");
    letter.setAttribute("aria-hidden", "true");
    letter.textContent = character;
    return letter;
  });
  heading.setAttribute("aria-label", text);
  heading.textContent = "";
  heading.append(...letters);
}

cascade("h2.letters", { from: { opacity: 0 }, interval: 40 });
