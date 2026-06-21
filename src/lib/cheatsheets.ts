export interface CheatsheetCommand {
  cmd: string;
  desc: string;
}

export interface CheatsheetCategory {
  name: string;
  commands: CheatsheetCommand[];
}

export interface Cheatsheet {
  slug: string;
  title: string;
  description: string;
  icon: string;
  relatedTools: string[];
  categories: CheatsheetCategory[];
}

export const cheatsheets: Cheatsheet[] = [
  {
    slug: "kubectl",
    title: "kubectl Cheat Sheet",
    description: "Essential Kubernetes commands — pods, logs, exec, rollout, and debugging.",
    icon: "☸️",
    relatedTools: ["kubectl", "kubernetes", "helm", "minikube", "k3s"],
    categories: [
      {
        name: "Cluster & context",
        commands: [
          { cmd: "kubectl config get-contexts", desc: "List kubeconfig contexts" },
          { cmd: "kubectl config use-context <name>", desc: "Switch cluster context" },
          { cmd: "kubectl cluster-info", desc: "API server and services URL" },
          { cmd: "kubectl get nodes -o wide", desc: "Node status and IPs" },
        ],
      },
      {
        name: "Workloads",
        commands: [
          { cmd: "kubectl get pods -A", desc: "All pods in all namespaces" },
          { cmd: "kubectl get deploy,svc,ingress -n <ns>", desc: "Common resources in namespace" },
          { cmd: "kubectl describe pod <pod> -n <ns>", desc: "Events and container state" },
          { cmd: "kubectl logs <pod> -n <ns> -f", desc: "Stream container logs" },
          { cmd: "kubectl logs <pod> -c <container> --previous", desc: "Logs from crashed container" },
          { cmd: "kubectl exec -it <pod> -n <ns> -- /bin/sh", desc: "Shell into running pod" },
        ],
      },
      {
        name: "Apply & rollout",
        commands: [
          { cmd: "kubectl apply -f deployment.yaml", desc: "Create or update resources" },
          { cmd: "kubectl apply -k overlays/prod/", desc: "Apply Kustomize overlay" },
          { cmd: "kubectl rollout status deploy/<name>", desc: "Wait for rollout to finish" },
          { cmd: "kubectl rollout undo deploy/<name>", desc: "Rollback to previous revision" },
          { cmd: "kubectl rollout history deploy/<name>", desc: "List revision history" },
          { cmd: "kubectl delete -f deployment.yaml", desc: "Remove resources from file" },
        ],
      },
      {
        name: "Debug",
        commands: [
          { cmd: "kubectl get events -n <ns> --sort-by='.lastTimestamp'", desc: "Recent cluster events" },
          { cmd: "kubectl port-forward svc/<name> 8080:80", desc: "Local access to a service" },
          { cmd: "kubectl top pods -n <ns>", desc: "CPU/memory (needs metrics-server)" },
        ],
      },
    ],
  },
  {
    slug: "docker",
    title: "Docker & Compose Cheat Sheet",
    description: "Container run, build, logs, compose stacks, and cleanup.",
    icon: "🐳",
    relatedTools: ["docker", "docker-compose", "podman"],
    categories: [
      {
        name: "Images & containers",
        commands: [
          { cmd: "docker ps -a", desc: "All containers (running + stopped)" },
          { cmd: "docker images", desc: "Local images" },
          { cmd: "docker run -d -p 8080:80 --name web nginx:alpine", desc: "Detached run with port map" },
          { cmd: "docker logs -f <container>", desc: "Follow logs" },
          { cmd: "docker exec -it <container> sh", desc: "Interactive shell" },
          { cmd: "docker stop <container> && docker rm <container>", desc: "Stop and remove" },
        ],
      },
      {
        name: "Build & push",
        commands: [
          { cmd: "docker build -t myapp:1.0 .", desc: "Build from Dockerfile in cwd" },
          { cmd: "docker tag myapp:1.0 registry.example.com/myapp:1.0", desc: "Tag for registry" },
          { cmd: "docker push registry.example.com/myapp:1.0", desc: "Push to registry" },
          { cmd: "docker system prune -a", desc: "Remove unused images/containers" },
        ],
      },
      {
        name: "Docker Compose",
        commands: [
          { cmd: "docker compose up -d", desc: "Start stack in background" },
          { cmd: "docker compose ps", desc: "Stack service status" },
          { cmd: "docker compose logs -f <service>", desc: "Service logs" },
          { cmd: "docker compose down -v", desc: "Stop and remove volumes" },
          { cmd: "docker compose pull && docker compose up -d", desc: "Update images and restart" },
        ],
      },
    ],
  },
  {
    slug: "git",
    title: "Git Cheat Sheet",
    description: "Branch, merge, stash, revert, and remote workflow.",
    icon: "📦",
    relatedTools: ["git", "github-cli"],
    categories: [
      {
        name: "Daily workflow",
        commands: [
          { cmd: "git status", desc: "Changed files and branch" },
          { cmd: "git pull --rebase origin main", desc: "Update branch with rebase" },
          { cmd: "git add -p", desc: "Stage hunks interactively" },
          { cmd: "git commit -m \"feat: message\"", desc: "Commit staged changes" },
          { cmd: "git push -u origin feature-branch", desc: "Push and set upstream" },
        ],
      },
      {
        name: "Branch & merge",
        commands: [
          { cmd: "git branch -a", desc: "Local and remote branches" },
          { cmd: "git checkout -b feature/x", desc: "Create and switch branch" },
          { cmd: "git merge main", desc: "Merge main into current branch" },
          { cmd: "git rebase main", desc: "Rebase onto main" },
          { cmd: "git branch -d feature/x", desc: "Delete merged branch" },
        ],
      },
      {
        name: "Undo & stash",
        commands: [
          { cmd: "git stash push -m \"wip\"", desc: "Save WIP changes" },
          { cmd: "git stash pop", desc: "Restore latest stash" },
          { cmd: "git revert <commit>", desc: "Safe undo — new commit" },
          { cmd: "git reset --hard origin/main", desc: "Discard local commits (destructive)" },
          { cmd: "git log --oneline -10", desc: "Recent commits" },
        ],
      },
    ],
  },
  {
    slug: "terraform",
    title: "Terraform Cheat Sheet",
    description: "init, plan, apply, state, and workspace commands.",
    icon: "🏗️",
    relatedTools: ["terraform", "terragrunt", "aws-cloudformation"],
    categories: [
      {
        name: "Workflow",
        commands: [
          { cmd: "terraform init", desc: "Download providers and modules" },
          { cmd: "terraform fmt -recursive", desc: "Format .tf files" },
          { cmd: "terraform validate", desc: "Check syntax and config" },
          { cmd: "terraform plan -out=tfplan", desc: "Preview changes, save plan" },
          { cmd: "terraform apply tfplan", desc: "Apply saved plan" },
          { cmd: "terraform destroy", desc: "Remove all managed resources" },
        ],
      },
      {
        name: "State",
        commands: [
          { cmd: "terraform state list", desc: "Resources in state file" },
          { cmd: "terraform state show aws_instance.web", desc: "Single resource details" },
          { cmd: "terraform state rm aws_instance.web", desc: "Remove from state (keep in cloud)" },
          { cmd: "terraform import aws_instance.web i-0abc123", desc: "Import existing resource" },
          { cmd: "terraform force-unlock <lock-id>", desc: "Release stuck state lock" },
        ],
      },
      {
        name: "Workspaces & output",
        commands: [
          { cmd: "terraform workspace list", desc: "List workspaces" },
          { cmd: "terraform workspace select prod", desc: "Switch workspace" },
          { cmd: "terraform output -json", desc: "Print outputs" },
        ],
      },
    ],
  },
  {
    slug: "linux-ops",
    title: "Nginx · systemctl · journalctl",
    description: "Web server, systemd services, and log troubleshooting on Linux.",
    icon: "🐧",
    relatedTools: ["nginx", "apache", "haproxy", "postfix"],
    categories: [
      {
        name: "Nginx",
        commands: [
          { cmd: "sudo nginx -t", desc: "Test config syntax" },
          { cmd: "sudo systemctl reload nginx", desc: "Reload without dropping connections" },
          { cmd: "sudo tail -f /var/log/nginx/error.log", desc: "Error log stream" },
          { cmd: "curl -I http://localhost", desc: "Check HTTP response headers" },
        ],
      },
      {
        name: "systemctl",
        commands: [
          { cmd: "sudo systemctl status nginx", desc: "Service state and recent logs" },
          { cmd: "sudo systemctl start|stop|restart nginx", desc: "Control service" },
          { cmd: "sudo systemctl enable nginx", desc: "Start on boot" },
          { cmd: "sudo systemctl list-units --type=service --state=failed", desc: "Failed services" },
        ],
      },
      {
        name: "journalctl",
        commands: [
          { cmd: "sudo journalctl -u nginx -f", desc: "Follow service logs" },
          { cmd: "sudo journalctl -u nginx --since \"1 hour ago\"", desc: "Logs since time" },
          { cmd: "sudo journalctl -p err -b", desc: "Errors since last boot" },
          { cmd: "sudo journalctl -xe", desc: "Recent entries with hints" },
        ],
      },
    ],
  },
  {
    slug: "helm",
    title: "Helm Cheat Sheet",
    description: "Install, upgrade, rollback, and debug Kubernetes packages.",
    icon: "⎈",
    relatedTools: ["helm", "kubernetes", "kubectl"],
    categories: [
      {
        name: "Repos & install",
        commands: [
          { cmd: "helm repo add bitnami https://charts.bitnami.com/bitnami", desc: "Add chart repository" },
          { cmd: "helm repo update", desc: "Refresh chart indexes" },
          { cmd: "helm search repo nginx", desc: "Find charts" },
          { cmd: "helm install myrelease bitnami/nginx -n apps --create-namespace", desc: "Install chart" },
          { cmd: "helm upgrade --install myrelease ./chart -f values.yaml -n apps", desc: "Idempotent upgrade/install" },
        ],
      },
      {
        name: "Release lifecycle",
        commands: [
          { cmd: "helm list -A", desc: "All releases" },
          { cmd: "helm status myrelease -n apps", desc: "Release details" },
          { cmd: "helm history myrelease -n apps", desc: "Revision history" },
          { cmd: "helm rollback myrelease 2 -n apps", desc: "Rollback to revision" },
          { cmd: "helm uninstall myrelease -n apps", desc: "Remove release" },
        ],
      },
      {
        name: "Debug",
        commands: [
          { cmd: "helm template myrelease ./chart -f values.yaml", desc: "Render manifests locally" },
          { cmd: "helm upgrade myrelease ./chart --dry-run --debug -n apps", desc: "Simulate upgrade with debug" },
          { cmd: "helm get values myrelease -n apps", desc: "Show deployed values" },
          { cmd: "helm get manifest myrelease -n apps", desc: "Show rendered manifest" },
        ],
      },
    ],
  },
  {
    slug: "ansible",
    title: "Ansible Cheat Sheet",
    description: "Ad-hoc commands, playbooks, inventory, and vault.",
    icon: "📜",
    relatedTools: ["ansible"],
    categories: [
      {
        name: "Ad-hoc",
        commands: [
          { cmd: "ansible all -m ping -i inventory.ini", desc: "Test connectivity" },
          { cmd: "ansible web -m apt -a \"name=nginx state=present\" -b -i inventory.ini", desc: "Install package on group" },
          { cmd: "ansible web -m shell -a \"uptime\" -i inventory.ini", desc: "Run shell command" },
          { cmd: "ansible-inventory -i inventory.ini --graph", desc: "Show inventory tree" },
        ],
      },
      {
        name: "Playbooks",
        commands: [
          { cmd: "ansible-playbook site.yml -i inventory.ini", desc: "Run playbook" },
          { cmd: "ansible-playbook site.yml --check --diff", desc: "Dry run with diffs" },
          { cmd: "ansible-playbook site.yml --limit web", desc: "Limit to host group" },
          { cmd: "ansible-playbook site.yml -e \"env=prod\"", desc: "Extra variables" },
        ],
      },
      {
        name: "Vault & facts",
        commands: [
          { cmd: "ansible-vault encrypt secrets.yml", desc: "Encrypt file" },
          { cmd: "ansible-playbook site.yml --ask-vault-pass", desc: "Run with vault password" },
          { cmd: "ansible web -m setup -i inventory.ini", desc: "Gather facts" },
        ],
      },
    ],
  },
  {
    slug: "aws-cli",
    title: "AWS CLI Cheat Sheet",
    description: "Configure credentials, STS, S3, EKS, and common debugging.",
    icon: "☁️",
    relatedTools: ["aws-cli", "terraform", "kubernetes"],
    categories: [
      {
        name: "Auth & identity",
        commands: [
          { cmd: "aws configure list", desc: "Show active credentials source" },
          { cmd: "aws sts get-caller-identity", desc: "Verify who you are" },
          { cmd: "aws sts assume-role --role-arn arn:aws:iam::123:role/Deploy --role-session-name ci", desc: "Assume IAM role" },
          { cmd: "export AWS_PROFILE=myprofile", desc: "Switch profile" },
        ],
      },
      {
        name: "S3 & EKS",
        commands: [
          { cmd: "aws s3 ls s3://my-bucket/", desc: "List bucket" },
          { cmd: "aws s3 sync ./dist s3://my-bucket/app/", desc: "Upload directory" },
          { cmd: "aws eks update-kubeconfig --name my-cluster --region us-east-1", desc: "Merge EKS into kubeconfig" },
          { cmd: "aws eks describe-cluster --name my-cluster --query cluster.status", desc: "Cluster status" },
        ],
      },
      {
        name: "Debug",
        commands: [
          { cmd: "aws ec2 describe-instances --filters Name=tag:Name,Values=web", desc: "Find instances by tag" },
          { cmd: "aws logs tail /aws/lambda/my-fn --follow", desc: "Stream CloudWatch logs" },
          { cmd: "aws cloudformation describe-stacks --stack-name my-stack", desc: "Stack status" },
        ],
      },
    ],
  },
  {
    slug: "github-actions",
    title: "GitHub Actions Cheat Sheet",
    description: "Workflow YAML snippets — triggers, jobs, secrets, and deploy patterns.",
    icon: "⚡",
    relatedTools: ["github-actions", "docker", "kubernetes"],
    categories: [
      {
        name: "Workflow skeleton",
        commands: [
          { cmd: "name: CI\non:\n  push:\n    branches: [main]\n  pull_request:\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci && npm test", desc: "Basic CI on push/PR" },
          { cmd: "concurrency:\n  group: deploy-${{ github.ref }}\n  cancel-in-progress: true", desc: "Cancel stale runs" },
        ],
      },
      {
        name: "Docker & registry",
        commands: [
          { cmd: "- uses: docker/login-action@v3\n  with:\n    registry: ghcr.io\n    username: ${{ github.actor }}\n    password: ${{ secrets.GITHUB_TOKEN }}", desc: "Login to GHCR" },
          { cmd: "- uses: docker/build-push-action@v6\n  with:\n    push: true\n    tags: ghcr.io/org/app:${{ github.sha }}", desc: "Build and push image" },
        ],
      },
      {
        name: "Deploy to K8s",
        commands: [
          { cmd: "- uses: azure/setup-kubectl@v4\n- run: kubectl apply -f k8s/\n  env:\n    KUBECONFIG: ${{ secrets.KUBECONFIG_DATA }}", desc: "Apply manifests (store kubeconfig as secret)" },
          { cmd: "permissions:\n  id-token: write\n  contents: read\n# use aws-actions/configure-aws-credentials + EKS OIDC", desc: "OIDC to cloud (no long-lived keys)" },
        ],
      },
    ],
  },
  {
    slug: "systemd",
    title: "systemd Cheat Sheet",
    description: "Units, timers, journals, and service debugging on Linux.",
    icon: "⚙️",
    relatedTools: ["nginx", "postgresql", "redis", "docker"],
    categories: [
      {
        name: "Service control",
        commands: [
          { cmd: "sudo systemctl start|stop|restart|reload <unit>", desc: "Control a unit" },
          { cmd: "sudo systemctl enable --now <unit>", desc: "Enable and start on boot" },
          { cmd: "sudo systemctl status <unit>", desc: "State + recent log lines" },
          { cmd: "sudo systemctl is-active <unit>", desc: "Active check (exit code)" },
        ],
      },
      {
        name: "Units & timers",
        commands: [
          { cmd: "systemctl list-units --type=service --state=running", desc: "Running services" },
          { cmd: "systemctl list-units --type=service --state=failed", desc: "Failed services" },
          { cmd: "systemctl list-timers --all", desc: "Scheduled timers" },
          { cmd: "sudo systemctl daemon-reload", desc: "Reload unit files after edit" },
        ],
      },
      {
        name: "Logs",
        commands: [
          { cmd: "sudo journalctl -u <unit> -f", desc: "Follow unit logs" },
          { cmd: "sudo journalctl -u <unit> --since today", desc: "Today's logs" },
          { cmd: "sudo journalctl -p err -b", desc: "Errors this boot" },
          { cmd: "sudo journalctl -xe", desc: "Recent log with hints" },
        ],
      },
    ],
  },
  {
    slug: "prometheus",
    title: "Prometheus & PromQL Cheat Sheet",
    description: "Queries, alerting, and kubectl-adjacent metrics patterns for on-call.",
    icon: "📈",
    relatedTools: ["prometheus", "grafana", "kubernetes"],
    categories: [
      {
        name: "Essential PromQL",
        commands: [
          { cmd: "up", desc: "Targets that are up (1) or down (0)" },
          { cmd: "rate(http_requests_total[5m])", desc: "Request rate over 5 minutes" },
          { cmd: "sum by (pod) (rate(container_cpu_usage_seconds_total[5m]))", desc: "CPU by pod" },
          { cmd: "histogram_quantile(0.99, sum by (le) (rate(http_request_duration_seconds_bucket[5m])))", desc: "P99 latency" },
        ],
      },
      {
        name: "Kubernetes",
        commands: [
          { cmd: "kube_pod_container_status_restarts_total", desc: "Pod restart counter" },
          { cmd: "kube_deployment_status_replicas_unavailable", desc: "Unavailable replicas" },
          { cmd: "container_memory_working_set_bytes", desc: "Container memory usage" },
          { cmd: "kube_node_status_condition{condition=\"Ready\",status=\"true\"}", desc: "Ready nodes" },
        ],
      },
      {
        name: "Alerting rules (snippet)",
        commands: [
          { cmd: "groups:\n- name: app\n  rules:\n  - alert: HighErrorRate\n    expr: sum(rate(http_requests_total{status=~\"5..\"}[5m])) / sum(rate(http_requests_total[5m])) > 0.05\n    for: 5m\n    labels:\n      severity: critical", desc: "5xx error rate > 5%" },
          { cmd: "- alert: PodCrashLooping\n  expr: increase(kube_pod_container_status_restarts_total[1h]) > 5\n  for: 10m", desc: "Crash loop alert" },
        ],
      },
    ],
  },
  {
    slug: "jenkins",
    title: "Jenkins Pipeline Cheat Sheet",
    description: "Declarative pipeline snippets — build, test, Docker, and K8s deploy.",
    icon: "🤖",
    relatedTools: ["jenkins", "docker", "kubernetes"],
    categories: [
      {
        name: "Pipeline skeleton",
        commands: [
          { cmd: "pipeline {\n  agent any\n  stages {\n    stage('Build') { steps { sh 'make build' } }\n    stage('Test') { steps { sh 'make test' } }\n  }\n  post {\n    failure { echo 'Failed!' }\n  }\n}", desc: "Basic declarative pipeline" },
          { cmd: "options {\n  timeout(time: 30, unit: 'MINUTES')\n  disableConcurrentBuilds()\n}", desc: "Timeout and concurrency" },
        ],
      },
      {
        name: "Docker agent",
        commands: [
          { cmd: "agent {\n  docker {\n    image 'node:20-alpine'\n    args '-v /var/run/docker.sock:/var/run/docker.sock'\n  }\n}", desc: "Run steps in Docker" },
          { cmd: "stage('Push') {\n  steps {\n    sh 'docker build -t myreg/app:$BUILD_NUMBER .'\n    sh 'docker push myreg/app:$BUILD_NUMBER'\n  }\n}", desc: "Build and push image" },
        ],
      },
      {
        name: "Deploy to K8s",
        commands: [
          { cmd: "withKubeConfig([credentialsId: 'kubeconfig-prod']) {\n  sh 'kubectl apply -f k8s/'\n  sh 'kubectl rollout status deploy/myapp -n apps'\n}", desc: "kubectl with stored kubeconfig" },
          { cmd: "kubernetes {\n  yaml '''\napiVersion: v1\nkind: Pod\nspec:\n  containers:\n  - name: kubectl\n    image: bitnami/kubectl\n    command: ['kubectl', 'get', 'pods']\n'''\n}", desc: "Dynamic pod agent in cluster" },
        ],
      },
    ],
  },
];

