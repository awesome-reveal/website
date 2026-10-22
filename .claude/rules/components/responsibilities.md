---
paths:
  - "src/components/**"
  - "src/lib/**"
  - "src/routeData.ts"
---

# Responsibilities of components and helpers

Give each component, function and module one responsibility (SRP). These are the seams of this site:

- A component owns its markup, its scoped styles and its script. The parent owns the position of the child: the order, the gap and the alignment. The parent styles only the root of our own child, through a `class` prop that the child renders with `class:list`. A selector for an internal element of the child breaks when the child changes its markup. We cannot change the markup of a Starlight or plugin component, so style it as `scoped-styles.md` says.
- Put a check that two files need in one named function in `src/lib/`, for example `hasMarkdownVersion` for `PageTitle.astro` and `routeData.ts`. Two copies of one check can go out of sync.
- In a `<script>`, put the network call, the browser API call and the DOM update in separate functions. The event handler connects them. Each part has its own failures and browser quirks, for example the Safari clipboard rule in `CopyButton.astro`.
- When an override only adds to a Starlight component, wrap the default component. A copy of the Starlight source does not get the Starlight fixes.
