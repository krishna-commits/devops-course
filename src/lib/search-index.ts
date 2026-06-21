export type SkillLevel = "beginner" | "intermediate" | "advanced";

export { catalogSearchMeta, SEARCH_ALIASES } from "./search-catalog-meta";
import { catalogSearchMeta, SEARCH_ALIASES } from "./search-catalog-meta";

export interface ToolSearchMeta {
  slug: string;
  /** Plain English — what this helps you do */
  simpleTitle: string;
  /** Extra words people might type (non-technical + technical) */
  keywords: string[];
  level: SkillLevel;
}

export const POPULAR_SEARCHES = [
  "connect to server",
  "docker kubernetes",
  "argocd gitops",
  "monitor servers",
  "nginx web server",
  "postgresql database",
  "setup ssl certificate",
  "github actions ci",
  "vault secrets",
  "redis cache",
];

export const TASK_GROUPS = [
  {
    id: "gitops",
    icon: "🚀",
    title: "GitOps & deploy to K8s",
    desc: "Argo CD, Flux, Tekton",
    slugs: ["argocd", "flux", "tekton", "helm", "jenkins"],
  },
  {
    id: "remote",
    icon: "🔑",
    title: "Connect to a server",
    desc: "Log in remotely and transfer files",
    slugs: ["ssh", "ftp"],
  },
  {
    id: "monitor",
    icon: "📊",
    title: "Monitor servers & apps",
    desc: "Watch health, alerts, dashboards",
    slugs: ["prometheus-grafana", "grafana", "prometheus", "nagios", "zabbix", "netdata", "elasticsearch", "elk-stack", "kibana", "loki", "fluentd", "graylog", "splunk", "datadog", "new-relic", "jaeger"],
  },
  {
    id: "containers",
    icon: "🐳",
    title: "Run apps in containers",
    desc: "Docker, Podman, Kubernetes, local clusters",
    slugs: ["docker", "docker-compose", "podman", "kubernetes", "minikube", "k3s", "microk8s", "kind", "helm", "istio", "linkerd", "cilium", "calico", "kyverno", "portainer", "velero", "external-secrets-operator"],
  },
  {
    id: "network",
    icon: "🌐",
    title: "Network & DNS setup",
    desc: "Domains, IP addresses, load balancing, VPN",
    slugs: ["dns", "dhcp", "haproxy", "nginx", "apache", "traefik", "wireguard", "openvpn", "certbot", "squid", "keepalived", "consul"],
  },
  {
    id: "storage",
    icon: "💾",
    title: "Share & store files",
    desc: "Network drives and file servers",
    slugs: ["nfs", "samba", "ftp"],
  },
  {
    id: "automate",
    icon: "🔄",
    title: "Automate & deploy",
    desc: "CI/CD, pipelines, infrastructure",
    slugs: ["jenkins", "github-actions", "gitlab-ci", "circleci", "travis-ci", "buildkite", "drone-ci", "teamcity", "azure-devops", "bitbucket-pipelines", "ansible", "terraform", "aws-cloudformation", "packer", "pulumi", "argocd", "flux", "slack", "jira"],
  },
  {
    id: "cloud",
    icon: "☁️",
    title: "Cloud & virtual machines",
    desc: "AWS, GCP, Azure, DigitalOcean, VMs",
    slugs: ["aws-cli", "aws-cloudformation", "aws-secrets-manager", "gcloud", "azure-cli", "github-cli", "doctl", "cloudflare", "eksctl", "kvm", "vagrant", "cloud-compute"],
  },
  {
    id: "code",
    icon: "💻",
    title: "Programming & databases",
    desc: "Python, Go, MySQL, PostgreSQL, Redis, Git",
    slugs: ["python", "go", "nodejs", "ruby", "php", "mysql", "postgresql", "mongodb", "mariadb", "redis", "memcached", "rabbitmq", "kafka", "git", "maven", "gradle", "jq", "postman", "selenium", "vscode"],
  },
  {
    id: "security",
    icon: "🔐",
    title: "Security & secrets",
    desc: "Vault, Falco, SELinux, scanning",
    slugs: ["vault", "aws-secrets-manager", "external-secrets-operator", "falco", "fail2ban", "pre-commit", "ldap", "selinux", "trivy", "sonarqube", "certbot", "kyverno"],
  },
];

