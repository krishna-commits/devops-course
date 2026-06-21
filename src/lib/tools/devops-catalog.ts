import { guide, section } from "./guide-utils";
import type { ToolGuide } from "../types";

export const argocd = guide(
  "argocd", "Argo CD", "cicd", "GitOps continuous delivery for Kubernetes", "🚀",
  {
    linux: `# Install Argo CD CLI
curl -sSL -o argocd https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64
chmod +x argocd && sudo mv argocd /usr/local/bin/

# Install Argo CD on cluster
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml`,
    mac: "brew install argocd\nkubectl create namespace argocd\nkubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml",
    windows: "kubectl create namespace argocd\nkubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml",
  },
  {
    configure: { linux: "kubectl port-forward svc/argocd-server -n argocd 8080:443\nargocd login localhost:8080\nargocd app create myapp --repo https://github.com/user/repo --path k8s --dest-server https://kubernetes.default.svc --dest-namespace default" },
    verify: { linux: "kubectl get pods -n argocd\nargocd app list", mac: "argocd app list", windows: "kubectl get pods -n argocd" },
    manage: { linux: "argocd app sync myapp\nargocd app get myapp", mac: "argocd app sync myapp", windows: "argocd app list" },
  }
);

export const flux = guide(
  "flux", "Flux CD", "cicd", "GitOps toolkit — sync Kubernetes from Git repos", "🌊",
  {
    linux: `curl -s https://fluxcd.io/install.sh | sudo bash
flux check --pre
flux install`,
    mac: "brew install fluxcd/tap/flux\nflux install",
    windows: "# Use WSL:\ncurl -s https://fluxcd.io/install.sh | sudo bash\nflux install",
  },
  {
    configure: { linux: "flux create source git myapp --url=https://github.com/user/repo --branch=main\nflux create kustomization myapp --source=myapp --path=./k8s --prune=true" },
    verify: { linux: "flux get all", mac: "flux get all", windows: "flux get all" },
  }
);

export const tekton = guide(
  "tekton", "Tekton", "cicd", "Cloud-native CI/CD pipelines on Kubernetes", "🔧",
  {
    linux: `kubectl apply -f https://storage.googleapis.com/tekton-releases/pipeline/latest/release.yaml
kubectl get pods -n tekton-pipelines`,
    mac: "kubectl apply -f https://storage.googleapis.com/tekton-releases/pipeline/latest/release.yaml",
    windows: "kubectl apply -f https://storage.googleapis.com/tekton-releases/pipeline/latest/release.yaml",
  },
  {
    configure: { linux: "kubectl apply -f pipeline.yaml\nkubectl apply -f tasks.yaml\ntkn pipeline start my-pipeline" },
    verify: { linux: "tkn pipeline list\ntkn pipelinerun list", mac: "tkn pipeline list", windows: "tkn pipeline list" },
  }
);

// ── Kubernetes variants ──────────────────────────────────────

export const k3s: ToolGuide = {
  slug: "k3s",
  name: "K3s",
  category: "container",
  description: "Lightweight Kubernetes — perfect for edge and small clusters",
  icon: "🐄",
  install: section("install", "Install K3s", [{
    title: "(01) Install single-node cluster",
    commands: {
      linux: "curl -sfL https://get.k3s.io | sh -\nsudo k3s kubectl get nodes",
      mac: "# K3s is Linux-only — use Multipass VM or Docker:\ndocker run -d --name k3s rancher/k3s",
      windows: "# Use WSL or Rancher Desktop",
    },
  }]),
  configure: section("configure", "Configure K3s", [{
    title: "(01) Use kubectl",
    commands: { linux: "sudo cat /etc/rancher/k3s/k3s.yaml > ~/.kube/config\nkubectl get pods -A", mac: "kubectl get nodes", windows: "kubectl get nodes" },
  }]),
  verify: section("verify", "Verify", [{ title: "(01) Check cluster", commands: { linux: "kubectl get nodes\nkubectl run test --image=nginx --restart=Never", mac: "kubectl get nodes", windows: "kubectl get nodes" } }]),
};

