import type { ToolGuide } from "../types";

export const nginx: ToolGuide = {
  slug: "nginx",
  name: "Nginx",
  category: "networking",
  description: "High-performance web server and reverse proxy",
  icon: "🌐",
  install: {
    id: "install",
    title: "Install Nginx",
    steps: [{
      title: "(01) Install",
      commands: {
        linux: "sudo apt-get update && sudo apt-get install -y nginx\nsudo systemctl enable nginx && sudo systemctl start nginx",
        mac: "brew install nginx\nbrew services start nginx",
        windows: "# Use WSL or Docker:\ndocker run -d -p 80:80 nginx:alpine",
      },
    }],
  },
  configure: {
    id: "configure",
    title: "Configure Nginx",
    steps: [{
      title: "(01) Virtual host + reverse proxy",
      commands: {
        linux: `sudo nano /etc/nginx/sites-available/myapp
# server {
#   listen 80;
#   server_name example.com;
#   location / { proxy_pass http://127.0.0.1:3000; }
# }
sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx`,
        mac: "nginx -t && brew services restart nginx",
        windows: "# Configure in WSL nginx",
      },
    }],
  },
  verify: { id: "verify", title: "Verify", steps: [{ title: "(01) Test", commands: { linux: "curl -I http://localhost", mac: "curl -I http://localhost:8080", windows: "curl http://localhost" } }] },
  manage: { id: "manage", title: "Manage", steps: [{ title: "(01) Reload", commands: { linux: "sudo nginx -t && sudo systemctl reload nginx", mac: "nginx -s reload", windows: "nginx -s reload" } }] },
};

export const postgresql: ToolGuide = {
  slug: "postgresql",
  name: "PostgreSQL",
  category: "database",
  description: "Advanced open-source relational database",
  icon: "🐘",
  install: {
    id: "install",
    title: "Install PostgreSQL",
    steps: [{
      title: "(01) Install",
      commands: {
        linux: "sudo apt-get install -y postgresql postgresql-contrib\nsudo systemctl enable postgresql",
        mac: "brew install postgresql@16\nbrew services start postgresql@16",
        windows: "winget install PostgreSQL.PostgreSQL.16",
      },
    }],
  },
  configure: {
    id: "configure",
    title: "Configure PostgreSQL",
    steps: [{
      title: "(01) Create database and user",
      commands: {
        linux: `sudo -u postgres psql
CREATE USER myuser WITH PASSWORD 'mypass';
CREATE DATABASE mydb OWNER myuser;
\\q`,
        mac: "createuser myuser\ncreatedb mydb",
        windows: "psql -U postgres\nCREATE DATABASE mydb;",
      },
    }],
  },
  verify: { id: "verify", title: "Verify", steps: [{ title: "(01) Connect", commands: { linux: "psql -U myuser -d mydb -c 'SELECT version();'", mac: "psql -d mydb -c 'SELECT 1;'", windows: "psql -U postgres -c \"SELECT version();\"" } }] },
  manage: { id: "manage", title: "Manage", steps: [{ title: "(01) Backup", commands: { linux: "pg_dump mydb > backup.sql\npsql mydb < backup.sql", mac: "pg_dump mydb > backup.sql", windows: "pg_dump -U postgres mydb > backup.sql" } }] },
};

export const redis: ToolGuide = {
  slug: "redis",
  name: "Redis",
  category: "database",
  description: "In-memory data store for caching and sessions",
  icon: "⚡",
  install: {
    id: "install",
    title: "Install Redis",
    steps: [{
      title: "(01) Install",
      commands: {
        linux: "sudo apt-get install -y redis-server\nsudo systemctl enable redis-server",
        mac: "brew install redis\nbrew services start redis",
        windows: "docker run -d -p 6379:6379 redis:alpine",
      },
    }],
  },
  configure: {
    id: "configure",
    title: "Configure Redis",
    steps: [{
      title: "(01) Basic config",
      commands: {
        linux: `sudo nano /etc/redis/redis.conf
# bind 127.0.0.1
# requirepass yourpassword
sudo systemctl restart redis-server
redis-cli ping  # PONG`,
        mac: "redis-cli ping",
        windows: "docker exec -it redis redis-cli ping",
      },
    }],
  },
  verify: { id: "verify", title: "Verify", steps: [{ title: "(01) Test", commands: { linux: "redis-cli set test hello\nredis-cli get test", mac: "redis-cli ping", windows: "redis-cli ping" } }] },
  manage: { id: "manage", title: "Manage", steps: [{ title: "(01) Info", commands: { linux: "redis-cli info memory\nredis-cli monitor", mac: "redis-cli info", windows: "redis-cli info" } }] },
};

export const certbot: ToolGuide = {
  slug: "certbot",
  name: "Certbot (Let's Encrypt)",
  category: "security",
  description: "Free HTTPS/SSL certificates for your website",
  icon: "🔒",
  install: {
    id: "install",
    title: "Install Certbot",
    steps: [{
      title: "(01) Install",
      commands: {
        linux: "sudo apt-get install -y certbot python3-certbot-nginx\n# Or standalone:\nsudo apt-get install -y certbot",
        mac: "brew install certbot",
        windows: "# Use certbot in WSL or win-acme for Windows IIS",
      },
    }],
  },
  configure: {
    id: "configure",
    title: "Get SSL Certificate",
    steps: [{
      title: "(01) Obtain and auto-configure nginx",
      commands: {
        linux: `sudo certbot --nginx -d example.com -d www.example.com
# Auto-renewal test:
sudo certbot renew --dry-run`,
        mac: "sudo certbot certonly --standalone -d example.com",
        windows: "# wsl certbot --nginx -d example.com",
      },
    }],
  },
  verify: { id: "verify", title: "Verify", steps: [{ title: "(01) Check cert", commands: { linux: "sudo certbot certificates\ncurl -I https://example.com", mac: "certbot certificates", windows: "certbot certificates" } }] },
  manage: { id: "manage", title: "Manage", steps: [{ title: "(01) Renew", commands: { linux: "sudo certbot renew\nsudo systemctl status certbot.timer", mac: "certbot renew", windows: "certbot renew" } }] },
};

