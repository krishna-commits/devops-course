# 🚀 **DevOps World – Setup, Installation, Runbooks & Guides**

[![GitHub stars](https://img.shields.io/github/stars/krishna-commits/devops?style=social)](https://github.com/krishna-commits/devops/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/krishna-commits/devops?style=social)](https://github.com/krishna-commits/devops/network/members)
[![GitHub issues](https://img.shields.io/github/issues/krishna-commits/devops)](https://github.com/krishna-commits/devops/issues)
[![GitHub license](https://img.shields.io/github/license/krishna-commits/devops)](https://github.com/krishna-commits/devops/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/krishna-commits/devops/pulls)
[![Live site](https://img.shields.io/badge/live-devops.krishnaneupane.com-blue)](https://devops.krishnaneupane.com)

<div align="center">

🔹 **128 tool guides** — install, configure, troubleshoot on Linux, Mac, and Windows  
🔹 **23 incident runbooks** · **118+ snippets** · **37 config templates** · **12 ship-it flows**  
🔹 **Symptom → command** search, prod-delta YAML, offline PWA — built for on-call engineers  

**Live site:** [devops.krishnaneupane.com](https://devops.krishnaneupane.com)

[⬆️ Back to Top](#-devops-world--setup-installation-runbooks--guides)

</div>

---

## 📑 **Table of Contents**

- [📌 Tools Included](#-tools-included)
- [📋 Tool Installation Guides](#-tool-installation-guides)
- [🚨 Runbooks & Ship-it Flows](#-runbooks--ship-it-flows)
- [📖 How to Use This Repository](#-how-to-use-this-repository)
- [💻 Local Development](#-local-development)
- [📅 Planned Updates](#-planned-updates)
- [⭐ Support & Contribution](#-support--contribution)
- [📢 Author & Contact](#-author--contact)

---

## 📌 **Tools Included**

### 🌐 **Networking & Server**

- **SSH Server** — Secure remote shell access, key authentication, and file transfer
- **DNS Server (BIND)** — Configure BIND9 DNS server for internal and external name resolution
- **DHCP Server** — Automatic IP address assignment for network clients
- **HAProxy** — High availability load balancer and reverse proxy for TCP/HTTP traffic
- **Nginx** — High-performance web server and reverse proxy
- **WireGuard VPN** — Modern, fast VPN for secure remote access
- **OpenVPN** — Classic VPN server for secure remote network access
- **Apache HTTP Server** — Classic web server (httpd) for websites and apps
- **Traefik** — Modern reverse proxy and load balancer with auto HTTPS
- **Consul** — Service discovery, health checks, and key-value store
- **Squid Proxy** — Caching forward and reverse proxy server
- **Keepalived** — High availability with VRRP floating IP failover
- **Postfix** — Mail transfer agent (MTA) for sending email
- **tmux** — Terminal multiplexer — keep sessions running after SSH disconnect
- **FTP Server (vsftpd)** — File transfer protocol server for uploading and downloading files

### 🐳 **Container Platform**

- **Docker** — Container platform for building, shipping, and running applications
- **Docker Compose** — Define and run multi-container Docker applications with a single YAML file
- **Podman** — Daemonless container engine — Docker-compatible CLI
- **kubectl** — Kubernetes command-line tool for cluster management
- **Kubernetes (kubeadm)** — Production-grade container orchestration cluster setup
- **Minikube** — Run a local Kubernetes cluster on your laptop for development
- **K3s** — Lightweight Kubernetes — perfect for edge and small clusters
- **MicroK8s** — Single-command Kubernetes from Canonical
- **Kind** — Kubernetes in Docker — local dev clusters
- **Helm** — Package manager for Kubernetes applications
- **Kustomize** — Customize Kubernetes YAML without templates or Helm
- **Istio** — Service mesh for traffic, security, and observability
- **Linkerd** — Lightweight Kubernetes service mesh — mTLS, metrics, retries
- **Cilium** — eBPF-powered networking, security, and observability for Kubernetes
- **Calico** — Kubernetes network policies and eBPF networking
- **etcd** — Distributed key-value store — Kubernetes uses it for cluster state
- **Netflix Eureka** — Service registry for Java/Spring microservices discovery
- **Buildah** — Build OCI container images without Docker daemon
- **Harbor** — Private container registry with scanning and RBAC
- **Portainer** — Web UI to manage Docker and Kubernetes
- **Rancher** — Multi-cluster Kubernetes management platform
- **Velero** — Backup and restore Kubernetes clusters and persistent volumes

### 🖥️ **Virtualization & Cloud**

- **KVM Virtualization** — Kernel-based virtual machine hypervisor for Linux
- **Cloud Compute (OpenStack)** — Open-source cloud platform for VMs, networking, and storage
- **Vagrant** — Create and manage portable development VMs

### 💾 **Storage**

- **NFS Server** — Network File System for shared storage across Linux servers
- **Samba** — Windows-compatible file sharing on Linux

### 📊 **Monitoring & Observability**

- **Prometheus** — Open-source monitoring and alerting toolkit with time-series database
- **Grafana** — Visualization and dashboard platform for metrics, logs, and traces
- **Prometheus + Grafana Stack** — Full observability stack — metrics collection with Prometheus and dashboards in Grafana
- **Nagios** — Infrastructure monitoring and alerting for hosts and services
- **Zabbix** — Enterprise monitoring for networks, servers, and applications
- **SonarQube** — Continuous code quality and security analysis platform
- **Trivy** — Comprehensive security scanner for containers and IaC
- **Netdata** — Real-time server monitoring with beautiful dashboards
- **Elasticsearch** — Search and analytics engine — core of the ELK stack
- **Grafana Loki** — Log aggregation system — like Prometheus but for logs
- **Jaeger** — Distributed tracing for microservices
- **OpenTelemetry** — Unified standard for traces, metrics, and logs
- **Datadog Agent** — Infrastructure and APM monitoring SaaS agent
- **ELK Stack** — Elasticsearch + Logstash + Kibana — log aggregation and visualization
- **Fluentd** — Unified log collector — route logs to Elasticsearch, S3, Kafka, and more
- **Graylog** — Centralized log management with search, streams, and alerts
- **Kibana** — Elasticsearch UI for dashboards, log search, and APM
- **Splunk** — Enterprise log analytics — forwarder install and basic search
- **New Relic** — APM and infrastructure monitoring — agent install
- **Logz.io** — Managed ELK — ship logs with Filebeat or Fluentd
- **Syslog-ng** — Flexible log collection and routing for enterprise environments

### 🔄 **CI/CD & GitOps**

- **Jenkins** — Open-source automation server for CI/CD pipelines
- **GitHub Actions** — CI/CD automation built into GitHub repositories with workflow YAML
- **GitLab CI** — Built-in CI/CD pipelines for GitLab repositories
- **Argo CD** — GitOps continuous delivery for Kubernetes
- **Flux CD** — GitOps toolkit — sync Kubernetes from Git repos
- **Tekton** — Cloud-native CI/CD pipelines on Kubernetes
- **CircleCI** — Cloud CI/CD with fast parallel builds
- **Drone CI** — Container-native CI/CD — pipelines run in Docker
- **Buildkite** — Self-hosted agents with cloud pipeline orchestration
- **TeamCity** — JetBrains CI/CD server with powerful build chains
- **Travis CI** — Classic GitHub-integrated CI — .travis.yml in your repo
- **Azure DevOps Pipelines** — Microsoft CI/CD for Azure and multi-cloud deploys
- **Bitbucket Pipelines** — Built-in CI/CD for Bitbucket repositories
- **Slack** — Team messaging — webhooks and CI notifications
- **Jira** — Agile issue tracking — sprints, boards, and DevOps workflows
- **Trello** — Kanban boards for visual task and project tracking
- **Confluence** — Team wiki and documentation — runbooks and architecture docs

### 🏗️ **Infrastructure as Code**

- **Terraform** — Infrastructure as Code tool by HashiCorp
- **Ansible** — Agentless IT automation and configuration management
- **Terragrunt** — DRY wrapper for Terraform — manage many environments cleanly
- **Packer** — Build identical machine images for multiple platforms
- **Pulumi** — Infrastructure as code using real programming languages
- **Nomad** — HashiCorp workload orchestrator — containers, VMs, binaries

### ☁️ **Cloud CLI**

- **AWS CloudFormation** — Infrastructure as code for AWS — stacks of EC2, VPC, RDS, and more
- **AWS CLI** — Command-line interface for Amazon Web Services
- **Azure CLI** — Command-line tools for managing Microsoft Azure resources
- **Google Cloud CLI** — Manage Google Cloud Platform from your terminal
- **GitHub CLI (gh)** — Manage GitHub repos, PRs, and Actions from the terminal
- **DigitalOcean CLI** — Manage DigitalOcean droplets, K8s, and DNS from terminal
- **Cloudflare CLI (wrangler)** — Manage Cloudflare Workers, DNS, and CDN from terminal
- **eksctl** — Official CLI for creating and managing AWS EKS clusters

### 👥 **Directory Server**

- **OpenLDAP** — Lightweight directory access protocol for centralized user and group management

### 🔐 **Security**

- **Kyverno** — Kubernetes policy engine — validate, mutate, and generate resources
- **External Secrets Operator** — Sync secrets from AWS/GCP/Vault into Kubernetes automatically
- **AWS Secrets Manager** — Store and rotate passwords, API keys, and database credentials in AWS
- **SELinux** — Security-Enhanced Linux mandatory access control for RHEL, CentOS, and Fedora
- **Certbot (Let's Encrypt)** — Free HTTPS/SSL certificates for your website
- **HashiCorp Vault** — Secrets management — passwords, API keys, certificates
- **Falco** — Runtime security — detect threats in containers and hosts
- **Fail2ban** — Block brute-force attacks by banning IPs
- **pre-commit** — Git hooks that run linters and security checks before commit

### 🔀 **Version Control**

- **Git** — Distributed version control system

### 🔨 **Languages & Build**

- **Python** — Install and configure Python for DevOps scripting and automation
- **Go (Golang)** — Install Go for building CLI tools, Kubernetes operators, and cloud-native apps
- **Node.js** — JavaScript runtime for web apps, APIs, and CLI tools
- **Ruby** — Dynamic language — Rails apps and DevOps tooling (Chef, Fastlane)
- **PHP** — Server-side language for WordPress, Laravel, and web apps
- **Maven** — Java project build automation and dependency management
- **Gradle** — Build tool for Java, Kotlin, and Android projects
- **jq** — Command-line JSON processor — parse APIs and config files
- **direnv** — Auto-load project env vars when you cd into a folder
- **Postman** — API testing, collections, and automation for REST and GraphQL
- **Selenium** — Browser automation for web testing across Chrome, Firefox, and Edge
- **Visual Studio Code** — Popular code editor with DevOps extensions and integrated terminal
- **Sublime Text** — Fast text editor for scripts, configs, and quick edits
- **Notepad++** — Windows source editor for configs, logs, and scripts

### 🗄️ **Database & Messaging**

- **MySQL** — Popular open-source relational database management system
- **PostgreSQL** — Advanced open-source relational database
- **MongoDB** — Document database for flexible JSON-like data
- **MariaDB** — MySQL-compatible relational database
- **Redis** — In-memory data store for caching and sessions
- **Memcached** — High-speed in-memory caching system
- **RabbitMQ** — Message broker for async communication between services
- **Apache Kafka** — Distributed event streaming platform
- **Apache ZooKeeper** — Coordination service for Kafka and distributed systems

---

## 📋 **Tool Installation Guides**

> 📊 **Quick reference:** 128 guides — click any link for install, configure, verify, and troubleshoot steps.

| No. | Category | Tool Name | Guide Link |
|:---:|:---------|:----------|:-----------|
| 1 | Networking & Server | **SSH Server** | [GUIDE](https://devops.krishnaneupane.com/tools/ssh/) |
| 2 | Networking & Server | **DNS Server (BIND)** | [GUIDE](https://devops.krishnaneupane.com/tools/dns/) |
| 3 | Networking & Server | **DHCP Server** | [GUIDE](https://devops.krishnaneupane.com/tools/dhcp/) |
| 4 | Networking & Server | **HAProxy** | [GUIDE](https://devops.krishnaneupane.com/tools/haproxy/) |
| 5 | Networking & Server | **Nginx** | [GUIDE](https://devops.krishnaneupane.com/tools/nginx/) |
| 6 | Networking & Server | **WireGuard VPN** | [GUIDE](https://devops.krishnaneupane.com/tools/wireguard/) |
| 7 | Networking & Server | **OpenVPN** | [GUIDE](https://devops.krishnaneupane.com/tools/openvpn/) |
| 8 | Networking & Server | **Apache HTTP Server** | [GUIDE](https://devops.krishnaneupane.com/tools/apache/) |
| 9 | Networking & Server | **Traefik** | [GUIDE](https://devops.krishnaneupane.com/tools/traefik/) |
| 10 | Networking & Server | **Consul** | [GUIDE](https://devops.krishnaneupane.com/tools/consul/) |
| 11 | Networking & Server | **Squid Proxy** | [GUIDE](https://devops.krishnaneupane.com/tools/squid/) |
| 12 | Networking & Server | **Keepalived** | [GUIDE](https://devops.krishnaneupane.com/tools/keepalived/) |
| 13 | Networking & Server | **Postfix** | [GUIDE](https://devops.krishnaneupane.com/tools/postfix/) |
| 14 | Networking & Server | **tmux** | [GUIDE](https://devops.krishnaneupane.com/tools/tmux/) |
| 15 | Networking & Server | **FTP Server (vsftpd)** | [GUIDE](https://devops.krishnaneupane.com/tools/ftp/) |
| 16 | Container Platform | **Docker** | [GUIDE](https://devops.krishnaneupane.com/tools/docker/) |
| 17 | Container Platform | **Docker Compose** | [GUIDE](https://devops.krishnaneupane.com/tools/docker-compose/) |
| 18 | Container Platform | **Podman** | [GUIDE](https://devops.krishnaneupane.com/tools/podman/) |
| 19 | Container Platform | **kubectl** | [GUIDE](https://devops.krishnaneupane.com/tools/kubectl/) |
| 20 | Container Platform | **Kubernetes (kubeadm)** | [GUIDE](https://devops.krishnaneupane.com/tools/kubernetes/) |
| 21 | Container Platform | **Minikube** | [GUIDE](https://devops.krishnaneupane.com/tools/minikube/) |
| 22 | Container Platform | **K3s** | [GUIDE](https://devops.krishnaneupane.com/tools/k3s/) |
| 23 | Container Platform | **MicroK8s** | [GUIDE](https://devops.krishnaneupane.com/tools/microk8s/) |
| 24 | Container Platform | **Kind** | [GUIDE](https://devops.krishnaneupane.com/tools/kind/) |
| 25 | Container Platform | **Helm** | [GUIDE](https://devops.krishnaneupane.com/tools/helm/) |
| 26 | Container Platform | **Kustomize** | [GUIDE](https://devops.krishnaneupane.com/tools/kustomize/) |
| 27 | Container Platform | **Istio** | [GUIDE](https://devops.krishnaneupane.com/tools/istio/) |
| 28 | Container Platform | **Linkerd** | [GUIDE](https://devops.krishnaneupane.com/tools/linkerd/) |
| 29 | Container Platform | **Cilium** | [GUIDE](https://devops.krishnaneupane.com/tools/cilium/) |
| 30 | Container Platform | **Calico** | [GUIDE](https://devops.krishnaneupane.com/tools/calico/) |
| 31 | Security | **Kyverno** | [GUIDE](https://devops.krishnaneupane.com/tools/kyverno/) |
| 32 | Security | **External Secrets Operator** | [GUIDE](https://devops.krishnaneupane.com/tools/external-secrets-operator/) |
| 33 | Container Platform | **etcd** | [GUIDE](https://devops.krishnaneupane.com/tools/etcd/) |
| 34 | Container Platform | **Netflix Eureka** | [GUIDE](https://devops.krishnaneupane.com/tools/eureka/) |
| 35 | Container Platform | **Buildah** | [GUIDE](https://devops.krishnaneupane.com/tools/buildah/) |
| 36 | Container Platform | **Harbor** | [GUIDE](https://devops.krishnaneupane.com/tools/harbor/) |
| 37 | Container Platform | **Portainer** | [GUIDE](https://devops.krishnaneupane.com/tools/portainer/) |
| 38 | Container Platform | **Rancher** | [GUIDE](https://devops.krishnaneupane.com/tools/rancher/) |
| 39 | Container Platform | **Velero** | [GUIDE](https://devops.krishnaneupane.com/tools/velero/) |
| 40 | Virtualization & Cloud | **KVM Virtualization** | [GUIDE](https://devops.krishnaneupane.com/tools/kvm/) |
| 41 | Virtualization & Cloud | **Cloud Compute (OpenStack)** | [GUIDE](https://devops.krishnaneupane.com/tools/cloud-compute/) |
| 42 | Virtualization & Cloud | **Vagrant** | [GUIDE](https://devops.krishnaneupane.com/tools/vagrant/) |
| 43 | Storage | **NFS Server** | [GUIDE](https://devops.krishnaneupane.com/tools/nfs/) |
| 44 | Storage | **Samba** | [GUIDE](https://devops.krishnaneupane.com/tools/samba/) |
| 45 | Monitoring & Observability | **Prometheus** | [GUIDE](https://devops.krishnaneupane.com/tools/prometheus/) |
| 46 | Monitoring & Observability | **Grafana** | [GUIDE](https://devops.krishnaneupane.com/tools/grafana/) |
| 47 | Monitoring & Observability | **Prometheus + Grafana Stack** | [GUIDE](https://devops.krishnaneupane.com/tools/prometheus-grafana/) |
| 48 | Monitoring & Observability | **Nagios** | [GUIDE](https://devops.krishnaneupane.com/tools/nagios/) |
| 49 | Monitoring & Observability | **Zabbix** | [GUIDE](https://devops.krishnaneupane.com/tools/zabbix/) |
| 50 | Monitoring & Observability | **SonarQube** | [GUIDE](https://devops.krishnaneupane.com/tools/sonarqube/) |
| 51 | Monitoring & Observability | **Trivy** | [GUIDE](https://devops.krishnaneupane.com/tools/trivy/) |
| 52 | Monitoring & Observability | **Netdata** | [GUIDE](https://devops.krishnaneupane.com/tools/netdata/) |
| 53 | Monitoring & Observability | **Elasticsearch** | [GUIDE](https://devops.krishnaneupane.com/tools/elasticsearch/) |
| 54 | Monitoring & Observability | **Grafana Loki** | [GUIDE](https://devops.krishnaneupane.com/tools/loki/) |
| 55 | Monitoring & Observability | **Jaeger** | [GUIDE](https://devops.krishnaneupane.com/tools/jaeger/) |
| 56 | Monitoring & Observability | **OpenTelemetry** | [GUIDE](https://devops.krishnaneupane.com/tools/opentelemetry/) |
| 57 | Monitoring & Observability | **Datadog Agent** | [GUIDE](https://devops.krishnaneupane.com/tools/datadog/) |
| 58 | Monitoring & Observability | **ELK Stack** | [GUIDE](https://devops.krishnaneupane.com/tools/elk-stack/) |
| 59 | Monitoring & Observability | **Fluentd** | [GUIDE](https://devops.krishnaneupane.com/tools/fluentd/) |
| 60 | Monitoring & Observability | **Graylog** | [GUIDE](https://devops.krishnaneupane.com/tools/graylog/) |
| 61 | Monitoring & Observability | **Kibana** | [GUIDE](https://devops.krishnaneupane.com/tools/kibana/) |
| 62 | Monitoring & Observability | **Splunk** | [GUIDE](https://devops.krishnaneupane.com/tools/splunk/) |
| 63 | Monitoring & Observability | **New Relic** | [GUIDE](https://devops.krishnaneupane.com/tools/new-relic/) |
| 64 | Monitoring & Observability | **Logz.io** | [GUIDE](https://devops.krishnaneupane.com/tools/logzio/) |
| 65 | Monitoring & Observability | **Syslog-ng** | [GUIDE](https://devops.krishnaneupane.com/tools/syslog-ng/) |
| 66 | CI/CD & GitOps | **Jenkins** | [GUIDE](https://devops.krishnaneupane.com/tools/jenkins/) |
| 67 | CI/CD & GitOps | **GitHub Actions** | [GUIDE](https://devops.krishnaneupane.com/tools/github-actions/) |
| 68 | CI/CD & GitOps | **GitLab CI** | [GUIDE](https://devops.krishnaneupane.com/tools/gitlab-ci/) |
| 69 | CI/CD & GitOps | **Argo CD** | [GUIDE](https://devops.krishnaneupane.com/tools/argocd/) |
| 70 | CI/CD & GitOps | **Flux CD** | [GUIDE](https://devops.krishnaneupane.com/tools/flux/) |
| 71 | CI/CD & GitOps | **Tekton** | [GUIDE](https://devops.krishnaneupane.com/tools/tekton/) |
| 72 | CI/CD & GitOps | **CircleCI** | [GUIDE](https://devops.krishnaneupane.com/tools/circleci/) |
| 73 | CI/CD & GitOps | **Drone CI** | [GUIDE](https://devops.krishnaneupane.com/tools/drone-ci/) |
| 74 | CI/CD & GitOps | **Buildkite** | [GUIDE](https://devops.krishnaneupane.com/tools/buildkite/) |
| 75 | CI/CD & GitOps | **TeamCity** | [GUIDE](https://devops.krishnaneupane.com/tools/teamcity/) |
| 76 | CI/CD & GitOps | **Travis CI** | [GUIDE](https://devops.krishnaneupane.com/tools/travis-ci/) |
| 77 | CI/CD & GitOps | **Azure DevOps Pipelines** | [GUIDE](https://devops.krishnaneupane.com/tools/azure-devops/) |
| 78 | CI/CD & GitOps | **Bitbucket Pipelines** | [GUIDE](https://devops.krishnaneupane.com/tools/bitbucket-pipelines/) |
| 79 | CI/CD & GitOps | **Slack** | [GUIDE](https://devops.krishnaneupane.com/tools/slack/) |
| 80 | CI/CD & GitOps | **Jira** | [GUIDE](https://devops.krishnaneupane.com/tools/jira/) |
| 81 | CI/CD & GitOps | **Trello** | [GUIDE](https://devops.krishnaneupane.com/tools/trello/) |
| 82 | CI/CD & GitOps | **Confluence** | [GUIDE](https://devops.krishnaneupane.com/tools/confluence/) |
| 83 | Infrastructure as Code | **Terraform** | [GUIDE](https://devops.krishnaneupane.com/tools/terraform/) |
| 84 | Infrastructure as Code | **Ansible** | [GUIDE](https://devops.krishnaneupane.com/tools/ansible/) |
| 85 | Infrastructure as Code | **Terragrunt** | [GUIDE](https://devops.krishnaneupane.com/tools/terragrunt/) |
| 86 | Infrastructure as Code | **Packer** | [GUIDE](https://devops.krishnaneupane.com/tools/packer/) |
| 87 | Infrastructure as Code | **Pulumi** | [GUIDE](https://devops.krishnaneupane.com/tools/pulumi/) |
| 88 | Infrastructure as Code | **Nomad** | [GUIDE](https://devops.krishnaneupane.com/tools/nomad/) |
| 89 | Cloud CLI | **AWS CloudFormation** | [GUIDE](https://devops.krishnaneupane.com/tools/aws-cloudformation/) |
| 90 | Cloud CLI | **AWS CLI** | [GUIDE](https://devops.krishnaneupane.com/tools/aws-cli/) |
| 91 | Security | **AWS Secrets Manager** | [GUIDE](https://devops.krishnaneupane.com/tools/aws-secrets-manager/) |
| 92 | Cloud CLI | **Azure CLI** | [GUIDE](https://devops.krishnaneupane.com/tools/azure-cli/) |
| 93 | Cloud CLI | **Google Cloud CLI** | [GUIDE](https://devops.krishnaneupane.com/tools/gcloud/) |
| 94 | Cloud CLI | **GitHub CLI (gh)** | [GUIDE](https://devops.krishnaneupane.com/tools/github-cli/) |
| 95 | Cloud CLI | **DigitalOcean CLI** | [GUIDE](https://devops.krishnaneupane.com/tools/doctl/) |
| 96 | Cloud CLI | **Cloudflare CLI (wrangler)** | [GUIDE](https://devops.krishnaneupane.com/tools/cloudflare/) |
| 97 | Cloud CLI | **eksctl** | [GUIDE](https://devops.krishnaneupane.com/tools/eksctl/) |
| 98 | Directory Server | **OpenLDAP** | [GUIDE](https://devops.krishnaneupane.com/tools/ldap/) |
| 99 | Security | **SELinux** | [GUIDE](https://devops.krishnaneupane.com/tools/selinux/) |
| 100 | Security | **Certbot (Let's Encrypt)** | [GUIDE](https://devops.krishnaneupane.com/tools/certbot/) |
| 101 | Security | **HashiCorp Vault** | [GUIDE](https://devops.krishnaneupane.com/tools/vault/) |
| 102 | Security | **Falco** | [GUIDE](https://devops.krishnaneupane.com/tools/falco/) |
| 103 | Security | **Fail2ban** | [GUIDE](https://devops.krishnaneupane.com/tools/fail2ban/) |
| 104 | Security | **pre-commit** | [GUIDE](https://devops.krishnaneupane.com/tools/pre-commit/) |
| 105 | Version Control | **Git** | [GUIDE](https://devops.krishnaneupane.com/tools/git/) |
| 106 | Languages & Build | **Python** | [GUIDE](https://devops.krishnaneupane.com/tools/python/) |
| 107 | Languages & Build | **Go (Golang)** | [GUIDE](https://devops.krishnaneupane.com/tools/go/) |
| 108 | Languages & Build | **Node.js** | [GUIDE](https://devops.krishnaneupane.com/tools/nodejs/) |
| 109 | Languages & Build | **Ruby** | [GUIDE](https://devops.krishnaneupane.com/tools/ruby/) |
| 110 | Languages & Build | **PHP** | [GUIDE](https://devops.krishnaneupane.com/tools/php/) |
| 111 | Languages & Build | **Maven** | [GUIDE](https://devops.krishnaneupane.com/tools/maven/) |
| 112 | Languages & Build | **Gradle** | [GUIDE](https://devops.krishnaneupane.com/tools/gradle/) |
| 113 | Languages & Build | **jq** | [GUIDE](https://devops.krishnaneupane.com/tools/jq/) |
| 114 | Languages & Build | **direnv** | [GUIDE](https://devops.krishnaneupane.com/tools/direnv/) |
| 115 | Languages & Build | **Postman** | [GUIDE](https://devops.krishnaneupane.com/tools/postman/) |
| 116 | Languages & Build | **Selenium** | [GUIDE](https://devops.krishnaneupane.com/tools/selenium/) |
| 117 | Languages & Build | **Visual Studio Code** | [GUIDE](https://devops.krishnaneupane.com/tools/vscode/) |
| 118 | Languages & Build | **Sublime Text** | [GUIDE](https://devops.krishnaneupane.com/tools/sublime-text/) |
| 119 | Languages & Build | **Notepad++** | [GUIDE](https://devops.krishnaneupane.com/tools/notepad-plus-plus/) |
| 120 | Database & Messaging | **MySQL** | [GUIDE](https://devops.krishnaneupane.com/tools/mysql/) |
| 121 | Database & Messaging | **PostgreSQL** | [GUIDE](https://devops.krishnaneupane.com/tools/postgresql/) |
| 122 | Database & Messaging | **MongoDB** | [GUIDE](https://devops.krishnaneupane.com/tools/mongodb/) |
| 123 | Database & Messaging | **MariaDB** | [GUIDE](https://devops.krishnaneupane.com/tools/mariadb/) |
| 124 | Database & Messaging | **Redis** | [GUIDE](https://devops.krishnaneupane.com/tools/redis/) |
| 125 | Database & Messaging | **Memcached** | [GUIDE](https://devops.krishnaneupane.com/tools/memcached/) |
| 126 | Database & Messaging | **RabbitMQ** | [GUIDE](https://devops.krishnaneupane.com/tools/rabbitmq/) |
| 127 | Database & Messaging | **Apache Kafka** | [GUIDE](https://devops.krishnaneupane.com/tools/kafka/) |
| 128 | Database & Messaging | **Apache ZooKeeper** | [GUIDE](https://devops.krishnaneupane.com/tools/zookeeper/) |

---

## 🚨 **Runbooks & Ship-it Flows**

> On-call incident flows and end-to-end deploy paths — beyond install guides.

| No. | Type | Name | Link |
|:---:|:-----|:-----|:-----|
| 1 | Runbook | **Fix 502 behind Nginx + K8s Ingress** | [LINK](https://devops.krishnaneupane.com/runbooks/nginx-502-k8s-ingress/) |
| 2 | Runbook | **Terraform state lock stuck** | [LINK](https://devops.krishnaneupane.com/runbooks/terraform-state-lock/) |
| 3 | Runbook | **Helm release failed or pending** | [LINK](https://devops.krishnaneupane.com/runbooks/helm-release-failed/) |
| 4 | Runbook | **CI pipeline failed at deploy step** | [LINK](https://devops.krishnaneupane.com/runbooks/ci-pipeline-failed/) |
| 5 | Runbook | **Pod CrashLoopBackOff** | [LINK](https://devops.krishnaneupane.com/runbooks/crashloop-backoff/) |
| 6 | Runbook | **ImagePullBackOff** | [LINK](https://devops.krishnaneupane.com/runbooks/imagepull-backoff/) |
| 7 | Runbook | **Ingress TLS cert expired or missing** | [LINK](https://devops.krishnaneupane.com/runbooks/ingress-cert-expired/) |
| 8 | Runbook | **Node NotReady / disk pressure** | [LINK](https://devops.krishnaneupane.com/runbooks/node-notready-disk/) |
| 9 | Runbook | **CI pipeline auth failed (registry / cloud)** | [LINK](https://devops.krishnaneupane.com/runbooks/pipeline-auth-failed/) |
| 10 | Runbook | **Terraform drift / unexpected plan changes** | [LINK](https://devops.krishnaneupane.com/runbooks/terraform-drift/) |
| 11 | Runbook | **Vault is sealed** | [LINK](https://devops.krishnaneupane.com/runbooks/vault-sealed/) |
| 12 | Runbook | **Pod running but not Ready** | [LINK](https://devops.krishnaneupane.com/runbooks/pod-not-ready/) |
| 13 | Runbook | **Connection refused upstream** | [LINK](https://devops.krishnaneupane.com/runbooks/connection-refused-upstream/) |
| 14 | Runbook | **AWS credentials expired or invalid** | [LINK](https://devops.krishnaneupane.com/runbooks/aws-credentials-expired/) |
| 15 | Runbook | **Helm release stuck pending** | [LINK](https://devops.krishnaneupane.com/runbooks/helm-stuck-release/) |
| 16 | Runbook | **Rotate secrets without downtime** | [LINK](https://devops.krishnaneupane.com/runbooks/secrets-rotation-zero-downtime/) |
| 17 | Runbook | **Database restore drill (quarterly)** | [LINK](https://devops.krishnaneupane.com/runbooks/database-restore-drill/) |
| 18 | Runbook | **Velero restore failed or incomplete** | [LINK](https://devops.krishnaneupane.com/runbooks/velero-restore-failed/) |
| 19 | Runbook | **Pod OOMKilled — out of memory** | [LINK](https://devops.krishnaneupane.com/runbooks/oomkilled-pod/) |
| 20 | Runbook | **Argo CD sync failed or OutOfSync** | [LINK](https://devops.krishnaneupane.com/runbooks/argocd-sync-failed/) |
| 21 | Runbook | **DNS not resolving in cluster or from pod** | [LINK](https://devops.krishnaneupane.com/runbooks/dns-not-resolving/) |
| 22 | Runbook | **Redis connection refused or timeout** | [LINK](https://devops.krishnaneupane.com/runbooks/redis-connection-refused/) |
| 23 | Runbook | **High CPU throttling or latency spike** | [LINK](https://devops.krishnaneupane.com/runbooks/high-cpu-throttling/) |
| 24 | Ship-it flow | **App → ECR → EKS via GitHub Actions** | [LINK](https://devops.krishnaneupane.com/flows/app-to-eks-github-actions/) |
| 25 | Ship-it flow | **Bitbucket → Docker → EKS** | [LINK](https://devops.krishnaneupane.com/flows/bitbucket-to-eks/) |
| 26 | Ship-it flow | **Terraform EKS cluster from GitHub repo** | [LINK](https://devops.krishnaneupane.com/flows/terraform-eks-from-repo/) |
| 27 | Ship-it flow | **App → GKE via GitLab CI** | [LINK](https://devops.krishnaneupane.com/flows/app-to-gke-gitlab-ci/) |
| 28 | Ship-it flow | **App → ECR → EKS via Jenkins** | [LINK](https://devops.krishnaneupane.com/flows/app-to-eks-jenkins/) |
| 29 | Ship-it flow | **502 debug path (nginx → ingress → pod)** | [LINK](https://devops.krishnaneupane.com/flows/debug-502-path/) |
| 30 | Ship-it flow | **Docker Compose → production Kubernetes** | [LINK](https://devops.krishnaneupane.com/flows/compose-to-prod-k8s/) |
| 31 | Ship-it flow | **Bootstrap GitOps with Argo CD** | [LINK](https://devops.krishnaneupane.com/flows/argocd-gitops-bootstrap/) |
| 32 | Ship-it flow | **Vault secrets → Kubernetes (External Secrets)** | [LINK](https://devops.krishnaneupane.com/flows/vault-secrets-to-k8s/) |
| 33 | Ship-it flow | **Bastion jump host** | [LINK](https://devops.krishnaneupane.com/flows/bastion-jump-host/) |
| 34 | Ship-it flow | **Blue-green deployment on Kubernetes** | [LINK](https://devops.krishnaneupane.com/flows/blue-green-kubernetes/) |
| 35 | Ship-it flow | **Prometheus + Grafana monitoring stack** | [LINK](https://devops.krishnaneupane.com/flows/prometheus-grafana-stack/) |

**Also:** [118+ snippets](https://devops.krishnaneupane.com/snippets/) · [37 config templates](https://devops.krishnaneupane.com/deployments/) · [12 cheat sheets](https://devops.krishnaneupane.com/cheatsheets/) · [27 hands-on projects](https://devops.krishnaneupane.com/resources/#projects)

---

## 📖 **How to Use This Repository?**

<div align="center">

💡 **Each tool guide includes:**

✅ Prerequisites & dependencies  
✅ Installation steps for **Linux**, **Mac**, and **Windows**  
✅ Configure & verify commands  
✅ Troubleshooting tips & prod-delta notes  

🔗 **Browse on the live site** or clone this repo and run locally (see below).

**On-call?** Start at [https://devops.krishnaneupane.com/oncall/](https://devops.krishnaneupane.com/oncall/) or paste an error at [https://devops.krishnaneupane.com/fix/](https://devops.krishnaneupane.com/fix/).

</div>

---


```bash

| Path | Purpose |
|------|---------|
| `src/lib/tools/` | Tool guide source (one file per tool) |
| `src/lib/runbooks.ts` | Incident runbooks |
| `src/lib/snippets.ts` | Copy-paste commands |
| `src/lib/flows.ts` | Ship-it flows |
| `src/lib/deployments/` | Compose, K8s, CI, Terraform templates |

Stack: Next.js 16 · React 19 · TypeScript · Tailwind 4 · static export · PWA

---

## ⭐ **Support & Contribution**

<div align="center">

If this helps you on-call or at deploy time:

✅ **Star** ⭐ the [repository](https://github.com/krishna-commits/devops)  
✅ **Fork** 🍴 and open a PR — snippets, runbooks, tool guides  
✅ **Report** stale commands via [GitHub Issues](https://github.com/krishna-commits/devops/issues) or [contact](https://krishnaneupane.com/contact)

See also [https://devops.krishnaneupane.com/contribute/](https://devops.krishnaneupane.com/contribute/) on the live site.

**🚀 Help build the toolkit engineers actually use at 3am.**

</div>

---

## 📢 **Author & Contact**

<div align="center">

### 👨‍💻 **Created & Maintained by:** [Krishna Neupane](https://krishnaneupane.com)

🔗 **Connect:**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/krishna-neupane-50082091/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/krishna-commits)
[![Website](https://img.shields.io/badge/Website-krishnaneupane.com-2563EB?style=for-the-badge&logo=googlechrome&logoColor=white)](https://krishnaneupane.com)
[![Contact](https://img.shields.io/badge/Contact-Form-10B981?style=for-the-badge&logo=gmail&logoColor=white)](https://krishnaneupane.com/contact)

📩 Questions, fixes, or guide ideas? [Get in touch](https://krishnaneupane.com/contact).

</div>

---

## 🔥 **Hit the Star! ⭐**

<div align="center">

If you're using this for learning or on-call reference, please give it a ⭐.

[![Star History Chart](https://api.star-history.com/svg?repos=krishna-commits/devops&type=Date)](https://star-history.com/#krishna-commits/devops&Date)

[⬆️ Back to Top](#-devops-world--setup-installation-runbooks--guides)

</div>

---

## License

MIT — Copyright (c) Krishna Neupane. See [LICENSE](LICENSE).