export const microk8s = guide(
  "microk8s", "MicroK8s", "container", "Single-command Kubernetes from Canonical", "🔬",
  {
    linux: "sudo snap install microk8s --classic\nsudo usermod -aG microk8s $USER\nnewgrp microk8s\nmicrok8s status --wait-ready",
    mac: "multipass launch --name microk8s\nmultipass exec microk8s -- sudo snap install microk8s --classic",
    windows: "# Use WSL:\nsudo snap install microk8s --classic",
  },
  {
    configure: { linux: "microk8s enable dns storage ingress\nmicrok8s kubectl get nodes" },
    verify: { linux: "microk8s kubectl get pods -A", mac: "microk8s status", windows: "microk8s status" },
  }
);

export const kind = guide(
  "kind", "Kind", "container", "Kubernetes in Docker — local dev clusters", "🎯",
  {
    linux: `# Install kind
curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.24.0/kind-linux-amd64
chmod +x ./kind && sudo mv ./kind /usr/local/bin/kind
kind create cluster`,
    mac: "brew install kind\nkind create cluster",
    windows: "choco install kind\nkind create cluster",
  },
  {
    configure: { linux: "kind create cluster --name dev\nkubectl cluster-info --context kind-dev" },
    verify: { linux: "kubectl get nodes\nkind get clusters", mac: "kind get clusters", windows: "kind get clusters" },
  }
);

export const buildah = guide(
  "buildah", "Buildah", "container", "Build OCI container images without Docker daemon", "🏗️",
  {
    linux: "sudo apt-get install -y buildah\nbuildah --version",
    mac: "brew install buildah",
    windows: "# Use WSL or Podman Desktop",
  },
  {
    configure: { linux: "buildah from docker.io/library/alpine\nbuildah commit working-container myimage:local" },
    verify: { linux: "buildah images", mac: "buildah images", windows: "buildah images" },
  }
);

export const harbor = guide(
  "harbor", "Harbor", "container", "Private container registry with scanning and RBAC", "⚓",
  {
    linux: `# Download Harbor offline installer from goharbor.io
wget https://github.com/goharbor/harbor/releases/download/v2.11.0/harbor-offline-installer-v2.11.0.tgz
tar xvf harbor-offline-installer-v2.11.0.tgz && cd harbor
sudo ./install.sh`,
    mac: "# Run Harbor via Docker Compose — see goharbor.io docs",
    windows: "# Use Docker Desktop + Harbor compose",
  },
  {
    verify: { linux: "docker ps | grep harbor\n# UI: https://localhost  admin/Harbor12345", mac: "docker ps | grep harbor", windows: "docker ps" },
  }
);

export const portainer = guide(
  "portainer", "Portainer", "container", "Web UI to manage Docker and Kubernetes", "🖥️",
  {
    linux: "docker volume create portainer_data\ndocker run -d -p 9443:9443 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:latest",
    mac: "docker run -d -p 9443:9443 --name portainer -v /var/run/docker.sock:/var/run/docker.sock portainer/portainer-ce",
    windows: "docker run -d -p 9443:9443 --name portainer portainer/portainer-ce",
  },
  {
    verify: { linux: "docker ps | grep portainer\n# Open https://localhost:9443", mac: "open https://localhost:9443", windows: "Start-Process https://localhost:9443" },
  }
);

export const rancher = guide(
  "rancher", "Rancher", "container", "Multi-cluster Kubernetes management platform", "🤠",
  {
    linux: "docker run -d --restart=unless-stopped -p 80:80 -p 443:443 --privileged rancher/rancher:latest",
    mac: "docker run -d -p 80:80 -p 443:443 --privileged rancher/rancher:latest",
    windows: "docker run -d -p 80:80 -p 443:443 rancher/rancher:latest",
  },
  {
    verify: { linux: "docker ps | grep rancher\n# Open https://localhost — set admin password", mac: "open https://localhost", windows: "Start-Process https://localhost" },
  }
);

