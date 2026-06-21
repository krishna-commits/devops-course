export interface GoLiveItem {
  id: string;
  label: string;
  detail: string;
  href?: string;
  snippetId?: string;
  prodDeltaSlug?: string;
}

export const goLiveChecklist: GoLiveItem[] = [
  {
    id: "probes",
    label: "Readiness + liveness probes on /health",
    detail: "Service must not receive traffic until ready.",
    prodDeltaSlug: "k8s-deployment-service",
    href: "/deployments/k8s-deployment-service/#prod-delta",
  },
  {
    id: "limits",
    label: "CPU/memory requests and limits set",
    detail: "Avoid noisy neighbor and OOM kills.",
    prodDeltaSlug: "k8s-deployment-service",
    snippetId: "k8s-top",
  },
  {
    id: "pdb",
    label: "PodDisruptionBudget for HA workloads",
    detail: "At least minAvailable: 1 or maxUnavailable: 1.",
    prodDeltaSlug: "k8s-deployment-service",
    href: "/deployments/k8s-deployment-service/",
  },
  {
    id: "ingress-tls",
    label: "Ingress TLS (cert-manager or valid cert)",
    detail: "No plain HTTP in production.",
    prodDeltaSlug: "k8s-ingress",
    href: "/deployments/k8s-ingress/#prod-delta",
    snippetId: "k8s-cert-expiry",
  },
  {
    id: "image-pin",
    label: "Image tag pinned (digest or semver from CI)",
    detail: "No :latest in prod.",
    prodDeltaSlug: "k8s-deployment-service",
    href: "/deployments/github-actions-ci/#prod-delta",
  },
  {
    id: "secrets",
    label: "Secrets via Vault / External Secrets — not plain YAML",
    detail: "No credentials in git or ConfigMap.",
    href: "/rotate/",
    snippetId: "k8s-secret-update-rollout",
  },
  {
    id: "backups",
    label: "Backups verified (Velero / DB snapshot / restore test)",
    detail: "Run restore drill at least once per quarter.",
    href: "/backup/",
    snippetId: "velero-backup-ns",
  },
  {
    id: "alerts",
    label: "Alerts on error rate, latency, pod restarts, disk",
    detail: "Pager routes to on-call; runbook linked in alert.",
    href: "/runbooks/",
    snippetId: "k8s-crash-logs",
  },
  {
    id: "ci-oidc",
    label: "CI uses OIDC — no static AWS keys in GitHub secrets",
    detail: "AWS_ROLE_ARN + id-token write permission.",
    prodDeltaSlug: "github-actions-ci",
    snippetId: "gha-oidc-aws",
  },
  {
    id: "network-policy",
    label: "NetworkPolicy or security groups restrict pod traffic",
    detail: "Default deny where policy requires.",
    href: "/deployments/k8s-network-policy/",
  },
  {
    id: "rollback",
    label: "Rollback tested (helm rollback or kubectl rollout undo)",
    detail: "Document last known good revision.",
    snippetId: "k8s-rollout-undo",
    href: "/runbooks/helm-release-failed/",
  },
  {
    id: "scan",
    label: "Container image scanned (Trivy) — no critical CVEs",
    detail: "Gate deploy on scan in CI for prod.",
    snippetId: "trivy-scan-image",
    href: "/tools/trivy/",
  },
];
