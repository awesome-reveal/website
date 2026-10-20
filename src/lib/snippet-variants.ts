export type Framework = "react" | "vue" | "astro" | "js";

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

export type OptionCode = (framework: Framework, value: string) => string;

export const numberOptionCode =
  (name: string): OptionCode =>
  (framework, value) => {
    if (framework === "vue") return `:${name}="${value}"`;
    if (framework === "js") return `${name}: ${value}`;
    return `${name}={${value}}`;
  };

/** Gives the variants of each framework snippet, with `sample` replaced by each value. */
export function frameworkVariants(
  snippets: Partial<Record<Framework, string>>,
  optionCode: OptionCode,
  sample: string,
  values: string[],
): Partial<Record<Framework, SnippetVariant[]>> {
  return Object.fromEntries(
    (Object.entries(snippets) as [Framework, string][]).map(
      ([framework, code]) => [
        framework,
        snippetVariants(
          code,
          optionCode(framework, sample),
          values.map((value) => ({
            value,
            code: optionCode(framework, value),
          })),
        ),
      ],
    ),
  );
}
