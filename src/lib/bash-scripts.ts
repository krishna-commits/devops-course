export interface BashScript {
  id: string;
  title: string;
  description: string;
  filename: string;
  tags: string[];
  script: string;
}

export const bashScripts: BashScript[] = [
  {
    id: "pre-deploy-check",
    title: "Pre-deploy checklist",
    description: "Run before kubectl apply or helm upgrade — context, diff, and pod health.",
    filename: "pre-deploy-check.sh",
    tags: ["k8s", "deploy"],
    script: `#!/usr/bin/env bash
# pre-deploy-check.sh — run before prod deploy
set -euo pipefail

NS="\${1:-apps}"
DEPLOY="\${2:-myapp}"

echo "==> Context: $(kubectl config current-context)"
kubectl cluster-info | head -3

echo "==> Nodes ready"
kubectl get nodes | grep -v NotReady || true

echo "==> Current rollout"
kubectl rollout status "deploy/\${DEPLOY}" -n "\${NS}" --timeout=30s || true

echo "==> Pending pods in namespace"
kubectl get pods -n "\${NS}" | grep -vE 'Running|Completed' || echo "All pods OK"

echo "==> Last deployment revision"
kubectl rollout history "deploy/\${DEPLOY}" -n "\${NS}" | tail -5

echo "==> Dry-run apply (if manifest dir exists)"
if [[ -d k8s ]]; then
  kubectl apply -f k8s/ --dry-run=server -n "\${NS}" 2>/dev/null || kubectl apply -f k8s/ --dry-run=client
fi

echo "Pre-deploy checks complete. Proceed with deploy if green."`,
  },
  {
    id: "post-deploy-smoke",
    title: "Post-deploy smoke test",
    description: "HTTP health, rollout status, and error log scan after deploy.",
    filename: "post-deploy-smoke.sh",
    tags: ["k8s", "deploy"],
    script: `#!/usr/bin/env bash
# post-deploy-smoke.sh
set -euo pipefail

NS="\${1:-apps}"
DEPLOY="\${2:-myapp}"
URL="\${3:-https://app.example.com/health}"

echo "==> Rollout status"
kubectl rollout status "deploy/\${DEPLOY}" -n "\${NS}" --timeout=300s

echo "==> Pod readiness"
kubectl get pods -n "\${NS}" -l "app=\${DEPLOY}" -o wide

echo "==> HTTP smoke"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$URL" || echo "000")
echo "GET $URL => $HTTP_CODE"
[[ "$HTTP_CODE" =~ ^2 ]] || { echo "Smoke test FAILED"; exit 1; }

echo "==> Recent error logs (last 2m)"
kubectl logs -n "\${NS}" -l "app=\${DEPLOY}" --since=2m 2>/dev/null | grep -iE 'error|fatal|panic' | tail -20 || echo "No errors in tail"

echo "Smoke test PASSED"`,
  },
  {
    id: "cluster-health-report",
    title: "Cluster health report",
    description: "Snapshot nodes, pressure, crash loops, and cert expiry for standup or handoff.",
    filename: "cluster-health-report.sh",
    tags: ["k8s", "debug"],
    script: `#!/usr/bin/env bash
# cluster-health-report.sh
set -euo pipefail

echo "=== Cluster health $(date -u +%Y-%m-%dT%H:%M:%SZ) ==="
echo "Context: $(kubectl config current-context)"
echo

echo "--- Nodes ---"
kubectl get nodes -o wide
echo

echo "--- NotReady / pressure ---"
kubectl get nodes -o json | jq -r '.items[] | select(.status.conditions[] | select(.type=="Ready" and .status!="True")) | .metadata.name' 2>/dev/null || kubectl describe nodes | grep -A3 Conditions
echo

echo "--- CrashLoop / not Running ---"
kubectl get pods -A | grep -vE 'Running|Completed|SUCCEEDED' || echo "All pods Running/Completed"
echo

echo "--- Top restarts (if metrics-server) ---"
kubectl top pods -A --sort-by=cpu 2>/dev/null | head -15 || echo "metrics-server unavailable"
echo

echo "--- Certificates (cert-manager) ---"
kubectl get certificate -A 2>/dev/null || echo "No cert-manager certificates"
echo

echo "=== End report ==="`,
  },
  {
    id: "staging-prod-kube-diff",
    title: "Staging vs prod kube diff",
    description: "Compare deployments across two contexts — export and diff manifests.",
    filename: "kube-staging-prod-diff.sh",
    tags: ["k8s", "diff"],
    script: `#!/usr/bin/env bash
# kube-staging-prod-diff.sh STAGING_CTX PROD_CTX NS
set -euo pipefail

STAGING_CTX="\${1:?staging context}"
PROD_CTX="\${2:?prod context}"
NS="\${3:-apps}"

TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

for ctx in "$STAGING_CTX" "$PROD_CTX"; do
  kubectl --context="$ctx" get deploy,svc,ingress,hpa -n "$NS" -o yaml > "$TMP/\${ctx}.yaml"
done

echo "=== Diff deploy/svc/ingress/hpa in $NS ==="
diff -u "$TMP/\${STAGING_CTX}.yaml" "$TMP/\${PROD_CTX}.yaml" || true

echo
echo "=== Image tags only ==="
for ctx in "$STAGING_CTX" "$PROD_CTX"; do
  echo "--- $ctx ---"
  kubectl --context="$ctx" get deploy -n "$NS" -o jsonpath='{range .items[*]}{.metadata.name}{" => "}{.spec.template.spec.containers[0].image}{"\\n"}{end}'
done`,
  },
  {
    id: "terraform-workspace-diff",
    title: "Terraform workspace plan diff",
    description: "Plan staging vs prod workspaces and save plans for comparison.",
    filename: "tf-workspace-diff.sh",
    tags: ["terraform", "diff"],
    script: `#!/usr/bin/env bash
# tf-workspace-diff.sh — compare plans across workspaces
set -euo pipefail

STAGING_WS="\${1:-staging}"
PROD_WS="\${2:-prod}"

terraform init -input=false

plan_ws() {
  local ws=$1
  terraform workspace select "$ws" 2>/dev/null || terraform workspace new "$ws"
  terraform plan -input=false -no-color -out="tfplan-\${ws}.bin" 2>&1 | tee "plan-\${ws}.txt"
}

plan_ws "$STAGING_WS"
plan_ws "$PROD_WS"

echo "=== Plan output diff (text) ==="
diff -u "plan-\${STAGING_WS}.txt" "plan-\${PROD_WS}.txt" || true

echo "Review plan-\${STAGING_WS}.txt vs plan-\${PROD_WS}.txt before apply."`,
  },
  {
    id: "cert-expiry-audit",
    title: "TLS cert expiry audit",
    description: "Check ingress certs, cert-manager Certificates, and external endpoints before they expire.",
    filename: "cert-expiry-audit.sh",
    tags: ["k8s", "debug", "nginx"],
    script: `#!/usr/bin/env bash
# cert-expiry-audit.sh [host:port ...]
set -euo pipefail

echo "=== TLS cert audit $(date -u +%Y-%m-%dT%H:%M:%SZ) ==="

if kubectl get certificate -A &>/dev/null; then
  echo "--- cert-manager Certificates ---"
  kubectl get certificate -A -o custom-columns=NS:.metadata.namespace,NAME:.metadata.name,READY:.status.conditions[0].status,EXPIRY:.status.notAfter 2>/dev/null || kubectl get certificate -A
fi

check_host() {
  local host=$1
  echo "--- $host ---"
  echo | openssl s_client -connect "$host" -servername "\${host%%:*}" 2>/dev/null | openssl x509 -noout -dates -subject 2>/dev/null || echo "FAILED: $host"
  echo | openssl s_client -connect "$host" -servername "\${host%%:*}" 2>/dev/null | openssl x509 -noout -checkend 604800 && echo "OK: >7 days" || echo "WARN: expires within 7 days"
}

if [[ $# -gt 0 ]]; then
  for h in "$@"; do check_host "$h"; done
else
  echo "Pass hosts: $0 app.example.com:443 api.example.com:443"
fi

echo "=== End audit ==="`,
  },
  {
    id: "incident-triage",
    title: "Quick incident triage",
    description: "First 5 minutes — context, broken pods, recent events, and ingress status.",
    filename: "incident-triage.sh",
    tags: ["k8s", "debug", "oncall"],
    script: `#!/usr/bin/env bash
# incident-triage.sh [namespace]
set -euo pipefail

NS="\${1:-apps}"

echo "=== Incident triage $(date -u +%Y-%m-%dT%H:%M:%SZ) ==="
echo "Context: $(kubectl config current-context)"
echo "Namespace: $NS"
echo

echo "--- Not Running pods in $NS ---"
kubectl get pods -n "$NS" | grep -vE 'Running|Completed' || echo "All pods OK"
echo

echo "--- Recent events ($NS) ---"
kubectl get events -n "$NS" --sort-by=.lastTimestamp | tail -15
echo

echo "--- Deployments ---"
kubectl get deploy -n "$NS"
echo

echo "--- Ingress ---"
kubectl get ingress -n "$NS" 2>/dev/null || echo "No ingress in $NS"
echo

echo "--- Top restarts ---"
kubectl get pods -n "$NS" -o jsonpath='{range .items[*]}{.metadata.name}{" restarts="}{.status.containerStatuses[0].restartCount}{"\\n"}{end}' | sort -t= -k2 -nr | head -5
echo "=== Next: /fix/ or /runbooks/ ==="`,
  },
  {
    id: "node-disk-cleanup",
    title: "Node disk cleanup (Docker + logs)",
    description: "Free disk on build nodes — prune Docker, journal vacuum, find large dirs.",
    filename: "node-disk-cleanup.sh",
    tags: ["docker", "debug", "linux"],
    script: `#!/usr/bin/env bash
# node-disk-cleanup.sh — review output before destructive steps
set -euo pipefail

echo "=== Disk before ==="
df -h /
echo

echo "--- Largest dirs under /var ---"
sudo du -sh /var/* 2>/dev/null | sort -hr | head -10
echo

echo "--- Docker disk usage ---"
docker system df 2>/dev/null || echo "Docker not available"
echo

read -r -p "Prune unused Docker data? [y/N] " ans
if [[ "$ans" =~ ^[Yy]$ ]]; then
  docker system prune -af --volumes 2>/dev/null || true
fi

read -r -p "Vacuum journal to 7 days? [y/N] " ans2
if [[ "$ans2" =~ ^[Yy]$ ]]; then
  sudo journalctl --vacuum-time=7d
fi

echo "=== Disk after ==="
df -h /`,
  },
  {
    id: "server-performance-stats",
    title: "Server performance stats",
    description: "CPU, memory, disk, load, and top processes — standup or health check.",
    filename: "server-performance-stats.sh",
    tags: ["linux", "debug", "monitor"],
    script: `#!/usr/bin/env bash
# server-performance-stats.sh
set -euo pipefail

echo "=== Server stats $(date -u +%Y-%m-%dT%H:%M:%SZ) ==="
echo "Host: $(hostname)"
echo

echo "--- Uptime / load ---"
uptime
echo

echo "--- CPU ---"
nproc
grep 'model name' /proc/cpuinfo | head -1 || true
echo

echo "--- Memory ---"
free -h
echo

echo "--- Disk ---"
df -h /
df -h 2>/dev/null | grep -v tmpfs | head -10
echo

echo "--- Top 5 CPU processes ---"
ps aux --sort=-%cpu 2>/dev/null | head -6 || ps -eo pid,pcpu,pmem,comm --sort=-pcpu | head -6
echo

echo "--- Top 5 memory processes ---"
ps aux --sort=-%mem 2>/dev/null | head -6 || ps -eo pid,pcpu,pmem,comm --sort=-pmem | head -6
echo "=== End ==="`,
  },
  {
    id: "log-archive",
    title: "Log archive tool",
    description: "Compress logs older than N days into dated tarballs — cron-friendly.",
    filename: "log-archive.sh",
    tags: ["linux", "backup"],
    script: `#!/usr/bin/env bash
# log-archive.sh LOG_DIR [DAYS_OLD]
set -euo pipefail

LOG_DIR="\${1:-/var/log/myapp}"
DAYS="\${2:-7}"
ARCHIVE_DIR="\${LOG_DIR}/archive"
STAMP=$(date +%Y-%m-%d)

mkdir -p "$ARCHIVE_DIR"

echo "Archiving *.log older than $DAYS days in $LOG_DIR"
find "$LOG_DIR" -maxdepth 1 -name '*.log' -mtime +"$DAYS" -print

find "$LOG_DIR" -maxdepth 1 -name '*.log' -mtime +"$DAYS" -print0 | tar czf "$ARCHIVE_DIR/logs-$STAMP.tar.gz" --null -T -
find "$LOG_DIR" -maxdepth 1 -name '*.log' -mtime +"$DAYS" -delete

echo "Archive: $ARCHIVE_DIR/logs-$STAMP.tar.gz"
ls -lh "$ARCHIVE_DIR" | tail -5`,
  },
  {
    id: "nginx-log-analyze",
    title: "Nginx access log analyser",
    description: "Top IPs, status codes, and 5xx count from access.log.",
    filename: "nginx-log-analyze.sh",
    tags: ["linux", "nginx", "debug"],
    script: `#!/usr/bin/env bash
# nginx-log-analyze.sh /var/log/nginx/access.log
set -euo pipefail

LOG="\${1:-/var/log/nginx/access.log}"
[[ -f "$LOG" ]] || { echo "Log not found: $LOG"; exit 1; }

echo "=== Nginx log analysis: $LOG ==="
echo "Lines: $(wc -l < "$LOG")"
echo

echo "--- Status code counts ---"
awk '{print $9}' "$LOG" | sort | uniq -c | sort -rn | head -10
echo

echo "--- 5xx count ---"
awk '$9 ~ /^5/ {c++} END {print c+0 " responses"}' "$LOG"
echo

echo "--- Top 10 client IPs ---"
awk '{print $1}' "$LOG" | sort | uniq -c | sort -rn | head -10
echo

echo "--- Top 10 requested paths ---"
awk '{print $7}' "$LOG" | sort | uniq -c | sort -rn | head -10
echo "=== End ==="`,
  },
  {
    id: "file-integrity-check",
    title: "File integrity checker",
    description: "SHA256 manifest — baseline and verify config/log directories.",
    filename: "file-integrity-check.sh",
    tags: ["linux", "security"],
    script: `#!/usr/bin/env bash
# file-integrity-check.sh baseline|verify DIR [MANIFEST]
set -euo pipefail

MODE="\${1:?baseline|verify}"
DIR="\${2:?directory}"
MANIFEST="\${3:-/var/lib/integrity/manifest.sha256}"

mkdir -p "$(dirname "$MANIFEST")"

if [[ "$MODE" == "baseline" ]]; then
  find "$DIR" -type f -print0 | sort -z | xargs -0 sha256sum > "$MANIFEST"
  echo "Baseline written: $MANIFEST ($(wc -l < "$MANIFEST") files)"
elif [[ "$MODE" == "verify" ]]; then
  [[ -f "$MANIFEST" ]] || { echo "Missing manifest: $MANIFEST"; exit 1; }
  CHANGES=$(sha256sum -c "$MANIFEST" 2>&1 | grep -v ': OK$' || true)
  if [[ -z "$CHANGES" ]]; then
    echo "OK — no changes detected"
  else
    echo "CHANGED or MISSING:"
    echo "$CHANGES"
    exit 1
  fi
else
  echo "Usage: $0 baseline|verify DIR [MANIFEST]"
  exit 1
fi`,
  },
];

export function getBashScript(id: string): BashScript | undefined {
  return bashScripts.find((s) => s.id === id);
}
