import starlight from "@astrojs/starlight";
import { defineConfig, fontProviders } from "astro/config";
import starlightBlog from "starlight-blog";
import starlightHeadingBadges from "starlight-heading-badges";
import starlightLinksValidator from "starlight-links-validator";
import starlightLlmsTxt from "starlight-llms-txt";
import starlightVersions from "starlight-versions";
import { codeThemes, markBackground } from "./src/code-themes";
import { siteConfig } from "./src/site.config";

const site = "https://awesome-reveal.dev";

// https://astro.build/config
export default defineConfig({
  site,
  experimental: {
    contentIntellisense: true,
  },
  vite: {
    optimizeDeps: {
      // Display-only code: the site does not install its imports.
      entries: ["!src/snippets/**"],
    },
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
            "The core package has no dependencies. With reveal() and cascade(), the core JavaScript API adds less than 2 kB gzipped. It uses Intersection Observer and the Web Animations API, and it obeys prefers-reduced-motion. The server renders the content hidden, so the content does not flash before the animation. Packages: @awesome-reveal/react, @awesome-reveal/vue, @awesome-reveal/astro and @awesome-reveal/core. It is the successor of react-awesome-reveal v4.",
          optionalLinks: [
            {
              label: "GitHub",
              url: siteConfig.repoUrl,
              description: "Source code, issues and discussions",
            },
          ],
          exclude: ["v4/**", "blog/**"],
          demote: ["blog/**"],
          customSelectors: { all: ["[data-markdown-ignore]"] },
        }),
        starlightVersions({
          current: { redirect: "root" },
          // An archive keeps the docs of one version. The blog is the same for all versions.
          exclude: ["blog/**"],
          versions: [{ slug: "v4", redirect: "root" }],
        }),
        // After starlight-versions: its middleware needs the docs sidebar, and the blog middleware replaces it.
        // Header.astro and MobileMenuFooter.astro render the blog link. The route middleware adds the structured data.
        starlightBlog({
          title: siteConfig.blog.title,
          prefix: siteConfig.blog.path,
          navigation: "none",
          structuredData: false,
          authors: {
            dennis: {
              name: siteConfig.author.name,
              url: siteConfig.author.url,
            },
          },
          metrics: { readingTime: true },
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
        ...siteConfig.sidebarGroups.map(({ label, directory }) => ({
          label,
          items: [{ autogenerate: { directory } }],
        })),
      ],
      head: [
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
