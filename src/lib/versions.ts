import versionsConfig from "virtual:starlight-versions-config";

export const findArchivedVersion = (id: string) =>
  versionsConfig.versions.find(
    ({ slug }) => id === slug || id.startsWith(`${slug}/`),
  );

export const isArchived = (id: string) => findArchivedVersion(id) !== undefined;

const archivedSiteTitles: Partial<Record<string, string>> = {
  v4: "React Awesome Reveal",
};

export const getArchivedSiteTitle = (versionSlug: string) =>
  archivedSiteTitles[versionSlug];
