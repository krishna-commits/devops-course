export interface ObserveTriageStep {
  label: string;
  detail: string;
  href?: string;
  snippetId?: string;
}

export interface ObserveScenario {
  id: string;
  alert: string;
  icon: string;
  dashboard: ObserveTriageStep;
  logs: ObserveTriageStep;
  runbook: ObserveTriageStep;
}

/** Alert fired → dashboard → log query → runbook */
export const observeScenarios: ObserveScenario[] = [
  {
    id: "high-error-rate",
    alert: "High HTTP 5xx error rate",
    icon: "📈",
    dashboard: {
      label: "Grafana / Prometheus",
      detail: "Request rate vs 5xx ratio — ingress or app RED metrics",
      snippetId: "promql-error-rate",
    },
    logs: {
      label: "App + ingress logs",
      detail: "Stack trace or upstream timeout in last 15m",
      snippetId: "k8s-crash-logs",
      href: "/snippets/#k8s-crash-logs",
    },
    runbook: {
      label: "502 / upstream path",
      detail: "Trace ingress → service → pod",
      href: "/runbooks/nginx-502-k8s-ingress/",
    },
  },
  {
    id: "pod-restarts",
    alert: "Pod restart loop / CrashLoopBackOff",
    icon: "🔄",
    dashboard: {
      label: "Pod restart counter",
      detail: "kube_pod_container_status_restarts_total or CloudWatch ContainerInsights",
      snippetId: "promql-pod-restarts",
    },
    logs: {
      label: "Previous container logs",
      detail: "kubectl logs --previous for exit reason",
      snippetId: "k8s-crash-logs",
    },
    runbook: {
      label: "Image pull / OOM",
      detail: "ImagePullBackOff or OOMKilled runbooks",
      href: "/runbooks/imagepull-backoff/",
    },
  },
  {
    id: "high-latency",
    alert: "P99 latency spike",
    icon: "⏱️",
    dashboard: {
      label: "Histogram / latency panel",
      detail: "Compare ingress vs app duration — where time is spent",
      snippetId: "promql-latency-p99",
    },
    logs: {
      label: "Slow query / timeout logs",
      detail: "DB connection pool, upstream timeout",
      snippetId: "curl-headers",
    },
    runbook: {
      label: "502 debug path",
      detail: "Upstream timeout often masquerades as latency",
      href: "/flows/debug-502-path/",
    },
  },
  {
    id: "disk-pressure",
    alert: "Node DiskPressure / disk full",
    icon: "💾",
    dashboard: {
      label: "Node disk usage",
      detail: "node_filesystem_avail_bytes or host disk metrics",
      snippetId: "promql-disk-usage",
    },
    logs: {
      label: "Evicted pods + kubelet",
      detail: "Eviction events and image layer bloat",
      snippetId: "disk-full",
    },
    runbook: {
      label: "Node NotReady",
      detail: "Cordon, drain, clean images",
      href: "/runbooks/node-notready-disk/",
    },
  },
  {
    id: "cert-expiry",
    alert: "TLS certificate expiring soon",
    icon: "🔒",
    dashboard: {
      label: "cert-manager Certificate Ready",
      detail: "certmanager_certificate_expiration_timestamp_seconds",
      snippetId: "promql-cert-expiry",
    },
    logs: {
      label: "cert-manager controller",
      detail: "ACME challenge failures",
      snippetId: "k8s-cert-expiry",
    },
    runbook: {
      label: "Renew ingress TLS",
      detail: "ClusterIssuer + DNS challenge",
      href: "/runbooks/ingress-cert-expired/",
    },
  },
  {
    id: "deploy-failed",
    alert: "Deployment rollout failed",
    icon: "🚀",
    dashboard: {
      label: "Rollout status",
      detail: "kubectl rollout status or Argo CD sync health",
      snippetId: "k8s-rollout-undo",
    },
    logs: {
      label: "Failed pod events",
      detail: "describe pod Events section",
      snippetId: "k8s-crash-logs",
    },
    runbook: {
      label: "Helm release failed",
      detail: "history + rollback",
      href: "/runbooks/helm-release-failed/",
    },
  },
];
