const name = "Awesome Reveal";

export const siteConfig = {
  name,
  // Open Graph wants language_TERRITORY. Starlight gives the page lang, "en".
  ogLocale: "en_US",
  description:
    "Scroll reveal animations for React, Vue, Astro and plain JavaScript. They use the Intersection Observer and Web Animations APIs and support reduced motion.",
  repoUrl: "https://github.com/awesome-reveal/awesome-reveal",
  // The same @id as the Person node of morello.dev, so search engines join the two.
  author: {
    "@type": "Person",
    "@id": "https://morello.dev/#me",
    name: "Dennis Morello",
    url: "https://morello.dev/",
  },
  // The OG card of a page shows the label of its group.
  sidebarGroups: [
    { label: "Guides", directory: "guides" },
    { label: "Frameworks", directory: "frameworks" },
    { label: "Concepts", directory: "concepts" },
    { label: "Reference", directory: "reference" },
    { label: "Help", directory: "help" },
  ],
  sponsorUrl: "https://github.com/sponsors/morellodev",
  blog: {
    title: "Blog",
    name: `${name} blog`,
    path: "/blog/",
    description:
      "Release notes, migration guides and news about Awesome Reveal, the open source scroll reveal animation library for React, Vue, Astro and JavaScript.",
  },
};
