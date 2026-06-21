export interface FlowCheckpoint {
  title: string;
  body?: string;
  commands?: string;
  configHref?: string;
  repoHref?: string;
  toolHref?: string;
}

export interface ShipFlow {
  slug: string;
  title: string;
  description: string;
  icon: string;
  duration: string;
  checkpoints: FlowCheckpoint[];
  relatedRunbook?: string;
}

export const shipFlows: ShipFlow[] = [
  {
    slug: "app-to-eks-github-actions",
    title: "App → ECR → EKS via GitHub Actions",
    description: "Build image, push to registry, deploy to Kubernetes — one pipeline.",
    icon: "⚡",
    duration: "~45 min",
    checkpoints: [
      {
        title: "1. Dockerfile + K8s manifests in repo",
        body: "App code, Dockerfile, and k8s/ folder on main branch.",
        configHref: "/deployments/k8s-deployment-service/",
        repoHref: "https://github.com/krishna-commits/automation-bitbucket-to-kubernetes-deployment",
      },
      {
        title: "2. Add GitHub Actions workflow",
        commands: `name: Deploy\non:\n  push:\n    branches: [main]\npermissions:\n  id-token: write\n  contents: read\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: aws-actions/configure-aws-credentials@v4\n        with:\n          role-to-assume: \${{ secrets.AWS_ROLE_ARN }}\n          aws-region: us-east-1\n      - uses: aws-actions/amazon-ecr-login@v2\n      - run: |\n          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$GITHUB_SHA .\n          docker push $ECR_REGISTRY/$ECR_REPOSITORY:$GITHUB_SHA\n      - run: kubectl apply -f k8s/\n        env:\n          KUBECONFIG: \${{ secrets.KUBECONFIG_DATA }}`,
        configHref: "/deployments/github-actions-ci/",
        toolHref: "/tools/github-actions/",
      },
      {
        title: "3. Secrets in GitHub repo",
        body: "Settings → Secrets: AWS_ROLE_ARN (OIDC), or AWS keys; KUBECONFIG_DATA base64; ECR registry vars.",
        toolHref: "/snippets/#gha-oidc-aws",
      },
      {
        title: "4. Ingress + verify",
        commands: `kubectl rollout status deploy/<app> -n <ns>\nkubectl get ingress -n <ns>\ncurl -I https://app.example.com/health`,
        configHref: "/deployments/k8s-ingress/",
        toolHref: "/cheatsheets/kubectl/",
      },
      {
        title: "5. If deploy fails",
        body: "Check Actions log → push auth → cluster access.",
        toolHref: "/runbooks/ci-pipeline-failed/",
      },
    ],
  },
  {
    slug: "bitbucket-to-eks",
    title: "Bitbucket → Docker → EKS",
    description: "Pipeline builds image and deploys to Kubernetes using your Bitbucket repos.",
    icon: "🪣",
    duration: "~40 min",
    checkpoints: [
      {
        title: "1. Enable Bitbucket Pipelines",
        body: "bitbucket-pipelines.yml at repo root.",
        toolHref: "/tools/bitbucket-pipelines/#configure",
        repoHref: "https://github.com/krishna-commits/Bitbucket-to-Kubernetes-Deployment",
      },
      {
        title: "2. Pipeline: build + push + deploy",
        commands: `image: atlassian/default-image:3\npipelines:\n  branches:\n    main:\n      - step:\n          services:\n            - docker\n          script:\n            - docker build -t myapp .\n            - docker push registry.example.com/myapp:$BITBUCKET_COMMIT\n            - pipe: atlassian/aws-eks-kubectl-run:2.2.0\n              variables:\n                AWS_ACCESS_KEY_ID: $AWS_ACCESS_KEY_ID\n                AWS_SECRET_ACCESS_KEY: $AWS_SECRET_ACCESS_KEY\n                CLUSTER_NAME: my-eks\n                KUBECTL_COMMAND: apply -f k8s/`,
        repoHref: "https://github.com/krishna-commits/automation-bitbucket-to-kubernetes-deployment",
      },
      {
        title: "3. Repository variables",
        body: "AWS keys, cluster name, registry credentials in Bitbucket → Repository settings → Pipelines → Variables.",
      },
      {
        title: "4. Verify rollout + prod delta",
        commands: `kubectl get pods -n <ns>\nkubectl rollout status deploy/<name> -n <ns>`,
        configHref: "/deployments/k8s-deployment-service/#prod-delta",
        toolHref: "/deployments/github-actions-ci/#prod-delta",
      },
    ],
  },
  {
    slug: "terraform-eks-from-repo",
    title: "Terraform EKS cluster from GitHub repo",
    description: "Provision VPC + EKS, then merge kubeconfig and deploy.",
    icon: "🏗️",
    duration: "~60 min",
    checkpoints: [
      {
        title: "1. Clone starter repo",
        repoHref: "https://github.com/krishna-commits/terraform-eks-cluster",
        configHref: "/deployments/terraform-aws-ec2/",
      },
      {
        title: "2. Init and plan",
        commands: `terraform init\nterraform workspace select dev || terraform workspace new dev\nterraform plan -out=tfplan`,
        toolHref: "/cheatsheets/terraform/",
        configHref: "/deployments/terraform-aws-ec2/#prod-delta",
      },
      {
        title: "3. Apply infrastructure",
        commands: `terraform apply tfplan\naws eks update-kubeconfig --name $(terraform output -raw cluster_name) --region us-east-1\nkubectl get nodes`,
        repoHref: "https://github.com/krishna-commits/terraform-aws-vpc",
      },
      {
        title: "4. Deploy app manifests",
        commands: `kubectl apply -f k8s/\nhelm upgrade --install ingress ingress-nginx/ingress-nginx -n ingress-nginx --create-namespace`,
        configHref: "/deployments/k8s-ingress/",
      },
      {
        title: "5. State lock issues",
        toolHref: "/runbooks/terraform-state-lock/",
      },
    ],
  },
  {
    slug: "app-to-gke-gitlab-ci",
    title: "App → GKE via GitLab CI",
    description: "Build, scan, push to registry, deploy to GKE — GitLab-native pipeline with prod-delta hardening.",
    icon: "🦊",
    duration: "~45 min",
    checkpoints: [
      {
        title: "1. Dockerfile + K8s manifests in repo",
        body: "App code, Dockerfile, and k8s/ on default branch.",
        configHref: "/deployments/k8s-deployment-service/",
        repoHref: "https://github.com/krishna-commits/Bitbucket-to-Kubernetes-Deployment",
      },
      {
        title: "2. Add .gitlab-ci.yml",
        commands: `stages:\n  - build\n  - scan\n  - deploy\n\nbuild:\n  stage: build\n  image: docker:24\n  services:\n    - docker:24-dind\n  script:\n    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA .\n    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA\n\nscan:\n  stage: scan\n  image: aquasec/trivy:latest\n  script:\n    - trivy image --exit-code 1 --severity CRITICAL $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA\n\ndeploy:\n  stage: deploy\n  image: bitnami/kubectl:latest\n  script:\n    - kubectl set image deploy/myapp app=$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA -n apps\n    - kubectl rollout status deploy/myapp -n apps\n  only:\n    - main`,
        configHref: "/deployments/gitlab-ci-yml/#prod-delta",
        toolHref: "/tools/gitlab-ci/",
      },
      {
        title: "3. CI variables (no static cloud keys in prod)",
        body: "Use GCP Workload Identity or GitLab OIDC. Masked + protected vars on main.",
        toolHref: "/snippets/#gke-workload-identity",
      },
      {
        title: "4. Prod delta before merge",
        body: "OIDC auth, branch protection, scan gate — compare minimal vs production.",
        configHref: "/deployments/gitlab-ci-yml/#prod-delta",
        toolHref: "/deployments/k8s-deployment-service/#prod-delta",
      },
      {
        title: "5. Verify + rollback",
        commands: `kubectl rollout status deploy/myapp -n apps\nkubectl get ingress -n apps\ncurl -I https://app.example.com/health\n# rollback:\nkubectl rollout undo deploy/myapp -n apps`,
        configHref: "/deployments/k8s-ingress/",
        toolHref: "/runbooks/helm-release-failed/",
      },
    ],
  },
  {
    slug: "app-to-eks-jenkins",
    title: "App → ECR → EKS via Jenkins",
    description: "Declarative pipeline — build, scan, push, deploy with prod-delta hardening for enterprise Jenkins.",
    icon: "🤖",
    duration: "~50 min",
    checkpoints: [
      {
        title: "1. Jenkins + K8s agent setup",
        body: "Kubernetes plugin or dedicated agent with docker + kubectl.",
        toolHref: "/tools/jenkins/#configure",
        configHref: "/deployments/jenkins-eks-python/",
        repoHref: "https://github.com/krishna-commits/automation-bitbucket-to-kubernetes-deployment",
      },
      {
        title: "2. Jenkinsfile (declarative)",
        commands: `pipeline {\n  agent any\n  environment {\n    ECR_REGISTRY = '123456789.dkr.ecr.us-east-1.amazonaws.com'\n    IMAGE = "\${ECR_REGISTRY}/myapp:\${env.GIT_COMMIT}"\n  }\n  stages {\n    stage('Build') {\n      steps { sh 'docker build -t $IMAGE .' }\n    }\n    stage('Scan') {\n      steps { sh 'trivy image --exit-code 1 --severity CRITICAL $IMAGE' }\n    }\n    stage('Push') {\n      steps {\n        sh 'aws ecr get-login-password | docker login --username AWS --password-stdin $ECR_REGISTRY'\n        sh 'docker push $IMAGE'\n      }\n    }\n    stage('Deploy') {\n      when { branch 'main' }\n      steps {\n        sh 'kubectl set image deploy/myapp app=$IMAGE -n apps'\n        sh 'kubectl rollout status deploy/myapp -n apps'\n      }\n    }\n  }\n}`,
        configHref: "/deployments/jenkins-eks-python/#prod-delta",
      },
      {
        title: "3. Credentials — no static keys in prod",
        body: "Use IAM instance profile on agent or Jenkins OIDC to AWS. Separate kubeconfig cred per env.",
        toolHref: "/snippets/#gha-oidc-aws",
      },
      {
        title: "4. Prod delta checklist",
        body: "Scan gate, main-only deploy, audit logs — compare minimal vs production.",
        configHref: "/deployments/jenkins-eks-python/#prod-delta",
        toolHref: "/deployments/k8s-deployment-service/#prod-delta",
      },
      {
        title: "5. Smoke test + rollback",
        commands: `curl -I https://app.example.com/health\nkubectl rollout undo deploy/myapp -n apps`,
        toolHref: "/scripts/#post-deploy-smoke",
      },
    ],
  },
  {
    slug: "debug-502-path",
    title: "502 debug path (nginx → ingress → pod)",
    description: "Follow checks in order when users see Bad Gateway.",
    icon: "🌐",
    duration: "~15 min",
    relatedRunbook: "nginx-502-k8s-ingress",
    checkpoints: [
      {
        title: "1. Reproduce and isolate",
        commands: `curl -I https://app.example.com\ncurl -I http://localhost:8080  # after port-forward`,
        toolHref: "/runbooks/nginx-502-k8s-ingress/",
      },
      {
        title: "2. Ingress + endpoints",
        commands: `kubectl get ingress,svc,endpoints -n <ns>\nkubectl describe ingress <name> -n <ns>`,
        configHref: "/deployments/k8s-ingress/",
      },
      {
        title: "3. Pod health",
        commands: `kubectl get pods -n <ns>\nkubectl logs <pod> -n <ns> --tail=50\nkubectl describe pod <pod> -n <ns>`,
        toolHref: "/cheatsheets/kubectl/",
      },
      {
        title: "4. Nginx / ingress controller logs",
        commands: `kubectl logs -n ingress-nginx -l app.kubernetes.io/name=ingress-nginx --tail=100\nsudo tail -f /var/log/nginx/error.log`,
        toolHref: "/snippets/#nginx-502-timeouts",
      },
    ],
  },
  {
    slug: "compose-to-prod-k8s",
    title: "Docker Compose → production Kubernetes",
    description: "Translate a compose stack to deploy + ingress + prod hardening.",
    icon: "🐳",
    duration: "~30 min",
    checkpoints: [
      {
        title: "1. Start from compose template",
        configHref: "/deployments/flask-postgres-compose/#prod-delta",
        body: "Validate locally: docker compose up -d",
      },
      {
        title: "2. Convert to K8s Deployment + Service",
        configHref: "/deployments/k8s-deployment-service/",
        commands: `# kompose convert (optional)\nkubectl apply -f k8s/deployment.yaml\nkubectl apply -f k8s/service.yaml`,
      },
      {
        title: "3. Secrets and ConfigMaps",
        configHref: "/deployments/k8s-configmap-secrets/",
        body: "Move env vars from compose to K8s secrets — never plain text in prod.",
      },
      {
        title: "4. Add prod delta",
        body: "Probes, limits, ingress TLS — see production checklist on config page.",
        configHref: "/deployments/k8s-ingress/",
        toolHref: "/deployments/k8s-deployment-service/#prod-delta",
      },
      {
        title: "5. HPA and verify",
        commands: `kubectl apply -f k8s/hpa.yaml\nkubectl rollout status deploy/<name>\ncurl -I https://app.example.com`,
        configHref: "/deployments/k8s-hpa/",
      },
    ],
  },
  {
    slug: "argocd-gitops-bootstrap",
    title: "Bootstrap GitOps with Argo CD",
    description: "Install Argo CD, connect repo, and sync an app to the cluster.",
    icon: "🔄",
    duration: "~40 min",
    relatedRunbook: "argocd-sync-failed",
    checkpoints: [
      {
        title: "1. Install Argo CD",
        commands: `kubectl create namespace argocd\nkubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml\nkubectl wait --for=condition=available deploy/argocd-server -n argocd --timeout=300s`,
        toolHref: "/tools/argocd/",
      },
      {
        title: "2. Access UI and login",
        commands: `kubectl port-forward svc/argocd-server -n argocd 8080:443\n# initial admin password:\nkubectl get secret argocd-initial-admin-secret -n argocd -o jsonpath='{.data.password}' | base64 -d`,
      },
      {
        title: "3. Register Git repo + Application",
        configHref: "/deployments/k8s-argocd-app/",
        commands: `argocd repo add https://github.com/org/app.git --username git --password $TOKEN\nargocd app create myapp --repo https://github.com/org/app.git --path k8s --dest-server https://kubernetes.default.svc --dest-namespace apps`,
      },
      {
        title: "4. Sync and verify",
        commands: `argocd app sync myapp\nargocd app wait myapp --health\nkubectl get pods -n apps`,
        toolHref: "/snippets/#argocd-sync-status",
      },
    ],
  },
  {
    slug: "vault-secrets-to-k8s",
    title: "Vault secrets → Kubernetes (External Secrets)",
    description: "Store secrets in Vault, sync to K8s Secrets with ESO — zero plain YAML in git.",
    icon: "🔐",
    duration: "~35 min",
    relatedRunbook: "secrets-rotation-zero-downtime",
    checkpoints: [
      {
        title: "1. Install External Secrets Operator",
        toolHref: "/tools/external-secrets-operator/",
        configHref: "/deployments/k8s-external-secret/",
      },
      {
        title: "2. Configure Vault KV path",
        commands: `vault kv put secret/apps/myapp db_password=changeme api_key=changeme\nvault kv get secret/apps/myapp`,
        toolHref: "/tools/vault/",
      },
      {
        title: "3. ClusterSecretStore + ExternalSecret",
        configHref: "/deployments/k8s-external-secret/",
        body: "Point to Vault address and auth (K8s auth or token).",
      },
      {
        title: "4. Mount in Deployment + rotate",
        commands: `kubectl get externalsecret -n apps\nkubectl get secret app-secrets -n apps\nkubectl rollout restart deploy/myapp -n apps`,
        toolHref: "/rotate/",
      },
    ],
  },
  {
    slug: "bastion-jump-host",
    title: "Bastion jump host",
    description: "Hardened SSH jump box for private subnet access — keys only, audit, no direct prod.",
    icon: "🛡️",
    duration: "~30 min",
    checkpoints: [
      {
        title: "1. Launch bastion in public subnet",
        body: "Small instance, security group: SSH (22) from your office/VPN IP only. No application ports.",
        toolHref: "/tools/aws-cli/",
      },
      {
        title: "2. Harden SSH",
        commands: `# /etc/ssh/sshd_config\nPasswordAuthentication no\nPermitRootLogin no\nAllowUsers bastion\nsudo systemctl reload sshd`,
        toolHref: "/tools/ssh/",
      },
      {
        title: "3. Jump to private instance",
        commands: `ssh -J bastion@bastion.example.com app@10.0.2.50\n# or ~/.ssh/config:\n# Host private-app\n#   ProxyJump bastion@bastion.example.com\n#   User app\n#   HostName 10.0.2.50`,
        toolHref: "/cheatsheets/linux-ops/",
      },
      {
        title: "4. Optional WireGuard instead of public SSH",
        toolHref: "/tools/wireguard/",
        body: "VPN-first access — bastion only reachable over WireGuard tunnel.",
      },
    ],
  },
  {
    slug: "blue-green-kubernetes",
    title: "Blue-green deployment on Kubernetes",
    description: "Two deployments — switch Service selector or Ingress weight for zero-downtime cutover.",
    icon: "🔵",
    duration: "~45 min",
    relatedRunbook: "pod-not-ready",
    checkpoints: [
      {
        title: "1. Blue deployment (current prod)",
        configHref: "/deployments/k8s-deployment-service/",
        commands: `kubectl apply -f k8s/deployment-blue.yaml\nkubectl label deploy/myapp version=blue -n apps --overwrite`,
      },
      {
        title: "2. Deploy green (new version)",
        commands: `kubectl apply -f k8s/deployment-green.yaml\nkubectl rollout status deploy/myapp-green -n apps\nkubectl run curl --rm -it --image=curlimages/curl -- curl -s http://myapp-green.apps.svc/health`,
      },
      {
        title: "3. Switch Service selector to green",
        commands: `kubectl patch svc myapp -n apps -p '{"spec":{"selector":{"version":"green"}}}'\ncurl -I https://app.example.com/health`,
        configHref: "/deployments/k8s-clusterip/",
      },
      {
        title: "4. Rollback — patch selector back to blue",
        commands: `kubectl patch svc myapp -n apps -p '{"spec":{"selector":{"version":"blue"}}}'\nkubectl delete deploy myapp-green -n apps`,
        toolHref: "/scripts/#post-deploy-smoke",
      },
    ],
  },
  {
    slug: "prometheus-grafana-stack",
    title: "Prometheus + Grafana monitoring stack",
    description: "Metrics scrape, dashboards, and alert rules — Compose or K8s.",
    icon: "📈",
    duration: "~50 min",
    checkpoints: [
      {
        title: "1. Start with Compose template",
        configHref: "/deployments/prometheus-grafana-compose/",
        toolHref: "/tools/prometheus/",
      },
      {
        title: "2. Add scrape targets",
        commands: `# prometheus.yml\nscrape_configs:\n  - job_name: node\n    static_configs:\n      - targets: ['node-exporter:9100']\n  - job_name: app\n    static_configs:\n      - targets: ['app:8080']`,
        toolHref: "/cheatsheets/prometheus/",
      },
      {
        title: "3. Import Grafana dashboards",
        toolHref: "/tools/grafana/",
        body: "Dashboard ID 1860 (Node Exporter), 6417 (K8s) — or build from PromQL.",
      },
      {
        title: "4. Wire alerts to on-call",
        commands: `# alertmanager.yml route to PagerDuty/Slack\n# PromQL examples: /snippets/#promql-error-rate`,
        toolHref: "/observe/",
      },
    ],
  },
];

export function getShipFlow(slug: string) {
  return shipFlows.find((f) => f.slug === slug);
}

export function getFlowSearchItems() {
  return shipFlows.map((f) => ({
    slug: f.slug,
    name: f.title,
    description: f.description,
    icon: f.icon,
    keywords: ["ship", "flow", "deploy", "end to end", "pipeline", f.duration],
  }));
}
