import { includeIgnoreFile } from "eslint/config";
import eslint from "@eslint/js";
import eslintReact from "@eslint-react/eslint-plugin";
import eslintPluginAstro from "eslint-plugin-astro";
import reactHooks from "eslint-plugin-react-hooks";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import { fileURLToPath } from "node:url";
import tseslint from "typescript-eslint";

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url));

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  // Prettier formats the templates, and the Vue layout rules conflict with it.
  pluginVue.configs["no-layout-rules"],
  includeIgnoreFile(gitignorePath),
  {
    files: ["*.mjs", "scripts/*.mjs"],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ["src/snippets/**/*.{js,jsx,vue}"],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ["src/snippets/**/*.jsx"],
    ...eslintReact.configs.strict,
    ...reactHooks.configs.flat.recommended,
    plugins: {
      ...eslintReact.configs.strict.plugins,
      ...reactHooks.configs.flat.recommended.plugins,
    },
    rules: {
      ...eslintReact.configs.strict.rules,
      ...eslintReact.configs["disable-conflict-eslint-plugin-react-hooks"]
        .rules,
      ...reactHooks.configs.flat.recommended.rules,
    },
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
];
