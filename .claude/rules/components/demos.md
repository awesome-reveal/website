---
paths:
  - "src/components/docs/**"
---

# Docs demos

- Render all the choices of a demo at build time, each as a `[data-choice]` child of `DemoFrame`, and mark the shown choice with `data-selected`. `DemoFrame` puts the choices in one grid cell and hides the others with `visibility: hidden`, so the frame keeps its size when the reader changes the choice.
- The snippet files in `src/snippets/` show one value of the option. Keep that value in a `SNIPPET_*` constant of the demo. Pass the shown choice as `selected` to `DemoFrame` and to the code component. `snippetVariants` replaces the sample code for each choice, and `frameworkVariants` calls it for each framework. It throws when the snippet does not contain the sample code exactly one time.
- Render the code variants with `SnippetVariants`, also for a demo with one language, such as `WordsDemo`. It stacks the variants like the choices, and its `minmax(0, 1fr)` column keeps a long line inside the code block.
- Check each changed demo at about 400 px: one choice shows, the frame keeps its height when the choice changes, and the page has no horizontal scroll.
