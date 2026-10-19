export function objectLiteral(value: object) {
  const entries = Object.entries(value).map(
    ([key, item]) => `${key}: ${JSON.stringify(item)}`,
  );
  return `{ ${entries.join(", ")} }`;
}
