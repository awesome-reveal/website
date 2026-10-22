---
title: Migrate with your AI agent
---

Migrate this project from react-awesome-reveal v4 to Awesome Reveal (https://awesome-reveal.dev).

1. Ask me which package to use:
   - `@awesome-reveal/react` (recommended): it gets all future versions.
   - `react-awesome-reveal@next`: it keeps the `react-awesome-reveal` import path, but it does not get `@awesome-reveal/react` 2.x.
2. Install the package with the package manager of this project.
3. Read `skills/migrating-from-v4/SKILL.md` in the installed package, and follow it. For more detail, read https://awesome-reveal.dev/guides/migrate-from-v4.md.
4. Migrate each use of `react-awesome-reveal` v4. If no other code uses Emotion, remove it. If you installed `@awesome-reveal/react`, remove `react-awesome-reveal`.
5. Run the type check, the lint, the tests and the build of the project.
6. Offer to install the skills of the package for later sessions, as https://awesome-reveal.dev/guides/ai-agents.md describes.
