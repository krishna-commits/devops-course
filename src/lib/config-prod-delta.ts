export interface ProdDeltaRow {
  aspect: string;
  minimal: string;
  production: string;
}

export interface ConfigProdDelta {
  deploymentSlug: string;
  title: string;
  rows: ProdDeltaRow[];
}

export const configProdDeltas: ConfigProdDelta[] = [
  {
    deploymentSlug: "k8s-deployment-service",
    title: "Deployment: minimal vs production",
    rows: [
      { aspect: "Replicas", minimal: "replicas: 1", production: "replicas: 3+ with PodDisruptionBudget" },
      { aspect: "Probes", minimal: "none", production: "readinessProbe + livenessProbe on /health" },
      { aspect: "Resources", minimal: "no limits", production: "requests/limits for CPU and memory" },
      { aspect: "Security", minimal: "default SA", production: "runAsNonRoot, readOnlyRootFilesystem, drop capabilities" },
      { aspect: "Image", minimal: ":latest", production: "pinned digest or semver tag from CI" },
      { aspect: "Secrets", minimal: "env in Deployment YAML", production: "Secret + external-secrets or SealedSecrets" },
    ],
  },
  {
    deploymentSlug: "k8s-ingress",
    title: "Ingress: minimal vs production",
    rows: [
      { aspect: "TLS", minimal: "HTTP only", production: "cert-manager ClusterIssuer + tls: block" },
      { aspect: "Annotations", minimal: "basic routing", production: "rate limits, body size, timeout, WAF if needed" },
      { aspect: "Backend", minimal: "single service", production: "health-checked service + correct port name" },
      { aspect: "DNS", minimal: "manual /etc/hosts", production: "Route53 or Cloudflare pointing to LB" },
    ],
  },
  {
    deploymentSlug: "github-actions-ci",
    title: "CI pipeline: minimal vs production",
    rows: [
      { aspect: "Auth", minimal: "long-lived AWS keys in secrets", production: "OIDC role (AWS_ROLE_ARN) — no static keys" },
      { aspect: "Scan", minimal: "build + push only", production: "Trivy/Snyk scan gate before push" },
      { aspect: "Deploy", minimal: "kubectl apply on every push", production: "main only; PR = plan/dry-run; env branches" },
      { aspect: "Secrets", minimal: "KUBECONFIG in repo secret", production: "IRSA + short-lived tokens; rotate quarterly" },
      { aspect: "Concurrency", minimal: "none", production: "cancel-in-progress on same branch" },
      { aspect: "Branch protection", minimal: "none", production: "required reviews + status checks on main" },
    ],
  },
  {
    deploymentSlug: "gitlab-ci-yml",
    title: "GitLab CI: minimal vs production",
    rows: [
      { aspect: "Auth", minimal: "AWS_ACCESS_KEY_ID in CI variables", production: "OIDC / workload identity — no static keys" },
      { aspect: "Runners", minimal: "shared runners, any tag", production: "dedicated runners with pinned tags + isolation" },
      { aspect: "Deploy", minimal: "manual deploy on every commit", production: "main protected; deploy stage manual or tagged release only" },
      { aspect: "Scan", minimal: "build only", production: "container_scanning / Trivy gate before push" },
      { aspect: "Secrets", minimal: "KUBECONFIG file variable", production: "short-lived cluster tokens; masked + protected vars" },
      { aspect: "Branch protection", minimal: "none", production: "protected main + merge request pipelines required" },
    ],
  },
  {
    deploymentSlug: "terraform-aws-ec2",
    title: "Terraform: minimal vs production",
    rows: [
      { aspect: "State backend", minimal: "local state file", production: "S3 + locking (DynamoDB or native lockfile)" },
      { aspect: "Workspaces", minimal: "default only", production: "workspace per env (dev/staging/prod)" },
      { aspect: "Locking", minimal: "no lock", production: "never force-unlock without confirming no running apply" },
      { aspect: "Plan/apply", minimal: "apply from laptop", production: "CI plan on PR; apply from pipeline with approval" },
      { aspect: "Secrets", minimal: "vars in tfvars committed", production: "TF_VAR_* from CI secrets; no secrets in git" },
      { aspect: "Drift", minimal: "ignored", production: "scheduled plan + alert on drift" },
    ],
  },
  {
    deploymentSlug: "flask-postgres-compose",
    title: "Docker Compose → K8s: minimal vs production",
    rows: [
      { aspect: "Networking", minimal: "compose default bridge", production: "ClusterIP + Ingress; no hostNetwork in prod" },
      { aspect: "Secrets", minimal: "env in compose file", production: "K8s Secret + External Secrets; never plain YAML in git" },
      { aspect: "Volumes", minimal: "bind mount ./data", production: "PVC + backup strategy; StatefulSet for DB" },
      { aspect: "Scaling", minimal: "replicas: 1 in compose", production: "Deployment replicas + HPA; PDB for HA" },
      { aspect: "Health", minimal: "no healthcheck", production: "readiness + liveness probes before Service traffic" },
      { aspect: "Image", minimal: "build: . locally", production: "pinned image from registry; CI builds digest" },
    ],
  },
  {
    deploymentSlug: "jenkins-eks-python",
    title: "Jenkins pipeline: minimal vs production",
    rows: [
      { aspect: "Credentials", minimal: "AWS keys in Jenkins credentials store", production: "IAM role via EC2 instance profile or OIDC — rotate keys out" },
      { aspect: "Agents", minimal: "shared executor on master", production: "dedicated agents / K8s plugin pods with resource limits" },
      { aspect: "Deploy", minimal: "kubectl apply on every build", production: "main branch only; PR builds test-only; manual prod gate" },
      { aspect: "Scan", minimal: "build + push only", production: "Trivy/Snyk stage before push to prod registry" },
      { aspect: "Secrets", minimal: "kubeconfig file credential", production: "short-lived tokens; separate creds per env" },
      { aspect: "Audit", minimal: "none", production: "build logs retained; Job DSL in git; no click-ops on controller" },
    ],
  },
];

export function getConfigProdDelta(slug: string): ConfigProdDelta | undefined {
  return configProdDeltas.find((d) => d.deploymentSlug === slug);
}
