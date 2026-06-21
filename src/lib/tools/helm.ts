import type { ToolGuide } from "../types";

export const helm: ToolGuide = {
  slug: "helm",
  name: "Helm",
  category: "container",
  description: "Package manager for Kubernetes applications",
  icon: "⎈",
  install: {
    id: "install",
    title: "Install Helm",
    steps: [
      {
        title: "(01) Install Helm",
        commands: {
          linux: `# Official script
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# Or via package manager
sudo apt-get install curl gpg apt-transport-https
curl -fsSL https://packages.buildkite.com/helm-linux/helm-debian/gpgkey | gpg --dearmor | sudo tee /usr/share/keyrings/helm.gpg > /dev/null
echo "deb [signed-by=/usr/share/keyrings/helm.gpg] https://packages.buildkite.com/helm-linux/helm-debian/any/ any main" | sudo tee /etc/apt/sources.list.d/helm-stable-debian.list
sudo apt-get update && sudo apt-get install helm`,
          mac: "brew install helm",
          windows: `# Chocolatey
choco install kubernetes-helm -y

# Or Scoop
scoop install helm`,
        },
      },
      {
        title: "(02) Add Chart Repositories",
        commands: {
          linux: `helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo add stable https://charts.helm.sh/stable
helm repo update`,
          mac: `helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update`,
          windows: `helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update`,
        },
      },
    ],
  },
  configure: {
    id: "configure",
    title: "Configure Helm",
    steps: [
      {
        title: "(01) Custom values.yaml",
        commands: {
          linux: `helm show values bitnami/nginx > nginx-values.yaml
nano nginx-values.yaml
# Set: service.type: NodePort, replicaCount: 3

helm install my-nginx bitnami/nginx -f nginx-values.yaml
helm get values my-nginx`,
          mac: `helm show values bitnami/nginx > nginx-values.yaml\nhelm install my-nginx bitnami/nginx -f nginx-values.yaml`,
          windows: `helm show values bitnami/nginx > nginx-values.yaml\nhelm install my-nginx bitnami/nginx -f nginx-values.yaml`,
        },
      },
      {
        title: "(02) Create custom Helm chart",
        commands: {
          linux: `helm create myapp
# Edit: myapp/values.yaml, myapp/templates/deployment.yaml
helm lint myapp
helm install myapp-release ./myapp --dry-run --debug
helm install myapp-release ./myapp`,
          mac: "helm create myapp\nhelm install myapp-release ./myapp",
          windows: "helm create myapp\nhelm install myapp-release ./myapp",
        },
      },
    ],
  },
  verify: {
    id: "verify",
    title: "Verify Installation",
    steps: [
      {
        title: "(01) Check Version",
        commands: {
          linux: "helm version",
          mac: "helm version",
          windows: "helm version",
        },
      },
    ],
  },
  manage: {
    id: "manage",
    title: "Manage Helm",
    steps: [
      {
        title: "(01) Install & Upgrade Releases",
        commands: {
          linux: `# Search charts
helm search repo nginx

# Install a chart
helm install my-nginx bitnami/nginx

# Upgrade release
helm upgrade my-nginx bitnami/nginx --set service.type=NodePort

# Uninstall
helm uninstall my-nginx`,
          mac: `helm search repo nginx
helm install my-nginx bitnami/nginx
helm upgrade my-nginx bitnami/nginx
helm uninstall my-nginx`,
          windows: `helm search repo nginx
helm install my-nginx bitnami/nginx
helm upgrade my-nginx bitnami/nginx
helm uninstall my-nginx`,
        },
      },
      {
        title: "(02) List & Inspect",
        commands: {
          linux: `helm list
helm list -A
helm status my-nginx
helm get values my-nginx
helm history my-nginx`,
          mac: `helm list
helm status my-nginx
helm history my-nginx`,
          windows: `helm list
helm status my-nginx
helm history my-nginx`,
        },
      },
    ],
  },
};
