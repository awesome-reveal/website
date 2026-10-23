import { siteConfig } from "../site.config";

const context = "https://schema.org";

interface PostData {
  published: Date;
  modified: Date | undefined;
  tags: string[];
  image: string | undefined;
}

interface PageData {
  id: string;
  title: string;
  description?: string | undefined;
  url: string;
  siteUrl: string;
  post?: PostData | undefined;
}

export function buildStructuredData({
  id,
  title,
  description,
  url,
  siteUrl,
  post,
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

  if (post) {
    const blogUrl = new URL(siteConfig.blog.path, siteUrl).href;
    return {
      "@context": context,
      "@graph": [
        {
          "@type": "BlogPosting",
          headline: title,
          description,
          url,
          mainEntityOfPage: url,
          datePublished: post.published.toISOString(),
          dateModified: (post.modified ?? post.published).toISOString(),
          image: post.image,
          keywords: post.tags,
          inLanguage: "en",
          author: siteConfig.author,
          publisher: { "@id": siteConfig.author["@id"] },
          isPartOf: {
            "@type": "Blog",
            name: siteConfig.blog.title,
            url: blogUrl,
          },
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
            {
              "@type": "ListItem",
              position: 2,
              name: siteConfig.blog.title,
              item: blogUrl,
            },
            { "@type": "ListItem", position: 3, name: title, item: url },
          ],
        },
      ],
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
