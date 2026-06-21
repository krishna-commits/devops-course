import { deployments, getDeployment } from "./deployments";
import { getRelatedDeployments } from "./tool-extras";
import type { DeploymentRecipe } from "./types";

/** All config templates linked to a tool (explicit map + reverse lookup) */
export function getDeploymentsForTool(toolSlug: string): DeploymentRecipe[] {
  const slugs = new Set<string>(getRelatedDeployments(toolSlug));
  for (const d of deployments) {
    if (d.relatedTools.includes(toolSlug)) slugs.add(d.slug);
  }
  return [...slugs]
    .map((s) => getDeployment(s))
    .filter((d): d is DeploymentRecipe => Boolean(d));
}

export const POPULAR_SETUP_TOOLS = [
  "kubernetes",
  "docker",
  "docker-compose",
  "jenkins",
  "nginx",
  "helm",
  "terraform",
  "argocd",
  "github-actions",
  "postgresql",
  "mysql",
  "redis",
] as const;
