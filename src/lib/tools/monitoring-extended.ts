import type { ToolGuide } from "../types";

export const nagios: ToolGuide = {
  slug: "nagios",
  name: "Nagios",
  category: "monitoring",
  description: "Infrastructure monitoring and alerting for hosts and services",
  icon: "🔔",
  install: {
    id: "install",
    title: "Install Nagios",
    steps: [
      {
        title: "(01) Install Nagios Core",
        commands: {
          linux: `# Ubuntu / Debian
sudo apt-get install -y nagios4 nagios-plugins-contrib apache2

# RHEL / Fedora
sudo dnf install -y nagios nagios-plugins-all httpd

sudo systemctl enable nagios httpd
sudo systemctl start nagios httpd

# Default web UI: http://server/nagios
# Default user: nagiosadmin (set password during install)`,
          mac: "# Run via Docker:\ndocker run -d -p 8080:80 jasonrivers/nagios",
          windows: "# Use Nagios XI trial or Docker container",
        },
      },
    ],
  },
  configure: {
    id: "configure",
    title: "Configure Nagios",
    steps: [
      {
        title: "(01) Define host and service checks",
        commands: {
          linux: `sudo nano /etc/nagios4/conf.d/hosts.cfg

define host {
    use                     generic-host
    host_name               webserver1
    alias                   Web Server 1
    address                 192.168.1.21
    max_check_attempts      5
}

sudo nano /etc/nagios4/conf.d/services.cfg

define service {
    use                     generic-service
    host_name               webserver1
    service_description     HTTP
    check_command           check_http
}

sudo nagios4 -v /etc/nagios4/nagios.cfg
sudo systemctl restart nagios4`,
          mac: "# Configure in Docker Nagios volume mounts",
          windows: "# Docker Nagios configuration",
        },
      },
      {
        title: "(02) Email alert notifications",
        commands: {
          linux: `# Install mail utils
sudo apt-get install -y mailutils

# Edit contacts and commands:
sudo nano /etc/nagios4/conf.d/contacts.cfg
# define contact { contact_name admin; email admin@example.com; ... }

sudo systemctl restart nagios4`,
          mac: "# Configure contacts in Docker Nagios",
          windows: "# Configure email in Docker Nagios",
        },
      },
    ],
  },
  verify: {
    id: "verify",
    title: "Verify Nagios",
    steps: [
      {
        title: "(01) Check config and web UI",
        commands: {
          linux: `sudo nagios4 -v /etc/nagios4/nagios.cfg\nsudo systemctl status nagios4\ncurl -I http://localhost/nagios4/`,
          mac: "curl -I http://localhost:8080",
          windows: "curl http://localhost:8080",
        },
      },
    ],
  },
  manage: {
    id: "manage",
    title: "Manage Nagios",
    steps: [
      {
        title: "(01) Add hosts and reload",
        commands: {
          linux: `# After editing configs:
sudo nagios4 -v /etc/nagios4/nagios.cfg
sudo systemctl reload nagios4

# External commands (schedule downtime):
echo "[$(date +%s)] SCHEDULE_HOST_DOWNTIME;webserver1;$(date +%s);$(($(date +%s)+3600);1;0;0;Admin;Maintenance" | sudo tee /var/lib/nagios4/rw/nagios.cmd`,
          mac: "docker restart nagios",
          windows: "docker restart nagios",
        },
      },
    ],
  },
};

