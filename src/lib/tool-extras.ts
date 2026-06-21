import type { GuideSection } from "./types";
import {
  extendedWhatIsThis,
  extendedRelatedDeployments,
  extendedTroubleshoot,
} from "./extended-tool-extras";

/** Plain-English one-liner: "What is this?" */
export const whatIsThis: Record<string, string> = {
  ssh: "SSH lets you control a remote computer securely, as if you're sitting in front of it.",
  dns: "DNS translates website names (like google.com) into IP addresses computers understand.",
  dhcp: "DHCP automatically assigns IP addresses to devices on your network so they can connect.",
  haproxy: "HAProxy spreads incoming web traffic across multiple servers so no single server gets overloaded.",
  ftp: "FTP lets you upload and download files between your computer and a server.",
  docker: "Docker packages an app and everything it needs into a container that runs the same everywhere.",
  "docker-compose": "Docker Compose runs multiple containers (app + database + cache) with one simple command.",
  kubectl: "kubectl is the remote control for Kubernetes — it tells your cluster what to run.",
  kubernetes: "Kubernetes manages containers across many servers, restarting them if they crash and scaling when busy.",
  minikube: "Minikube runs a small Kubernetes cluster on your laptop for learning and testing.",
  helm: "Helm installs pre-built application packages on Kubernetes, like an app store for clusters.",
  kvm: "KVM lets you run full virtual machines (like a computer inside your computer) on Linux.",
  "cloud-compute": "OpenStack lets you build your own private cloud to create virtual servers on demand.",
  nfs: "NFS shares a folder on one server so other computers on the network can use it like a shared drive.",
  prometheus: "Prometheus collects numbers about your servers — CPU, memory, disk — and stores them over time.",
  grafana: "Grafana turns server metrics into charts and dashboards so you can see what's happening at a glance.",
  "prometheus-grafana": "Together, Prometheus collects the data and Grafana shows it in easy-to-read dashboards.",
  nagios: "Nagios watches your servers and sends you an alert when something stops working.",
  zabbix: "Zabbix monitors servers, networks, and applications and alerts you before users notice problems.",
  sonarqube: "SonarQube scans your code for bugs, security holes, and quality issues before you deploy.",
  trivy: "Trivy scans containers and code for known security vulnerabilities.",
  jenkins: "Jenkins automatically builds, tests, and deploys your code whenever you push changes.",
  "github-actions": "GitHub Actions runs automated tests and deployments when you push code to GitHub.",
  terraform: "Terraform creates cloud servers and networks from config files instead of clicking in a web console.",
  ansible: "Ansible configures many servers at once — install software, copy files, restart services.",
  "aws-cli": "The AWS CLI lets you manage Amazon cloud services (servers, storage, databases) from your terminal.",
  "azure-cli": "The Azure CLI manages Microsoft Azure cloud resources from the command line.",
  eksctl: "eksctl creates and manages Kubernetes clusters on Amazon AWS with simple commands.",
  ldap: "LDAP stores user accounts and passwords in one central directory used for logins across systems.",
  selinux: "SELinux adds an extra security layer on Linux that controls which programs can access which files.",
  git: "Git tracks every change to your code so you can undo mistakes and collaborate with others.",
  python: "Python is a beginner-friendly language widely used for automation, scripting, and DevOps tools.",
  go: "Go is a fast programming language used to build cloud tools like Docker, Kubernetes, and Terraform.",
  maven: "Maven builds Java projects — compiles code, downloads libraries, and packages apps for deployment.",
  mysql: "MySQL stores structured data (users, orders, posts) that websites and apps read and write.",
  nginx: "Nginx serves websites to visitors and can also balance traffic across multiple backend servers.",
  postgresql: "PostgreSQL is a powerful open-source database used by apps that need reliable, complex data storage.",
  redis: "Redis stores data in memory for extremely fast reads — ideal for caching and session storage.",
  certbot: "Certbot gets free HTTPS certificates from Let's Encrypt so your website shows the padlock icon.",
  wireguard: "WireGuard creates an encrypted VPN tunnel so you can securely access private networks remotely.",
  podman: "Podman runs containers like Docker but without a background daemon — often used as a Docker alternative.",
  "gitlab-ci": "GitLab CI runs automated build and deploy pipelines when you push code to GitLab.",
  argocd: "Argo CD watches your Git repo and automatically deploys changes to Kubernetes — no manual kubectl needed.",
  flux: "Flux CD keeps your Kubernetes cluster in sync with config files stored in Git.",
  tekton: "Tekton runs build-and-deploy pipelines as Kubernetes resources.",
  k3s: "K3s is a tiny, production-ready Kubernetes distribution that installs in one command.",
  microk8s: "MicroK8s gives you a full Kubernetes cluster with a single snap install.",
  kind: "Kind runs a real Kubernetes cluster inside Docker containers on your laptop.",
  buildah: "Buildah builds container images without needing the Docker daemon running.",
  harbor: "Harbor is a private registry where your team stores and scans Docker images.",
  portainer: "Portainer gives you a friendly web UI to manage Docker containers and stacks.",
  rancher: "Rancher lets you manage multiple Kubernetes clusters from one dashboard.",
  istio: "Istio adds secure networking, traffic control, and monitoring between microservices.",
  packer: "Packer automates building identical VM or cloud images from a template.",
  pulumi: "Pulumi lets you create cloud infrastructure using TypeScript, Python, or Go.",
  nomad: "Nomad schedules and runs containers, binaries, and batch jobs across a cluster.",
  vault: "Vault securely stores passwords, API keys, and certificates in one place.",
  falco: "Falco detects suspicious activity in running containers and Linux hosts.",
  fail2ban: "Fail2ban automatically blocks IP addresses that try to brute-force your server.",
  traefik: "Traefik routes web traffic to your apps and can obtain HTTPS certificates automatically.",
  apache: "Apache httpd is a widely used web server for hosting websites and applications.",
  consul: "Consul helps services find each other and checks whether they are healthy.",
  squid: "Squid caches web content and can act as a forward or reverse proxy.",
  keepalived: "Keepalived provides a floating IP that moves to a backup server if the primary fails.",
  mongodb: "MongoDB stores flexible JSON-like documents — great for apps with changing data shapes.",
  mariadb: "MariaDB is a drop-in replacement for MySQL with the same SQL commands.",
  rabbitmq: "RabbitMQ passes messages between services so they can work asynchronously.",
  kafka: "Kafka streams events between systems at high throughput — used for logs, metrics, and data pipelines.",
  memcached: "Memcached stores frequently used data in RAM for near-instant retrieval.",
  elasticsearch: "Elasticsearch indexes and searches large volumes of logs and text fast.",
  loki: "Loki collects logs from your apps and works alongside Grafana for searching them.",
  jaeger: "Jaeger shows how a request flows through every microservice in your system.",
  opentelemetry: "OpenTelemetry is the standard way to collect traces, metrics, and logs from apps.",
  netdata: "Netdata shows live CPU, memory, disk, and network charts for every server.",
  samba: "Samba shares Linux folders so Windows and Mac computers can access them like network drives.",
  postfix: "Postfix receives and sends email for your domain — the engine behind most Linux mail servers.",
  gcloud: "The Google Cloud CLI lets you create VMs, buckets, and Kubernetes clusters on GCP from your terminal.",
  "github-cli": "GitHub CLI (gh) lets you create repos, open PRs, and trigger Actions without opening the browser.",
  doctl: "doctl manages DigitalOcean droplets, Kubernetes clusters, and DNS from the command line.",
  terragrunt: "Terragrunt wraps Terraform so you can reuse modules across dev, staging, and production.",
  kustomize: "Kustomize patches Kubernetes YAML with overlays — no templating language required.",
  vagrant: "Vagrant spins up reproducible VMs for development using a simple Vagrantfile.",
  direnv: "direnv loads environment variables automatically when you enter a project directory.",
  circleci: "CircleCI runs your tests and builds in parallel every time you push code.",
  "drone-ci": "Drone CI runs each pipeline step inside a Docker container on your own server.",
  buildkite: "Buildkite runs builds on agents you host, orchestrated from a cloud dashboard.",
  teamcity: "TeamCity is JetBrains' CI server with build chains, tests, and deployment pipelines.",
  "travis-ci": "Travis CI was one of the first GitHub-integrated CI services — config lives in .travis.yml.",
  "azure-devops": "Azure DevOps Pipelines builds and deploys code on Microsoft-hosted or self-hosted agents.",
  "bitbucket-pipelines": "Bitbucket Pipelines runs CI/CD defined in bitbucket-pipelines.yml inside your repo.",
  datadog: "The Datadog agent collects metrics, logs, and traces from your servers and sends them to Datadog.",
  cloudflare: "Wrangler is Cloudflare's CLI for deploying Workers, managing DNS, and configuring CDN rules.",
  tmux: "tmux lets you split your terminal and keep sessions running after you disconnect from SSH.",
  nodejs: "Node.js runs JavaScript on the server — the foundation of npm, Express, and most frontend tooling.",
  ruby: "Ruby powers Rails web apps and many DevOps tools; gems install libraries with one command.",
  gradle: "Gradle builds Java, Kotlin, and Android projects and manages dependencies like Maven.",
  jq: "jq filters and transforms JSON — essential for parsing API responses in shell scripts.",
  "pre-commit": "pre-commit installs Git hooks that run linters and formatters before each commit.",
  zookeeper: "ZooKeeper coordinates distributed systems — Kafka and Hadoop depend on it for cluster state.",
  php: "PHP runs WordPress, Laravel, and millions of websites — usually paired with Nginx or Apache.",
  openvpn: "OpenVPN creates encrypted tunnels so remote users can access your private network securely.",
  velero: "Velero backs up Kubernetes resources and volumes to S3 (or other storage) for disaster recovery.",
  ...extendedWhatIsThis,
};