export const toolSearchMeta: Record<string, ToolSearchMeta> = {
  ssh: {
    slug: "ssh",
    simpleTitle: "Connect to a computer remotely",
    keywords: ["remote login", "terminal", "secure shell", "putty", "access server", "copy files", "scp", "sftp"],
    level: "beginner",
  },
  dns: {
    slug: "dns",
    simpleTitle: "Set up domain name lookup (DNS)",
    keywords: ["domain", "website name", "bind", "name server", "resolve", "hostname", "url"],
    level: "intermediate",
  },
  dhcp: {
    slug: "dhcp",
    simpleTitle: "Automatically assign IP addresses",
    keywords: ["ip address", "network", "auto ip", "lan", "router", "wifi ip"],
    level: "intermediate",
  },
  haproxy: {
    slug: "haproxy",
    simpleTitle: "Balance traffic across servers",
    keywords: ["load balancer", "high availability", "reverse proxy", "scale website", "traffic split"],
    level: "advanced",
  },
  ftp: {
    slug: "ftp",
    simpleTitle: "Upload and download files to a server",
    keywords: ["file transfer", "upload files", "download files", "filezilla", "vsftpd", "share files"],
    level: "beginner",
  },
  docker: {
    slug: "docker",
    simpleTitle: "Run apps in isolated containers",
    keywords: ["container", "app packaging", "deploy app", "microservice", "image", "portable app"],
    level: "beginner",
  },
  "docker-compose": {
    slug: "docker-compose",
    simpleTitle: "Run multiple apps together with one command",
    keywords: ["multi container", "compose", "stack", "app + database", "yaml setup"],
    level: "beginner",
  },
  kubectl: {
    slug: "kubectl",
    simpleTitle: "Control a Kubernetes cluster",
    keywords: ["kubernetes command", "k8s cli", "manage pods", "cluster control"],
    level: "intermediate",
  },
  kubernetes: {
    slug: "kubernetes",
    simpleTitle: "Set up a container cluster (Kubernetes)",
    keywords: ["k8s", "orchestration", "container cluster", "production deploy", "kubeadm"],
    level: "advanced",
  },
  minikube: {
    slug: "minikube",
    simpleTitle: "Try Kubernetes on your laptop",
    keywords: ["local kubernetes", "learn k8s", "practice cluster", "dev environment"],
    level: "beginner",
  },
  helm: {
    slug: "helm",
    simpleTitle: "Install apps on Kubernetes easily",
    keywords: ["kubernetes packages", "charts", "deploy to k8s", "app installer"],
    level: "intermediate",
  },
  kvm: {
    slug: "kvm",
    simpleTitle: "Create virtual machines on Linux",
    keywords: ["vm", "virtual machine", "hypervisor", "virtualbox alternative", "libvirt"],
    level: "intermediate",
  },
  "cloud-compute": {
    slug: "cloud-compute",
    simpleTitle: "Build your own cloud (OpenStack)",
    keywords: ["private cloud", "openstack", "iaas", "vm cloud", "self hosted cloud"],
    level: "advanced",
  },
  nfs: {
    slug: "nfs",
    simpleTitle: "Share a folder across computers on the network",
    keywords: ["network drive", "shared folder", "file share", "mount drive", "storage"],
    level: "intermediate",
  },
  prometheus: {
    slug: "prometheus",
    simpleTitle: "Collect server metrics and numbers",
    keywords: ["metrics", "monitoring data", "time series", "server stats", "cpu memory"],
    level: "intermediate",
  },
  grafana: {
    slug: "grafana",
    simpleTitle: "Create charts and dashboards for your data",
    keywords: ["dashboard", "graphs", "visualize metrics", "monitoring charts", "pretty graphs"],
    level: "beginner",
  },
  "prometheus-grafana": {
    slug: "prometheus-grafana",
    simpleTitle: "Full monitoring setup (metrics + dashboards)",
    keywords: ["monitor servers", "watch server health", "alerting", "observability stack"],
    level: "beginner",
  },
  nagios: {
    slug: "nagios",
    simpleTitle: "Get alerts when a server goes down",
    keywords: ["uptime monitor", "server down alert", "email alert", "check website up"],
    level: "intermediate",
  },
  zabbix: {
    slug: "zabbix",
    simpleTitle: "Monitor servers, networks, and apps",
    keywords: ["enterprise monitoring", "server health", "network monitor", "alert system"],
    level: "intermediate",
  },
  sonarqube: {
    slug: "sonarqube",
    simpleTitle: "Check code quality and find bugs",
    keywords: ["code review", "bug scan", "code quality", "static analysis"],
    level: "intermediate",
  },
  trivy: {
    slug: "trivy",
    simpleTitle: "Scan for security vulnerabilities",
    keywords: ["security scan", "vulnerability", "container scan", "safe code"],
    level: "intermediate",
  },
  jenkins: {
    slug: "jenkins",
    simpleTitle: "Automate building and deploying code",
    keywords: ["ci cd", "build automation", "pipeline", "auto deploy", "continuous integration"],
    level: "intermediate",
  },
  "github-actions": {
    slug: "github-actions",
    simpleTitle: "Automate tasks when you push code to GitHub",
    keywords: ["github ci", "auto test", "workflow", "deploy from github"],
    level: "beginner",
  },
  terraform: {
    slug: "terraform",
    simpleTitle: "Create cloud servers with config files",
    keywords: ["infrastructure as code", "iac", "provision servers", "aws setup file", "automate cloud"],
    level: "intermediate",
  },
  ansible: {
    slug: "ansible",
    simpleTitle: "Configure many servers at once",
    keywords: ["automation", "config management", "setup multiple servers", "playbook"],
    level: "intermediate",
  },
  "aws-cli": {
    slug: "aws-cli",
    simpleTitle: "Manage Amazon AWS cloud from terminal",
    keywords: ["amazon web services", "aws cloud", "ec2", "s3", "amazon server"],
    level: "intermediate",
  },
  "azure-cli": {
    slug: "azure-cli",
    simpleTitle: "Manage Microsoft Azure cloud from terminal",
    keywords: ["microsoft cloud", "azure server", "microsoft aws"],
    level: "intermediate",
  },
  eksctl: {
    slug: "eksctl",
    simpleTitle: "Create Kubernetes on AWS (EKS)",
    keywords: ["aws kubernetes", "eks cluster", "amazon k8s"],
    level: "advanced",
  },
  ldap: {
    slug: "ldap",
    simpleTitle: "Manage user accounts in one place",
    keywords: ["user directory", "login accounts", "active directory alternative", "central users"],
    level: "advanced",
  },
  selinux: {
    slug: "selinux",
    simpleTitle: "Extra security layer on Linux (SELinux)",
    keywords: ["linux security", "permissions", "access control", "rhel security", "hardening"],
    level: "advanced",
  },
  git: {
    slug: "git",
    simpleTitle: "Track and save versions of your code",
    keywords: ["version control", "github", "save code", "commit", "backup code", "collaborate"],
    level: "beginner",
  },
  python: {
    slug: "python",
    simpleTitle: "Install Python for scripting and automation",
    keywords: ["programming", "script", "learn coding", "pip", "automation language"],
    level: "beginner",
  },
  go: {
    slug: "go",
    simpleTitle: "Install Go programming language",
    keywords: ["golang", "programming", "cli tools", "cloud native language"],
    level: "intermediate",
  },
  maven: {
    slug: "maven",
    simpleTitle: "Build Java projects",
    keywords: ["java build", "compile java", "spring boot build"],
    level: "intermediate",
  },
  mysql: {
    slug: "mysql",
    simpleTitle: "Set up a MySQL database",
    keywords: ["database", "sql", "store data", "db server", "website database"],
    level: "beginner",
  },
  nginx: {
    slug: "nginx",
    simpleTitle: "Serve websites and reverse proxy traffic",
    keywords: ["web server", "reverse proxy", "https", "load balance", "website", "apache alternative"],
    level: "beginner",
  },
  postgresql: {
    slug: "postgresql",
    simpleTitle: "Set up a PostgreSQL database",
    keywords: ["postgres", "database", "sql", "flask database", "relational db"],
    level: "beginner",
  },
  redis: {
    slug: "redis",
    simpleTitle: "Set up Redis for caching and sessions",
    keywords: ["cache", "in memory", "session store", "key value", "fast database"],
    level: "beginner",
  },
  certbot: {
    slug: "certbot",
    simpleTitle: "Get free HTTPS certificates (Let's Encrypt)",
    keywords: ["ssl", "https", "tls", "certificate", "padlock", "encrypt website", "lets encrypt"],
    level: "beginner",
  },
  wireguard: {
    slug: "wireguard",
    simpleTitle: "Set up a VPN for secure remote access",
    keywords: ["vpn", "remote access", "secure tunnel", "private network", "work from home"],
    level: "intermediate",
  },
  podman: {
    slug: "podman",
    simpleTitle: "Run containers without Docker daemon",
    keywords: ["container", "docker alternative", "rootless", "oci", "podman compose"],
    level: "intermediate",
  },
  "gitlab-ci": {
    slug: "gitlab-ci",
    simpleTitle: "Automate builds with GitLab CI/CD",
    keywords: ["gitlab pipeline", "ci cd", "yaml pipeline", "auto deploy", "gitlab runner"],
    level: "beginner",
  },
};

