import starlight from "@astrojs/starlight";
import { defineConfig, fontProviders } from "astro/config";
import starlightHeadingBadges from "starlight-heading-badges";
import starlightLinksValidator from "starlight-links-validator";
import starlightLlmsTxt from "starlight-llms-txt";
import starlightVersions from "starlight-versions";
import { codeThemes, markBackground } from "./src/code-themes";
import { siteConfig } from "./src/site.config";

const site = "https://awesome-reveal.dev";
const ogUrl = new URL("og.png?v=6", site).href;
const ogImageAlt = `${siteConfig.name}: scroll reveal animations for React, Vue, Astro and JavaScript.`;

// https://astro.build/config
export default defineConfig({
  site,
  experimental: {
    contentIntellisense: true,
  },
  fonts: [
    {
      name: "Bricolage Grotesque",
      cssVariable: "--font-bricolage",
      provider: fontProviders.google(),
      weights: ["600 800"],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["system-ui", "sans-serif"],
      options: {
        experimental: {
          variableAxis: { opsz: ["96"], wdth: [["75", "100"]] },
        },
      },
    },
    {
      name: "Hanken Grotesk",
      cssVariable: "--font-hanken",
      provider: fontProviders.google(),
      weights: ["400 700"],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["system-ui", "sans-serif"],
    },
    {
      name: "JetBrains Mono",
      cssVariable: "--font-jetbrains",
      provider: fontProviders.google(),
      weights: ["400 700"],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["ui-monospace", "monospace"],
    },
  ],
  integrations: [
    starlight({
      plugins: [
        starlightHeadingBadges(),
        starlightLinksValidator(),
        starlightLlmsTxt({
          projectName: siteConfig.name,
          description:
            "Awesome Reveal is an open source TypeScript library for scroll reveal animations in React, Vue, Astro and plain JavaScript.",
          details:
            "The core package has no dependencies. Reveal with one animation is about 2 kB gzipped or less. It uses Intersection Observer and the Web Animations API, and it obeys prefers-reduced-motion. The server renders the content hidden, so the content does not flash before the animation. Packages: @awesome-reveal/react, @awesome-reveal/vue, @awesome-reveal/astro and @awesome-reveal/core. It is the successor of react-awesome-reveal v4.",
          optionalLinks: [
            {
              label: "GitHub",
              url: siteConfig.repoUrl,
              description: "Source code, issues and discussions",
            },
          ],
          exclude: ["v4/**"],
          customSelectors: { all: ["[data-markdown-ignore]"] },
        }),
        starlightVersions({
          current: { redirect: "root" },
          versions: [{ slug: "v4", redirect: "root" }],
        }),
      ],
      title: siteConfig.name,
      description: siteConfig.description,
      routeMiddleware: "./src/routeData.ts",
      customCss: ["./src/styles/theme.css"],
      components: {
        Head: "./src/components/Head.astro",
        Banner: "./src/components/Banner.astro",
        Header: "./src/components/Header.astro",
        MobileMenuFooter: "./src/components/MobileMenuFooter.astro",
        Hero: "./src/components/Hero.astro",
        Footer: "./src/components/Footer.astro",
        PageTitle: "./src/components/PageTitle.astro",
        ThemeProvider: "./src/components/ThemeProvider.astro",
      },
      editLink: {
        baseUrl: "https://github.com/awesome-reveal/website/edit/main/",
      },
      expressiveCode: {
        themes: [codeThemes.dark, codeThemes.light],
        useStarlightUiThemeColors: false,
        styleOverrides: {
          borderRadius: "var(--radius-md)",
          borderColor: "var(--sl-color-hairline-light)",
          focusBorder: "var(--sl-color-text-accent)",
          textMarkers: {
            markBackground,
            markBorderColor: "var(--sl-color-text-accent)",
          },
          frames: {
            frameBoxShadowCssValue: "none",
            inlineButtonForeground: "var(--sl-color-gray-3)",
            inlineButtonBorder: "var(--sl-color-hairline-light)",
            inlineButtonBorderOpacity: "1",
            inlineButtonBackground: "var(--sl-color-text-accent)",
            inlineButtonBackgroundHoverOrFocusOpacity: "0.12",
            inlineButtonBackgroundActiveOpacity: "0.2",
            tooltipSuccessBackground: "var(--sl-color-text-accent)",
            tooltipSuccessForeground: "var(--sl-color-black)",
            editorTabBarBorderBottomColor: "var(--sl-color-hairline-light)",
            editorActiveTabForeground: "var(--sl-color-text)",
            editorActiveTabIndicatorBottomColor: "transparent",
            editorActiveTabIndicatorTopColor: "var(--sl-color-text-accent)",
            terminalTitlebarBorderBottomColor: "var(--sl-color-hairline-light)",
            terminalTitlebarForeground: "var(--sl-color-text)",
            terminalTitlebarDotsForeground: "var(--sl-color-gray-4)",
            terminalTitlebarDotsOpacity: "0.5",
          },
        },
      },
      // Autogenerated groups skip draft pages. A slug item for a draft page fails the production build.
      sidebar: [
        "getting-started",
        { label: "Guides", items: [{ autogenerate: { directory: "guides" } }] },
        {
          label: "Frameworks",
          items: [{ autogenerate: { directory: "frameworks" } }],
        },
        {
          label: "Concepts",
          items: [{ autogenerate: { directory: "concepts" } }],
        },
        {
          label: "Reference",
          items: [{ autogenerate: { directory: "reference" } }],
        },
        { label: "Help", items: [{ autogenerate: { directory: "help" } }] },
      ],
      head: [
        {
          tag: "meta",
          attrs: { property: "og:image", content: ogUrl },
        },
        {
          tag: "meta",
          attrs: { property: "og:image:alt", content: ogImageAlt },
        },
        {
          tag: "meta",
          attrs: { property: "og:image:type", content: "image/png" },
        },
        {
          tag: "meta",
          attrs: { property: "og:image:width", content: "1200" },
        },
        {
          tag: "meta",
          attrs: { property: "og:image:height", content: "630" },
        },
        { tag: "meta", attrs: { name: "twitter:image", content: ogUrl } },
        {
          tag: "meta",
          attrs: { name: "twitter:image:alt", content: ogImageAlt },
        },
        {
          tag: "meta",
          attrs: {
            name: "robots",
            content: "max-image-preview:large, max-snippet:-1",
          },
        },
        {
          tag: "link",
          attrs: { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
        },
      ],
    }),
  ],
});
