export interface GuideTrustMeta {
  lastReviewed: string;
  testedOn: string[];
}

export const DEFAULT_LAST_REVIEWED = "2026-06";

const DEFAULT: GuideTrustMeta = {
  lastReviewed: DEFAULT_LAST_REVIEWED,
  testedOn: ["Kubernetes 1.29", "Terraform 1.8", "Ubuntu 22.04"],
};

/** Per-tool overrides when validation differed from defaults */
const overrides: Record<string, Partial<GuideTrustMeta>> = {
  vault: { testedOn: ["Kubernetes 1.29", "Vault 1.16", "Ubuntu 22.04"] },
  terraform: { testedOn: ["Terraform 1.8", "AWS provider 5.x", "Ubuntu 22.04"] },
  "github-actions": { testedOn: ["GitHub-hosted runners", "Ubuntu 22.04", "Kubernetes 1.29"] },
  kind: { testedOn: ["kind 0.24", "Kubernetes 1.29", "Docker 26"] },
};

export function getGuideTrust(slug: string): GuideTrustMeta {
  const o = overrides[slug];
  return {
    lastReviewed: o?.lastReviewed ?? DEFAULT.lastReviewed,
    testedOn: o?.testedOn ?? DEFAULT.testedOn,
  };
}

/** Shared trust line for runbooks, flows, snippets index, etc. */
export function getContentTrust(): GuideTrustMeta {
  return DEFAULT;
}

export type VersionTopic = "kubernetes" | "terraform" | "ingress";

export interface VersionWarning {
  topic: VersionTopic;
  belowVersion: string;
  title: string;
  items: string[];
}

export const versionWarnings: VersionWarning[] = [
  {
    topic: "kubernetes",
    belowVersion: "1.28",
    title: "If you're on Kubernetes 1.27 or older",
    items: [
      "Ingress: networking.k8s.io/v1 is required — v1beta1 removed in 1.22+",
      "Pod Security: PodSecurityPolicy removed in 1.25 — use Pod Security Admission (PSA) labels",
      "HPA v2 autoscaling/v2 is stable — check API version in manifests",
    ],
  },
  {
    topic: "kubernetes",
    belowVersion: "1.29",
    title: "If you're on Kubernetes 1.28",
    items: [
      "Sidecar containers (1.29+) change init-container ordering — review sidecar docs before upgrade",
      "Verify metrics-server and HPA after control plane bump",
    ],
  },
  {
    topic: "terraform",
    belowVersion: "1.8",
    title: "If you're on Terraform 1.7 or older",
    items: [
      "S3 native locking (use_lockfile) differs from DynamoDB — don't mix backends mid-migration",
      "Provider version constraints: run terraform init -upgrade after bump",
      "terraform test (1.6+) replaces some external test harness patterns",
    ],
  },
  {
    topic: "ingress",
    belowVersion: "1.27",
    title: "Ingress-NGINX + older clusters",
    items: [
      "ingressClassName replaces deprecated kubernetes.io/ingress.class annotation",
      "Verify admission webhooks after controller upgrade",
    ],
  },
];

const k8sToolSlugs = new Set([
  "kubernetes",
  "kubectl",
  "helm",
  "kind",
  "minikube",
  "k3s",
  "microk8s",
  "k9s",
  "kustomize",
  "argocd",
  "flux",
  "external-secrets-operator",
  "cert-manager",
  "ingress-nginx",
  "nginx",
]);

const terraformToolSlugs = new Set(["terraform", "terragrunt", "pulumi", "aws-cloudformation"]);

export function getVersionTopicsForTool(slug: string): VersionTopic[] {
  const topics: VersionTopic[] = [];
  if (k8sToolSlugs.has(slug)) topics.push("kubernetes");
  if (terraformToolSlugs.has(slug)) topics.push("terraform");
  if (slug === "nginx" || slug === "ingress-nginx" || slug === "cert-manager") topics.push("ingress");
  return topics;
}

export function getVersionWarningsForTopics(topics: VersionTopic[]): VersionWarning[] {
  const seen = new Set<string>();
  return versionWarnings.filter((w) => {
    if (!topics.includes(w.topic)) return false;
    const key = `${w.topic}-${w.belowVersion}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function getVersionWarningsForTool(slug: string): VersionWarning[] {
  return getVersionWarningsForTopics(getVersionTopicsForTool(slug));
}