export function getToolMeta(slug: string): ToolSearchMeta {
  return (
    toolSearchMeta[slug] ??
    catalogSearchMeta[slug] ?? {
      slug,
      simpleTitle: slug,
      keywords: [],
      level: "intermediate" as SkillLevel,
    }
  );
}

export function expandSearchQuery(query: string): string[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = [q];
  for (const [alias, slugs] of Object.entries(SEARCH_ALIASES)) {
    if (q.includes(alias) || alias.includes(q)) {
      terms.push(alias, ...slugs);
    }
  }
  for (const [alias, slugs] of Object.entries(SEARCH_ALIASES)) {
    if (slugs.some((s) => q.includes(s) || s.includes(q))) {
      terms.push(alias, ...slugs);
    }
  }
  return [...new Set(terms)];
}

export function matchSearchQuery(query: string, fields: string[]): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = fields.join(" ").toLowerCase();
  if (haystack.includes(q)) return true;
  const expanded = expandSearchQuery(q);
  if (expanded.some((term) => term !== q && haystack.includes(term))) return true;
  const words = q.split(/\s+/).filter(Boolean);
  return words.every((w) => haystack.includes(w) || expanded.some((e) => e.includes(w)));
}

export interface SearchableItem {
  slug: string;
  name: string;
  simpleTitle?: string;
  description?: string;
  categoryName?: string;
  keywords?: string[];
  kind?: "tool" | "deployment" | "utility" | "cheatsheet" | "runbook" | "compare" | "error" | "snippet" | "flow";
}

