import {
  flaskPostgresCompose,
  dockerNetworkCompose,
  microservicesCompose,
  k8sDeploymentService,
  k8sConfigmapSecrets,
  k8sHpa,
  k8sIngress,
  dockerfileTemplates,
} from "./recipes";
import {
  k8sClusterIP,
  k8sPvc,
  k8sMicroservicesSpring,
  k8sMicroservicesNode,
  githubActionsCi,
  k8sPodDisruptionBudget,
} from "./extra-recipes";
import {
  jenkinsEksPython,
  goMongoCompose,
  k8sGoMongo,
  k8sLaravelMonitoring,
  terraformAwsEc2,
  jenkinsPhpLaravel,
} from "./johnbedeir-recipes";
import { moreRecipes } from "./more-recipes";
import type { DeploymentRecipe } from "../types";

export const deployments: DeploymentRecipe[] = [
  flaskPostgresCompose,
  dockerNetworkCompose,
  microservicesCompose,
  k8sDeploymentService,
  k8sConfigmapSecrets,
  k8sClusterIP,
  k8sPvc,
  k8sHpa,
  k8sIngress,
  k8sMicroservicesSpring,
  k8sMicroservicesNode,
  githubActionsCi,
  k8sPodDisruptionBudget,
  dockerfileTemplates,
  jenkinsEksPython,
  jenkinsPhpLaravel,
  goMongoCompose,
  k8sGoMongo,
  k8sLaravelMonitoring,
  terraformAwsEc2,
  ...moreRecipes,
];

export function getDeployment(slug: string): DeploymentRecipe | undefined {
  return deployments.find((d) => d.slug === slug);
}

export function getDeploymentsByType(type: DeploymentRecipe["type"]) {
  return deployments.filter((d) => d.type === type);
}

export const deploymentTypes = [
  { id: "docker-compose" as const, name: "Docker Compose", icon: "🐳" },
  { id: "kubernetes" as const, name: "Kubernetes", icon: "☸️" },
  { id: "dockerfile" as const, name: "Dockerfile / CI", icon: "📄" },
];

export function getDeploymentSearchItems() {
  return deployments.map((d) => ({
    slug: d.slug,
    name: d.name,
    description: d.description,
    icon: d.icon,
    type: d.type,
    typeName: deploymentTypes.find((t) => t.id === d.type)?.name ?? d.type,
  }));
}
