export interface RotationPlaybook {
  id: string;
  title: string;
  icon: string;
  summary: string;
  zeroDowntime: string;
  steps: string[];
  snippetIds: string[];
  toolHref?: string;
  configHref?: string;
}

export const rotationPlaybooks: RotationPlaybook[] = [
  {
    id: "db-creds",
    title: "Database credentials",
    icon: "🐘",
    summary: "Rotate app DB user password without dropping connections.",
    zeroDowntime: "Dual-user pattern: create new user → update app secret → rolling restart → revoke old user.",
    steps: [
      "Create new DB user with same grants (or ALTER USER with new password on replica first)",
      "Update K8s Secret / ExternalSecret / Vault path with new password",
      "kubectl rollout restart deploy/<app> -n <ns> — one replica at a time if PDB allows",
      "Verify app health and connection count",
      "Revoke or drop old credentials after soak period (24h)",
    ],
    snippetIds: ["pg-rotate-user", "k8s-secret-update-rollout"],
    toolHref: "/tools/postgresql/",
    configHref: "/deployments/k8s-configmap-secrets/",
  },
  {
    id: "irsa",
    title: "IRSA / workload IAM role",
    icon: "☁️",
    summary: "Rotate or replace IAM role used by Kubernetes service account.",
    zeroDowntime: "Attach new role to SA annotation → rolling restart pods → detach old role after all pods migrated.",
    steps: [
      "Create new IAM role with least-privilege policy (copy from old, tighten if possible)",
      "Update trust policy for OIDC provider + service account subject",
      "Patch ServiceAccount: eks.amazonaws.com/role-arn: arn:aws:iam::ACCOUNT:role/NEW",
      "Rollout restart workloads using that SA",
      "Validate AWS API calls from pod (aws sts get-caller-identity)",
      "Delete old role after confirmation",
    ],
    snippetIds: ["irsa-verify-pod", "k8s-rollout-restart-sa"],
    toolHref: "/tools/kubernetes/",
    configHref: "/deployments/k8s-deployment-service/#prod-delta",
  },
  {
    id: "tls-certs",
    title: "TLS certificates (ingress / LB)",
    icon: "🔒",
    summary: "Renew public or internal certs before expiry.",
    zeroDowntime: "cert-manager auto-renew; manual: issue new cert → update secret → ingress picks up without pod restart.",
    steps: [
      "Check expiry: openssl or cert-manager Certificate status",
      "For cert-manager: fix ClusterIssuer / DNS-01 or HTTP-01 challenge if renew failed",
      "For manual/nginx: certbot renew or import new cert to K8s tls secret",
      "Verify browser + curl -v; monitor cert-manager Certificate Ready=True",
    ],
    snippetIds: ["openssl-cert-check", "k8s-cert-expiry"],
    toolHref: "/tools/cert-manager/",
    configHref: "/certs/",
  },
  {
    id: "api-keys",
    title: "API keys & static tokens",
    icon: "🔑",
    summary: "Third-party API keys, registry tokens, webhook secrets.",
    zeroDowntime: "Issue new key in provider UI → update secret in Vault/ESO → rolling restart → revoke old key after soak.",
    steps: [
      "Generate new key in provider (GitHub PAT, Stripe, SendGrid, Docker registry)",
      "Store in Vault or ExternalSecret — never commit",
      "Update K8s Secret reference or reload via Reloader if annotated",
      "Rollout restart affected deployments",
      "Revoke old key in provider after 24–48h",
    ],
    snippetIds: ["vault-kv-update", "k8s-secret-update-rollout"],
    toolHref: "/tools/vault/",
    configHref: "/deployments/k8s-external-secret/",
  },
  {
    id: "vault-unseal-keys",
    title: "Vault unseal / root token",
    icon: "🗄️",
    summary: "Operational rotation of unseal keys and root — use Shamir rekey procedure.",
    zeroDowntime: "Use vault operator rekey during maintenance window; HA Vault keeps serving during rekey if done correctly.",
    steps: [
      "Schedule maintenance; ensure HA peers healthy",
      "vault operator rekey init — threshold unchanged or updated per policy",
      "Distribute new unseal shares to separate custodians",
      "Revoke old root token; generate new root via recovery if using auto-unseal",
    ],
    snippetIds: ["vault-unseal"],
    toolHref: "/tools/vault/",
  },
];
