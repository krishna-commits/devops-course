export interface RunbookLink {
  label: string;
  href: string;
}

export interface RunbookStep {
  title: string;
  body?: string;
  commands?: string;
  links?: RunbookLink[];
}

export interface Runbook {
  slug: string;
  title: string;
  description: string;
  icon: string;
  symptoms: string[];
  steps: RunbookStep[];
  relatedTools: string[];
  relatedConfigs: string[];
}

export const runbooks: Runbook[] = [
  {
    slug: "nginx-502-k8s-ingress",
    title: "Fix 502 behind Nginx + K8s Ingress",
    description: "Upstream unreachable — trace from browser to pod through ingress and service.",
    icon: "🌐",
    symptoms: [
      "Browser shows 502 Bad Gateway",
      "Nginx or ingress controller logs mention upstream timeout or connection refused",
      "Works locally with port-forward but not via ingress",
    ],
    relatedTools: ["nginx", "kubernetes", "kubectl", "helm"],
    relatedConfigs: ["k8s-ingress", "k8s-deployment-service"],
    steps: [
      {
        title: "Confirm where the 502 originates",
        body: "Hit the service directly (port-forward or NodePort) to see if the app is healthy before blaming ingress.",
        commands: `kubectl get ingress -A
kubectl get svc -n <namespace>
kubectl port-forward svc/<service> 8080:80 -n <namespace>
curl -I http://localhost:8080`,
        links: [
          { label: "Nginx — Troubleshoot 502", href: "/tools/nginx/#troubleshoot" },
          { label: "kubectl cheat sheet", href: "/cheatsheets/kubectl/" },
        ],
      },
      {
        title: "Check ingress backend and endpoints",
        body: "502 often means the ingress has no healthy endpoints — pods not ready or wrong service port.",
        commands: `kubectl describe ingress <name> -n <namespace>
kubectl get endpoints -n <namespace>
kubectl get pods -n <namespace> -o wide
kubectl describe pod <pod> -n <namespace>`,
        links: [{ label: "K8s Ingress template", href: "/deployments/k8s-ingress/" }],
      },
      {
        title: "Verify nginx / ingress controller logs",
        body: "Look for connect() failed, upstream timed out, or no live upstreams.",
        commands: `# Ingress-NGINX controller pod
kubectl logs -n ingress-nginx -l app.kubernetes.io/name=ingress-nginx --tail=100

# Standalone nginx on VM
sudo tail -f /var/log/nginx/error.log
sudo nginx -t && sudo systemctl reload nginx`,
        links: [{ label: "Linux ops cheat sheet", href: "/cheatsheets/linux-ops/" }],
      },
      {
        title: "Fix common causes",
        body: "Match service port to container port, ensure readiness probes pass, and check NetworkPolicy or firewall rules.",
        commands: `kubectl edit svc <service> -n <namespace>
kubectl rollout restart deploy/<name> -n <namespace>
kubectl rollout status deploy/<name> -n <namespace>`,
      },
    ],
  },
  {
    slug: "terraform-state-lock",
    title: "Terraform state lock stuck",
    description: "plan/apply blocked by DynamoDB or remote backend lock — release safely.",
    icon: "🔒",
    symptoms: [
      "Error: Error acquiring the state lock",
      "Another process is holding a lock on the state",
      "CI job was cancelled mid-apply",
    ],
    relatedTools: ["terraform", "aws-cli"],
    relatedConfigs: ["terraform-aws-ec2"],
    steps: [
      {
        title: "Confirm no real apply is running",
        body: "Check CI/CD and teammates before force-unlocking. A running apply must finish first.",
        links: [
          { label: "Terraform — Troubleshoot", href: "/tools/terraform/#troubleshoot" },
          { label: "Terraform cheat sheet", href: "/cheatsheets/terraform/" },
        ],
      },
      {
        title: "Inspect lock metadata",
        body: "The error message includes Lock ID and who holds the lock. Note the ID for unlock.",
        commands: `terraform plan   # re-read lock info in error output`,
      },
      {
        title: "Force unlock (after confirming safe)",
        commands: `terraform force-unlock <LOCK_ID>`,
        links: [{ label: "terraform-aws-vpc (GitHub)", href: "https://github.com/krishna-commits/terraform-aws-vpc" }],
      },
      {
        title: "Prevent recurrence",
        body: "Use plan-only in PRs, serialize applies on main, and set CI timeout cleanup. Consider state locking with S3 + DynamoDB best practices.",
        commands: `terraform init -reconfigure
terraform workspace list`,
      },
    ],
  },
  {
    slug: "helm-release-failed",
    title: "Helm release failed or pending",
    description: "Upgrade stuck in pending-install or pending-upgrade — diagnose and recover.",
    icon: "⎈",
    symptoms: [
      "helm upgrade hangs or returns pending-upgrade",
      "kubectl shows CrashLoopBackOff after helm install",
      "helm list shows failed or pending status",
    ],
    relatedTools: ["helm", "kubernetes", "kubectl"],
    relatedConfigs: ["k8s-deployment-service", "k8s-ingress"],
    steps: [
      {
        title: "Check release status and history",
        commands: `helm list -A
helm status <release> -n <namespace>
helm history <release> -n <namespace>`,
        links: [
          { label: "Helm cheat sheet", href: "/cheatsheets/helm/" },
          { label: "Helm — Troubleshoot", href: "/tools/helm/#troubleshoot" },
        ],
      },
      {
        title: "Inspect failed resources",
        commands: `kubectl get pods -n <namespace>
kubectl describe pod <pod> -n <namespace>
kubectl logs <pod> -n <namespace> --previous`,
        links: [{ label: "kubectl cheat sheet", href: "/cheatsheets/kubectl/" }],
      },
      {
        title: "Rollback or uninstall",
        commands: `helm rollback <release> <revision> -n <namespace>
# or clean reinstall
helm uninstall <release> -n <namespace>
helm install <release> ./chart -n <namespace> -f values.yaml`,
      },
      {
        title: "Debug template output",
        commands: `helm template <release> ./chart -f values.yaml | kubectl apply --dry-run=client -f -
helm upgrade <release> ./chart -n <namespace> --dry-run --debug`,
      },
    ],
  },
  {
    slug: "ci-pipeline-failed",
    title: "CI pipeline failed at deploy step",
    description: "Build passed but deploy to K8s/registry failed — common fixes across CI platforms.",
    icon: "🔄",
    symptoms: [
      "Docker push denied or unauthorized",
      "kubectl: Unable to connect or forbidden",
      "Pipeline succeeds on build but fails on deploy stage",
    ],
    relatedTools: ["github-actions", "bitbucket-pipelines", "gitlab-ci", "docker", "kubectl"],
    relatedConfigs: ["github-actions-ci", "k8s-deployment-service"],
    steps: [
      {
        title: "Identify which stage failed",
        body: "Open the failed job log. Separate build, test, push, and deploy — each has different fixes.",
        links: [
          { label: "GitHub Actions troubleshoot", href: "/tools/github-actions/#troubleshoot" },
          { label: "Bitbucket Pipelines troubleshoot", href: "/tools/bitbucket-pipelines/#troubleshoot" },
          { label: "GitLab CI troubleshoot", href: "/tools/gitlab-ci/#troubleshoot" },
        ],
      },
      {
        title: "Registry auth (push denied)",
        commands: `docker login registry.example.com -u $CI_USER -p $CI_TOKEN
# verify secret in CI variables / K8s imagePullSecret`,
        links: [{ label: "GitHub Actions CI template", href: "/deployments/github-actions-ci/" }],
      },
      {
        title: "Cluster access from CI",
        commands: `kubectl config get-contexts
kubectl auth can-i create deployments --namespace=<ns>
# store KUBECONFIG or use cloud OIDC in CI`,
        links: [
          { label: "Bitbucket → K8s repo", href: "https://github.com/krishna-commits/automation-bitbucket-to-kubernetes-deployment" },
        ],
      },
      {
        title: "Re-run with debug",
        body: "Enable verbose logging, pin image tags (avoid :latest), and test deploy script locally with same env vars.",
        commands: `kubectl apply -f k8s/ --dry-run=server
helm upgrade --install app ./chart --debug --dry-run`,
      },
    ],
  },
  {
    slug: "crashloop-backoff",
    title: "Pod CrashLoopBackOff",
    description: "Container starts then exits — check logs and exit code.",
    icon: "💥",
    symptoms: ["CrashLoopBackOff", "back-off restarting failed container", "pod restarting"],
    relatedTools: ["kubernetes", "kubectl"],
    relatedConfigs: ["k8s-deployment-service"],
    steps: [
      {
        title: "Get crash logs",
        commands: `kubectl logs <pod> -n <ns> --previous\nkubectl describe pod <pod> -n <ns> | tail -30`,
        links: [{ label: "Snippet: crash logs", href: "/snippets/#k8s-crash-logs" }],
      },
      {
        title: "Check events and fix root cause",
        commands: `kubectl get events -n <ns> --field-selector involvedObject.name=<pod>\n# Fix: wrong command, missing env, failed health check startup`,
      },
    ],
  },
  {
    slug: "imagepull-backoff",
    title: "ImagePullBackOff",
    description: "Cluster cannot pull container image.",
    icon: "📦",
    symptoms: ["ImagePullBackOff", "ErrImagePull", "pull access denied", "manifest unknown"],
    relatedTools: ["kubernetes", "docker"],
    relatedConfigs: ["k8s-deployment-service"],
    steps: [
      {
        title: "Diagnose pull failure",
        commands: `kubectl describe pod <pod> -n <ns> | grep -A10 Events\nkubectl get secret -n <ns>`,
        links: [{ label: "Snippet: image pull", href: "/snippets/#k8s-image-pull" }],
      },
      {
        title: "Add registry pull secret",
        commands: `# Private registry — create pull secret:\nkubectl create secret docker-registry regcred \\\n  --docker-server=registry.example.com \\\n  --docker-username=... --docker-password=... -n <ns>\n# Add imagePullSecrets to ServiceAccount or Pod spec`,
      },
    ],
  },
  {
    slug: "ingress-cert-expired",
    title: "Ingress TLS cert expired or missing",
    description: "Browser SSL error or cert-manager not ready.",
    icon: "🔐",
    symptoms: ["certificate expired", "NET::ERR_CERT_DATE_INVALID", "Certificate not ready", "ACME challenge failed"],
    relatedTools: ["kubernetes", "nginx", "certbot"],
    relatedConfigs: ["k8s-ingress"],
    steps: [
      {
        title: "Check cert resources",
        commands: `kubectl get certificate,ingress -A\nkubectl describe certificate <name> -n <ns>`,
        links: [{ label: "Snippet: cert expiry check", href: "/snippets/#k8s-cert-expiry" }, { label: "Cert lifecycle hub", href: "/certs/" }],
      },
      {
        title: "Debug ACME / cert-manager",
        commands: `kubectl describe challenge -n <ns>\n# cert-manager logs:\nkubectl logs -n cert-manager deploy/cert-manager --tail=50`,
      },
    ],
  },
  {
    slug: "node-notready-disk",
    title: "Node NotReady / disk pressure",
    description: "Scheduler cannot place pods; node conditions unhealthy.",
    icon: "🖥️",
    symptoms: ["NodeNotReady", "DiskPressure", "MemoryPressure", "PIDsPressure", "evicted pods"],
    relatedTools: ["kubernetes", "kubectl"],
    relatedConfigs: [],
    steps: [
      {
        title: "Inspect node conditions",
        commands: `kubectl describe node <node>\nkubectl get pods -A --field-selector spec.nodeName=<node>`,
        links: [{ label: "Snippet: node pressure", href: "/snippets/#k8s-describe-node" }],
      },
      {
        title: "Free disk and evicted pods",
        commands: `kubectl delete pods -A --field-selector=status.phase=Failed\n# SSH to node:\ndf -h\nsudo journalctl --vacuum-time=3d\ndocker system prune -a  # if container runtime fills disk`,
      },
    ],
  },
  {
    slug: "pipeline-auth-failed",
    title: "CI pipeline auth failed (registry / cloud)",
    description: "401 on docker push or AWS/kubectl denied in CI job.",
    icon: "🔑",
    symptoms: ["unauthorized", "denied push", "Unable to locate credentials", "error: You must be logged in"],
    relatedTools: ["github-actions", "bitbucket-pipelines", "gitlab-ci", "aws-cli"],
    relatedConfigs: ["github-actions-ci"],
    steps: [
      {
        title: "Fix registry login in CI",
        commands: `# Docker push — login before push in CI\ndocker login registry -u $USER -p $TOKEN`,
        links: [
          { label: "Deploy from CI hub", href: "/deploy/" },
          { label: "Snippet: pipeline docker auth", href: "/snippets/#pipeline-docker-auth" },
        ],
      },
      {
        title: "Verify cloud / cluster access",
        commands: `aws sts get-caller-identity\n# GHA: use OIDC not static keys\n# K8s: kubectl auth can-i create deployments -n <ns>`,
      },
    ],
  },
  {
    slug: "terraform-drift",
    title: "Terraform drift / unexpected plan changes",
    description: "Plan wants to recreate resources or state differs from reality.",
    icon: "📐",
    symptoms: ["forces replacement", "drift detected", "resource changed outside terraform"],
    relatedTools: ["terraform"],
    relatedConfigs: ["terraform-aws-ec2"],
    steps: [
      {
        title: "Compare state vs plan",
        commands: `terraform plan -detailed-exitcode\nterraform state list\nterraform state show <resource>`,
        links: [{ label: "State lock runbook", href: "/runbooks/terraform-state-lock/" }],
      },
      {
        title: "Refresh or import",
        commands: `terraform refresh\n# Import manual change:\nterraform import <resource_type>.<name> <id>\n# Or align code to reality before apply`,
      },
    ],
  },
  {
    slug: "vault-sealed",
    title: "Vault is sealed",
    description: "Secrets unavailable after restart until unseal.",
    icon: "🔒",
    symptoms: ["Vault is sealed", "sealed: true", "503 service unavailable vault"],
    relatedTools: ["vault"],
    relatedConfigs: [],
    steps: [
      {
        title: "Unseal Vault",
        commands: `vault status\nvault operator unseal\n# repeat until Sealed: false (threshold keys)`,
        links: [{ label: "Snippet: unseal", href: "/snippets/#vault-unseal" }, { label: "Vault guide", href: "/tools/vault/#troubleshoot" }],
      },
    ],
  },
  {
    slug: "pod-not-ready",
    title: "Pod running but not Ready",
    description: "readinessProbe failing — service has no endpoints.",
    icon: "⏳",
    symptoms: ["0/1 Ready", "readiness probe failed", "no endpoints", "503 service unavailable"],
    relatedTools: ["kubernetes", "kubectl"],
    relatedConfigs: ["k8s-deployment-service"],
    steps: [
      {
        title: "Debug readiness probe",
        commands: `kubectl describe pod <pod> -n <ns> | grep -A5 Readiness\nkubectl logs <pod> -n <ns>\ncurl http://<pod-ip>:8080/health`,
      },
      {
        title: "Verify endpoints",
        commands: `kubectl get endpoints <service> -n <ns>\n# Fix probe path/port or startup time (startupProbe)`,
        links: [{ label: "Prod delta: probes", href: "/deployments/k8s-deployment-service/#prod-delta" }],
      },
    ],
  },
  {
    slug: "connection-refused-upstream",
    title: "Connection refused upstream",
    description: "Nginx/ingress cannot reach backend service.",
    icon: "🔌",
    symptoms: ["connection refused upstream", "connect() failed", "no live upstreams", "upstream prematurely closed"],
    relatedTools: ["nginx", "kubernetes"],
    relatedConfigs: ["k8s-ingress", "nginx-php-compose"],
    steps: [
      {
        title: "Trace upstream path",
        commands: `curl -v http://backend-svc:port/health\nkubectl get endpoints -n <ns>\nsudo tail -20 /var/log/nginx/error.log`,
        links: [{ label: "502 runbook", href: "/runbooks/nginx-502-k8s-ingress/" }, { label: "Nginx timeout snippet", href: "/snippets/#nginx-502-timeouts" }],
      },
    ],
  },
  {
    slug: "aws-credentials-expired",
    title: "AWS credentials expired or invalid",
    description: "CLI or CI fails STS or API calls.",
    icon: "☁️",
    symptoms: ["ExpiredToken", "Unable to locate credentials", "AccessDenied", "InvalidClientTokenId"],
    relatedTools: ["aws-cli", "terraform"],
    relatedConfigs: [],
    steps: [
      {
        title: "Verify identity",
        commands: `aws sts get-caller-identity\naws configure list\nexport AWS_PROFILE=yourprofile`,
        links: [{ label: "AWS CLI troubleshoot", href: "/tools/aws-cli/#troubleshoot" }],
      },
      {
        title: "Refresh SSO or keys",
        commands: `# SSO login:\naws sso login --profile myprofile\n# CI: refresh OIDC role or rotate access keys`,
      },
    ],
  },
  {
    slug: "helm-stuck-release",
    title: "Helm release stuck pending",
    description: "Upgrade cannot complete; revision hung.",
    icon: "⎈",
    symptoms: ["pending-upgrade", "pending-install", "another operation in progress"],
    relatedTools: ["helm", "kubernetes"],
    relatedConfigs: ["k8s-deployment-service"],
    steps: [
      {
        title: "Rollback stuck release",
        commands: `helm list -A\nhelm history <release> -n <ns>\nhelm rollback <release> <rev> -n <ns>`,
        links: [{ label: "Helm runbook", href: "/runbooks/helm-release-failed/" }],
      },
    ],
  },
  {
    slug: "secrets-rotation-zero-downtime",
    title: "Rotate secrets without downtime",
    description: "DB creds, IRSA, TLS, API keys — dual-credential pattern and rolling restarts.",
    icon: "🔑",
    symptoms: [
      "Quarterly rotation policy due",
      "Compromised credential",
      "Go-live secrets item needs rotation plan",
    ],
    relatedTools: ["vault", "kubernetes", "postgresql", "external-secrets-operator", "cert-manager"],
    relatedConfigs: ["k8s-configmap-secrets", "k8s-external-secret", "k8s-deployment-service"],
    steps: [
      {
        title: "1. Pick rotation type",
        body: "DB, IRSA, TLS, or API key — one at a time.",
        links: [{ label: "Rotation hub", href: "/rotate/" }],
      },
      {
        title: "2. Issue new credential (keep old active)",
        commands: `# DB: create app_v2 user or new password\n# API: generate new key in provider UI\n# IRSA: create new IAM role, update SA annotation`,
        links: [{ label: "DB rotate snippet", href: "/snippets/#pg-rotate-user" }],
      },
      {
        title: "3. Update secret store + rollout",
        commands: `kubectl create secret generic app-secrets --from-literal=KEY=new -n apps --dry-run=client -o yaml | kubectl apply -f -\nkubectl rollout restart deploy/myapp -n apps\nkubectl rollout status deploy/myapp -n apps`,
        links: [{ label: "Secret update snippet", href: "/snippets/#k8s-secret-update-rollout" }],
      },
      {
        title: "4. Verify + revoke old",
        commands: `# smoke test\ncurl -I https://app.example.com/health\n# IRSA:\nkubectl exec deploy/myapp -n apps -- aws sts get-caller-identity\n# after 24h soak: revoke old DB user / API key`,
        links: [{ label: "Post-deploy smoke script", href: "/scripts/#post-deploy-smoke" }],
      },
    ],
  },
  {
    slug: "database-restore-drill",
    title: "Database restore drill (quarterly)",
    description: "Prove backups work — restore to staging before prod depends on it.",
    icon: "💾",
    symptoms: [
      "Never tested restore — only backups exist",
      "Go-live checklist backup item unchecked",
      "Need RTO/RPO numbers for audit",
    ],
    relatedTools: ["postgresql", "mysql", "mongodb", "velero", "aws-cli"],
    relatedConfigs: ["k8s-cronjob", "flask-postgres-compose"],
    steps: [
      {
        title: "1. Pick backup source",
        body: "One system only: pg_dump file, RDS snapshot, Velero backup, or S3 sync.",
        links: [
          { label: "Backup hub", href: "/backup/" },
          { label: "pg_dump snippet", href: "/snippets/#pg-dump-backup" },
        ],
      },
      {
        title: "2. Restore to isolated target",
        body: "Empty DB, new RDS instance, or Velero restore with namespace mapping — never first try on prod.",
        commands: `# PostgreSQL example\ncreatedb restore_drill\npg_restore -d restore_drill -c latest.dump\npsql restore_drill -c "SELECT count(*) FROM critical_table;"`,
        links: [{ label: "Restore snippet", href: "/snippets/#pg-restore" }],
      },
      {
        title: "3. Smoke test application",
        body: "Point staging app at restored data or run read-only queries matching backup timestamp.",
        commands: `curl -I https://staging.example.com/health\n# compare row counts / checksums to backup time`,
      },
      {
        title: "4. Record RTO and gaps",
        body: "Log restore duration, who ran it, and fix retention/cron if backup was missing or corrupt.",
        links: [{ label: "Post-incident template", href: "/templates/" }],
      },
    ],
  },
  {
    slug: "velero-restore-failed",
    title: "Velero restore failed or incomplete",
    description: "Backup exists but restore hangs, missing PVCs, or wrong namespace.",
    icon: "☸️",
    symptoms: [
      "velero restore PartiallyFailed",
      "PVC restore stuck",
      "Resources missing after restore",
    ],
    relatedTools: ["velero", "kubernetes", "kubectl"],
    relatedConfigs: ["k8s-pvc", "k8s-cronjob"],
    steps: [
      {
        title: "Check restore status and logs",
        commands: `velero restore get\nvelero restore describe <restore-name>\nvelero restore logs <restore-name>`,
        links: [{ label: "Velero guide", href: "/tools/velero/" }],
      },
      {
        title: "Common fixes",
        body: "Storage class mismatch, snapshot provider not installed, or namespace already exists.",
        commands: `# map storage class on restore\nvelero restore create retry-1 --from-backup <backup> \\\n  --storage-class-mappings old-sc:new-sc\n\nkubectl get volumesnapshot -A\nkubectl get pvc -A`,
        links: [{ label: "Velero restore snippet", href: "/snippets/#velero-restore" }],
      },
      {
        title: "Validate restored workloads",
        commands: `kubectl get pods -n <ns>\nkubectl rollout status deploy/<name> -n <ns>`,
        links: [{ label: "Backup hub", href: "/backup/" }],
      },
    ],
  },
  {
    slug: "oomkilled-pod",
    title: "Pod OOMKilled — out of memory",
    description: "Container killed by kernel OOM — fix limits, leaks, or node pressure.",
    icon: "💥",
    symptoms: [
      "Reason: OOMKilled in kubectl describe pod",
      "Container restarts with exit code 137",
      "App slow then pod dies under load",
    ],
    relatedTools: ["kubernetes", "kubectl", "prometheus", "grafana"],
    relatedConfigs: ["k8s-hpa", "k8s-deployment-service"],
    steps: [
      {
        title: "Confirm OOM and which container",
        commands: `kubectl describe pod <pod> -n <ns> | grep -A5 "Last State"
kubectl get pod <pod> -n <ns> -o jsonpath='{.status.containerStatuses[*].lastState.terminated.reason}'
kubectl top pod <pod> -n <ns> 2>/dev/null || echo "metrics-server needed"`,
        links: [{ label: "PromQL memory snippet", href: "/snippets/#promql-pod-memory" }],
      },
      {
        title: "Check limits vs usage",
        body: "If memory limit equals request and app spikes, raise limit or fix leak. If no limits, set requests/limits to avoid node-wide OOM.",
        commands: `kubectl get pod <pod> -n <ns> -o jsonpath='{.spec.containers[*].resources}'
kubectl top pods -n <ns> --sort-by=memory | head -10`,
        links: [{ label: "Deployment prod-delta", href: "/deployments/k8s-deployment-service/#prod-delta" }],
      },
      {
        title: "Node-level memory pressure",
        commands: `kubectl describe node <node> | grep -A10 Conditions
kubectl get events -n <ns> --field-selector reason=OOMKilling`,
      },
      {
        title: "Mitigate and redeploy",
        commands: `# patch higher memory limit (example)
kubectl set resources deploy/<name> -n <ns> --limits=memory=512Mi --requests=memory=256Mi
kubectl rollout status deploy/<name> -n <ns>`,
      },
    ],
  },
  {
    slug: "argocd-sync-failed",
    title: "Argo CD sync failed or OutOfSync",
    description: "GitOps app stuck — compare diff, fix RBAC, hooks, or resource conflicts.",
    icon: "🔄",
    symptoms: [
      "Application sync failed in Argo CD UI",
      "OutOfSync with sync error in status",
      "Resource already exists or forbidden",
    ],
    relatedTools: ["argocd", "kubernetes", "kubectl", "helm"],
    relatedConfigs: ["k8s-argocd-app"],
    steps: [
      {
        title: "Inspect app status and diff",
        commands: `argocd app get <app> --refresh
argocd app diff <app>
kubectl get application <app> -n argocd -o yaml`,
        links: [{ label: "Argo CD guide", href: "/tools/argocd/" }],
      },
      {
        title: "Check sync logs and events",
        commands: `argocd app logs <app> --tail=50
kubectl describe application <app> -n argocd
kubectl get events -n <target-ns> --sort-by=.lastTimestamp | tail -20`,
        links: [{ label: "Argo CD sync snippet", href: "/snippets/#argocd-sync-status" }],
      },
      {
        title: "Common fixes",
        body: "Replace vs merge conflict — use Replace=false. Hook failure — check PreSync job logs. RBAC — argocd-application-controller needs permissions.",
        commands: `# hard refresh + retry
argocd app sync <app> --force --prune
# if stuck finalizer:
kubectl patch application <app> -n argocd -p '{"metadata":{"finalizers":null}}' --type=merge`,
      },
    ],
  },
  {
    slug: "dns-not-resolving",
    title: "DNS not resolving in cluster or from pod",
    description: "Service name fails, external DNS wrong, or CoreDNS unhealthy.",
    icon: "🔍",
    symptoms: [
      "Could not resolve host from inside pod",
      "Intermittent NXDOMAIN for cluster services",
      "External DNS points to wrong IP",
    ],
    relatedTools: ["kubernetes", "dns", "nginx", "bind9"],
    relatedConfigs: ["k8s-deployment-service"],
    steps: [
      {
        title: "Test from a debug pod",
        commands: `kubectl run dnscheck --rm -it --image=busybox:1.36 --restart=Never -- nslookup kubernetes.default
kubectl run dnscheck --rm -it --image=busybox:1.36 --restart=Never -- nslookup <service>.<ns>.svc.cluster.local`,
        links: [{ label: "DNS debug snippet", href: "/snippets/#dns-check" }],
      },
      {
        title: "Check CoreDNS",
        commands: `kubectl get pods -n kube-system -l k8s-app=kube-dns
kubectl logs -n kube-system -l k8s-app=kube-dns --tail=50
kubectl get configmap coredns -n kube-system -o yaml`,
      },
      {
        title: "Ingress / external DNS",
        commands: `dig app.example.com +short
kubectl get ingress -n <ns>
# compare ingress ADDRESS to dig result`,
        links: [{ label: "Network debug hub", href: "/network/" }],
      },
    ],
  },
  {
    slug: "redis-connection-refused",
    title: "Redis connection refused or timeout",
    description: "App cannot reach Redis — network, auth, maxclients, or wrong host.",
    icon: "🔴",
    symptoms: [
      "ECONNREFUSED to Redis host:6379",
      "NOAUTH Authentication required",
      "Redis timeout under load",
    ],
    relatedTools: ["redis", "kubernetes", "docker"],
    relatedConfigs: ["k8s-redis", "node-redis-mongo-compose"],
    steps: [
      {
        title: "Verify Redis is listening",
        commands: `redis-cli -h <host> -p 6379 ping
kubectl get svc -n <ns> | grep redis
kubectl get endpoints -n <ns> | grep redis`,
        links: [{ label: "Redis ping snippet", href: "/snippets/#redis-cli-ping" }],
      },
      {
        title: "From app pod — DNS and port",
        commands: `kubectl exec -it <app-pod> -n <ns> -- sh -c 'nc -zv redis-svc 6379 || telnet redis-svc 6379'
kubectl exec -it <app-pod> -n <ns> -- env | grep -i redis`,
      },
      {
        title: "Auth and capacity",
        commands: `redis-cli -h <host> -a '<password>' ping
redis-cli -h <host> INFO clients
redis-cli -h <host> CONFIG GET maxclients`,
      },
    ],
  },
  {
    slug: "high-cpu-throttling",
    title: "High CPU throttling or latency spike",
    description: "Pods hit CPU limits, HPA lagging, or node CPU saturated.",
    icon: "📈",
    symptoms: [
      "CPU throttling in metrics or describe",
      "P99 latency spike with flat error rate",
      "HPA not scaling fast enough",
    ],
    relatedTools: ["kubernetes", "prometheus", "grafana", "kubectl"],
    relatedConfigs: ["k8s-hpa", "k8s-deployment-service"],
    steps: [
      {
        title: "Find throttled pods",
        commands: `kubectl top pods -n <ns> --sort-by=cpu
kubectl describe pod <pod> -n <ns> | grep -i cpu`,
        links: [{ label: "PromQL CPU snippet", href: "/snippets/#promql-cpu-throttle" }],
      },
      {
        title: "Check HPA and limits",
        commands: `kubectl get hpa -n <ns>
kubectl describe hpa <name> -n <ns>
kubectl get deploy <name> -n <ns> -o jsonpath='{.spec.template.spec.containers[0].resources}'`,
        links: [{ label: "HPA config", href: "/deployments/k8s-hpa/" }],
      },
      {
        title: "Node saturation",
        commands: `kubectl top nodes
kubectl describe node <node> | grep -A5 Allocated`,
      },
    ],
  },
];

export function getRunbook(slug: string): Runbook | undefined {
  return runbooks.find((r) => r.slug === slug);
}

export function getRunbookSearchItems() {
  return runbooks.map((r) => ({
    slug: r.slug,
    name: r.title,
    description: r.description,
    icon: r.icon,
    keywords: ["runbook", "troubleshoot", "fix", "502", "incident", ...r.symptoms],
  }));
}
