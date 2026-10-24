---
paths:
  - "scripts/**"
---

# Node scripts

- Start a script with `pnpm exec node scripts/<name>.ts`. Do not add a `package.json` script for it. `pnpm exec` uses the Node version in `devEngines`.
- Write the script in TypeScript, in `scripts/`. Give it a kebab-case name that starts with a verb, such as `list-mismatched-link-texts.ts`.
- Node runs a `.ts` file with type stripping: it removes the types, and it does not type-check or compile. `pnpm check` type-checks the scripts, because `tsconfig.json` includes them.
- Use only erasable TypeScript syntax. Node cannot run `enum`, `namespace` or parameter properties, and `erasableSyntaxOnly` in `tsconfig.json` reports them. Node ignores `tsconfig.json`, so an import of another script needs the `.ts` extension.
- The root `tsconfig.json` uses the Astro settings for Vite. With them, the type check accepts an import with no extension and the DOM globals, and both fail in Node. When a script imports another script, add a `scripts/tsconfig.json` with `module: "nodenext"`, `erasableSyntaxOnly`, `verbatimModuleSyntax` and `types: ["node"]`. Then remove `erasableSyntaxOnly` from the root `tsconfig.json`, because Vite compiles the other syntax.
- Resolve the paths from `import.meta.dirname`, not from the current directory, so that the script works from each directory.
- Use the Node built-ins first, such as `fs.globSync` and `node:path`. Add a package with `pnpm add -D` only when no built-in does the work.
- Write the results to stdout and the summary to stderr, so that a pipe gets only the results.
- To fail, set `process.exitCode`. Do not call `process.exit()`: it can stop the process before the output is complete.
