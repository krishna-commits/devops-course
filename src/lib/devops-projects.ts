export type ProjectLevel = "beginner" | "intermediate" | "advanced";

export interface DevOpsProject {
  id: string;
  level: ProjectLevel;
  title: string;
  description: string;
  href: string;
  skills: string[];
}

/** Hands-on projects mapped to DevOps World guides, scripts, and flows */
export const devopsProjects: DevOpsProject[] = [
  // Beginner
  {
    id: "server-stats",
    level: "beginner",
    title: "Server performance stats",
    description: "CLI script — CPU, memory, disk, load average, and top processes.",
    href: "/scripts/#server-performance-stats",
    skills: ["Linux", "CLI", "Monitoring"],
  },
  {
    id: "log-archive",
    level: "beginner",
    title: "Log archive tool",
    description: "Rotate and tarball logs with date stamps — cron-ready.",
    href: "/scripts/#log-archive",
    skills: ["Linux", "Cron", "Ops"],
  },
  {
    id: "nginx-log-analyze",
    level: "beginner",
    title: "Nginx log analyser",
    description: "Parse access.log — top IPs, 5xx count, slow requests from CLI.",
    href: "/scripts/#nginx-log-analyze",
    skills: ["Nginx", "CLI", "Debug"],
  },
  {
    id: "github-pages",
    level: "beginner",
    title: "GitHub Pages deploy",
    description: "Static site workflow — build and publish with GitHub Actions.",
    href: "/deployments/github-actions-ci/",
    skills: ["GitHub Actions", "CI/CD"],
  },
  {
    id: "ssh-server",
    level: "beginner",
    title: "SSH remote server setup",
    description: "Harden SSH — keys, disable password auth, firewall.",
    href: "/tools/ssh/",
    skills: ["SSH", "Linux", "Security"],
  },
  {
    id: "static-nginx",
    level: "beginner",
    title: "Static site on Nginx",
    description: "Install Nginx and serve a static site with TLS.",
    href: "/tools/nginx/",
    skills: ["Nginx", "Linux"],
  },
  {
    id: "basic-dns",
    level: "beginner",
    title: "Basic DNS records",
    description: "A, CNAME, MX — BIND or cloud DNS with dig verification.",
    href: "/tools/dns/",
    skills: ["DNS", "Networking"],
  },
  {
    id: "netdata-monitor",
    level: "beginner",
    title: "Simple monitoring dashboard",
    description: "Real-time CPU, RAM, disk with Netdata.",
    href: "/tools/netdata/",
    skills: ["Monitoring", "Linux"],
  },
  {
    id: "systemd-service",
    level: "beginner",
    title: "Systemd long-running service",
    description: "Unit file that logs to journal — enable on boot.",
    href: "/cheatsheets/systemd/",
    skills: ["systemd", "Linux"],
  },
  {
    id: "dockerfile-basic",
    level: "beginner",
    title: "Basic Dockerfile",
    description: "Multi-stage or slim image — build and run locally.",
    href: "/deployments/dockerfile-templates/",
    skills: ["Docker"],
  },
  {
    id: "ec2-first",
    level: "beginner",
    title: "First EC2 instance",
    description: "Launch instance, security group, SSH in, verify identity.",
    href: "/tools/aws-cli/",
    skills: ["AWS", "SSH"],
  },
  // Intermediate
  {
    id: "ansible-config",
    level: "intermediate",
    title: "Ansible configuration management",
    description: "Playbook to harden a Linux server — packages, users, services.",
    href: "/tools/ansible/",
    skills: ["Ansible", "IaC"],
  },
  {
    id: "terraform-cloud",
    level: "intermediate",
    title: "Terraform infrastructure",
    description: "VPC, compute, remote state — plan and apply safely.",
    href: "/flows/terraform-eks-from-repo/",
    skills: ["Terraform", "IaC"],
  },
  {
    id: "gha-node-deploy",
    level: "intermediate",
    title: "CI deploy Node.js service",
    description: "GitHub Actions — test, build image, deploy to server or K8s.",
    href: "/flows/app-to-eks-github-actions/",
    skills: ["GitHub Actions", "Docker", "K8s"],
  },
  {
    id: "compose-multi",
    level: "intermediate",
    title: "Multi-container Compose stack",
    description: "App + database + cache — local prod-like stack.",
    href: "/deployments/flask-postgres-compose/",
    skills: ["Docker Compose"],
  },
  {
    id: "db-backup-cron",
    level: "intermediate",
    title: "Automated DB backups",
    description: "Scheduled pg_dump / mysqldump to S3 with retention.",
    href: "/snippets/#cron-backup-script",
    skills: ["Backup", "Cron", "AWS"],
  },
  {
    id: "bastion-host",
    level: "intermediate",
    title: "Bastion host",
    description: "Jump box for private subnets — SSH hardening and audit.",
    href: "/flows/bastion-jump-host/",
    skills: ["SSH", "AWS", "Security"],
  },
  {
    id: "file-integrity",
    level: "intermediate",
    title: "File integrity checker",
    description: "SHA256 manifest — detect tampering on config and log dirs.",
    href: "/scripts/#file-integrity-check",
    skills: ["Security", "Linux"],
  },
  {
    id: "wireguard-vpn",
    level: "intermediate",
    title: "VPN server setup",
    description: "WireGuard tunnel for secure remote access to private infra.",
    href: "/tools/wireguard/",
    skills: ["VPN", "Networking"],
  },
  {
    id: "dhcp-server",
    level: "intermediate",
    title: "DHCP server",
    description: "Internal DHCP with reserved leases and DNS integration.",
    href: "/tools/dhcp/",
    skills: ["DHCP", "Networking"],
  },
  {
    id: "nfs-storage",
    level: "intermediate",
    title: "NFS file server",
    description: "Export shares and mount from clients — lab or legacy apps.",
    href: "/tools/nfs/",
    skills: ["NFS", "Storage"],
  },
  // Advanced
  {
    id: "blue-green",
    level: "advanced",
    title: "Blue-green deployment",
    description: "Two identical envs — switch traffic with zero downtime.",
    href: "/flows/blue-green-kubernetes/",
    skills: ["K8s", "Deploy", "CI/CD"],
  },
  {
    id: "prom-grafana",
    level: "advanced",
    title: "Prometheus + Grafana stack",
    description: "Metrics collection, dashboards, and alert rules.",
    href: "/flows/prometheus-grafana-stack/",
    skills: ["Prometheus", "Grafana", "Observe"],
  },
  {
    id: "consul-discovery",
    level: "advanced",
    title: "Service discovery with Consul",
    description: "Register services, health checks, and DNS interface.",
    href: "/tools/consul/",
    skills: ["Consul", "Networking"],
  },
  {
    id: "gitops-argocd",
    level: "advanced",
    title: "GitOps with Argo CD",
    description: "Sync cluster state from Git — deploy and rollback from repo.",
    href: "/flows/argocd-gitops-bootstrap/",
    skills: ["GitOps", "K8s", "Argo CD"],
  },
  {
    id: "vault-secrets",
    level: "advanced",
    title: "Vault secrets to Kubernetes",
    description: "External Secrets Operator — no plain secrets in git.",
    href: "/flows/vault-secrets-to-k8s/",
    skills: ["Vault", "Security", "K8s"],
  },
  {
    id: "kvm-lab",
    level: "advanced",
    title: "KVM virtualization lab",
    description: "Hypervisor, VMs, storage, and live migration basics.",
    href: "/tools/kvm/",
    skills: ["KVM", "Virtualization"],
  },
];

export const projectLevels: { id: ProjectLevel | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
];

export function getProjectsByLevel(level: ProjectLevel | "all"): DevOpsProject[] {
  if (level === "all") return devopsProjects;
  return devopsProjects.filter((p) => p.level === level);
}