export const relatedDeployments: Record<string, string[]> = {
  docker: ["flask-postgres-compose", "docker-network-compose", "microservices-compose", "dockerfile-templates", "node-redis-mongo-compose", "fastapi-postgres-compose"],
  "docker-compose": ["flask-postgres-compose", "microservices-compose", "docker-network-compose", "nginx-php-compose", "prometheus-grafana-compose"],
  argocd: ["k8s-deployment-service", "k8s-microservices-node", "k8s-argocd-app"],
  flux: ["k8s-deployment-service", "k8s-argocd-app"],
  kubernetes: ["k8s-deployment-service", "k8s-configmap-secrets", "k8s-hpa", "k8s-pvc", "k8s-clusterip", "k8s-microservices-spring", "k8s-microservices-node", "k8s-go-mongo", "k8s-laravel-monitoring", "k8s-redis", "k8s-postgresql", "k8s-loadbalancer", "k8s-cronjob", "k8s-network-policy", "k8s-statefulset", "k8s-argocd-app", "k8s-external-secret"],
  istio: ["k8s-ingress", "k8s-network-policy"],
  harbor: ["dockerfile-templates"],
  tekton: ["github-actions-ci"],
  "github-actions": ["github-actions-ci"],
  "bitbucket-pipelines": ["github-actions-ci", "k8s-deployment-service", "k8s-microservices-node"],
  "gitlab-ci": ["gitlab-ci-yml"],
  kubectl: ["k8s-deployment-service", "k8s-configmap-secrets"],
  minikube: ["k8s-deployment-service", "k8s-go-mongo"],
  helm: ["k8s-deployment-service"],
  jenkins: ["github-actions-ci", "jenkins-eks-python", "jenkins-php-laravel"],
  nginx: ["k8s-ingress", "nginx-php-compose"],
  mysql: ["flask-postgres-compose", "k8s-laravel-monitoring"],
  redis: ["flask-postgres-compose", "k8s-redis", "node-redis-mongo-compose"],
  certbot: ["k8s-ingress"],
  podman: ["flask-postgres-compose", "dockerfile-templates"],
  postgresql: ["flask-postgres-compose", "postgres-pgadmin-compose", "k8s-postgresql", "fastapi-postgres-compose"],
  python: ["flask-postgres-compose", "dockerfile-templates", "jenkins-eks-python", "fastapi-postgres-compose"],
  go: ["go-mongo-compose", "k8s-go-mongo"],
  php: ["jenkins-php-laravel", "k8s-laravel-monitoring", "nginx-php-compose"],
  terraform: ["terraform-aws-ec2", "terraform-aws-vpc"],
  mongodb: ["go-mongo-compose", "k8s-go-mongo", "node-redis-mongo-compose", "k8s-statefulset"],
  velero: ["k8s-pvc", "k8s-cronjob"],
  prometheus: ["prometheus-grafana-compose"],
  grafana: ["prometheus-grafana-compose"],
  rabbitmq: ["rabbitmq-compose"],
  "aws-cloudformation": ["cloudformation-vpc"],
  calico: ["k8s-network-policy"],
  cilium: ["k8s-network-policy"],
  "external-secrets-operator": ["k8s-external-secret", "k8s-configmap-secrets"],
  ...extendedRelatedDeployments,
};

