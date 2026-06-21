import type { ToolGuide } from "../types";

export const kubernetes: ToolGuide = {
  slug: "kubernetes",
  name: "Kubernetes (kubeadm)",
  category: "container",
  description: "Production-grade container orchestration cluster setup",
  icon: "⚓",
  install: {
    id: "install",
    title: "Install Kubernetes Cluster",
    steps: [
      {
        title: "(01) Disable Swap & Load Kernel Modules",
        commands: {
          linux: `sudo swapoff -a
sudo sed -i '/ swap / s/^/#/' /etc/fstab

cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf
overlay
br_netfilter
EOF

sudo modprobe overlay
sudo modprobe br_netfilter

cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-iptables  = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.ipv4.ip_forward                 = 1
EOF
sudo sysctl --system`,
          mac: "# Kubernetes cluster setup is Linux-only. Use Minikube or Docker Desktop Kubernetes on Mac.",
          windows: "# Use WSL2 Ubuntu or Docker Desktop Kubernetes on Windows.",
        },
      },
      {
        title: "(02) Install containerd",
        commands: {
          linux: `sudo apt-get update
sudo apt-get install -y containerd
sudo mkdir -p /etc/containerd
containerd config default | sudo tee /etc/containerd/config.toml
sudo systemctl restart containerd
sudo systemctl enable containerd`,
          mac: "brew install minikube\nminikube start --driver=docker",
          windows: "# Enable Kubernetes in Docker Desktop Settings > Kubernetes",
        },
      },
      {
        title: "(03) Install kubeadm, kubelet, kubectl",
        commands: {
          linux: `sudo apt-get install -y apt-transport-https ca-certificates curl gpg
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.32/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.32/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list
sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl
sudo systemctl enable --now kubelet`,
          mac: "minikube start\nkubectl get nodes",
          windows: "# Docker Desktop: Settings > Kubernetes > Enable Kubernetes",
        },
      },
      {
        title: "(04) Initialize Control Plane",
        commands: {
          linux: `sudo kubeadm init --pod-network-cidr=10.244.0.0/16

mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

# Install CNI (Flannel)
kubectl apply -f https://github.com/flannel-io/flannel/releases/latest/download/kube-flannel.yml`,
          mac: "minikube start --cpus=4 --memory=8192",
          windows: "# After enabling in Docker Desktop, verify with:\nkubectl get nodes",
        },
      },
    ],
  },
  configure: {
    id: "configure",
    title: "Configure Kubernetes Cluster",
    steps: [
      {
        title: "(01) Create namespaces and RBAC",
        commands: {
          linux: `kubectl create namespace dev
kubectl create namespace staging
kubectl create serviceaccount dev-user -n dev
kubectl create rolebinding dev-admin --clusterrole=admin --serviceaccount=dev:dev-user -n dev
kubectl config set-context --current --namespace=dev`,
          mac: `kubectl create namespace dev\nkubectl config set-context --current --namespace=dev`,
          windows: `kubectl create namespace dev\nkubectl config set-context --current --namespace=dev`,
        },
      },
      {
        title: "(02) Deploy application with Service",
        commands: {
          linux: `kubectl create deployment nginx --image=nginx --replicas=3
kubectl expose deployment nginx --port=80 --type=NodePort
kubectl get pods,svc
kubectl scale deployment nginx --replicas=5`,
          mac: `kubectl create deployment nginx --image=nginx\nkubectl expose deployment nginx --port=80 --type=NodePort`,
          windows: `kubectl create deployment nginx --image=nginx\nkubectl expose deployment nginx --port=80 --type=NodePort`,
        },
      },
      {
        title: "(03) Install metrics-server and dashboard",
        commands: {
          linux: `kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.7.0/aio/deploy/recommended.yaml
kubectl get pods -n kube-system`,
          mac: "# Same kubectl apply commands",
          windows: "# Same kubectl apply commands",
        },
      },
    ],
  },
  verify: {
    id: "verify",
    title: "Verify Cluster",
    steps: [
      {
        title: "(01) Check Nodes & Pods",
        commands: {
          linux: "kubectl get nodes\nkubectl get pods -A\nkubectl cluster-info",
          mac: "kubectl get nodes\nminikube status",
          windows: "kubectl get nodes\nkubectl get pods -A",
        },
      },
    ],
  },
  manage: {
    id: "manage",
    title: "Manage Cluster",
    steps: [
      {
        title: "(01) Join Worker Node",
        commands: {
          linux: `# Run on worker node (use token from kubeadm init output)
sudo kubeadm join <control-plane-ip>:6443 --token <token> \\
  --discovery-token-ca-cert-hash sha256:<hash>`,
          mac: "minikube node add",
          windows: "# Worker nodes join via WSL2 Linux VM",
        },
      },
      {
        title: "(02) Reset Cluster",
        commands: {
          linux: "sudo kubeadm reset\nsudo rm -rf /etc/cni/net.d /var/lib/etcd /var/lib/kubelet",
          mac: "minikube delete\nminikube start",
          windows: "# Reset via Docker Desktop: disable and re-enable Kubernetes",
        },
      },
    ],
  },
};