export const istio = guide(
  "istio", "Istio", "container", "Service mesh for traffic, security, and observability", "🕸️",
  {
    linux: `curl -L https://istio.io/downloadIstio | sh -
cd istio-*
export PATH=$PWD/bin:$PATH
istioctl install --set profile=demo -y`,
    mac: "brew install istioctl\nistioctl install --set profile=demo -y",
    windows: "choco install istioctl\nistioctl install --set profile=demo -y",
  },
  {
    configure: { linux: "kubectl label namespace default istio-injection=enabled\nkubectl get pods -n istio-system" },
    verify: { linux: "istioctl verify-install\nkubectl get svc -n istio-system", mac: "istioctl version", windows: "istioctl version" },
  }
);

// ── IaC & orchestration ──────────────────────────────────────

export const packer = guide(
  "packer", "Packer", "iac", "Build identical machine images for multiple platforms", "📦",
  {
    linux: `wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt-get update && sudo apt-get install -y packer`,
    mac: "brew tap hashicorp/tap && brew install hashicorp/tap/packer",
    windows: "choco install packer",
  },
  {
    configure: { linux: "packer init .\npacker validate .\npacker build ." },
    verify: { linux: "packer --version", mac: "packer --version", windows: "packer --version" },
  }
);

export const pulumi = guide(
  "pulumi", "Pulumi", "iac", "Infrastructure as code using real programming languages", "🌩️",
  {
    linux: "curl -fsSL https://get.pulumi.com | sh\npulumi version",
    mac: "brew install pulumi/tap/pulumi",
    windows: "choco install pulumi",
  },
  {
    configure: { linux: "pulumi login\npulumi new aws-typescript\npulumi up" },
    verify: { linux: "pulumi stack ls", mac: "pulumi stack ls", windows: "pulumi stack ls" },
  }
);

export const nomad = guide(
  "nomad", "Nomad", "iac", "HashiCorp workload orchestrator — containers, VMs, binaries", "🗺️",
  {
    linux: `wget https://releases.hashicorp.com/nomad/1.8.0/nomad_1.8.0_linux_amd64.zip
unzip nomad_1.8.0_linux_amd64.zip && sudo mv nomad /usr/local/bin/
nomad agent -dev`,
    mac: "brew install nomad\nnomad agent -dev",
    windows: "choco install nomad",
  },
  {
    verify: { linux: "nomad node status\n# UI: http://localhost:4646", mac: "nomad node status", windows: "nomad node status" },
  }
);

// ── Security ────────────────────────────────────────────────

export const vault: ToolGuide = {
  slug: "vault",
  name: "HashiCorp Vault",
  category: "security",
  description: "Secrets management — passwords, API keys, certificates",
  icon: "🔐",
  install: section("install", "Install Vault", [{
    title: "(01) Install",
    commands: {
      linux: "wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg\necho \"deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main\" | sudo tee /etc/apt/sources.list.d/hashicorp.list\nsudo apt-get update && sudo apt-get install -y vault",
      mac: "brew tap hashicorp/tap && brew install hashicorp/tap/vault",
      windows: "choco install vault",
    },
  }]),
  configure: section("configure", "Configure Vault", [{
    title: "(01) Dev server + store secret",
    commands: {
      linux: "vault server -dev\n# New terminal:\nexport VAULT_ADDR='http://127.0.0.1:8200'\nvault kv put secret/myapp password=supersecret",
      mac: "vault server -dev",
      windows: "vault server -dev",
    },
  }]),
  verify: section("verify", "Verify", [{ title: "(01) Read secret", commands: { linux: "vault kv get secret/myapp", mac: "vault kv get secret/myapp", windows: "vault kv get secret/myapp" } }]),
};

export const falco = guide(
  "falco", "Falco", "security", "Runtime security — detect threats in containers and hosts", "🦅",
  {
    linux: "curl -s https://falco.org/repo/falcosecurity-3672BA8F.asc | sudo apt-key add -\necho \"deb https://download.falco.org/packages/deb stable main\" | sudo tee /etc/apt/sources.list.d/falcosecurity.list\nsudo apt-get update && sudo apt-get install -y falco",
    mac: "brew install falcosecurity/falco/falco",
    windows: "# Falco on Linux nodes; use WSL or K8s DaemonSet",
  },
  {
    verify: { linux: "sudo systemctl start falco\nsudo falco --list", mac: "falco --version", windows: "falco --version" },
  }
);