const toolToCheatsheet: Record<string, string> = {
  kubectl: "kubectl",
  kubernetes: "kubectl",
  minikube: "kubectl",
  k3s: "kubectl",
  kind: "kubectl",
  microk8s: "kubectl",
  helm: "helm",
  docker: "docker",
  "docker-compose": "docker",
  podman: "docker",
  git: "git",
  "github-cli": "git",
  terraform: "terraform",
  terragrunt: "terraform",
  nginx: "linux-ops",
  apache: "linux-ops",
  haproxy: "linux-ops",
  postfix: "linux-ops",
  ansible: "ansible",
  "aws-cli": "aws-cli",
  "github-actions": "github-actions",
  postgresql: "systemd",
  redis: "systemd",
  mysql: "systemd",
  mongodb: "systemd",
  prometheus: "prometheus",
  grafana: "prometheus",
  jenkins: "jenkins",
  argocd: "kubectl",
  flux: "kubectl",
};

export function getCheatsheetSearchItems() {
  return cheatsheets.map((s) => ({
    slug: s.slug,
    name: s.title,
    description: s.description,
    icon: s.icon,
    keywords: ["cheat sheet", "quick reference", "commands", ...s.relatedTools],
  }));
}

export function getCheatsheet(slug: string): Cheatsheet | undefined {
  return cheatsheets.find((c) => c.slug === slug);
}

export function getCheatsheetForTool(toolSlug: string): Cheatsheet | undefined {
  const id = toolToCheatsheet[toolSlug];
  return id ? getCheatsheet(id) : undefined;
}
