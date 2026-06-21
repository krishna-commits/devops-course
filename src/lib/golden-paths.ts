export interface GoldenPathGroup {
  id: string;
  title: string;
  description: string;
  recommended: { slug: string; name: string; reason: string }[];
  alternatives: { slug: string; name: string }[];
}

/** Team defaults — one blessed path per category */
export const goldenPathGroups: GoldenPathGroup[] = [
  {
    id: "secrets",
    title: "Secrets management",
    description: "Never commit plaintext secrets in Deployment YAML for production.",
    recommended: [
      { slug: "vault", name: "Vault", reason: "Central secrets, audit, dynamic credentials" },
      { slug: "external-secrets-operator", name: "External Secrets Operator", reason: "Sync cloud/Vault secrets into K8s Secrets" },
    ],
    alternatives: [
      { slug: "aws-secrets-manager", name: "AWS Secrets Manager" },
      { slug: "bitwarden", name: "Bitwarden CLI" },
    ],
  },
  {
    id: "local-k8s",
    title: "Local Kubernetes",
    description: "One local cluster standard for the team — CI-friendly and fast.",
    recommended: [{ slug: "kind", name: "kind", reason: "Lightweight, multi-node, great for CI and laptop" }],
    alternatives: [
      { slug: "minikube", name: "minikube" },
      { slug: "k3s", name: "k3s" },
      { slug: "microk8s", name: "MicroK8s" },
    ],
  },
  {
    id: "ci-cd",
    title: "CI/CD",
    description: "GitHub-native pipelines with OIDC — no long-lived cloud keys in repos.",
    recommended: [{ slug: "github-actions", name: "GitHub Actions", reason: "Colocated with PRs; OIDC to AWS/EKS" }],
    alternatives: [
      { slug: "bitbucket-pipelines", name: "Bitbucket Pipelines" },
      { slug: "gitlab-ci", name: "GitLab CI" },
      { slug: "jenkins", name: "Jenkins" },
    ],
  },
  {
    id: "iac",
    title: "Infrastructure as Code",
    description: "Terraform modules from proven repos — workspace per environment.",
    recommended: [{ slug: "terraform", name: "Terraform", reason: "Industry default; large module ecosystem" }],
    alternatives: [
      { slug: "pulumi", name: "Pulumi" },
      { slug: "aws-cloudformation", name: "CloudFormation" },
      { slug: "terragrunt", name: "Terragrunt" },
    ],
  },
];

export function getGoldenPathForTool(slug: string) {
  for (const group of goldenPathGroups) {
    const rec = group.recommended.find((r) => r.slug === slug);
    if (rec) return { group, role: "recommended" as const, entry: rec };
    const alt = group.alternatives.find((a) => a.slug === slug);
    if (alt) return { group, role: "alternative" as const, entry: alt };
  }
  return null;
}