export const fail2ban = guide(
  "fail2ban", "Fail2ban", "security", "Block brute-force attacks by banning IPs", "🚫",
  {
    linux: "sudo apt-get install -y fail2ban\nsudo systemctl enable fail2ban && sudo systemctl start fail2ban",
    mac: "brew install fail2ban\nbrew services start fail2ban",
    windows: "# Windows: use Windows Firewall or WSL",
  },
  {
    configure: { linux: "sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local\nsudo systemctl restart fail2ban" },
    verify: { linux: "sudo fail2ban-client status\nsudo fail2ban-client status sshd", mac: "fail2ban-client status", windows: "# N/A" },
  }
);

// ── Web & proxy ─────────────────────────────────────────────

export const traefik = guide(
  "traefik", "Traefik", "networking", "Modern reverse proxy and load balancer with auto HTTPS", "🔀",
  {
    linux: "docker run -d -p 80:80 -p 8080:8080 --name traefik traefik:v3.0",
    mac: "brew install traefik\nbrew services start traefik",
    windows: "docker run -d -p 80:80 -p 8080:8080 traefik:v3.0",
  },
  {
    configure: { linux: "# traefik.yml + docker labels for auto-discovery\n# Dashboard: http://localhost:8080" },
    verify: { linux: "curl http://localhost:8080/dashboard/", mac: "curl http://localhost:8080", windows: "curl http://localhost:8080" },
  }
);

export const apache = guide(
  "apache", "Apache HTTP Server", "networking", "Classic web server (httpd) for websites and apps", "🪶",
  {
    linux: "sudo apt-get install -y apache2\nsudo systemctl enable apache2 && sudo systemctl start apache2",
    mac: "brew install httpd\nbrew services start httpd",
    windows: "# Enable IIS or use WSL:\nsudo apt-get install apache2",
  },
  {
    configure: { linux: "sudo nano /etc/apache2/sites-available/myapp.conf\nsudo a2ensite myapp && sudo systemctl reload apache2" },
    verify: { linux: "curl -I http://localhost", mac: "curl -I http://localhost:8080", windows: "curl http://localhost" },
  }
);

export const consul = guide(
  "consul", "Consul", "networking", "Service discovery, health checks, and key-value store", "🐝",
  {
    linux: "wget https://releases.hashicorp.com/consul/1.19.0/consul_1.19.0_linux_amd64.zip\nunzip consul_1.19.0_linux_amd64.zip && sudo mv consul /usr/local/bin/\nconsul agent -dev",
    mac: "brew install consul\nconsul agent -dev",
    windows: "choco install consul",
  },
  {
    verify: { linux: "consul members\n# UI: http://localhost:8500", mac: "consul members", windows: "consul members" },
  }
);

export const squid = guide(
  "squid", "Squid Proxy", "networking", "Caching forward and reverse proxy server", "🦑",
  {
    linux: "sudo apt-get install -y squid\nsudo systemctl enable squid && sudo systemctl start squid",
    mac: "brew install squid\nbrew services start squid",
    windows: "# Use WSL",
  },
  {
    configure: { linux: "sudo nano /etc/squid/squid.conf\n# Set http_port 3128\nsudo systemctl restart squid" },
    verify: { linux: "curl -x http://localhost:3128 http://example.com", mac: "squid -v", windows: "squid -v" },
  }
);

export const keepalived = guide(
  "keepalived", "Keepalived", "networking", "High availability with VRRP floating IP failover", "💓",
  {
    linux: "sudo apt-get install -y keepalived\nsudo systemctl enable keepalived",
    mac: "# Keepalived is Linux-only",
    windows: "# Use Windows Failover Cluster or WSL",
  },
  {
    configure: { linux: "sudo nano /etc/keepalived/keepalived.conf\n# Configure virtual_ipaddress and priority\nsudo systemctl start keepalived" },
    verify: { linux: "ip addr show | grep inet\nsudo systemctl status keepalived", mac: "# N/A", windows: "# N/A" },
  }
);

// ── Databases & messaging ───────────────────────────────────

