import { guide } from "./guide-utils";
import type { ToolGuide } from "../types";

export const awsCloudformation: ToolGuide = guide(
  "aws-cloudformation",
  "AWS CloudFormation",
  "cloud",
  "Infrastructure as code for AWS — stacks of EC2, VPC, RDS, and more",
  "📚",
  {
    linux: "sudo apt-get install -y awscli\naws --version\n# CloudFormation uses AWS CLI — no separate install",
    mac: "brew install awscli",
    windows: "winget install Amazon.AWSCLI",
  },
  {
    configure: {
      linux: `aws configure
cat > vpc-stack.yaml << 'EOF'
AWSTemplateFormatVersion: "2010-09-09"
Description: Simple VPC
Resources:
  MyVPC:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: 10.0.0.0/16
      EnableDnsSupport: true
      EnableDnsHostnames: true
EOF
aws cloudformation create-stack --stack-name my-vpc --template-body file://vpc-stack.yaml`,
      mac: "aws cloudformation list-stacks",
      windows: "aws cloudformation list-stacks",
    },
    verify: { linux: "aws cloudformation describe-stacks --stack-name my-vpc\naws cloudformation validate-template --template-body file://vpc-stack.yaml", mac: "aws cloudformation describe-stacks", windows: "aws cloudformation describe-stacks" },
    manage: { linux: "aws cloudformation update-stack --stack-name my-vpc --template-body file://vpc-stack.yaml\naws cloudformation delete-stack --stack-name my-vpc", mac: "aws cloudformation delete-stack --stack-name my-vpc", windows: "aws cloudformation delete-stack --stack-name my-vpc" },
  }
);

export const awsSecretsManager = guide(
  "aws-secrets-manager",
  "AWS Secrets Manager",
  "security",
  "Store and rotate passwords, API keys, and database credentials in AWS",
  "🔑",
  {
    linux: "sudo apt-get install -y awscli && aws configure",
    mac: "brew install awscli && aws configure",
    windows: "winget install Amazon.AWSCLI",
  },
  {
    configure: {
      linux: `aws secretsmanager create-secret \\
  --name prod/myapp/db \\
  --description "Database credentials" \\
  --secret-string '{"username":"admin","password":"CHANGE_ME"}'

aws secretsmanager get-secret-value --secret-id prod/myapp/db`,
      mac: "aws secretsmanager list-secrets",
      windows: "aws secretsmanager list-secrets",
    },
    verify: { linux: "aws secretsmanager list-secrets\naws secretsmanager describe-secret --secret-id prod/myapp/db", mac: "aws secretsmanager list-secrets", windows: "aws secretsmanager list-secrets" },
    manage: { linux: "aws secretsmanager rotate-secret --secret-id prod/myapp/db\naws secretsmanager delete-secret --secret-id prod/myapp/db --force-delete-without-recovery", mac: "aws secretsmanager rotate-secret --secret-id prod/myapp/db", windows: "aws secretsmanager rotate-secret --secret-id prod/myapp/db" },
  }
);

export const externalSecretsOperator = guide(
  "external-secrets-operator",
  "External Secrets Operator",
  "security",
  "Sync secrets from AWS/GCP/Vault into Kubernetes automatically",
  "🔐",
  {
    linux: `helm repo add external-secrets https://charts.external-secrets.io
helm repo update
helm install external-secrets external-secrets/external-secrets -n external-secrets --create-namespace`,
    mac: "helm repo add external-secrets https://charts.external-secrets.io\nhelm install external-secrets external-secrets/external-secrets -n external-secrets --create-namespace",
    windows: "helm install external-secrets external-secrets/external-secrets -n external-secrets --create-namespace",
  },
  {
    configure: {
      linux: `cat > secret-store.yaml << 'EOF'
apiVersion: external-secrets.io/v1beta1
kind: SecretStore
metadata:
  name: aws-secrets
  namespace: default
spec:
  provider:
    aws:
      service: SecretsManager
      region: us-east-1
EOF
kubectl apply -f secret-store.yaml`,
      mac: "kubectl get secretstore",
      windows: "kubectl get secretstore",
    },
    verify: { linux: "kubectl get pods -n external-secrets\nkubectl get secretstore,externalsecret -A", mac: "kubectl get pods -n external-secrets", windows: "kubectl get pods -n external-secrets" },
  }
);

export const etcd = guide(
  "etcd",
  "etcd",
  "container",
  "Distributed key-value store — Kubernetes uses it for cluster state",
  "🗄️",
  {
    linux: `# Single-node dev cluster
ETCD_VER=v3.5.15
curl -L https://github.com/etcd-io/etcd/releases/download/\${ETCD_VER}/etcd-\${ETCD_VER}-linux-amd64.tar.gz -o etcd.tar.gz
tar xzf etcd.tar.gz && sudo mv etcd-\${ETCD_VER}-linux-amd64/etcd* /usr/local/bin/`,
    mac: "brew install etcd",
    windows: "choco install etcd",
  },
  {
    configure: {
      linux: `etcd --name dev --data-dir /tmp/etcd-data \\
  --listen-client-urls http://127.0.0.1:2379 \\
  --advertise-client-urls http://127.0.0.1:2379

# Another terminal:
etcdctl put mykey "hello"
etcdctl get mykey`,
      mac: "etcd --version\netcdctl version",
      windows: "etcd --version",
    },
    verify: { linux: "etcdctl endpoint health\netcdctl member list", mac: "etcdctl endpoint health", windows: "etcdctl endpoint health" },
  }
);