/** Relevance score for sorting search results — higher is better */
export function scoreSearchMatch(query: string, item: SearchableItem): number {
  const q = query.trim().toLowerCase();
  if (!q) return 0;

  let score = 0;
  const slug = item.slug.toLowerCase();
  const name = item.name.toLowerCase();
  const title = (item.simpleTitle ?? "").toLowerCase();
  const desc = (item.description ?? "").toLowerCase();
  const category = (item.categoryName ?? "").toLowerCase();
  const keywords = (item.keywords ?? []).join(" ").toLowerCase();

  if (slug === q || name === q) score += 100;
  if (slug.startsWith(q) || name.startsWith(q)) score += 40;
  if (slug.includes(q)) score += 25;
  if (name.includes(q)) score += 20;
  if (title.includes(q)) score += 15;
  if (keywords.includes(q)) score += 12;
  if (desc.includes(q)) score += 5;
  if (category.includes(q)) score += 3;

  const words = q.split(/\s+/).filter(Boolean);
  if (words.length > 1 && words.every((w) => [slug, name, title, desc, keywords].some((f) => f.includes(w)))) {
    score += 10;
  }

  const expanded = expandSearchQuery(q);
  if (expanded.includes(slug)) score += 30;
  if (expanded.some((term) => term !== q && (slug.includes(term) || name.includes(term) || keywords.includes(term)))) {
    score += 8;
  }

  if (item.kind === "deployment" && ["compose", "yaml", "kubernetes", "k8s", "template", "deploy"].some((k) => q.includes(k))) {
    score += 6;
  }
  if (item.kind === "utility" && ["json", "base64", "jwt", "hash", "uuid", "encode", "decode", "utility"].some((k) => q.includes(k))) {
    score += 6;
  }
  if (item.kind === "cheatsheet" && ["cheat", "quick", "reference", "commands"].some((k) => q.includes(k))) {
    score += 8;
  }
  if (item.kind === "runbook" && ["502", "fix", "incident", "runbook", "troubleshoot"].some((k) => q.includes(k))) {
    score += 8;
  }
  if (item.kind === "compare" && ["vs", "compare", "alternative"].some((k) => q.includes(k))) {
    score += 8;
  }
  if (item.kind === "error") {
    if (name.includes(q) || keywords.includes(q)) score += 25;
    score += 15;
  }
  if (item.kind === "snippet" && ["snippet", "ecr", "push", "debug", "login"].some((k) => q.includes(k))) {
    score += 10;
  }
  if (item.kind === "flow" && ["deploy", "ship", "eks", "pipeline", "flow"].some((k) => q.includes(k))) {
    score += 10;
  }

  return score;
}

/** One-click search shortcuts in the palette and grid */
export const QUICK_SEARCH_TERMS = [
  "docker",
  "kubernetes",
  "nginx",
  "jenkins",
  "terraform",
  "monitor",
  "vault",
  "argocd",
  "aws",
  "postgres",
  "ssl",
  "git",
];

export const levelLabels: Record<SkillLevel, { label: string; color: string }> = {
  beginner: { label: "Easy start", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400" },
  intermediate: { label: "Some experience", color: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400" },
  advanced: { label: "IT / Advanced", color: "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-400" },
};