export const zabbix: ToolGuide = {
  slug: "zabbix",
  name: "Zabbix",
  category: "monitoring",
  description: "Enterprise monitoring for networks, servers, and applications",
  icon: "📡",
  install: {
    id: "install",
    title: "Install Zabbix",
    steps: [
      {
        title: "(01) Install Zabbix 7.0 LTS with Docker",
        commands: {
          linux: `# Clone official compose
git clone https://github.com/zabbix/zabbix-docker.git
cd zabbix-docker
docker compose -f docker-compose_v3_alpine_mysql_latest.yaml up -d

# Web UI: http://server:8080
# Default login: Admin / zabbix`,
          mac: `git clone https://github.com/zabbix/zabbix-docker.git
cd zabbix-docker
docker compose -f docker-compose_v3_alpine_mysql_latest.yaml up -d`,
          windows: `# Same Docker Compose approach in WSL or Docker Desktop`,
        },
      },
      {
        title: "(02) Package install (Ubuntu)",
        commands: {
          linux: `wget https://repo.zabbix.com/zabbix/7.0/ubuntu/pool/main/z/zabbix-release/zabbix-release_7.0-1+ubuntu22.04_all.deb
sudo dpkg -i zabbix-release_7.0-1+ubuntu22.04_all.deb
sudo apt update
sudo apt install -y zabbix-server-mysql zabbix-frontend-php zabbix-apache-conf zabbix-sql-scripts zabbix-agent
sudo systemctl restart zabbix-server zabbix-agent apache2`,
          mac: "# Use Docker method on Mac",
          windows: "# Use Docker method",
        },
      },
    ],
  },
  configure: {
    id: "configure",
    title: "Configure Zabbix",
    steps: [
      {
        title: "(01) Initial web setup wizard",
        commands: {
          linux: `# Open http://server:8080
# 1. Check prerequisites
# 2. Configure DB connection (MySQL/PostgreSQL)
# 3. Set Zabbix server name
# 4. Login: Admin / zabbix — CHANGE PASSWORD immediately`,
          mac: "open http://localhost:8080",
          windows: "Start-Process http://localhost:8080",
        },
      },
      {
        title: "(02) Add monitoring host (Linux agent)",
        commands: {
          linux: `# On monitored host — install agent
sudo apt install -y zabbix-agent

sudo nano /etc/zabbix/zabbix_agentd.conf
# Server=192.168.1.10
# ServerActive=192.168.1.10
# Hostname=webserver1

sudo systemctl restart zabbix-agent

# In Zabbix UI: Data collection → Hosts → Create host
# Add Linux by Zabbix agent template`,
          mac: "brew install zabbix-agent",
          windows: `# Download Zabbix Agent MSI from zabbix.com
# Configure zabbix_agentd.conf with Server IP`,
        },
      },
      {
        title: "(03) Configure triggers and alerts",
        commands: {
          linux: `# In Zabbix UI:
# Alerts → Media types → Email (configure SMTP)
# Alerts → Actions → Trigger actions → add send email
# Monitoring → Latest data — verify metrics flowing`,
          mac: "# Configure in Zabbix web UI",
          windows: "# Configure in Zabbix web UI",
        },
      },
    ],
  },
  verify: {
    id: "verify",
    title: "Verify Zabbix",
    steps: [
      {
        title: "(01) Check server and agent",
        commands: {
          linux: `sudo systemctl status zabbix-server
zabbix_agentd -t agent.ping
# In UI: Monitoring → Hosts — green ZBX icon = agent OK`,
          mac: "docker ps | grep zabbix",
          windows: "Get-Service \"Zabbix Agent\"",
        },
      },
    ],
  },
  manage: {
    id: "manage",
    title: "Manage Zabbix",
    steps: [
      {
        title: "(01) Maintenance and discovery",
        commands: {
          linux: `# Network discovery in UI: Data collection → Discovery
# Maintenance window: Services → Maintenance periods
# Export/import templates: Data collection → Templates`,
          mac: "# Zabbix web UI management",
          windows: "# Zabbix web UI management",
        },
      },
    ],
  },
};

