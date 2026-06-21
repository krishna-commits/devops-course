import type { ToolGuide } from "../types";

export const dockerCompose: ToolGuide = {
  slug: "docker-compose",
  name: "Docker Compose",
  category: "container",
  description: "Define and run multi-container Docker applications with a single YAML file",
  icon: "🧩",
  install: {
    id: "install",
    title: "Install Docker Compose",
    steps: [
      {
        title: "(01) Install (included with Docker Desktop)",
        description: "Docker Compose V2 is bundled as the docker compose plugin.",
        commands: {
          linux: `# Ubuntu / Debian (plugin)
sudo apt-get update
sudo apt-get install -y docker-compose-plugin

# Standalone (legacy)
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose`,
          mac: "brew install docker-compose\n# Or use Docker Desktop (includes compose plugin)",
          windows: "winget install Docker.DockerDesktop\n# Compose V2 included as: docker compose",
        },
      },
    ],
  },
  verify: {
    id: "verify",
    title: "Verify",
    steps: [{ title: "(01) Version", commands: { linux: "docker compose version", mac: "docker compose version", windows: "docker compose version" } }],
  },
  manage: {
    id: "manage",
    title: "Manage Compose Stacks",
    steps: [
      {
        title: "(01) Lifecycle commands",
        commands: {
          linux: `docker compose up -d          # start in background
docker compose ps               # list services
docker compose logs -f api      # follow logs
docker compose restart api
docker compose down             # stop & remove
docker compose down -v          # also remove volumes
docker compose build --no-cache # rebuild images`,
          mac: `docker compose up -d
docker compose ps
docker compose logs -f
docker compose down`,
          windows: `docker compose up -d
docker compose ps
docker compose logs -f
docker compose down`,
        },
      },
    ],
  },
};

export const azureCli: ToolGuide = {
  slug: "azure-cli",
  name: "Azure CLI",
  category: "cloud",
  description: "Command-line tools for managing Microsoft Azure resources",
  icon: "🔷",
  install: {
    id: "install",
    title: "Install Azure CLI",
    steps: [
      {
        title: "(01) Install",
        commands: {
          linux: `curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash\n# RHEL/Fedora:\nsudo dnf install -y azure-cli`,
          mac: "brew install azure-cli",
          windows: "winget install Microsoft.AzureCLI",
        },
      },
      { title: "(02) Login", commands: { linux: "az login", mac: "az login", windows: "az login" } },
    ],
  },
  verify: {
    id: "verify",
    title: "Verify",
    steps: [{ title: "(01) Version", commands: { linux: "az version\naz account show", mac: "az version", windows: "az version" } }],
  },
  manage: {
    id: "manage",
    title: "Manage Azure",
    steps: [{ title: "(01) Common commands", commands: { linux: "az login\naz group list\naz vm list\naz storage account list\naz aks list", mac: "az group list\naz vm list", windows: "az group list\naz vm list" } }],
  },
};

export const maven: ToolGuide = {
  slug: "maven",
  name: "Maven",
  category: "build",
  description: "Java project build automation and dependency management",
  icon: "☕",
  install: {
    id: "install",
    title: "Install Maven",
    steps: [
      {
        title: "(01) Install",
        commands: {
          linux: `sudo apt-get install -y maven\n# Or SDKMAN:\ncurl -s "https://get.sdkman.io" | bash && sdk install maven`,
          mac: "brew install maven",
          windows: "choco install maven -y\n# Or: winget install Apache.Maven",
        },
      },
    ],
  },
  verify: {
    id: "verify",
    title: "Verify",
    steps: [{ title: "(01) Version", commands: { linux: "mvn -version", mac: "mvn -version", windows: "mvn -version" } }],
  },
  manage: {
    id: "manage",
    title: "Manage Maven Projects",
    steps: [
      {
        title: "(01) Build lifecycle",
        commands: {
          linux: `mvn clean install       # compile, test, package\nmvn clean package -DskipTests\nmvn spring-boot:run     # run Spring Boot\nmvn dependency:tree     # show dependencies`,
          mac: `mvn clean install\nmvn spring-boot:run`,
          windows: `mvn clean install\nmvn spring-boot:run`,
        },
      },
    ],
  },
};

