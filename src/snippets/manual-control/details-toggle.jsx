import { useState } from "react";
import { Reveal } from "@awesome-reveal/react";

export function DetailsToggle() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((open) => !open)}
      >
        Details
      </button>
      <Reveal when={open} hidden={!open} from={{ opacity: 0 }}>
        The details.
      </Reveal>
    </>
  );
}