const troubleshootSteps = (
  steps: { title: string; description?: string; fix: Partial<Record<"linux" | "mac" | "windows", string>> }[]
): GuideSection => ({
  id: "troubleshoot",
  title: "Common Problems",
  steps: steps.map((s) => ({
    title: s.title,
    description: s.description,
    commands: s.fix,
  })),
});

export const toolTroubleshoot: Record<string, GuideSection> = {
  ssh: troubleshootSteps([
    {
      title: "Permission denied (publickey)",
      description: "SSH rejected your login — usually a key or password issue.",
      fix: {
        linux: `# Check key permissions (must be 600)
chmod 600 ~/.ssh/id_ed25519
chmod 700 ~/.ssh

# Verbose login to see why it failed
ssh -v user@server-ip

# Force password auth (if enabled on server)
ssh -o PreferredAuthentications=password user@server-ip`,
        mac: `chmod 600 ~/.ssh/id_ed25519\nssh -v user@server-ip`,
        windows: `icacls %USERPROFILE%\\.ssh\\id_ed25519 /inheritance:r /grant:r "%USERNAME%:R"\nssh -v user@server-ip`,
      },
    },
    {
      title: "Connection refused on port 22",
      fix: {
        linux: `# On server — check SSH is running
sudo systemctl status sshd
sudo ufw allow 22/tcp

# Test port
nc -zv server-ip 22`,
        mac: "nc -zv server-ip 22",
        windows: "Test-NetConnection server-ip -Port 22",
      },
    },
  ]),
  docker: troubleshootSteps([
    {
      title: "Cannot connect to the Docker daemon",
      fix: {
        linux: `# Add user to docker group
sudo usermod -aG docker $USER
# Log out and back in, then:
sudo systemctl start docker
docker ps`,
        mac: "# Start Docker Desktop from Applications\nopen -a Docker",
        windows: "# Start Docker Desktop\n# Enable WSL 2 in Docker Desktop Settings",
      },
    },
    {
      title: "Port already in use",
      fix: {
        linux: `# Find what's using the port
sudo lsof -i :8080
# Or use a different host port
docker run -p 8081:80 nginx`,
        mac: "lsof -i :8080",
        windows: "netstat -ano | findstr :8080",
      },
    },
  ]),
  kubernetes: troubleshootSteps([
    {
      title: "ImagePullBackOff",
      description: "Kubernetes can't download the container image.",
      fix: {
        linux: `# Check pod events
kubectl describe pod <pod-name>
# For local images (minikube/kind):
docker build -t myapp:local .
minikube image load myapp:local
# Set imagePullPolicy: IfNotPresent in deployment`,
        mac: "kubectl describe pod <pod-name>\nminikube image load myapp:local",
        windows: "kubectl describe pod <pod-name>",
      },
    },
    {
      title: "CrashLoopBackOff",
      fix: {
        linux: `kubectl logs <pod-name>
kubectl logs <pod-name> --previous
kubectl describe pod <pod-name>`,
        mac: "kubectl logs <pod-name>\nkubectl describe pod <pod-name>",
        windows: "kubectl logs <pod-name>",
      },
    },
  ]),
  mysql: troubleshootSteps([
    {
      title: "Access denied for user 'root'@'localhost'",
      fix: {
        linux: `sudo systemctl status mysql
sudo mysql -u root
# Or reset password:
sudo mysql_secure_installation`,
        mac: "brew services restart mysql\nmysql -u root",
        windows: "Restart MySQL80 service\nmysql -u root -p",
      },
    },
  ]),
  nginx: troubleshootSteps([
    {
      title: "502 Bad Gateway",
      fix: {
        linux: `# Check nginx error log
sudo tail -f /var/log/nginx/error.log
# Verify backend is running
curl http://localhost:3000
sudo nginx -t && sudo systemctl reload nginx`,
        mac: "nginx -t\nbrew services restart nginx",
        windows: "# Check IIS/backend service is running",
      },
    },
  ]),
  git: troubleshootSteps([
    {
      title: "Permission denied (push to GitHub)",
      fix: {
        linux: `# Use SSH instead of HTTPS, or set credential helper
git remote -v
git remote set-url origin git@github.com:user/repo.git
ssh -T git@github.com`,
        mac: "git remote set-url origin git@github.com:user/repo.git",
        windows: "git remote set-url origin git@github.com:user/repo.git",
      },
    },
  ]),
  nfs: troubleshootSteps([
    {
      title: "Mount failed / access denied",
      fix: {
        linux: `# On server — check exports
sudo exportfs -v
showmount -e localhost
# On client:
sudo mount -t nfs -v server-ip:/path /mnt/nfs`,
        mac: "showmount -e server-ip",
        windows: "# Verify NFS client feature is enabled",
      },
    },
  ]),
  jenkins: troubleshootSteps([
    {
      title: "Jenkins won't start / port 8080 in use",
      fix: {
        linux: `sudo systemctl status jenkins
sudo journalctl -u jenkins -n 50
sudo lsof -i :8080`,
        mac: "brew services restart jenkins-lts",
        windows: "Get-Service Jenkins\nRestart-Service Jenkins",
      },
    },
  ]),
  "github-actions": troubleshootSteps([
    {
      title: "Workflow not running on push",
      description: "GitHub Actions only runs when the workflow file is on the default branch or via pull_request.",
      fix: {
        linux: `# Confirm file exists:
ls -la .github/workflows/
# Check Actions tab → workflow name matches YAML
# Ensure on: [push, pull_request] includes your branch
git push origin main`,
        mac: "Verify .github/workflows/*.yml is committed on default branch",
        windows: "Verify .github/workflows/*.yml is committed on default branch",
      },
    },
    {
      title: "Job failed — permission denied",
      fix: {
        linux: `# Add permissions at workflow or job level:
# permissions:
#   contents: read
#   packages: write
# For forks, enable Actions in repo Settings`,
        mac: "# Check Actions → failed job logs",
        windows: "# Check Actions → failed job logs",
      },
    },
  ]),
  "bitbucket-pipelines": troubleshootSteps([
    {
      title: "Pipeline not triggered",
      description: "bitbucket-pipelines.yml must be in the repo root and Pipelines enabled.",
      fix: {
        linux: `# Verify file at repo root (same level as README):
ls -la bitbucket-pipelines.yml
# Repository settings → Pipelines → Enable
git push origin main`,
        mac: "# Bitbucket → Repository settings → Pipelines → Enable",
        windows: "# Bitbucket → Repository settings → Pipelines → Enable",
      },
    },
    {
      title: "Docker service / image pull failed",
      fix: {
        linux: `# Enable Docker in pipeline:
# definitions:
#   services:
#     docker:
#       memory: 2048
# Or use a pre-built image instead of docker build`,
        mac: "# Check Pipelines log for OOM or auth errors",
        windows: "# Check Pipelines log for OOM or auth errors",
      },
    },
  ]),
  "gitlab-ci": troubleshootSteps([
    {
      title: "Pipeline stuck or pending",
      description: "Usually no available runner or runner tags mismatch.",
      fix: {
        linux: `# Settings → CI/CD → Runners — need active runner
# Match tags in .gitlab-ci.yml:
# tags: [docker]
# Shared runners must be enabled for the project`,
        mac: "# GitLab → Settings → CI/CD → Runners",
        windows: "# GitLab → Settings → CI/CD → Runners",
      },
    },
    {
      title: "YAML invalid / pipeline fails to create",
      fix: {
        linux: `# Validate locally:
# CI/CD → Editor → Validate
# Common fix: indent script: with array [cmd1, cmd2]`,
        mac: "# Use GitLab CI lint in pipeline editor",
        windows: "# Use GitLab CI lint in pipeline editor",
      },
    },
  ]),
  terraform: troubleshootSteps([
    {
      title: "Error acquiring the state lock",
      description: "Another terraform apply is running or a previous run crashed.",
      fix: {
        linux: `# Wait for other job to finish, or force unlock (use carefully):
terraform force-unlock <LOCK_ID>
# LOCK_ID from error message
# If using remote backend, check DynamoDB/S3 lock table`,
        mac: "terraform force-unlock <LOCK_ID>",
        windows: "terraform force-unlock <LOCK_ID>",
      },
    },
    {
      title: "Provider authentication failed",
      fix: {
        linux: `# AWS:
aws sts get-caller-identity
export AWS_PROFILE=your-profile
# Re-run: terraform plan`,
        mac: "aws sts get-caller-identity",
        windows: "aws sts get-caller-identity",
      },
    },
  ]),
  helm: troubleshootSteps([
    {
      title: "Helm release failed / pending-upgrade",
      fix: {
        linux: `helm list -A
helm history <release> -n <namespace>
helm rollback <release> <revision> -n <namespace>
# Stuck release:
helm rollback <release> 0 -n <namespace>`,
        mac: "helm history <release> -n <namespace>",
        windows: "helm history <release> -n <namespace>",
      },
    },
    {
      title: "Chart not found",
      fix: {
        linux: `helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
helm search repo <chart>`,
        mac: "helm repo update",
        windows: "helm repo update",
      },
    },
  ]),
  "aws-cli": troubleshootSteps([
    {
      title: "Unable to locate credentials",
      fix: {
        linux: `# Configure credentials:
aws configure
# Or use env vars:
export AWS_ACCESS_KEY_ID=...
export AWS_SECRET_ACCESS_KEY=...
export AWS_DEFAULT_REGION=us-east-1
aws sts get-caller-identity`,
        mac: "aws configure list",
        windows: "aws configure",
      },
    },
    {
      title: "Access Denied on API call",
      fix: {
        linux: `# Verify identity and IAM policy:
aws sts get-caller-identity
# Check user/role has required permissions for the service`,
        mac: "aws sts get-caller-identity",
        windows: "aws sts get-caller-identity",
      },
    },
  ]),
  vault: troubleshootSteps([
    {
      title: "Vault is sealed",
      description: "Vault starts sealed after restart — must unseal with key shards.",
      fix: {
        linux: `vault status
# Unseal (repeat for required key threshold):
vault operator unseal
# Or auto-unseal via cloud KMS if configured`,
        mac: "vault status",
        windows: "vault status",
      },
    },
    {
      title: "Permission denied on secret read",
      fix: {
        linux: `# Login first:
vault login
# Or token:
export VAULT_TOKEN=...
vault kv get secret/myapp`,
        mac: "vault login",
        windows: "vault login",
      },
    },
  ]),
  ...extendedTroubleshoot,
};

export function getWhatIsThis(slug: string): string | undefined {
  return whatIsThis[slug];
}

export function getRelatedDeployments(slug: string): string[] {
  return relatedDeployments[slug] ?? [];
}

export function getTroubleshoot(slug: string): GuideSection | undefined {
  return toolTroubleshoot[slug];
}
