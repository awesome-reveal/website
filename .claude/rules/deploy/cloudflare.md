---
paths:
  - "wrangler.jsonc"
  - "public/_headers"
  - "public/_redirects"
  - "public/robots.txt"
---

# Cloudflare deploys

- The Workers Builds deploy commands are `pnpm exec wrangler deploy` (production) and `pnpm exec wrangler preview` (previews). Do not use `npx`: npm stops with `EBADDEVENGINES`, because `devEngines.packageManager` names pnpm.
- Cloudflare Web Analytics adds its beacon to the HTML pages by itself, so the site has no analytics code. A `no-transform` value in `Cache-Control` stops the beacon.
- `public/_redirects` sets the redirects. A rule applies also when an asset exists at its path.
- `public/_headers` gives `/_astro/*` a long `immutable` cache. Without the Cloudflare adapter, nothing else adds it.
- Production sends `.md` and `.txt` files without a `charset`, so `public/_headers` adds `charset=utf-8`. `wrangler dev` adds it by itself, so a local test does not show the problem.
- `_headers` matches paths only, so a 404 also gets the headers of its path, such as `immutable` under `/_astro/*`. A Response Header Transform Rule in the zone sets `Cache-Control: no-store` and `Content-Type: text/html; charset=utf-8` on each 404. Preview URLs do not use zone rules, so test the rule on production.
- Without `not_found_handling: "404-page"`, Workers does not serve the Starlight 404 page.
- The site opts in to AI training: `public/robots.txt` and `public/_headers` send `ai-train=yes` content signals. Keep each AI bot policy of the zone at Allow. A Block policy turns on the managed robots.txt, and Cloudflare then prepends `ai-train=no` and `Disallow` rules for AI crawlers to our file.
- `awesome-reveal.dev` is a Workers Custom Domain in `wrangler.jsonc`. A DNS record on the hostname blocks it. A redirect rule sends `www` to the apex with a 301. It needs the proxied `www` record.
- `react-awesome-reveal.morello.dev` and `awesome-reveal.morello.dev` are old domains. Redirect rules in the `morello.dev` zone send them to `awesome-reveal.dev` with a 301, and keep the path and the query string. Keep a proxied record on each hostname, such as an `AAAA` record to `100::`: without a record, the hostname does not resolve, and the rule cannot run.
  - `react-awesome-reveal.morello.dev` goes to `/v4`, because it served the v4 docs.
  - `awesome-reveal.morello.dev` goes to the root, because it served the current site at the same paths.
  - Match each hostname with `eq`. `http.host contains "awesome-reveal.morello.dev"` also matches `react-awesome-reveal.morello.dev`.
