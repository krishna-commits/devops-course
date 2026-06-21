import type { Category } from "./types";

export const categoryMeta: Record<
  string,
  { color: string; bg: string; border: string; icon: string }
> = {
  container: {
    color: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    icon: "📦",
  },
  cicd: {
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    icon: "🔄",
  },
  iac: {
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    icon: "🏗️",
  },
  cloud: {
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    icon: "☁️",
  },
  monitoring: {
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    icon: "🛡️",
  },
  networking: {
    color: "text-teal-600 dark:text-teal-400",
    bg: "bg-teal-500/10",
    border: "border-teal-500/20",
    icon: "🌐",
  },
  storage: {
    color: "text-lime-600 dark:text-lime-400",
    bg: "bg-lime-500/10",
    border: "border-lime-500/20",
    icon: "💾",
  },
  virtualization: {
    color: "text-fuchsia-600 dark:text-fuchsia-400",
    bg: "bg-fuchsia-500/10",
    border: "border-fuchsia-500/20",
    icon: "🖥️",
  },
  directory: {
    color: "text-sky-600 dark:text-sky-400",
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
    icon: "👥",
  },
  security: {
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    icon: "🔐",
  },
  vcs: {
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    icon: "🔀",
  },
  build: {
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    icon: "🔨",
  },
  database: {
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    icon: "🗄️",
  },
};

export const categories: Category[] = [
  { id: "networking", name: "Networking & Server", description: "SSH, DNS, Nginx, Apache, Traefik, VPN, mail" },
  { id: "container", name: "Container Platform", description: "Docker, K8s, K3s, Argo CD, Istio, Helm, Portainer" },
  { id: "virtualization", name: "Virtualization & Cloud", description: "KVM, OpenStack, Rancher" },
  { id: "storage", name: "Storage", description: "NFS, Samba, shared drives" },
  { id: "monitoring", name: "Monitoring & Observability", description: "Prometheus, Grafana, ELK, Loki, Jaeger, Netdata" },
  { id: "cicd", name: "CI/CD & GitOps", description: "Jenkins, CircleCI, Travis, Buildkite, Argo CD, Flux" },
  { id: "iac", name: "Infrastructure as Code", description: "Terraform, Terragrunt, Ansible, Packer, Pulumi" },
  { id: "cloud", name: "Cloud CLI", description: "AWS, GCP, Azure, GitHub CLI, DigitalOcean, Cloudflare" },
  { id: "directory", name: "Directory Server", description: "LDAP and identity services" },
  { id: "security", name: "Security", description: "Vault, Falco, SELinux, Certbot, Fail2ban" },
  { id: "vcs", name: "Version Control", description: "Git and repository management" },
  { id: "build", name: "Languages & Build", description: "Python, Node.js, Ruby, Go, Gradle, jq, direnv" },
  { id: "database", name: "Database & Messaging", description: "MySQL, PostgreSQL, MongoDB, Redis, Kafka, RabbitMQ" },
];

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getCategoryMeta(id: string) {
  return (
    categoryMeta[id] ?? {
      color: "text-slate-600",
      bg: "bg-slate-500/10",
      border: "border-slate-500/20",
      icon: "⚙️",
    }
  );
}
