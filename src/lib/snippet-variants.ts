export interface SnippetVariant {
  value: string;
  code: string;
  mark?: string;
}

export function snippetVariants(
  code: string,
  sample: string,
  replacements: { value: string; code: string }[],
): SnippetVariant[] {
  if (code.split(sample).length !== 2) {
    throw new Error(`The snippet must contain ${sample} once:\n${code}`);
  }
  return replacements.map(({ value, code: replacement }) => ({
    value,
    code: code.replace(sample, () => replacement),
    mark: replacement,
  }));
}