export const wireguard: ToolGuide = {
  slug: "wireguard",
  name: "WireGuard VPN",
  category: "networking",
  description: "Modern, fast VPN for secure remote access",
  icon: "🛡️",
  install: {
    id: "install",
    title: "Install WireGuard",
    steps: [{
      title: "(01) Install",
      commands: {
        linux: "sudo apt-get install -y wireguard\n# RHEL: sudo dnf install wireguard-tools",
        mac: "brew install wireguard-tools",
        windows: "# Download WireGuard client from wireguard.com/install",
      },
    }],
  },
  configure: {
    id: "configure",
    title: "Configure VPN",
    steps: [{
      title: "(01) Server config",
      commands: {
        linux: `# Generate keys
wg genkey | tee privatekey | wg pubkey > publickey

sudo nano /etc/wireguard/wg0.conf
# [Interface]
# Address = 10.0.0.1/24
# PrivateKey = <server-private-key>
# ListenPort = 51820
# [Peer]
# PublicKey = <client-public-key>
# AllowedIPs = 10.0.0.2/32

sudo systemctl enable wg-quick@wg0
sudo systemctl start wg-quick@wg0`,
        mac: "# WireGuard via App Store or wg-quick",
        windows: "# Import tunnel config in WireGuard GUI",
      },
    }],
  },
  verify: { id: "verify", title: "Verify", steps: [{ title: "(01) Status", commands: { linux: "sudo wg show", mac: "sudo wg show", windows: "# Check WireGuard app status" } }] },
  manage: { id: "manage", title: "Manage", steps: [{ title: "(01) Add peer", commands: { linux: "sudo wg set wg0 peer <pubkey> allowed-ips 10.0.0.3/32", mac: "sudo wg show", windows: "# Add peer in config file" } }] },
};

export const podman: ToolGuide = {
  slug: "podman",
  name: "Podman",
  category: "container",
  description: "Daemonless container engine — Docker-compatible CLI",
  icon: "🦭",
  install: {
    id: "install",
    title: "Install Podman",
    steps: [{
      title: "(01) Install",
      commands: {
        linux: "sudo apt-get install -y podman\n# RHEL: sudo dnf install -y podman",
        mac: "brew install podman\npodman machine init && podman machine start",
        windows: "winget install RedHat.Podman",
      },
    }],
  },
  configure: {
    id: "configure",
    title: "Configure Podman",
    steps: [{
      title: "(01) Docker-compatible alias",
      commands: {
        linux: `podman run hello-world
# Optional alias:
echo 'alias docker=podman' >> ~/.bashrc
podman compose up -d`,
        mac: "podman machine start\npodman run hello-world",
        windows: "podman run hello-world",
      },
    }],
  },
  verify: { id: "verify", title: "Verify", steps: [{ title: "(01) Version", commands: { linux: "podman --version\npodman ps", mac: "podman --version", windows: "podman --version" } }] },
  manage: { id: "manage", title: "Manage", steps: [{ title: "(01) Commands", commands: { linux: "podman ps -a\npodman build -t myapp .\npodman compose up -d", mac: "podman ps", windows: "podman ps" } }] },
};

export const gitlabCi: ToolGuide = {
  slug: "gitlab-ci",
  name: "GitLab CI",
  category: "cicd",
  description: "Built-in CI/CD pipelines for GitLab repositories",
  icon: "🦊",
  install: {
    id: "install",
    title: "Set Up GitLab CI",
    steps: [{
      title: "(01) Add .gitlab-ci.yml",
      description: "No install needed — add pipeline file to your GitLab repo.",
      commands: {
        linux: `cat > .gitlab-ci.yml << 'EOF'
stages: [build, test, deploy]
build:
  stage: build
  script: [npm ci, npm run build]
test:
  stage: test
  script: [npm test]
EOF
git add .gitlab-ci.yml && git commit -m "Add CI" && git push`,
        mac: "# Create .gitlab-ci.yml in repo root",
        windows: "# Create .gitlab-ci.yml in repo root",
      },
    }],
  },
  configure: {
    id: "configure",
    title: "Configure Pipeline",
    steps: [{
      title: "(01) Docker-based jobs",
      commands: {
        linux: `# .gitlab-ci.yml with Docker image:
# build:
#   image: node:20
#   script: [npm ci, npm run build]
#   artifacts:
#     paths: [dist/]`,
        mac: "# Same .gitlab-ci.yml format",
        windows: "# Same .gitlab-ci.yml format",
      },
    }],
  },
  verify: { id: "verify", title: "Verify", steps: [{ title: "(01) Check pipeline", commands: { linux: "# GitLab UI → CI/CD → Pipelines", mac: "# GitLab UI → Pipelines", windows: "# GitLab UI → Pipelines" } }] },
  manage: { id: "manage", title: "Manage", steps: [{ title: "(01) Variables", commands: { linux: "# Settings → CI/CD → Variables\n# Add DOCKER_TOKEN, SSH_KEY, etc.", mac: "# GitLab project settings", windows: "# GitLab project settings" } }] },
};