export const mysql: ToolGuide = {
  slug: "mysql",
  name: "MySQL",
  category: "database",
  description: "Popular open-source relational database management system",
  icon: "🐬",
  install: {
    id: "install",
    title: "Install MySQL",
    steps: [
      {
        title: "(01) Install MySQL Server",
        commands: {
          linux: `# Ubuntu / Debian\nsudo apt-get update\nsudo apt-get install -y mysql-server\nsudo systemctl enable mysql\nsudo mysql_secure_installation\n\n# RHEL / Fedora\nsudo dnf install -y mysql-server\nsudo systemctl start mysqld`,
          mac: "brew install mysql\nbrew services start mysql",
          windows: "winget install Oracle.MySQL\n# Or download MySQL Installer from mysql.com",
        },
      },
    ],
  },
  verify: {
    id: "verify",
    title: "Verify",
    steps: [{ title: "(01) Connect", commands: { linux: "mysql -u root -p\nSELECT VERSION();", mac: "mysql -u root -p", windows: "mysql -u root -p" } }],
  },
  manage: {
    id: "manage",
    title: "Manage MySQL",
    steps: [
      {
        title: "(01) Database operations",
        commands: {
          linux: `sudo systemctl start mysql\nsudo systemctl status mysql\nmysql -u root -p -e "SHOW DATABASES;"\nmysqldump -u root -p mydb > backup.sql\nmysql -u root -p mydb < backup.sql`,
          mac: `brew services start mysql\nmysql -u root -p -e "SHOW DATABASES;"`,
          windows: `net start MySQL80\nmysql -u root -p -e "SHOW DATABASES;"`,
        },
      },
    ],
  },
};

export const sonarqube: ToolGuide = {
  slug: "sonarqube",
  name: "SonarQube",
  category: "monitoring",
  description: "Continuous code quality and security analysis platform",
  icon: "🔍",
  install: {
    id: "install",
    title: "Install SonarQube",
    steps: [
      {
        title: "(01) Run with Docker (recommended)",
        commands: {
          linux: `docker run -d --name sonarqube -p 9000:9000 sonarqube:lts-community\n# Access: http://localhost:9000 (admin/admin)`,
          mac: `docker run -d --name sonarqube -p 9000:9000 sonarqube:lts-community\nopen http://localhost:9000`,
          windows: `docker run -d --name sonarqube -p 9000:9000 sonarqube:lts-community`,
        },
      },
      {
        title: "(02) Install SonarScanner CLI",
        commands: {
          linux: `# Download from https://docs.sonarsource.com/sonarqube/latest/analyzing-source-code/scanners/sonarscanner/
export PATH=$PATH:/opt/sonar-scanner/bin`,
          mac: "brew install sonar-scanner",
          windows: "choco install sonarscanner-msbuild-net -y",
        },
      },
    ],
  },
  verify: {
    id: "verify",
    title: "Verify",
    steps: [{ title: "(01) Check UI", commands: { linux: "curl -I http://localhost:9000", mac: "curl -I http://localhost:9000", windows: "curl http://localhost:9000" } }],
  },
  manage: {
    id: "manage",
    title: "Scan Projects",
    steps: [
      {
        title: "(01) Run analysis",
        commands: {
          linux: `sonar-scanner \\\n  -Dsonar.projectKey=my-project \\\n  -Dsonar.sources=. \\\n  -Dsonar.host.url=http://localhost:9000 \\\n  -Dsonar.token=YOUR_TOKEN`,
          mac: `sonar-scanner -Dsonar.projectKey=my-project -Dsonar.sources=. -Dsonar.host.url=http://localhost:9000`,
          windows: `sonar-scanner -Dsonar.projectKey=my-project -Dsonar.sources=. -Dsonar.host.url=http://localhost:9000`,
        },
      },
    ],
  },
};

