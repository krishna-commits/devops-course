export interface ComparisonTool {
  slug: string;
  name: string;
  icon: string;
}

export interface ComparisonRow {
  aspect: string;
  values: string[];
}

export interface ComparisonPick {
  tool: string;
  reason: string;
}

export interface Comparison {
  slug: string;
  title: string;
  description: string;
  icon: string;
  tools: ComparisonTool[];
  rows: ComparisonRow[];
  whenToUse: ComparisonPick[];
  relatedConfigs: string[];
  relatedTools: string[];
}

export const comparisons: Comparison[] = [
  {
    slug: "jenkins-vs-github-actions-vs-gitlab-ci",
    title: "Jenkins vs GitHub Actions vs GitLab CI",
    description: "Pick a CI/CD platform for your repo, team size, and deployment target.",
    icon: "🔄",
    tools: [
      { slug: "jenkins", name: "Jenkins", icon: "🤖" },
      { slug: "github-actions", name: "GitHub Actions", icon: "⚡" },
      { slug: "gitlab-ci", name: "GitLab CI", icon: "🦊" },
    ],
    rows: [
      { aspect: "Hosting", values: ["Self-hosted or cloud controller", "GitHub-hosted runners + self-hosted option", "GitLab.com or self-managed GitLab"] },
      { aspect: "Config format", values: ["Jenkinsfile (Groovy) or UI jobs", "YAML in .github/workflows/", "YAML in .gitlab-ci.yml"] },
      { aspect: "Best when", values: ["Complex pipelines, many plugins, on-prem", "GitHub-native repos, quick YAML CI", "All-in-one Git + CI + registry on GitLab"] },
      { aspect: "Secrets", values: ["Credentials plugin, vault integration", "GitHub Secrets, OIDC to cloud", "GitLab CI variables, masked/protected"] },
      { aspect: "K8s deploy", values: ["kubectl/helm in agent pod or SSH", "Actions + kubeconfig or Helm action", "GitLab Agent / kubectl in job image"] },
      { aspect: "Learning curve", values: ["Higher (plugins, Groovy)", "Lower for simple workflows", "Medium — similar to GHA YAML"] },
    ],
    whenToUse: [
      { tool: "Jenkins", reason: "You need full control, heavy customization, or already run Jenkins on-prem." },
      { tool: "GitHub Actions", reason: "Code lives on GitHub and you want CI colocated with PRs and releases." },
      { tool: "GitLab CI", reason: "You use GitLab for SCM and want integrated registry, security scanning, and environments." },
    ],
    relatedConfigs: ["github-actions-ci", "jenkins-php-laravel", "jenkins-eks-python"],
    relatedTools: ["jenkins", "github-actions", "gitlab-ci", "docker", "kubernetes"],
  },
  {
    slug: "terraform-vs-pulumi",
    title: "Terraform vs Pulumi",
    description: "Two IaC approaches — HCL state files vs real programming languages.",
    icon: "🏗️",
    tools: [
      { slug: "terraform", name: "Terraform", icon: "🏗️" },
      { slug: "pulumi", name: "Pulumi", icon: "⚡" },
    ],
    rows: [
      { aspect: "Language", values: ["HCL (.tf files)", "TypeScript, Python, Go, C#, Java, YAML"] },
      { aspect: "State", values: ["Local or remote (S3, Terraform Cloud)", "Pulumi Service or self-managed backend"] },
      { aspect: "Ecosystem", values: ["Largest provider catalog, modules registry", "Strong AWS/Azure/GCP, growing community"] },
      { aspect: "Testing", values: ["terratest, plan in CI, policy (OPA/Sentinel)", "Unit tests in your language, integration tests"] },
      { aspect: "Team fit", values: ["Ops/platform teams, declarative standard", "Dev teams who prefer code over HCL"] },
      { aspect: "Lock-in", values: ["Low — open source core", "Low — open source, optional SaaS state"] },
    ],
    whenToUse: [
      { tool: "Terraform", reason: "Industry default, huge module library, and your team already knows HCL." },
      { tool: "Pulumi", reason: "You want loops, classes, and real tests in TypeScript/Python for complex infra." },
    ],
    relatedConfigs: ["terraform-aws-ec2"],
    relatedTools: ["terraform", "pulumi", "aws-cli", "terragrunt"],
  },
  {
    slug: "docker-vs-podman",
    title: "Docker vs Podman",
    description: "Container engines — daemon vs daemonless, rootless, and compose compatibility.",
    icon: "🐳",
    tools: [
      { slug: "docker", name: "Docker", icon: "🐳" },
      { slug: "podman", name: "Podman", icon: "🦭" },
    ],
    rows: [
      { aspect: "Architecture", values: ["dockerd daemon", "Daemonless, fork-exec model"] },
      { aspect: "Rootless", values: ["Supported (docker rootless)", "First-class, common default"] },
      { aspect: "Compose", values: ["docker compose (official)", "podman compose (docker-compose compatible)"] },
      { aspect: "Kubernetes", values: ["kind, Docker Desktop K8s", "podman kube generate/play YAML"] },
      { aspect: "CLI compatibility", values: ["Reference implementation", "Mostly docker-compatible CLI"] },
      { aspect: "Enterprise / desktop", values: ["Docker Desktop (licensing on large orgs)", "Free, RHEL/Fedora native"] },
    ],
    whenToUse: [
      { tool: "Docker", reason: "Maximum compatibility, tutorials, and CI images assume docker." },
      { tool: "Podman", reason: "Rootless containers on Linux servers without a long-running daemon." },
    ],
    relatedConfigs: ["flask-postgres-compose", "microservices-compose", "dockerfile-templates"],
    relatedTools: ["docker", "docker-compose", "podman", "kubernetes"],
  },
  {
    slug: "argocd-vs-flux",
    title: "Argo CD vs Flux CD",
    description: "Two GitOps controllers — UI-driven vs CRD-native, when to pick each.",
    icon: "🔄",
    tools: [
      { slug: "argocd", name: "Argo CD", icon: "🚀" },
      { slug: "flux", name: "Flux CD", icon: "🌊" },
    ],
    rows: [
      { aspect: "Model", values: ["Application CR + UI/CLI", "GitRepository + Kustomization/HelmRelease CRs"] },
      { aspect: "UI", values: ["Rich web UI, app health tree", "Minimal UI (Weave GitOps optional)"] },
      { aspect: "Sync", values: ["Manual/auto sync, hooks, waves", "Reconciliation loop, health checks"] },
      { aspect: "Multi-cluster", values: ["ApplicationSet, cluster generators", "Flux Cluster API / kubeconfig secrets"] },
      { aspect: "Helm", values: ["Native Helm support in app", "HelmRelease CR with drift detection"] },
      { aspect: "Learning curve", values: ["Easier onboarding with UI", "More Kubernetes-native, YAML-only"] },
    ],
    whenToUse: [
      { tool: "Argo CD", reason: "Teams want visibility, rollbacks, and app-centric GitOps with a UI." },
      { tool: "Flux CD", reason: "You prefer CRD-only GitOps, tight Helm/Kustomize integration, and minimal ops overhead." },
    ],
    relatedConfigs: ["k8s-argocd-app"],
    relatedTools: ["argocd", "flux", "kubernetes", "helm"],
  },
  {
    slug: "nginx-vs-traefik",
    title: "Nginx vs Traefik",
    description: "Reverse proxy and ingress — static config vs dynamic service discovery.",
    icon: "🌐",
    tools: [
      { slug: "nginx", name: "Nginx", icon: "🌐" },
      { slug: "traefik", name: "Traefik", icon: "🔀" },
    ],
    rows: [
      { aspect: "Config", values: ["nginx.conf + site files", "Static file or K8s IngressRoute CRDs"] },
      { aspect: "TLS", values: ["certbot, manual certs", "Let's Encrypt built-in (ACME)"] },
      { aspect: "K8s ingress", values: ["ingress-nginx controller", "Traefik ingress controller native"] },
      { aspect: "Dynamic backends", values: ["Upstream blocks, manual reload", "Auto-discovers Docker/K8s labels"] },
      { aspect: "Performance", values: ["Battle-tested, very fast", "Fast; simpler for microservices"] },
      { aspect: "Ops familiarity", values: ["Everywhere — default choice", "Popular in cloud-native stacks"] },
    ],
    whenToUse: [
      { tool: "Nginx", reason: "Maximum docs, team knows nginx.conf, or bare-metal VM reverse proxy." },
      { tool: "Traefik", reason: "Kubernetes ingress with automatic certs and label-based routing." },
    ],
    relatedConfigs: ["k8s-ingress"],
    relatedTools: ["nginx", "traefik", "certbot", "kubernetes"],
  },
  {
    slug: "eks-vs-aks-vs-gke",
    title: "EKS vs AKS vs GKE",
    description: "Managed Kubernetes on AWS, Azure, and GCP — pick for your cloud and team.",
    icon: "☸️",
    tools: [
      { slug: "kubernetes", name: "Kubernetes", icon: "☸️" },
      { slug: "aws-cli", name: "AWS (EKS)", icon: "☁️" },
      { slug: "azure-devops", name: "Azure (AKS)", icon: "🔷" },
    ],
    rows: [
      { aspect: "Control plane cost", values: ["~$0.10/hr per cluster", "Free tier / per-cluster fee varies", "Free tier then per-cluster fee"] },
      { aspect: "IAM integration", values: ["IRSA (OIDC)", "Azure AD + workload identity", "Workload Identity (GSA ↔ KSA)"] },
      { aspect: "Registry", values: ["ECR", "ACR", "Artifact Registry"] },
      { aspect: "CLI setup", values: ["aws eks update-kubeconfig", "az aks get-credentials", "gcloud container clusters get-credentials"] },
      { aspect: "Add-ons", values: ["EKS add-ons, wide marketplace", "Azure Monitor, Defender", "GKE Autopilot, Anthos options"] },
      { aspect: "Best when", values: ["Already on AWS", "Microsoft stack / Azure AD", "GCP data/ML workloads"] },
    ],
    whenToUse: [
      { tool: "AWS (EKS)", reason: "Your infra and data already live in AWS — IRSA and ECR are first-class." },
      { tool: "Azure (AKS)", reason: "Enterprise Azure AD, .NET workloads, or Azure DevOps pipelines." },
      { tool: "GCP (GKE)", reason: "GCP-native services, GKE Autopilot, or strong Kubernetes engineering culture." },
    ],
    relatedConfigs: ["terraform-aws-ec2", "k8s-deployment-service"],
    relatedTools: ["kubernetes", "terraform", "aws-cli", "azure-devops", "helm"],
  },
  {
    slug: "prometheus-vs-cloudwatch",
    title: "Prometheus vs CloudWatch",
    description: "Self-hosted metrics vs AWS-native observability — cost and portability tradeoffs.",
    icon: "📊",
    tools: [
      { slug: "prometheus", name: "Prometheus", icon: "📈" },
      { slug: "aws-cli", name: "CloudWatch", icon: "☁️" },
    ],
    rows: [
      { aspect: "Model", values: ["Pull metrics, PromQL", "Push/pull via agent, CloudWatch Metrics Insights"] },
      { aspect: "Cost", values: ["Infra + storage you manage", "Per-metric/per-request; can grow fast"] },
      { aspect: "K8s", values: ["kube-prometheus-stack standard", "Container Insights / ADOT collector"] },
      { aspect: "Alerting", values: ["Alertmanager + routes", "CloudWatch Alarms + SNS/PagerDuty"] },
      { aspect: "Portability", values: ["Cloud-agnostic, same stack everywhere", "AWS-only"] },
      { aspect: "Long-term storage", values: ["Thanos, Mimir, Cortex", "S3 export, limited retention default"] },
    ],
    whenToUse: [
      { tool: "Prometheus", reason: "Multi-cloud, K8s-native metrics, and PromQL across all environments." },
      { tool: "CloudWatch", reason: "All-in on AWS, minimal ops, and tight integration with Lambda/RDS/ALB." },
    ],
    relatedConfigs: ["prometheus-grafana-compose", "k8s-laravel-monitoring"],
    relatedTools: ["prometheus", "grafana", "aws-cli", "loki"],
  },
];

export function getComparison(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug);
}

export function getComparisonSearchItems() {
  return comparisons.map((c) => ({
    slug: c.slug,
    name: c.title,
    description: c.description,
    icon: c.icon,
    keywords: ["compare", "vs", "alternative", ...c.tools.map((t) => t.slug)],
  }));
}
