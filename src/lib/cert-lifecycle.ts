export interface CertDecisionNode {
  id: string;
  question?: string;
  yes?: string;
  no?: string;
  recommendation?: string;
  snippetId?: string;
  href?: string;
}

export interface CertScenario {
  id: string;
  title: string;
  icon: string;
  description: string;
  when: string[];
  approach: string;
  snippetIds: string[];
  href?: string;
}

/** HTTP-01 vs DNS-01 vs wildcard vs internal CA */
export const certDecisionTree: CertDecisionNode[] = [
  {
    id: "public-hostname",
    question: "Is the cert for a public hostname on the internet?",
    yes: "public-acme",
    no: "internal-ca",
  },
  {
    id: "public-acme",
    question: "Do you need a wildcard cert (*.example.com)?",
    yes: "use-dns01",
    no: "http-or-dns",
  },
  {
    id: "http-or-dns",
    question: "Can Let's Encrypt reach your app on HTTP port 80 from the internet?",
    yes: "use-http01",
    no: "use-dns01",
  },
  {
    id: "use-http01",
    recommendation: "Use cert-manager ClusterIssuer with HTTP-01 solver — simplest for single-host ingress.",
    snippetId: "cert-manager-http01",
    href: "/deployments/k8s-ingress/",
  },
  {
    id: "use-dns01",
    recommendation: "Use DNS-01 with Route53/Cloudflare API — required for wildcards and internal-only LBs.",
    snippetId: "cert-manager-dns01",
    href: "/tools/cert-manager/",
  },
  {
    id: "internal-ca",
    recommendation: "Use internal CA (Vault PKI, cert-manager self-signed, or corporate CA) — not public ACME.",
    snippetId: "cert-internal-ca",
    href: "/tools/vault/",
  },
];

export const certScenarios: CertScenario[] = [
  {
    id: "wildcard",
    title: "Wildcard certificate",
    icon: "🌟",
    description: "Single cert for *.example.com and apex.",
    when: ["Many subdomains", "Same ingress controller", "DNS provider API available"],
    approach: "cert-manager Certificate with dnsNames: ['example.com', '*.example.com'] + DNS-01 ClusterIssuer only.",
    snippetIds: ["cert-manager-dns01", "openssl-cert-check"],
    href: "/deployments/k8s-ingress/",
  },
  {
    id: "internal-ca",
    title: "Internal / mTLS CA",
    icon: "🏢",
    description: "Service-to-service or private cluster certs.",
    when: ["No public internet", "Compliance requires private PKI", "Mesh or internal APIs"],
    approach: "Vault PKI engine or cert-manager CA Issuer; distribute trust bundle to clients.",
    snippetIds: ["cert-internal-ca"],
    href: "/tools/vault/",
  },
  {
    id: "http01",
    title: "HTTP-01 (Let's Encrypt)",
    icon: "🌐",
    description: "Auto-renew via ingress HTTP challenge.",
    when: ["Single hostname", "Port 80 reachable", "No wildcard needed"],
    approach: "Ingress shim or cert-manager ingress template annotation cert-manager.io/cluster-issuer.",
    snippetIds: ["cert-manager-http01", "k8s-cert-expiry"],
    href: "/runbooks/ingress-cert-expired/",
  },
  {
    id: "dns01",
    title: "DNS-01 (wildcard + private LB)",
    icon: "📡",
    description: "ACME via DNS TXT record.",
    when: ["Wildcard required", "LB not public", "Cloudflare/Route53 API token in secret"],
    approach: "ClusterIssuer with solvers.dns01 provider credentials in cert-manager namespace.",
    snippetIds: ["cert-manager-dns01", "promql-cert-expiry"],
    href: "/tools/cert-manager/",
  },
  {
    id: "manual-renew",
    title: "Manual / VM certbot",
    icon: "🖥️",
    description: "Standalone nginx or VM without K8s cert-manager.",
    when: ["Legacy VM", "No cluster", "Simple single site"],
    approach: "certbot renew via cron; reload nginx after renew.",
    snippetIds: ["certbot-renew", "openssl-cert-check"],
    href: "/tools/certbot/",
  },
];
