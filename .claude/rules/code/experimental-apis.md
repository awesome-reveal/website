---
paths:
  - "src/**/*.ts"
  - "src/**/*.astro"
  - "astro.config.mjs"
---

# Experimental APIs

Import an `experimental_` export with an alias that removes the prefix:

```ts
import { experimental_getFontFileURL as getFontFileURL } from "astro:assets";
```

The call sites then use the stable name. When the API becomes stable, only the import changes.