export const mongodb = guide(
  "mongodb", "MongoDB", "database", "Document database for flexible JSON-like data", "🍃",
  {
    linux: "curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor\necho \"deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse\" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list\nsudo apt-get update && sudo apt-get install -y mongodb-org",
    mac: "brew tap mongodb/brew && brew install mongodb-community\nbrew services start mongodb-community",
    windows: "winget install MongoDB.Server",
  },
  {
    configure: { linux: "mongosh\nuse mydb\ndb.users.insertOne({name: 'test'})" },
    verify: { linux: "mongosh --eval 'db.runCommand({ ping: 1 })'", mac: "mongosh --eval 'db.runCommand({ ping: 1 })'", windows: "mongosh --eval \"db.runCommand({ ping: 1 })\"" },
  }
);

export const mariadb = guide(
  "mariadb", "MariaDB", "database", "MySQL-compatible relational database", "🦭",
  {
    linux: "sudo apt-get install -y mariadb-server\nsudo systemctl enable mariadb && sudo mysql_secure_installation",
    mac: "brew install mariadb\nbrew services start mariadb",
    windows: "winget install MariaDB.Server",
  },
  {
    verify: { linux: "sudo mysql -e 'SELECT VERSION();'", mac: "mysql -e 'SELECT VERSION();'", windows: "mysql -e \"SELECT VERSION();\"" },
  }
);

export const rabbitmq = guide(
  "rabbitmq", "RabbitMQ", "database", "Message broker for async communication between services", "🐰",
  {
    linux: "sudo apt-get install -y rabbitmq-server\nsudo systemctl enable rabbitmq-server",
    mac: "brew install rabbitmq\nbrew services start rabbitmq",
    windows: "docker run -d -p 5672:5672 -p 15672:15672 rabbitmq:management",
  },
  {
    configure: { linux: "sudo rabbitmq-plugins enable rabbitmq_management\n# UI: http://localhost:15672 guest/guest" },
    verify: { linux: "sudo rabbitmqctl status", mac: "rabbitmqctl status", windows: "docker exec rabbitmq rabbitmqctl status" },
  }
);

export const kafka = guide(
  "kafka", "Apache Kafka", "database", "Distributed event streaming platform", "📨",
  {
    linux: "docker run -d --name kafka -p 9092:9092 apache/kafka:latest",
    mac: "brew install kafka\nbrew services start kafka",
    windows: "docker run -d -p 9092:9092 apache/kafka:latest",
  },
  {
    verify: { linux: "docker exec kafka kafka-topics.sh --bootstrap-server localhost:9092 --list", mac: "kafka-topics --list --bootstrap-server localhost:9092", windows: "docker ps | grep kafka" },
  }
);

export const memcached = guide(
  "memcached", "Memcached", "database", "High-speed in-memory caching system", "💨",
  {
    linux: "sudo apt-get install -y memcached\nsudo systemctl enable memcached",
    mac: "brew install memcached\nbrew services start memcached",
    windows: "docker run -d -p 11211:11211 memcached",
  },
  {
    verify: { linux: "echo stats | nc localhost 11211", mac: "echo stats | nc localhost 11211", windows: "docker exec memcached memcached-tool localhost:11211 stats" },
  }
);

// ── Monitoring & observability ──────────────────────────────

export const elasticsearch = guide(
  "elasticsearch", "Elasticsearch", "monitoring", "Search and analytics engine — core of the ELK stack", "🔍",
  {
    linux: "docker run -d --name elasticsearch -p 9200:9200 -e 'discovery.type=single-node' -e 'xpack.security.enabled=false' docker.elastic.co/elasticsearch/elasticsearch:8.15.0",
    mac: "brew install elasticsearch\nbrew services start elasticsearch",
    windows: "docker run -d -p 9200:9200 -e discovery.type=single-node elasticsearch:8.15.0",
  },
  {
    verify: { linux: "curl http://localhost:9200", mac: "curl http://localhost:9200", windows: "curl http://localhost:9200" },
  }
);