export const eksctl: ToolGuide = {
  slug: "eksctl",
  name: "eksctl",
  category: "cloud",
  description: "Official CLI for creating and managing AWS EKS clusters",
  icon: "⚡",
  install: {
    id: "install",
    title: "Install eksctl",
    steps: [
      {
        title: "(01) Install",
        commands: {
          linux: `# Linux\nARCH=amd64\nPLATFORM=$(uname -s)_$ARCH\ncurl -sLO "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$PLATFORM.tar.gz"\ntar -xzf eksctl_$PLATFORM.tar.gz -C /tmp && sudo mv /tmp/eksctl /usr/local/bin`,
          mac: "brew install eksctl",
          windows: "choco install eksctl -y",
        },
      },
    ],
  },
  verify: {
    id: "verify",
    title: "Verify",
    steps: [{ title: "(01) Version", commands: { linux: "eksctl version\naws sts get-caller-identity", mac: "eksctl version", windows: "eksctl version" } }],
  },
  manage: {
    id: "manage",
    title: "Manage EKS Clusters",
    steps: [
      {
        title: "(01) Create and manage cluster",
        commands: {
          linux: `# Create cluster\neksctl create cluster --name my-cluster --region us-east-1 --nodes 2\n\n# List clusters\neksctl get cluster\n\n# Delete cluster\neksctl delete cluster --name my-cluster --region us-east-1`,
          mac: `eksctl create cluster --name my-cluster --region us-east-1 --nodes 2\neksctl get cluster`,
          windows: `eksctl create cluster --name my-cluster --region us-east-1 --nodes 2\neksctl get cluster`,
        },
      },
    ],
  },
};

export const prometheus: ToolGuide = {
  slug: "prometheus",
  name: "Prometheus",
  category: "monitoring",
  description: "Open-source monitoring and alerting toolkit with time-series database",
  icon: "📊",
  install: {
    id: "install",
    title: "Install Prometheus",
    steps: [
      {
        title: "(01) Run with Docker",
        commands: {
          linux: `docker run -d --name prometheus -p 9090:9090 \\\n  -v ./prometheus.yml:/etc/prometheus/prometheus.yml \\\n  prom/prometheus\n# UI: http://localhost:9090`,
          mac: `docker run -d --name prometheus -p 9090:9090 prom/prometheus\nopen http://localhost:9090`,
          windows: `docker run -d --name prometheus -p 9090:9090 prom/prometheus`,
        },
      },
      {
        title: "(02) Install binary (Linux)",
        commands: {
          linux: `wget https://github.com/prometheus/prometheus/releases/download/v2.54.0/prometheus-2.54.0.linux-amd64.tar.gz\ntar xvfz prometheus-*.tar.gz\ncd prometheus-*\n./prometheus --config.file=prometheus.yml`,
          mac: "brew install prometheus\nbrew services start prometheus",
          windows: "# Use Docker or download from GitHub releases",
        },
      },
    ],
  },
  configure: {
    id: "configure",
    title: "Configure Prometheus",
    steps: [
      {
        title: "(01) prometheus.yml scrape config",
        commands: {
          linux: `cat > prometheus.yml << 'EOF'
global:
  scrape_interval: 15s
scrape_configs:
  - job_name: prometheus
    static_configs:
      - targets: ["localhost:9090"]
  - job_name: node
    static_configs:
      - targets: ["localhost:9100"]
  - job_name: kubernetes-pods
    kubernetes_sd_configs:
      - role: pod
EOF

docker restart prometheus`,
          mac: "# Edit prometheus.yml and restart container",
          windows: "# Edit prometheus.yml and restart container",
        },
      },
    ],
  },
  verify: {
    id: "verify",
    title: "Verify",
    steps: [{ title: "(01) Check targets", commands: { linux: "curl http://localhost:9090/-/healthy", mac: "curl http://localhost:9090/-/healthy", windows: "curl http://localhost:9090/-/healthy" } }],
  },
  manage: {
    id: "manage",
    title: "Query & Monitor",
    steps: [
      {
        title: "(01) PromQL examples",
        commands: {
          linux: `# Via UI at http://localhost:9090/graph\n# up — target health\n# rate(http_requests_total[5m]) — request rate\n# node_memory_MemAvailable_bytes — memory`,
          mac: "# Open http://localhost:9090/graph",
          windows: "# Open http://localhost:9090/graph",
        },
      },
    ],
  },
};

