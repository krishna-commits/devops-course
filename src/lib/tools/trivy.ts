import type { ToolGuide } from "../types";

export const trivy: ToolGuide = {
  slug: "trivy",
  name: "Trivy",
  category: "monitoring",
  description: "Comprehensive security scanner for containers and IaC",
  icon: "🔒",
  install: {
    id: "install",
    title: "Install Trivy",
    steps: [
      {
        title: "(01) Install Trivy",
        commands: {
          linux: `# Ubuntu / Debian
sudo apt-get install wget apt-transport-https gnupg lsb-release
wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | gpg --dearmor | sudo tee /usr/share/keyrings/trivy.gpg > /dev/null
echo "deb [signed-by=/usr/share/keyrings/trivy.gpg] https://aquasecurity.github.io/trivy-repo/deb generic main" | sudo tee /etc/apt/sources.list.d/trivy.list
sudo apt-get update
sudo apt-get install trivy

# Or direct install
curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b /usr/local/bin`,
          mac: "brew install trivy",
          windows: `# Scoop
scoop install trivy

# Or Chocolatey
choco install trivy -y`,
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
          linux: "trivy --version",
          mac: "trivy --version",
          windows: "trivy --version",
        },
      },
    ],
  },
  manage: {
    id: "manage",
    title: "Scan with Trivy",
    steps: [
      {
        title: "(01) Scan Container Images",
        commands: {
          linux: `# Scan image for vulnerabilities
trivy image nginx:latest

# Scan with severity filter
trivy image --severity HIGH,CRITICAL nginx:latest

# Output as JSON
trivy image -f json -o results.json nginx:latest`,
          mac: `trivy image nginx:latest
trivy image --severity HIGH,CRITICAL nginx:latest`,
          windows: `trivy image nginx:latest
trivy image --severity HIGH,CRITICAL nginx:latest`,
        },
      },
      {
        title: "(02) Scan Filesystem & IaC",
        commands: {
          linux: `# Scan local filesystem
trivy fs .

# Scan Terraform
trivy config ./terraform/

# Scan Kubernetes manifests
trivy config ./k8s/`,
          mac: `trivy fs .
trivy config ./terraform/`,
          windows: `trivy fs .
trivy config .\\terraform\\`,
        },
      },
      {
        title: "(03) Update Database",
        commands: {
          linux: "trivy image --download-db-only",
          mac: "trivy image --download-db-only",
          windows: "trivy image --download-db-only",
        },
      },
    ],
  },
};
