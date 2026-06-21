export interface CurriculumItem {
  id: string;
  category: string;
  title: string;
  href: string;
  note?: string;
}

/** DevOps syllabus topics — all on DevOps World */
export const curriculumItems: CurriculumItem[] = [
  // Ansible
  { id: "ans-1", category: "Ansible", title: "Ansible AWX / automation controller", href: "/tools/ansible/", note: "Install + configure; AWX on top of Ansible core" },
  { id: "ans-2", category: "Ansible", title: "Ansible Collections & Plugins", href: "/tools/ansible/#configure" },
  { id: "ans-3", category: "Ansible", title: "Ansible Installation", href: "/tools/ansible/" },
  { id: "ans-4", category: "Ansible", title: "Ansible Playbook Templates", href: "/cheatsheets/ansible/" },
  // AWS
  { id: "aws-1", category: "AWS", title: "AWS CLI Installation", href: "/tools/aws-cli/" },
  { id: "aws-2", category: "AWS", title: "EKS Cluster Setup Guide", href: "/flows/terraform-eks-from-repo/" },
  { id: "aws-3", category: "AWS", title: "Setup ECR → ECS → EKS", href: "/flows/app-to-eks-github-actions/" },
  { id: "aws-4", category: "AWS", title: "Microservices Application on EKS", href: "/deployments/k8s-microservices-node/" },
  // Azure DevOps
  { id: "az-1", category: "Azure DevOps", title: "Azure DevOps Pipeline Templates", href: "/tools/azure-devops/" },
  { id: "az-2", category: "Azure DevOps", title: "Azure DevOps Security", href: "/snippets/#azure-federated-creds", note: "OIDC / federated credentials" },
  { id: "az-3", category: "Azure DevOps", title: "Azure DevOps Server / Pipelines", href: "/tools/azure-devops/" },
  { id: "az-4", category: "Azure DevOps", title: "Setup CI/CD (AKS + ACR)", href: "/snippets/#aks-kubeconfig" },
  // Docker
  { id: "doc-1", category: "Docker", title: "Docker Installation", href: "/tools/docker/" },
  { id: "doc-2", category: "Docker", title: "Docker Compose Setup", href: "/deployments/flask-postgres-compose/" },
  { id: "doc-3", category: "Docker", title: "CI/CD Integration with Docker", href: "/deployments/github-actions-ci/" },
  // GitHub Actions
  { id: "gha-1", category: "GitHub Actions", title: "GitHub Actions (workflows)", href: "/tools/github-actions/" },
  { id: "gha-2", category: "GitHub Actions", title: "GitHub Actions Security", href: "/snippets/#gha-oidc-aws" },
  { id: "gha-3", category: "GitHub Actions", title: "GitHub Actions Templates", href: "/deployments/github-actions-ci/" },
  { id: "gha-4", category: "GitHub Actions", title: "Self-Hosted Runners", href: "/tools/github-actions/#configure" },
  { id: "gha-5", category: "GitHub Actions", title: "Terraform AWS / Azure", href: "/cheatsheets/terraform/" },
  // Jenkins
  { id: "jen-1", category: "Jenkins", title: "Jenkins — IaC tools", href: "/tools/jenkins/" },
  { id: "jen-2", category: "Jenkins", title: "Jenkins — QA tools", href: "/tools/sonarqube/" },
  { id: "jen-3", category: "Jenkins", title: "Jenkins — Build tools", href: "/deployments/jenkins-eks-python/" },
  { id: "jen-4", category: "Jenkins", title: "Jenkins — Containerization", href: "/flows/app-to-eks-jenkins/" },
  { id: "jen-5", category: "Jenkins", title: "Jenkins — Deployment tools", href: "/deployments/jenkins-eks-python/#prod-delta" },
  { id: "jen-6", category: "Jenkins", title: "Jenkins — Notification tools", href: "/tools/jenkins/#manage" },
  { id: "jen-7", category: "Jenkins", title: "Jenkins — Testing tools", href: "/tools/selenium/" },
  { id: "jen-8", category: "Jenkins", title: "Jenkins Master & Agent", href: "/tools/jenkins/#configure" },
  { id: "jen-9", category: "Jenkins", title: "Jenkins Pipeline Templates", href: "/flows/app-to-eks-jenkins/" },
  // Kubernetes
  { id: "k8s-1", category: "Kubernetes", title: "Grafana + Prometheus Install", href: "/deployments/prometheus-grafana-compose/" },
  { id: "k8s-2", category: "Kubernetes", title: "Kubernetes Install", href: "/tools/kubernetes/" },
  { id: "k8s-3", category: "Kubernetes", title: "Managed K8s (EKS / AKS / GKE)", href: "/flows/terraform-eks-from-repo/" },
  { id: "k8s-4", category: "Kubernetes", title: "Local cluster (kind)", href: "/tools/kind/", note: "Team golden path for local K8s" },
  { id: "k8s-5", category: "Kubernetes", title: "K8s Monitoring Stack", href: "/observe/" },
  { id: "k8s-6", category: "Kubernetes", title: "Cluster health report script", href: "/scripts/#cluster-health-report" },
  { id: "k8s-7", category: "Kubernetes", title: "Pre-deploy checklist", href: "/scripts/#pre-deploy-check" },
  { id: "k8s-8", category: "Kubernetes", title: "Helm install & deploy", href: "/tools/helm/" },
  // Terraform
  { id: "tf-1", category: "Terraform", title: "Implement CI/CD Pipeline", href: "/flows/terraform-eks-from-repo/" },
  { id: "tf-2", category: "Terraform", title: "Install Terraform", href: "/tools/terraform/" },
  { id: "tf-3", category: "Terraform", title: "Setup Monitoring & Logging", href: "/tools/prometheus/" },
  { id: "tf-4", category: "Terraform", title: "Setup Providers", href: "/cheatsheets/terraform/" },
  { id: "tf-5", category: "Terraform", title: "Setup Remote Backend", href: "/deployments/terraform-aws-ec2/#prod-delta" },
  { id: "tf-6", category: "Terraform", title: "Setup Terraform CLI", href: "/tools/terraform/#install" },
  { id: "tf-7", category: "Terraform", title: "Setup Version Control", href: "/standards/" },
  { id: "tf-8", category: "Terraform", title: "Terraform Best Practices", href: "/cheatsheets/terraform/" },
  { id: "tf-9", category: "Terraform", title: "Terraform Cloud / remote ops", href: "/tools/terraform/#manage" },
  { id: "tf-10", category: "Terraform", title: "Terraform State Migration", href: "/snippets/#tf-state-version-restore" },
  { id: "tf-11", category: "Terraform", title: "Terraform Workspaces", href: "/snippets/#tf-workspace-list" },
  // GitOps
  { id: "gitops-1", category: "GitOps", title: "Argo CD install & sync", href: "/flows/argocd-gitops-bootstrap/" },
  { id: "gitops-2", category: "GitOps", title: "Argo CD vs Flux", href: "/compare/argocd-vs-flux/" },
  { id: "gitops-3", category: "GitOps", title: "Flux reconcile debug", href: "/snippets/#flux-reconcile" },
  { id: "gitops-4", category: "GitOps", title: "Argo CD Application template", href: "/deployments/k8s-argocd-app/" },
  // Monitoring
  { id: "mon-1", category: "Monitoring", title: "Prometheus & PromQL", href: "/cheatsheets/prometheus/" },
  { id: "mon-2", category: "Monitoring", title: "Prometheus vs CloudWatch", href: "/compare/prometheus-vs-cloudwatch/" },
  { id: "mon-3", category: "Monitoring", title: "Observability triage hub", href: "/observe/" },
  { id: "mon-4", category: "Monitoring", title: "PromQL error rate snippet", href: "/snippets/#promql-error-rate" },
  { id: "mon-5", category: "Monitoring", title: "LogQL errors snippet", href: "/snippets/#logql-errors" },
  { id: "mon-6", category: "Monitoring", title: "Grafana dashboards", href: "/tools/grafana/" },
  // Security & secrets
  { id: "sec-1", category: "Security", title: "Vault → K8s flow", href: "/flows/vault-secrets-to-k8s/" },
  { id: "sec-2", category: "Security", title: "Secrets rotation hub", href: "/rotate/" },
  { id: "sec-3", category: "Security", title: "External Secrets Operator", href: "/deployments/k8s-external-secret/" },
  { id: "sec-4", category: "Security", title: "Trivy image scan", href: "/snippets/#trivy-scan-image" },
  { id: "sec-5", category: "Security", title: "Cert lifecycle tree", href: "/certs/" },
  // FinOps
  { id: "fin-1", category: "FinOps", title: "Unattached EBS volumes", href: "/snippets/#unused-ebs" },
  { id: "fin-2", category: "FinOps", title: "Idle load balancers", href: "/snippets/#idle-elb" },
  { id: "fin-3", category: "FinOps", title: "K8s over-provisioned pods", href: "/snippets/#k8s-over-provisioned" },
  // Cloud K8s
  { id: "cloud-1", category: "Cloud K8s", title: "EKS vs AKS vs GKE", href: "/compare/eks-vs-aks-vs-gke/" },
  { id: "cloud-2", category: "Cloud K8s", title: "GKE kubeconfig", href: "/snippets/#gke-kubeconfig" },
  { id: "cloud-3", category: "Cloud K8s", title: "AKS + ACR push", href: "/snippets/#acr-login" },
  // Runbooks (curated)
  { id: "rb-1", category: "Runbooks", title: "OOMKilled pod", href: "/runbooks/oomkilled-pod/" },
  { id: "rb-2", category: "Runbooks", title: "Argo CD sync failed", href: "/runbooks/argocd-sync-failed/" },
  { id: "rb-3", category: "Runbooks", title: "DNS not resolving", href: "/runbooks/dns-not-resolving/" },
  { id: "rb-4", category: "Runbooks", title: "Redis connection refused", href: "/runbooks/redis-connection-refused/" },
  { id: "rb-5", category: "Runbooks", title: "502 Bad Gateway", href: "/runbooks/nginx-502-k8s-ingress/" },
  { id: "rb-6", category: "Runbooks", title: "Backup & restore drill", href: "/runbooks/database-restore-drill/" },
  // Networking
  { id: "net-1", category: "Networking", title: "Nginx vs Traefik", href: "/compare/nginx-vs-traefik/" },
  { id: "net-2", category: "Networking", title: "Network debug hub", href: "/network/" },
  { id: "net-3", category: "Networking", title: "Ingress TLS debug", href: "/runbooks/ingress-cert-expired/" },
  // Server foundations (OS & infrastructure)
  { id: "srv-1", category: "Server foundations", title: "SSH server hardening", href: "/tools/ssh/" },
  { id: "srv-2", category: "Server foundations", title: "NTP time sync", href: "/cheatsheets/linux-ops/", note: "timedatectl / chrony" },
  { id: "srv-3", category: "Server foundations", title: "DNS server (BIND)", href: "/tools/dns/" },
  { id: "srv-4", category: "Server foundations", title: "DHCP server", href: "/tools/dhcp/" },
  { id: "srv-5", category: "Server foundations", title: "NFS file server", href: "/tools/nfs/" },
  { id: "srv-6", category: "Server foundations", title: "Postfix mail relay", href: "/tools/postfix/" },
  { id: "srv-7", category: "Server foundations", title: "Samba file share", href: "/tools/samba/" },
  { id: "srv-8", category: "Server foundations", title: "KVM virtualization", href: "/tools/kvm/" },
  { id: "srv-9", category: "Server foundations", title: "HAProxy load balancer", href: "/tools/haproxy/" },
  { id: "srv-10", category: "Server foundations", title: "FTP / SFTP transfers", href: "/tools/ftp/" },
  { id: "srv-11", category: "Server foundations", title: "Firewall & SELinux basics", href: "/cheatsheets/linux-ops/" },
  { id: "srv-12", category: "Server foundations", title: "systemd services & timers", href: "/cheatsheets/systemd/" },
  // Classic DevOps stack
  { id: "cls-1", category: "Classic DevOps", title: "Ansible automation", href: "/tools/ansible/" },
  { id: "cls-2", category: "Classic DevOps", title: "Terraform IaC", href: "/tools/terraform/" },
  { id: "cls-3", category: "Classic DevOps", title: "Prometheus monitoring", href: "/tools/prometheus/" },
  { id: "cls-4", category: "Classic DevOps", title: "Grafana dashboards", href: "/tools/grafana/" },
  { id: "cls-5", category: "Classic DevOps", title: "ELK / Logstash pipeline", href: "/tools/elk-stack/" },
  { id: "cls-6", category: "Classic DevOps", title: "Vagrant dev VMs", href: "/tools/vagrant/" },
  { id: "cls-7", category: "Classic DevOps", title: "Maven Java builds", href: "/tools/maven/" },
  { id: "cls-8", category: "Classic DevOps", title: "Gradle builds", href: "/tools/gradle/" },
  { id: "cls-9", category: "Classic DevOps", title: "Consul service discovery", href: "/tools/consul/" },
  { id: "cls-10", category: "Classic DevOps", title: "Application error monitoring", href: "/observe/", note: "Alert → logs → runbook triage" },
  { id: "cls-11", category: "Classic DevOps", title: "Configuration mgmt (Chef/Puppet/Salt)", href: "/tools/ansible/", note: "Same problem space — Ansible guide on-site" },
  // Hands-on projects
  { id: "prj-1", category: "Projects", title: "All hands-on projects", href: "/resources/#projects" },
  { id: "prj-2", category: "Projects", title: "Server performance stats script", href: "/scripts/#server-performance-stats" },
  { id: "prj-3", category: "Projects", title: "Blue-green deployment flow", href: "/flows/blue-green-kubernetes/" },
  { id: "prj-4", category: "Projects", title: "Bastion jump host", href: "/flows/bastion-jump-host/" },
  { id: "prj-5", category: "Projects", title: "Prometheus + Grafana stack", href: "/flows/prometheus-grafana-stack/" },
];

