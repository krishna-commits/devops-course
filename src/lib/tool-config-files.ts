/** Where each tool keeps its main config — shown on every tool guide page */

export interface ToolConfigFile {
  /** File name or glob, e.g. bitbucket-pipelines.yml */
  path: string;
  /** Where to put it on disk or in the repo */
  location: string;
  /** What this file controls */
  purpose: string;
}

export const toolConfigFiles: Record<string, ToolConfigFile[]> = {
  // ── CI / CD ─────────────────────────────────────────────────
  "github-actions": [
    { path: ".github/workflows/*.yml", location: "Repository root → .github/workflows/", purpose: "Workflow definitions — build, test, deploy on push/PR" },
  ],
  "gitlab-ci": [
    { path: ".gitlab-ci.yml", location: "Repository root (same level as README)", purpose: "Pipeline stages, jobs, and CI/CD rules" },
  ],
  "bitbucket-pipelines": [
    { path: "bitbucket-pipelines.yml", location: "Repository root (same level as README)", purpose: "Pipeline image, steps, and branches for Bitbucket CI/CD" },
  ],
  "jenkins": [
    { path: "Jenkinsfile", location: "Repository root (Pipeline as Code) or job config in UI", purpose: "Declarative or scripted pipeline stages" },
    { path: "/var/lib/jenkins/config.xml", location: "Linux server — Jenkins home", purpose: "Global Jenkins settings (managed by UI)" },
  ],
  circleci: [
    { path: ".circleci/config.yml", location: "Repository → .circleci/config.yml", purpose: "Jobs, orbs, and workflows for CircleCI" },
  ],
  "travis-ci": [
    { path: ".travis.yml", location: "Repository root", purpose: "Language, script, and deploy settings for Travis CI" },
  ],
  "azure-devops": [
    { path: "azure-pipelines.yml", location: "Repository root (or path set in Azure DevOps UI)", purpose: "Triggers, pool, and build/deploy steps" },
  ],
  "drone-ci": [
    { path: ".drone.yml", location: "Repository root", purpose: "Pipeline kind, steps, and Docker images for Drone" },
  ],
  buildkite: [
    { path: ".buildkite/pipeline.yml", location: "Repository → .buildkite/ (or pipeline path in UI)", purpose: "Agent steps and command blocks" },
  ],
  tekton: [
    { path: "pipeline.yaml", location: "Git repo or cluster namespace", purpose: "Tekton Pipeline and Task definitions" },
    { path: "tasks.yaml", location: "Same repo or namespace", purpose: "Reusable Tekton Tasks" },
  ],
  argocd: [
    { path: "application.yaml", location: "Git repo watched by Argo CD", purpose: "App source, destination cluster, sync policy" },
  ],
  flux: [
    { path: "clusters/<env>/", location: "Git repo — Flux bootstrap path", purpose: "Kustomization and HelmRelease manifests" },
  ],

  // ── Containers & orchestration ──────────────────────────────
  docker: [
    { path: "Dockerfile", location: "Project root (or build context directory)", purpose: "Image build instructions — FROM, COPY, RUN, CMD" },
    { path: "/etc/docker/daemon.json", location: "Docker host (Linux)", purpose: "Registry mirrors, storage driver, log options" },
  ],
  "docker-compose": [
    { path: "docker-compose.yml", location: "Project root (or -f path)", purpose: "Services, networks, volumes, and env for multi-container apps" },
    { path: ".env", location: "Same directory as compose file", purpose: "Variable substitution for compose (optional)" },
  ],
  kubernetes: [
    { path: "deployment.yaml", location: "Git repo or kubectl apply path", purpose: "Deployments, Services, Ingress, ConfigMaps" },
    { path: "~/.kube/config", location: "User home — kubeconfig", purpose: "Cluster API URL, credentials, and context" },
  ],
  kubectl: [
    { path: "~/.kube/config", location: "User home (or $KUBECONFIG)", purpose: "Cluster connection and namespace context" },
  ],
  helm: [
    { path: "Chart.yaml", location: "Helm chart directory", purpose: "Chart metadata and version" },
    { path: "values.yaml", location: "Chart directory or -f override", purpose: "Default configuration values for the release" },
  ],
  kustomize: [
    { path: "kustomization.yaml", location: "Base or overlay directory", purpose: "Resources, patches, and image tags" },
    { path: "overlays/prod/", location: "Repo — environment-specific overlay", purpose: "Production patches without templating" },
  ],
  minikube: [
    { path: "~/.kube/config", location: "Updated by minikube start", purpose: "Points kubectl at local Minikube cluster" },
  ],
  k3s: [
    { path: "/etc/rancher/k3s/k3s.yaml", location: "K3s server node", purpose: "Cluster kubeconfig — copy to ~/.kube/config" },
  ],
  kind: [
    { path: "kind-config.yaml", location: "Optional — passed to kind create cluster", purpose: "Multi-node cluster and port mappings" },
  ],

  // ── IaC & automation ────────────────────────────────────────
  terraform: [
    { path: "main.tf", location: "Terraform module directory", purpose: "Providers, resources, and module calls" },
    { path: "variables.tf", location: "Same module", purpose: "Input variables and defaults" },
    { path: "terraform.tfvars", location: "Same module (often gitignored)", purpose: "Environment-specific variable values" },
  ],
  terragrunt: [
    { path: "terragrunt.hcl", location: "Each environment/module folder", purpose: "Remote state, inputs, and Terraform wrapper" },
  ],
  ansible: [
    { path: "inventory.ini", location: "Project root or inventories/", purpose: "Host groups and connection vars" },
    { path: "playbook.yml", location: "Project root or playbooks/", purpose: "Tasks to run on target hosts" },
    { path: "ansible.cfg", location: "Project root or /etc/ansible/", purpose: "Defaults — inventory path, roles, SSH" },
  ],
  packer: [
    { path: "*.pkr.hcl", location: "Project directory", purpose: "Image builders, sources, and provisioners" },
  ],
  pulumi: [
    { path: "Pulumi.yaml", location: "Project root", purpose: "Project name and runtime (nodejs, python, go)" },
    { path: "Pulumi.<stack>.yaml", location: "Project root", purpose: "Stack-specific config and secrets" },
  ],
  "aws-cloudformation": [
    { path: "template.yaml", location: "Local file or S3 — stack template", purpose: "AWS resources as CloudFormation template" },
  ],

  // ── Web & proxy ─────────────────────────────────────────────
  nginx: [
    { path: "/etc/nginx/nginx.conf", location: "Linux — main config", purpose: "Global nginx settings and includes" },
    { path: "/etc/nginx/sites-available/*", location: "Debian/Ubuntu vhosts", purpose: "Virtual hosts and reverse proxy rules" },
  ],
  apache: [
    { path: "/etc/apache2/sites-available/*.conf", location: "Linux — Debian/Ubuntu", purpose: "VirtualHost and module config" },
    { path: "/etc/httpd/conf.d/*.conf", location: "RHEL/CentOS", purpose: "Site and module snippets" },
  ],
  haproxy: [
    { path: "/etc/haproxy/haproxy.cfg", location: "HAProxy server", purpose: "Frontends, backends, ACLs, and SSL" },
  ],
  traefik: [
    { path: "traefik.yml", location: "Static config file or Docker mount", purpose: "Entry points, providers, and certificates" },
    { path: "docker-compose labels", location: "Compose service labels", purpose: "Dynamic routing rules (Docker provider)" },
  ],
  certbot: [
    { path: "/etc/letsencrypt/", location: "Certificate store on server", purpose: "Issued certs and renewal configs" },
  ],

  // ── Databases & cache ───────────────────────────────────────
  mysql: [
    { path: "/etc/mysql/my.cnf", location: "MySQL server", purpose: "Server options, bind address, datadir" },
  ],
  postgresql: [
    { path: "/etc/postgresql/*/main/postgresql.conf", location: "PostgreSQL server", purpose: "Memory, connections, logging" },
    { path: "/etc/postgresql/*/main/pg_hba.conf", location: "PostgreSQL server", purpose: "Client authentication rules" },
  ],
  redis: [
    { path: "/etc/redis/redis.conf", location: "Redis server", purpose: "Bind, persistence, memory, auth" },
  ],
  mongodb: [
    { path: "/etc/mongod.conf", location: "MongoDB server", purpose: "Storage, replication, security" },
  ],

  // ── Monitoring & logging ──────────────────────────────────────
  prometheus: [
    { path: "prometheus.yml", location: "Server or container mount /etc/prometheus/", purpose: "Scrape targets, rules, and alerting" },
  ],
  grafana: [
    { path: "/etc/grafana/grafana.ini", location: "Grafana server", purpose: "Server URL, auth, and data sources path" },
  ],
  "prometheus-grafana": [
    { path: "prometheus.yml", location: "Prometheus config directory", purpose: "Metrics scrape configuration" },
    { path: "grafana provisioning/", location: "Grafana /etc/grafana/provisioning/", purpose: "Datasources and dashboards as code" },
  ],
  elasticsearch: [
    { path: "/etc/elasticsearch/elasticsearch.yml", location: "Elasticsearch node", purpose: "Cluster name, nodes, and paths" },
  ],
  loki: [
    { path: "loki-config.yaml", location: "Loki server or container", purpose: "Storage, retention, and scrape config" },
  ],
  datadog: [
    { path: "/etc/datadog-agent/datadog.yaml", location: "Datadog agent host", purpose: "API key, site, and integrations" },
  ],

  // ── Security & secrets ──────────────────────────────────────
  vault: [
    { path: "vault.hcl", location: "Vault server config path", purpose: "Storage backend, listener, and seal config" },
  ],
  fail2ban: [
    { path: "/etc/fail2ban/jail.local", location: "Fail2ban server", purpose: "Jail rules and ban settings (override jail.conf)" },
  ],
  wireguard: [
    { path: "/etc/wireguard/wg0.conf", location: "VPN server or client", purpose: "Interface, keys, peers, and AllowedIPs" },
  ],
  kyverno: [
    { path: "policy.yaml", location: "Kubernetes cluster — kubectl apply", purpose: "Admission policies — validate, mutate, generate" },
  ],
  "external-secrets-operator": [
    { path: "secret-store.yaml", location: "Kubernetes namespace", purpose: "Connects cluster to AWS/Vault/GCP secret backends" },
  ],

  // ── Network & infra ─────────────────────────────────────────
  dns: [
    { path: "/etc/bind/named.conf", location: "BIND DNS server", purpose: "Zones and options" },
    { path: "/var/named/*.zone", location: "BIND zone files", purpose: "DNS records for domains" },
  ],
  dhcp: [
    { path: "/etc/dhcp/dhcpd.conf", location: "ISC DHCP server", purpose: "Subnets, ranges, and options" },
  ],
  nfs: [
    { path: "/etc/exports", location: "NFS server", purpose: "Exported paths and client permissions" },
  ],
  samba: [
    { path: "/etc/samba/smb.conf", location: "Samba server", purpose: "Shares, users, and workgroup" },
  ],
  squid: [
    { path: "/etc/squid/squid.conf", location: "Squid proxy server", purpose: "ACLs, cache, and forward rules" },
  ],
  keepalived: [
    { path: "/etc/keepalived/keepalived.conf", location: "Keepalived node", purpose: "VRRP virtual IP and health checks" },
  ],
  consul: [
    { path: "consul.hcl", location: "/etc/consul.d/ or agent -config-dir", purpose: "Service discovery, connect, and ACL" },
  ],

  // ── Git & dev workflow ──────────────────────────────────────
  git: [
    { path: "~/.gitconfig", location: "User home", purpose: "Global user.name, user.email, aliases" },
    { path: ".git/config", location: "Inside each repository", purpose: "Repo remotes and branch settings" },
  ],
  "pre-commit": [
    { path: ".pre-commit-config.yaml", location: "Repository root", purpose: "Hooks — linters, formatters before commit" },
  ],
  direnv: [
    { path: ".envrc", location: "Project directory (auto-loaded on cd)", purpose: "Per-project environment variables" },
  ],
  vagrant: [
    { path: "Vagrantfile", location: "Project root", purpose: "VM box, networking, and provisioning" },
  ],

  // ── Cloud CLI credentials ───────────────────────────────────
  "aws-cli": [
    { path: "~/.aws/credentials", location: "User home", purpose: "Access key and secret for AWS API" },
    { path: "~/.aws/config", location: "User home", purpose: "Default region and output format" },
  ],
  "azure-cli": [
    { path: "~/.azure/", location: "User home", purpose: "Login session and subscription config" },
  ],
  gcloud: [
    { path: "~/.config/gcloud/", location: "User home", purpose: "GCP credentials and active project" },
  ],

  // ── Mail ──────────────────────────────────────────────────────
  postfix: [
    { path: "/etc/postfix/main.cf", location: "Postfix server", purpose: "Hostname, relay, and mailbox settings" },
  ],
};

export function getToolConfigFiles(slug: string): ToolConfigFile[] {
  return toolConfigFiles[slug] ?? [];
}