export const loki = guide(
  "loki", "Grafana Loki", "monitoring", "Log aggregation system — like Prometheus but for logs", "📜",
  {
    linux: "docker run -d --name loki -p 3100:3100 grafana/loki:latest",
    mac: "brew install loki\nbrew services start loki",
    windows: "docker run -d -p 3100:3100 grafana/loki:latest",
  },
  {
    verify: { linux: "curl http://localhost:3100/ready", mac: "curl http://localhost:3100/ready", windows: "curl http://localhost:3100/ready" },
  }
);

export const jaeger = guide(
  "jaeger", "Jaeger", "monitoring", "Distributed tracing for microservices", "🔭",
  {
    linux: "docker run -d --name jaeger -p 16686:16686 -p 4317:4317 jaegertracing/all-in-one:latest",
    mac: "brew install jaeger\njaeger-all-in-one",
    windows: "docker run -d -p 16686:16686 jaegertracing/all-in-one:latest",
  },
  {
    verify: { linux: "curl http://localhost:16686\n# UI: http://localhost:16686", mac: "open http://localhost:16686", windows: "Start-Process http://localhost:16686" },
  }
);

export const opentelemetry = guide(
  "opentelemetry", "OpenTelemetry", "monitoring", "Unified standard for traces, metrics, and logs", "📡",
  {
    linux: "# Install OTel Collector\nwget https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v0.108.0/otelcol-contrib_0.108.0_linux_amd64.tar.gz\ntar xvf otelcol-contrib_0.108.0_linux_amd64.tar.gz\n./otelcol-contrib --config config.yaml",
    mac: "brew install opentelemetry-collector",
    windows: "choco install opentelemetry-collector",
  },
  {
    verify: { linux: "curl http://localhost:13133\n# Health check endpoint", mac: "otelcol --version", windows: "otelcol --version" },
  }
);

export const netdata = guide(
  "netdata", "Netdata", "monitoring", "Real-time server monitoring with beautiful dashboards", "📈",
  {
    linux: "wget -O /tmp/netdata-kickstart.sh https://get.netdata.cloud/kickstart.sh && sh /tmp/netdata-kickstart.sh",
    mac: "brew install netdata\nbrew services start netdata",
    windows: "docker run -d --name netdata -p 19999:19999 netdata/netdata",
  },
  {
    verify: { linux: "curl http://localhost:19999/api/v1/info", mac: "open http://localhost:19999", windows: "Start-Process http://localhost:19999" },
  }
);

// ── Storage & mail ──────────────────────────────────────────

export const samba = guide(
  "samba", "Samba", "storage", "Windows-compatible file sharing on Linux", "📁",
  {
    linux: "sudo apt-get install -y samba\nsudo systemctl enable smbd",
    mac: "brew install samba",
    windows: "# Samba server on Windows is built-in SMB",
  },
  {
    configure: { linux: "sudo nano /etc/samba/smb.conf\n# Add [share] section\nsudo smbpasswd -a username\nsudo systemctl restart smbd" },
    verify: { linux: "testparm -s\nsmbclient -L localhost -U%", mac: "testparm", windows: "# N/A" },
  }
);

export const postfix = guide(
  "postfix", "Postfix", "networking", "Mail transfer agent (MTA) for sending email", "✉️",
  {
    linux: "sudo apt-get install -y postfix\n# Select 'Internet Site' during install",
    mac: "brew install postfix",
    windows: "# Use Exchange or cloud email (SendGrid, SES)",
  },
  {
    configure: { linux: "sudo nano /etc/postfix/main.cf\nsudo systemctl restart postfix\necho test | mail -s 'Test' you@example.com" },
    verify: { linux: "sudo systemctl status postfix\nmailq", mac: "postfix status", windows: "# N/A" },
  }
);

/** All extended catalog tools */
export const catalogTools = [
  argocd, flux, tekton,
  k3s, microk8s, kind, buildah, harbor, portainer, rancher, istio,
  packer, pulumi, nomad,
  vault, falco, fail2ban,
  traefik, apache, consul, squid, keepalived,
  mongodb, mariadb, rabbitmq, kafka, memcached,
  elasticsearch, loki, jaeger, opentelemetry, netdata,
  samba, postfix,
];
