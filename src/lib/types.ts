export type OS = "linux" | "mac" | "windows";

export interface CommandStep {
  title: string;
  description?: string;
  commands: Partial<Record<OS, string>>;
}

export interface GuideSection {
  id: string;
  title: string;
  steps: CommandStep[];
}

export interface ToolGuide {
  slug: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  install: GuideSection;
  configure?: GuideSection;
  verify?: GuideSection;
  manage?: GuideSection;
  uninstall?: GuideSection;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface ManifestFile {
  filename: string;
  description?: string;
  content: string;
}

export interface DeploymentRecipe {
  slug: string;
  name: string;
  description: string;
  icon: string;
  type: "docker-compose" | "kubernetes" | "dockerfile";
  relatedTools: string[];
  files: ManifestFile[];
  apply: GuideSection;
}

export const SITE_INTRO =
  "DevOps Tools Installation means setting up automation tools (Git, Jenkins, Ansible, Docker, Kubernetes, Terraform, etc.) on servers, local machines, or cloud to create a smooth CI/CD pipeline. Each tool requires specific dependencies, configurations, and integrations for effective use.";