export interface StackPillar {
  id: string;
  title: string;
  icon: string;
  tools: { name: string; href: string }[];
}

export const stackPillars: StackPillar[] = [
  {
    id: "containers",
    title: "Containers",
    icon: "📦",
    tools: [
      { name: "Docker", href: "/tools/docker/" },
      { name: "Kubernetes", href: "/tools/kubernetes/" },
      { name: "Helm", href: "/tools/helm/" },
      { name: "Podman", href: "/tools/podman/" },
      { name: "Docker vs Podman", href: "/compare/docker-vs-podman/" },
    ],
  },
  {
    id: "aiops",
    title: "AIOps / Monitoring",
    icon: "📈",
    tools: [
      { name: "Prometheus", href: "/tools/prometheus/" },
      { name: "Grafana", href: "/tools/grafana/" },
      { name: "Splunk", href: "/tools/splunk/" },
      { name: "Observability triage", href: "/observe/" },
      { name: "Prometheus + Grafana compose", href: "/deployments/prometheus-grafana-compose/" },
    ],
  },
  {
    id: "analytics",
    title: "Analytics / Logs",
    icon: "🔍",
    tools: [
      { name: "Elasticsearch", href: "/tools/elasticsearch/" },
      { name: "Loki", href: "/tools/loki/" },
      { name: "ELK Stack", href: "/tools/elk-stack/" },
      { name: "LogQL snippet", href: "/snippets/#logql-errors" },
      { name: "Linux ops cheat sheet", href: "/cheatsheets/linux-ops/" },
    ],
  },
  {
    id: "security",
    title: "Security",
    icon: "🛡️",
    tools: [
      { name: "SonarQube", href: "/tools/sonarqube/" },
      { name: "Trivy", href: "/tools/trivy/" },
      { name: "Vault", href: "/tools/vault/" },
      { name: "Secrets rotation", href: "/rotate/" },
      { name: "Go-live scan gate", href: "/go-live/" },
    ],
  },
  {
    id: "server",
    title: "Server foundations",
    icon: "🖥️",
    tools: [
      { name: "SSH", href: "/tools/ssh/" },
      { name: "DNS / BIND", href: "/tools/dns/" },
      { name: "DHCP", href: "/tools/dhcp/" },
      { name: "NFS", href: "/tools/nfs/" },
      { name: "KVM", href: "/tools/kvm/" },
      { name: "Linux ops cheat sheet", href: "/cheatsheets/linux-ops/" },
    ],
  },
];

export const curriculumCategories = [
  "All",
  ...Array.from(new Set(curriculumItems.map((i) => i.category))),
];

export function getCurriculumByCategory(category: string): CurriculumItem[] {
  if (category === "All") return curriculumItems;
  return curriculumItems.filter((i) => i.category === category);
}