export const grafana: ToolGuide = {
  slug: "grafana",
  name: "Grafana",
  category: "monitoring",
  description: "Visualization and dashboard platform for metrics, logs, and traces",
  icon: "📈",
  install: {
    id: "install",
    title: "Install Grafana",
    steps: [
      {
        title: "(01) Run with Docker",
        commands: {
          linux: `docker run -d --name grafana -p 3000:3000 grafana/grafana\n# UI: http://localhost:3000 (admin/admin)`,
          mac: `docker run -d --name grafana -p 3000:3000 grafana/grafana\nopen http://localhost:3000`,
          windows: `docker run -d --name grafana -p 3000:3000 grafana/grafana`,
        },
      },
      {
        title: "(02) Package install",
        commands: {
          linux: `sudo apt-get install -y software-properties-common\nsudo add-apt-repository "deb https://packages.grafana.com/oss/deb stable main"\nsudo apt-get update && sudo apt-get install grafana\nsudo systemctl enable grafana-server`,
          mac: "brew install grafana\nbrew services start grafana",
          windows: "choco install grafana -y",
        },
      },
    ],
  },
  configure: {
    id: "configure",
    title: "Configure Grafana",
    steps: [
      {
        title: "(01) Add data sources and dashboards",
        commands: {
          linux: `# Web UI: http://localhost:3000
# 1. Configuration → Data Sources → Prometheus → URL: http://prometheus:9090
# 2. Dashboards → Import → ID 1860 (Node Exporter)
# 3. Alerting → Contact points → Email/Slack`,
          mac: "open http://localhost:3000",
          windows: "Start-Process http://localhost:3000",
        },
      },
      {
        title: "(02) Provisioning via config files",
        commands: {
          linux: `# datasources.yml:
cat > provisioning/datasources/ds.yml << 'EOF'
apiVersion: 1
datasources:
  - name: Prometheus
    type: prometheus
    url: http://prometheus:9090
    isDefault: true
EOF
# Mount to /etc/grafana/provisioning/datasources/`,
          mac: "# Same provisioning YAML",
          windows: "# Same provisioning YAML",
        },
      },
    ],
  },
  verify: {
    id: "verify",
    title: "Verify",
    steps: [{ title: "(01) Health check", commands: { linux: "curl http://localhost:3000/api/health", mac: "curl http://localhost:3000/api/health", windows: "curl http://localhost:3000/api/health" } }],
  },
  manage: {
    id: "manage",
    title: "Manage Grafana",
    steps: [
      {
        title: "(01) Add Prometheus data source",
        commands: {
          linux: `# In Grafana UI: Configuration → Data Sources → Add Prometheus\n# URL: http://prometheus:9090 (Docker network) or http://localhost:9090`,
          mac: "# Add Prometheus data source in UI at http://localhost:3000",
          windows: "# Add Prometheus data source in UI at http://localhost:3000",
        },
      },
    ],
  },
};

