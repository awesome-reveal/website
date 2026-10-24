---
paths:
  - "scripts/**"
---

# Node scripts

- Start a script with `pnpm exec node scripts/<name>.mjs`. Do not add a `package.json` script for it. `pnpm exec` uses the Node version in `devEngines`.
- Write the script as an `.mjs` file in `scripts/`. Give it a kebab-case name that starts with a verb, such as `list-mismatched-link-texts.mjs`.
- ESLint gives the Node globals only to `*.mjs` and `scripts/*.mjs`. For a script in a different place, add its glob in `eslint.config.mjs`.
- Resolve the paths from `import.meta.dirname`, not from the current directory, so that the script works from each directory.
- Use the Node built-ins first, such as `fs.globSync` and `node:path`. Add a package with `pnpm add -D` only when no built-in does the work.
- Write the results to stdout and the summary to stderr, so that a pipe gets only the results.
- To fail, set `process.exitCode`. Do not call `process.exit()`: it can stop the process before the output is complete.