export const prometheusGrafana: ToolGuide = {
  slug: "prometheus-grafana",
  name: "Prometheus + Grafana Stack",
  category: "monitoring",
  description: "Full observability stack — metrics collection with Prometheus and dashboards in Grafana",
  icon: "📊",
  install: {
    id: "install",
    title: "Install Prometheus + Grafana",
    steps: [
      {
        title: "(01) Docker Compose full stack",
        commands: {
          linux: `mkdir prometheus-grafana && cd prometheus-grafana

cat > docker-compose.yml << 'EOF'
services:
  prometheus:
    image: prom/prometheus:latest
    ports: ["9090:9090"]
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prom_data:/prometheus

  grafana:
    image: grafana/grafana:latest
    ports: ["3000:3000"]
    environment:
      GF_SECURITY_ADMIN_PASSWORD: admin
    volumes:
      - grafana_data:/var/lib/grafana
    depends_on: [prometheus]

  node-exporter:
    image: prom/node-exporter:latest
    ports: ["9100:9100"]

volumes:
  prom_data:
  grafana_data:
EOF

cat > prometheus.yml << 'EOF'
global:
  scrape_interval: 15s
scrape_configs:
  - job_name: prometheus
    static_configs:
      - targets: ["localhost:9090"]
  - job_name: node
    static_configs:
      - targets: ["node-exporter:9100"]
EOF

docker compose up -d`,
          mac: `# Same docker-compose.yml\nopen http://localhost:3000\nopen http://localhost:9090`,
          windows: `# Same docker-compose.yml in Docker Desktop`,
        },
      },
    ],
  },
  configure: {
    id: "configure",
    title: "Configure Stack",
    steps: [
      {
        title: "(01) Add Prometheus data source in Grafana",
        commands: {
          linux: `# Open http://localhost:3000 (admin/admin)
# Configuration → Data Sources → Add Prometheus
# URL: http://prometheus:9090 (Docker network)
# Or: http://host.docker.internal:9090

# Save & Test → should show "Data source is working"`,
          mac: "open http://localhost:3000",
          windows: "Start-Process http://localhost:3000",
        },
      },
      {
        title: "(02) Import Node Exporter dashboard",
        commands: {
          linux: `# In Grafana UI:
# Dashboards → New → Import
# Dashboard ID: 1860 (Node Exporter Full)
# Select Prometheus data source → Import

# Custom PromQL queries:
# node_memory_MemAvailable_bytes
# rate(node_cpu_seconds_total{mode="idle"}[5m])`,
          mac: "# Import dashboard ID 1860 in Grafana",
          windows: "# Import dashboard ID 1860 in Grafana",
        },
      },
      {
        title: "(03) Add alert rules in Prometheus",
        commands: {
          linux: `# prometheus.yml — add rule_files:
rule_files:
  - /etc/prometheus/alert.rules.yml

# alert.rules.yml:
groups:
  - name: example
    rules:
      - alert: HighCPU
        expr: 100 - (avg by(instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 80
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High CPU on {{ $labels.instance }}"

docker compose restart prometheus`,
          mac: "# Same alert rules config",
          windows: "# Same alert rules config",
        },
      },
    ],
  },
  verify: {
    id: "verify",
    title: "Verify Stack",
    steps: [
      {
        title: "(01) Check all services",
        commands: {
          linux: `curl http://localhost:9090/-/healthy\ncurl http://localhost:3000/api/health\ncurl http://localhost:9100/metrics | head\n# Prometheus targets: http://localhost:9090/targets`,
          mac: "curl http://localhost:9090/targets",
          windows: "curl http://localhost:9090/-/healthy",
        },
      },
    ],
  },
  manage: {
    id: "manage",
    title: "Manage Stack",
    steps: [
      {
        title: "(01) Add scrape targets and backup",
        commands: {
          linux: `# Add target to prometheus.yml:
# - job_name: myapp
#   static_configs:
#     - targets: ["app:8080"]

docker compose restart prometheus

# Backup Grafana dashboards:
# Export JSON from UI or use grafana-cli`,
          mac: "docker compose restart prometheus",
          windows: "docker compose restart prometheus",
        },
      },
    ],
  },
};
