import { Reveal } from "@awesome-reveal/react";

export function DownloadsChart() {
  return (
    <Reveal threshold={0.5}>
      <img src="/chart.svg" alt="Downloads for each month" />
    </Reveal>
  );
}
