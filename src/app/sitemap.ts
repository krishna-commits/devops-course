import type { MetadataRoute } from "next";
import { tools } from "@/lib/content";
import { deployments } from "@/lib/deployments";
import { cheatsheets } from "@/lib/cheatsheets";
import { utilities } from "@/lib/utilities/catalog";
import { runbooks } from "@/lib/runbooks";
import { comparisons } from "@/lib/comparisons";
import { shipFlows } from "@/lib/flows";

const BASE = "https://devops.krishnaneupane.com";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const indexPages: MetadataRoute.Sitemap = [
    "",
    "/tools/",
    "/deployments/",
    "/utilities/",
    "/cheatsheets/",
    "/fix/",
    "/snippets/",
    "/flows/",
    "/deploy/",
    "/runbooks/",
    "/compare/",
    "/about/",
    "/oncall/",
    "/go-live/",
    "/standards/",
    "/templates/",
    "/observe/",
    "/contribute/",
    "/backup/",
    "/rotate/",
    "/network/",
    "/certs/",
    "/scripts/",
    "/resources/",
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : path === "/tools/" ? 0.9 : 0.85,
  }));

  const toolPages = tools.map((t) => ({
    url: `${BASE}/tools/${t.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const configPages = deployments.map((d) => ({
    url: `${BASE}/deployments/${d.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const utilityPages = utilities.map((u) => ({
    url: `${BASE}/utilities/${u.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const cheatsheetPages = cheatsheets.map((s) => ({
    url: `${BASE}/cheatsheets/${s.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const runbookPages = runbooks.map((r) => ({
    url: `${BASE}/runbooks/${r.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const comparePages = comparisons.map((c) => ({
    url: `${BASE}/compare/${c.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const flowPages = shipFlows.map((f) => ({
    url: `${BASE}/flows/${f.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [
    ...indexPages,
    ...toolPages,
    ...configPages,
    ...utilityPages,
    ...cheatsheetPages,
    ...runbookPages,
    ...comparePages,
    ...flowPages,
  ];
}
