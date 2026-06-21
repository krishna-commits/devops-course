export interface NetworkLayer {
  order: number;
  layer: string;
  icon: string;
  question: string;
  checks: string[];
  snippetId?: string;
  href?: string;
}

export interface NetworkSymptom {
  id: string;
  symptom: string;
  icon: string;
  startLayer: number;
  runbookHref?: string;
  flowHref?: string;
  snippetId?: string;
}

/** DNS → firewall → LB → ingress → pod — follow in order */
export const networkLayers: NetworkLayer[] = [
  {
    order: 1,
    layer: "DNS",
    icon: "🌍",
    question: "Does the hostname resolve to the right IP?",
    checks: [
      "dig +short app.example.com matches LB or ingress IP",
      "TTL not caching stale record after cutover",
      "CNAME chain ends at expected target",
    ],
    snippetId: "dns-check",
    href: "/tools/dns/",
  },
  {
    order: 2,
    layer: "Firewall / security group",
    icon: "🧱",
    question: "Is traffic allowed on the port from client to LB/node?",
    checks: [
      "AWS SG: inbound 443 from 0.0.0.0/0 or corporate CIDR to LB",
      "NACL not blocking return traffic",
      "On-prem: ufw/iptables allow 443",
    ],
    snippetId: "port-check",
  },
  {
    order: 3,
    layer: "Load balancer",
    icon: "⚖️",
    question: "Does the LB have healthy targets?",
    checks: [
      "Target group health checks passing",
      "Listener rules forward to correct target group",
      "Idle timeout >= app response time",
    ],
    snippetId: "idle-elb",
    href: "/runbooks/nginx-502-k8s-ingress/",
  },
  {
    order: 4,
    layer: "Ingress / reverse proxy",
    icon: "🌐",
    question: "Does ingress route to the right service:port?",
    checks: [
      "kubectl describe ingress — backend service name and port number",
      "Ingress controller logs — upstream errors",
      "TLS secret attached if HTTPS",
    ],
    snippetId: "k8s-ingress-describe",
    href: "/deployments/k8s-ingress/",
  },
  {
    order: 5,
    layer: "Service & endpoints",
    icon: "🔗",
    question: "Do Service endpoints exist and match ready pods?",
    checks: [
      "kubectl get endpoints — not empty",
      "Service port matches container targetPort",
      "selector labels match pod labels",
    ],
    snippetId: "k8s-ingress-describe",
  },
  {
    order: 6,
    layer: "Pod / NetworkPolicy",
    icon: "☸️",
    question: "Is the pod listening and allowed to receive traffic?",
    checks: [
      "kubectl exec — curl localhost:PORT/health",
      "Readiness probe passing",
      "NetworkPolicy allows ingress from ingress namespace",
    ],
    snippetId: "debug-pod-netshoot",
    href: "/runbooks/connection-refused-upstream/",
  },
];

export const networkSymptoms: NetworkSymptom[] = [
  {
    id: "connection-refused",
    symptom: "Connection refused",
    icon: "🚫",
    startLayer: 5,
    runbookHref: "/runbooks/connection-refused-upstream/",
  },
  {
    id: "timeout",
    symptom: "Timeout / hang",
    icon: "⏳",
    startLayer: 3,
    runbookHref: "/runbooks/nginx-502-k8s-ingress/",
    flowHref: "/flows/debug-502-path/",
  },
  {
    id: "dns-fail",
    symptom: "Could not resolve host",
    icon: "❓",
    startLayer: 1,
    snippetId: "dns-check",
  },
  {
    id: "502",
    symptom: "502 Bad Gateway",
    icon: "🌐",
    startLayer: 4,
    flowHref: "/flows/debug-502-path/",
    runbookHref: "/runbooks/nginx-502-k8s-ingress/",
  },
  {
    id: "ssl-error",
    symptom: "SSL / certificate error",
    icon: "🔒",
    startLayer: 4,
    runbookHref: "/runbooks/ingress-cert-expired/",
    flowHref: "/certs/",
  },
];
