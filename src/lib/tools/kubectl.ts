import type { ToolGuide } from "../types";

export const kubectl: ToolGuide = {
  slug: "kubectl",
  name: "kubectl",
  category: "container",
  description: "Kubernetes command-line tool for cluster management",
  icon: "☸️",
  install: {
    id: "install",
    title: "Install kubectl",
    steps: [
      {
        title: "(01) Install kubectl",
        commands: {
          linux: `# Ubuntu / Debian
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

# Or via package manager
sudo apt-get update && sudo apt-get install -y kubectl

# RHEL / Fedora
sudo dnf install -y kubectl`,
          mac: `# Homebrew
brew install kubectl

# Or direct download
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/darwin/arm64/kubectl"
chmod +x kubectl && sudo mv kubectl /usr/local/bin/`,
          windows: `# winget
winget install Kubernetes.kubectl

# Or Chocolatey
choco install kubernetes-cli

# Or direct download (PowerShell)
curl.exe -LO "https://dl.k8s.io/release/v1.32.0/bin/windows/amd64/kubectl.exe"`,
        },
      },
      {
        title: "(02) Configure kubeconfig",
        description: "Point kubectl at your cluster configuration file.",
        commands: {
          linux: `# Default location
mkdir -p ~/.kube
cp /path/to/admin.conf ~/.kube/config
chmod 600 ~/.kube/config

# Or set explicitly
export KUBECONFIG=~/.kube/config`,
          mac: `mkdir -p ~/.kube\ncp /path/to/admin.conf ~/.kube/config\nchmod 600 ~/.kube/config`,
          windows: `# Copy config to
# %USERPROFILE%\\.kube\\config

$env:KUBECONFIG="$env:USERPROFILE\\.kube\\config"`,
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
          linux: "kubectl version --client\nkubectl cluster-info",
          mac: "kubectl version --client\nkubectl cluster-info",
          windows: "kubectl version --client\nkubectl cluster-info",
        },
      },
      {
        title: "(02) Test Cluster Access",
        commands: {
          linux: "kubectl get nodes\nkubectl get pods -A",
          mac: "kubectl get nodes\nkubectl get pods -A",
          windows: "kubectl get nodes\nkubectl get pods -A",
        },
      },
    ],
  },
  manage: {
    id: "manage",
    title: "Manage Kubernetes",
    steps: [
      {
        title: "(01) Pod Operations",
        commands: {
          linux: `kubectl get pods
kubectl describe pod <name>
kubectl logs <pod>
kubectl exec -it <pod> -- /bin/sh
kubectl delete pod <name>`,
          mac: `kubectl get pods
kubectl describe pod <name>
kubectl logs <pod>
kubectl exec -it <pod> -- /bin/sh
kubectl delete pod <name>`,
          windows: `kubectl get pods
kubectl describe pod <name>
kubectl logs <pod>
kubectl exec -it <pod> -- /bin/sh
kubectl delete pod <name>`,
        },
      },
      {
        title: "(02) Deployment Operations",
        commands: {
          linux: `kubectl get deployments
kubectl apply -f deployment.yaml
kubectl scale deployment <name> --replicas=3
kubectl rollout status deployment/<name>
kubectl rollout undo deployment/<name>`,
          mac: `kubectl get deployments
kubectl apply -f deployment.yaml
kubectl scale deployment <name> --replicas=3
kubectl rollout status deployment/<name>
kubectl rollout undo deployment/<name>`,
          windows: `kubectl get deployments
kubectl apply -f deployment.yaml
kubectl scale deployment <name> --replicas=3
kubectl rollout status deployment/<name>
kubectl rollout undo deployment/<name>`,
        },
      },
      {
        title: "(03) Service & Namespace",
        commands: {
          linux: `kubectl get svc
kubectl get ns
kubectl create namespace dev
kubectl config set-context --current --namespace=dev
kubectl port-forward svc/<name> 8080:80`,
          mac: `kubectl get svc
kubectl get ns
kubectl create namespace dev
kubectl config set-context --current --namespace=dev
kubectl port-forward svc/<name> 8080:80`,
          windows: `kubectl get svc
kubectl get ns
kubectl create namespace dev
kubectl config set-context --current --namespace=dev
kubectl port-forward svc/<name> 8080:80`,
        },
      },
    ],
  },
};
