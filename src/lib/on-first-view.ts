export function onFirstView(
  element: Element,
  threshold: number,
  callback: () => void,
) {
  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      callback();
    },
    { threshold },
  );
  observer.observe(element);
}
