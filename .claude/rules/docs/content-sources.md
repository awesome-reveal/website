---
paths:
  - "src/content/docs/**"
---

# Sources for the docs content

The current docs describe the `@awesome-reveal/*` packages. Check each API name, option default and code example against the `next` branch of [awesome-reveal/awesome-reveal](https://github.com/awesome-reveal/awesome-reveal). Read the local clone at `../awesome-reveal`. Run `git fetch` in it, and check that `HEAD` equals `origin/next`. If it differs, tell the user, and read the file on GitHub. Do not pull or edit in the clone. In your reply, give the file and line that backs each claim. Without a clone, read the file on GitHub at `https://raw.githubusercontent.com/awesome-reveal/awesome-reveal/next/<path>`. Browse the file tree at `https://github.com/awesome-reveal/awesome-reveal/tree/next`.

Where to find the facts:

- The JSDoc in `packages/core/src` and `packages/react/src` has the option docs and defaults.
- The consumer skills in `packages/*/skills` have examples. The `<package>:package` tests type-check their `ts` and `tsx` fences. The package READMEs have more examples, but no test checks them.
- The `migrating-from-v4` skills list the changes from `react-awesome-reveal` v4.

## Three code paths

A claim about the behavior of a waiting or revealing element is true only for one code path. Name the path in the docs, for example "In the JavaScript API", and check the claim in that path:

- **React, Vue and Astro**: `createStore` in `packages/core/src/adapter.ts`. The `reveal.css` of each package hides a waiting element with opacity only, at its resting position. The store creates the entrance at the reveal.
- **`reveal()`**: `packages/core/src/reveal.ts`. It creates a paused entrance before it observes the element, so the element waits at the first keyframe, and the observer measures the box of the element at that keyframe. `entrance()` in `animation.ts` puts a start state with `opacity: 0` and a movement at rest in the first keyframe. A start state with `x`, `y`, `scale` or `rotate` and no `opacity: 0` moves the box. Own `keyframes` move it when the first keyframe has a transform.
- **`cascade()`**: `packages/core/src/reveal.ts`. It observes the container, but `entrances()` in `animation.ts` animates the direct children. The start state of a child does not move the box of the container.

The v4 archive (`src/content/docs/v4/`) documents a different API. Do not copy examples from it into the current docs.

The build checks internal links and anchors. To check external links, see `review.md`.
