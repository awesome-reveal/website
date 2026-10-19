import { siteConfig } from "../site.config";

const context = "https://schema.org";

interface PageData {
  id: string;
  title: string;
  description?: string | undefined;
  url: string;
  siteUrl: string;
}

export function buildStructuredData({
  id,
  title,
  description,
  url,
  siteUrl,
}: PageData) {
  const website = { "@type": "WebSite", name: siteConfig.name, url: siteUrl };

  if (id === "index") {
    return {
      "@context": context,
      "@type": "SoftwareSourceCode",
      name: siteConfig.name,
      description: siteConfig.description,
      url: siteUrl,
      codeRepository: siteConfig.repoUrl,
      programmingLanguage: "TypeScript",
      license: "https://opensource.org/licenses/MIT",
      author: siteConfig.author,
    };
  }

  return {
    "@context": context,
    "@graph": [
      {
        "@type": "TechArticle",
        headline: title,
        description,
        url,
        inLanguage: "en",
        author: siteConfig.author,
        publisher: { "@id": siteConfig.author["@id"] },
        isPartOf: website,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: siteConfig.name,
            item: siteUrl,
          },
          { "@type": "ListItem", position: 2, name: title, item: url },
        ],
      },
    ],
  };
}
