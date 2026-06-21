import type { ToolGuide } from "../types";

export const docker: ToolGuide = {
  slug: "docker",
  name: "Docker",
  category: "container",
  description: "Container platform for building, shipping, and running applications",
  icon: "🐳",
  install: {
    id: "install",
    title: "Install Docker",
    steps: [
      {
        title: "(01) Install Docker Engine",
        description: "Install the Docker container runtime on your system.",
        commands: {
          linux: `# Ubuntu / Debian
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# RHEL / CentOS / Fedora
sudo dnf -y install dnf-plugins-core
sudo dnf config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo dnf install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin`,
          mac: `# Install Docker Desktop for Mac
brew install --cask docker

# Or download from:
# https://docs.docker.com/desktop/setup/install/mac-install/`,
          windows: `# Install Docker Desktop for Windows (PowerShell as Admin)
winget install Docker.DockerDesktop

# Or download from:
# https://docs.docker.com/desktop/setup/install/windows-install/`,
        },
      },
      {
        title: "(02) Start Docker Service",
        commands: {
          linux: `sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker $USER
# Log out and back in for group changes to take effect`,
          mac: `# Start Docker Desktop from Applications
open -a Docker`,
          windows: `# Start Docker Desktop from Start Menu
# Enable WSL 2 backend (recommended) in Settings > General`,
        },
      },
    ],
  },
  verify: {
    id: "verify",
    title: "Verify Installation",
    steps: [
      {
        title: "(01) Check Docker Version",
        commands: {
          linux: "docker --version\ndocker compose version",
          mac: "docker --version\ndocker compose version",
          windows: "docker --version\ndocker compose version",
        },
      },
      {
        title: "(02) Run Hello World Container",
        commands: {
          linux: "docker run hello-world",
          mac: "docker run hello-world",
          windows: "docker run hello-world",
        },
      },
    ],
  },
  manage: {
    id: "manage",
    title: "Manage Docker",
    steps: [
      {
        title: "(01) Container Operations",
        commands: {
          linux: `# List running containers
docker ps

# List all containers
docker ps -a

# Start / Stop / Remove
docker start <container>
docker stop <container>
docker rm <container>`,
          mac: `# List running containers
docker ps

# List all containers
docker ps -a

# Start / Stop / Remove
docker start <container>
docker stop <container>
docker rm <container>`,
          windows: `# List running containers
docker ps

# List all containers
docker ps -a

# Start / Stop / Remove
docker start <container>
docker stop <container>
docker rm <container>`,
        },
      },
      {
        title: "(02) Image Operations",
        commands: {
          linux: `# List images
docker images

# Pull / Build / Remove
docker pull nginx:latest
docker build -t myapp:1.0 .
docker rmi <image>`,
          mac: `# List images
docker images

# Pull / Build / Remove
docker pull nginx:latest
docker build -t myapp:1.0 .
docker rmi <image>`,
          windows: `# List images
docker images

# Pull / Build / Remove
docker pull nginx:latest
docker build -t myapp:1.0 .
docker rmi <image>`,
        },
      },
      {
        title: "(03) Docker Compose",
        commands: {
          linux: `# Start services
docker compose up -d

# View logs
docker compose logs -f

# Stop and remove
docker compose down`,
          mac: `# Start services
docker compose up -d

# View logs
docker compose logs -f

# Stop and remove
docker compose down`,
          windows: `# Start services
docker compose up -d

# View logs
docker compose logs -f

# Stop and remove
docker compose down`,
        },
      },
      {
        title: "(04) System Cleanup",
        commands: {
          linux: `# Remove unused containers, networks, images
docker system prune -a

# Remove unused volumes (careful!)
docker volume prune`,
          mac: `docker system prune -a\ndocker volume prune`,
          windows: `docker system prune -a\ndocker volume prune`,
        },
      },
    ],
  },
  uninstall: {
    id: "uninstall",
    title: "Uninstall Docker",
    steps: [
      {
        title: "(01) Remove Docker",
        commands: {
          linux: `# Ubuntu / Debian
sudo apt-get purge -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo rm -rf /var/lib/docker /var/lib/containerd`,
          mac: `brew uninstall --cask docker\nrm -rf ~/Library/Group\\ Containers/group.com.docker`,
          windows: `winget uninstall Docker.DockerDesktop`,
        },
      },
    ],
  },
};