export const minikube: ToolGuide = {
  slug: "minikube",
  name: "Minikube",
  category: "container",
  description: "Run a local Kubernetes cluster on your laptop for development",
  icon: "🎯",
  install: {
    id: "install",
    title: "Install Minikube",
    steps: [
      {
        title: "(01) Install",
        commands: {
          linux: `curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64\nsudo install minikube-linux-amd64 /usr/local/bin/minikube\nminikube start --driver=docker`,
          mac: "brew install minikube\nminikube start",
          windows: "winget install Kubernetes.minikube\nminikube start --driver=hyperv",
        },
      },
    ],
  },
  configure: {
    id: "configure",
    title: "Configure Minikube",
    steps: [
      {
        title: "(01) Start with custom resources",
        commands: {
          linux: `minikube start --cpus=4 --memory=8192 --driver=docker
minikube addons enable ingress
minikube addons enable metrics-server
minikube addons list`,
          mac: `minikube start --cpus=4 --memory=8192\nminikube addons enable ingress\nminikube addons enable metrics-server`,
          windows: `minikube start --cpus=4 --memory=8192 --driver=hyperv\nminikube addons enable ingress`,
        },
      },
      {
        title: "(02) Load local images and deploy",
        commands: {
          linux: `docker build -t myapp:local .
minikube image load myapp:local
kubectl create deployment myapp --image=myapp:local
kubectl expose deployment myapp --type=NodePort --port=8080
minikube service myapp --url`,
          mac: `minikube image load myapp:local\nminikube service myapp --url`,
          windows: `minikube image load myapp:local\nminikube service myapp --url`,
        },
      },
    ],
  },
  verify: {
    id: "verify",
    title: "Verify",
    steps: [{ title: "(01) Cluster status", commands: { linux: "minikube status\nkubectl get nodes", mac: "minikube status\nkubectl get nodes", windows: "minikube status\nkubectl get nodes" } }],
  },
  manage: {
    id: "manage",
    title: "Manage Minikube",
    steps: [
      {
        title: "(01) Common commands",
        commands: {
          linux: `minikube start\nminikube stop\nminikube delete\nminikube dashboard\nminikube service my-svc --url\nminikube image load myapp:local`,
          mac: `minikube start\nminikube dashboard\nminikube service my-svc --url`,
          windows: `minikube start\nminikube dashboard`,
        },
      },
    ],
  },
};

export const githubActions: ToolGuide = {
  slug: "github-actions",
  name: "GitHub Actions",
  category: "cicd",
  description: "CI/CD automation built into GitHub repositories with workflow YAML",
  icon: "🐙",
  install: {
    id: "install",
    title: "Set Up GitHub Actions",
    steps: [
      {
        title: "(01) Create workflow file",
        description: "No install needed — add .github/workflows/ci.yml to your repo.",
        commands: {
          linux: `mkdir -p .github/workflows\ncat > .github/workflows/ci.yml << 'EOF'\nname: CI\non: [push, pull_request]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 20\n      - run: npm ci && npm test\nEOF`,
          mac: "# Create .github/workflows/ci.yml in your repo",
          windows: "# Create .github/workflows/ci.yml in your repo",
        },
      },
    ],
  },
  verify: {
    id: "verify",
    title: "Verify",
    steps: [{ title: "(01) Check workflow runs", commands: { linux: "gh run list\ngh run view", mac: "gh run list", windows: "gh run list" } }],
  },
  manage: {
    id: "manage",
    title: "Workflow Patterns",
    steps: [
      {
        title: "(01) Docker build & push workflow",
        commands: {
          linux: `# .github/workflows/docker.yml snippet:\n# - uses: docker/login-action@v3\n#   with:\n#     username: \${{ secrets.DOCKER_USER }}\n#     password: \${{ secrets.DOCKER_TOKEN }}\n# - uses: docker/build-push-action@v5\n#   with:\n#     push: true\n#     tags: user/app:latest`,
          mac: "# See Deployments section for full CI/CD YAML examples",
          windows: "# See Deployments section for full CI/CD YAML examples",
        },
      },
    ],
  },
};