export const eureka = guide(
  "eureka",
  "Netflix Eureka",
  "container",
  "Service registry for Java/Spring microservices discovery",
  "🎯",
  {
    linux: "docker run -d --name eureka -p 8761:8761 springcloud/eureka",
    mac: "docker run -d -p 8761:8761 springcloud/eureka",
    windows: "docker run -d -p 8761:8761 springcloud/eureka",
  },
  {
    configure: {
      linux: `# Spring Boot application.yml:
# eureka:
#   client:
#     service-url:
#       defaultZone: http://localhost:8761/eureka/
curl http://localhost:8761`,
      mac: "open http://localhost:8761",
      windows: "Start-Process http://localhost:8761",
    },
    verify: { linux: "curl -s http://localhost:8761/eureka/apps | head\n# Eureka dashboard: http://localhost:8761", mac: "curl http://localhost:8761", windows: "curl http://localhost:8761" },
  }
);

export const kyverno = guide(
  "kyverno",
  "Kyverno",
  "security",
  "Kubernetes policy engine — validate, mutate, and generate resources",
  "🛡️",
  {
    linux: `kubectl create namespace kyverno
kubectl apply -f https://github.com/kyverno/kyverno/releases/download/v1.12.0/install.yaml`,
    mac: "kubectl apply -f https://github.com/kyverno/kyverno/releases/download/v1.12.0/install.yaml",
    windows: "kubectl apply -f https://github.com/kyverno/kyverno/releases/download/v1.12.0/install.yaml",
  },
  {
    configure: {
      linux: `cat > require-labels.yaml << 'EOF'
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: require-app-label
spec:
  validationFailureAction: Enforce
  rules:
    - name: check-app-label
      match:
        any:
          - resources:
              kinds: [Pod]
      validate:
        message: "label 'app' is required"
        pattern:
          metadata:
            labels:
              app: "?*"
EOF
kubectl apply -f require-labels.yaml`,
      mac: "kubectl get clusterpolicy",
      windows: "kubectl get clusterpolicy",
    },
    verify: { linux: "kubectl get pods -n kyverno\nkubectl get clusterpolicy", mac: "kubectl get pods -n kyverno", windows: "kubectl get pods -n kyverno" },
  }
);

export const linkerd = guide(
  "linkerd",
  "Linkerd",
  "container",
  "Lightweight Kubernetes service mesh — mTLS, metrics, retries",
  "🔗",
  {
    linux: `curl -fsL https://run.linkerd.io/install | sh
export PATH=$PATH:$HOME/.linkerd2/bin
linkerd version`,
    mac: "brew install linkerd\nlinkerd version",
    windows: "# Use WSL or: curl -fsL https://run.linkerd.io/install | sh",
  },
  {
    configure: {
      linux: `linkerd install | kubectl apply -f -
linkerd viz install | kubectl apply -f -
kubectl annotate namespace default linkerd.io/inject=enabled
linkerd check`,
      mac: "linkerd check",
      windows: "linkerd check",
    },
    verify: { linux: "linkerd viz dashboard &\nlinkerd stat deploy -n default", mac: "linkerd stat deploy", windows: "linkerd check" },
  }
);

export const cilium = guide(
  "cilium",
  "Cilium",
  "container",
  "eBPF-powered networking, security, and observability for Kubernetes",
  "🐝",
  {
    linux: `CILIUM_CLI_VERSION=$(curl -s https://raw.githubusercontent.com/cilium/cilium-cli/main/stable.txt)
curl -L --fail https://github.com/cilium/cilium-cli/releases/download/\${CILIUM_CLI_VERSION}/cilium-linux-amd64.tar.gz | tar xz
sudo mv cilium /usr/local/bin/
cilium install`,
    mac: "brew install cilium-cli\ncilium install",
    windows: "# Install via WSL",
  },
  {
    configure: {
      linux: `cilium status --wait
kubectl -n kube-system get pods -l k8s-app=cilium
# Enable Hubble observability:
cilium hubble enable
cilium hubble ui`,
      mac: "cilium status",
      windows: "cilium status",
    },
    verify: { linux: "cilium connectivity test\ncilium hubble observe", mac: "cilium connectivity test", windows: "cilium status" },
  }
);

export const calico = guide(
  "calico",
  "Calico",
  "container",
  "Kubernetes network policies and eBPF networking",
  "🐆",
  {
    linux: `kubectl create -f https://raw.githubusercontent.com/projectcalico/calico/v3.28.0/manifests/tigera-operator.yaml
kubectl create -f https://raw.githubusercontent.com/projectcalico/calico/v3.28.0/manifests/custom-resources.yaml`,
    mac: "# Same kubectl apply on any OS with cluster access",
    windows: "# Same kubectl apply",
  },
  {
    configure: {
      linux: `cat > deny-all.yaml << 'EOF'
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all-ingress
  namespace: default
spec:
  podSelector: {}
  policyTypes: [Ingress]
EOF
kubectl apply -f deny-all.yaml`,
      mac: "kubectl get networkpolicy",
      windows: "kubectl get networkpolicy",
    },
    verify: { linux: "kubectl get pods -n calico-system\nkubectl get ippools", mac: "kubectl get pods -n calico-system", windows: "kubectl get pods -n calico-system" },
  }
);

export const extendedCloudK8sTools = [
  awsCloudformation,
  awsSecretsManager,
  externalSecretsOperator,
  etcd,
  eureka,
  kyverno,
  linkerd,
  cilium,
  calico,
];
