import type { GuideSection } from "./types";

const troubleshootSteps = (
  steps: { title: string; description?: string; fix: Partial<Record<"linux" | "mac" | "windows", string>> }[]
): GuideSection => ({
  id: "troubleshoot",
  title: "Common Problems",
  steps: steps.map((s) => ({
    title: s.title,
    description: s.description,
    commands: s.fix,
  })),
});

export const extendedWhatIsThis: Record<string, string> = {
  "aws-cloudformation": "CloudFormation creates AWS resources (VPCs, EC2, RDS) from YAML templates — like Terraform for AWS only.",
  "aws-secrets-manager": "AWS Secrets Manager stores passwords and API keys with automatic rotation and IAM access control.",
  "external-secrets-operator": "External Secrets Operator pulls secrets from AWS/GCP/Vault into Kubernetes Secret objects automatically.",
  etcd: "etcd is a distributed key-value store — Kubernetes stores all cluster state in etcd.",
  eureka: "Eureka is Netflix's service registry — microservices register themselves and discover each other.",
  kyverno: "Kyverno enforces policies on Kubernetes resources — block bad configs before they reach the cluster.",
  linkerd: "Linkerd is a lightweight service mesh that adds mTLS, metrics, and retries between pods.",
  cilium: "Cilium uses eBPF for fast networking, security policies, and observability in Kubernetes.",
  calico: "Calico provides network policies and pod networking for Kubernetes clusters.",
  "elk-stack": "The ELK stack collects logs (Logstash/Beats), stores them (Elasticsearch), and visualizes them (Kibana).",
  fluentd: "Fluentd collects logs from servers and apps and forwards them to Elasticsearch, S3, or Kafka.",
  graylog: "Graylog is a log management platform with search, dashboards, and alerting.",
  kibana: "Kibana is the web UI for Elasticsearch — search logs and build dashboards.",
  splunk: "Splunk indexes machine data for search, monitoring, and security analytics.",
  "new-relic": "New Relic monitors application performance and infrastructure with agents and a cloud dashboard.",
  logzio: "Logz.io is a managed ELK platform — ship logs with Filebeat or Fluentd.",
  "syslog-ng": "Syslog-ng collects, filters, and routes system logs to files, databases, or remote servers.",
  postman: "Postman tests REST and GraphQL APIs — send requests, save collections, and automate with Newman.",
  selenium: "Selenium automates web browsers for end-to-end testing of websites and web apps.",
  slack: "Slack is team chat — integrate CI/CD pipelines to post deploy status and alerts.",
  jira: "Jira tracks bugs, stories, and sprints — the standard Agile issue tracker for DevOps teams.",
  trello: "Trello organizes tasks on Kanban boards with cards, lists, and drag-and-drop.",
  confluence: "Confluence is a team wiki for runbooks, architecture docs, and meeting notes.",
  vscode: "VS Code is a free editor with extensions for Docker, Kubernetes, Terraform, and Git.",
  "sublime-text": "Sublime Text is a fast editor for editing configs, scripts, and YAML on any OS.",
  "notepad-plus-plus": "Notepad++ is a Windows text editor with syntax highlighting for logs and config files.",
};

export const extendedRelatedDeployments: Record<string, string[]> = {
  "aws-cloudformation": ["terraform-aws-ec2"],
  "external-secrets-operator": ["k8s-configmap-secrets"],
  kyverno: ["k8s-deployment-service"],
  linkerd: ["k8s-microservices-node", "k8s-ingress"],
  cilium: ["k8s-ingress"],
  calico: ["k8s-deployment-service"],
  "elk-stack": ["k8s-laravel-monitoring"],
  kibana: ["k8s-laravel-monitoring"],
  "github-actions": ["github-actions-ci"],
  jenkins: ["github-actions-ci", "jenkins-eks-python"],
};

export const extendedTroubleshoot: Record<string, GuideSection> = {
  "aws-cloudformation": troubleshootSteps([
    {
      title: "Stack stuck in CREATE_IN_PROGRESS or ROLLBACK",
      fix: {
        linux: `aws cloudformation describe-stack-events --stack-name my-vpc | head -50
aws cloudformation describe-stack-resources --stack-name my-vpc
# Delete failed stack and fix template:
aws cloudformation delete-stack --stack-name my-vpc`,
        mac: "aws cloudformation describe-stack-events --stack-name my-vpc",
        windows: "aws cloudformation describe-stack-events --stack-name my-vpc",
      },
    },
    {
      title: "Template validation failed",
      fix: {
        linux: "aws cloudformation validate-template --template-body file://vpc-stack.yaml\ncfn-lint vpc-stack.yaml",
        mac: "aws cloudformation validate-template --template-body file://vpc-stack.yaml",
        windows: "aws cloudformation validate-template --template-body file://vpc-stack.yaml",
      },
    },
  ]),
  "aws-secrets-manager": troubleshootSteps([
    {
      title: "AccessDeniedException when reading secret",
      fix: {
        linux: `aws sts get-caller-identity
aws iam simulate-principal-policy \\
  --policy-source-arn $(aws sts get-caller-identity --query Arn --output text) \\
  --action-names secretsmanager:GetSecretValue \\
  --resource-arns arn:aws:secretsmanager:region:account:secret:prod/myapp/db-*`,
        mac: "aws sts get-caller-identity",
        windows: "aws sts get-caller-identity",
      },
    },
  ]),
  "external-secrets-operator": troubleshootSteps([
    {
      title: "ExternalSecret not syncing",
      fix: {
        linux: `kubectl describe externalsecret -n default
kubectl logs -n external-secrets -l app.kubernetes.io/name=external-secrets
kubectl get secretstore -A`,
        mac: "kubectl describe externalsecret",
        windows: "kubectl describe externalsecret",
      },
    },
    {
      title: "AWS IAM permission errors",
      fix: {
        linux: `# Use IRSA — annotate SA with role ARN
kubectl annotate sa default eks.amazonaws.com/role-arn=arn:aws:iam::ACCOUNT:role/eso-role`,
        mac: "kubectl get sa -o yaml",
        windows: "kubectl get sa -o yaml",
      },
    },
  ]),
  etcd: troubleshootSteps([
    {
      title: "etcd cluster unhealthy / connection refused",
      fix: {
        linux: `etcdctl endpoint health --endpoints=http://127.0.0.1:2379
sudo ss -tlnp | grep 2379
# Check data dir permissions
ls -la /tmp/etcd-data`,
        mac: "etcdctl endpoint health",
        windows: "etcdctl endpoint health",
      },
    },
  ]),
  eureka: troubleshootSteps([
    {
      title: "Services not registering with Eureka",
      fix: {
        linux: `curl http://localhost:8761/eureka/apps
docker logs eureka
# Spring: check eureka.client.service-url.defaultZone`,
        mac: "curl http://localhost:8761",
        windows: "curl http://localhost:8761",
      },
    },
  ]),
  kyverno: troubleshootSteps([
    {
      title: "Policy not blocking invalid resources",
      fix: {
        linux: `kubectl get clusterpolicy
kubectl describe clusterpolicy require-app-label
# Test with a pod missing label:
kubectl run test --image=nginx --dry-run=server -o yaml | kubectl apply -f -`,
        mac: "kubectl get clusterpolicy",
        windows: "kubectl get clusterpolicy",
      },
    },
  ]),
  linkerd: troubleshootSteps([
    {
      title: "linkerd check fails / proxy not injected",
      fix: {
        linux: `linkerd check
kubectl get pods -n linkerd
kubectl annotate namespace default linkerd.io/inject=enabled --overwrite
kubectl rollout restart deployment`,
        mac: "linkerd check",
        windows: "linkerd check",
      },
    },
  ]),
  cilium: troubleshootSteps([
    {
      title: "Pods have no network connectivity",
      fix: {
        linux: `cilium status
kubectl -n kube-system logs -l k8s-app=cilium --tail=50
cilium connectivity test`,
        mac: "cilium status",
        windows: "cilium status",
      },
    },
  ]),
  calico: troubleshootSteps([
    {
      title: "Calico pods not ready",
      fix: {
        linux: `kubectl get pods -n calico-system
kubectl logs -n calico-system -l k8s-app=calico-node --tail=30
kubectl get installation default -o yaml`,
        mac: "kubectl get pods -n calico-system",
        windows: "kubectl get pods -n calico-system",
      },
    },
  ]),
  "elk-stack": troubleshootSteps([
    {
      title: "Elasticsearch won't start (vm.max_map_count)",
      fix: {
        linux: `sudo sysctl -w vm.max_map_count=262144
echo 'vm.max_map_count=262144' | sudo tee -a /etc/sysctl.conf
docker logs elasticsearch`,
        mac: "docker logs elasticsearch",
        windows: "docker logs elasticsearch",
      },
    },
    {
      title: "Kibana can't connect to Elasticsearch",
      fix: {
        linux: `curl http://localhost:9200
# Check kibana.yml elasticsearch.hosts
docker logs kibana`,
        mac: "curl http://localhost:9200",
        windows: "curl http://localhost:9200",
      },
    },
  ]),
  fluentd: troubleshootSteps([
    {
      title: "Fluentd not collecting logs",
      fix: {
        linux: `sudo systemctl status td-agent
sudo tail -f /var/log/td-agent/td-agent.log
sudo td-agent --config-test -c /etc/td-agent/td-agent.conf`,
        mac: "fluentd --config-test -c fluent/fluent.conf",
        windows: "fluentd --config-test",
      },
    },
  ]),
  graylog: troubleshootSteps([
    {
      title: "Graylog web UI not loading",
      fix: {
        linux: `sudo graylogctl status
curl -I http://localhost:9000
sudo journalctl -u graylog-server -n 50`,
        mac: "docker logs graylog",
        windows: "docker logs graylog",
      },
    },
  ]),
  kibana: troubleshootSteps([
    {
      title: "Kibana status red / can't reach Elasticsearch",
      fix: {
        linux: `curl http://localhost:9200/_cluster/health
sudo journalctl -u kibana -n 30
grep elasticsearch /etc/kibana/kibana.yml`,
        mac: "curl http://localhost:9200/_cluster/health",
        windows: "curl http://localhost:9200/_cluster/health",
      },
    },
  ]),
  splunk: troubleshootSteps([
    {
      title: "Forwarder not sending to indexer",
      fix: {
        linux: `sudo /opt/splunkforwarder/bin/splunk list forward-server
sudo /opt/splunkforwarder/bin/splunk list monitor
sudo tail -f /opt/splunkforwarder/var/log/splunk/splunkd.log`,
        mac: "splunk list forward-server",
        windows: "splunk list forward-server",
      },
    },
  ]),
  "new-relic": troubleshootSteps([
    {
      title: "Agent not reporting data",
      fix: {
        linux: `sudo systemctl status newrelic-infra
newrelic entity search --name 'My App'
# Verify license key:
echo $NEW_RELIC_LICENSE_KEY`,
        mac: "newrelic entity search",
        windows: "Get-Service newrelic-infra",
      },
    },
  ]),
  logzio: troubleshootSteps([
    {
      title: "Filebeat can't reach Logz.io listener",
      fix: {
        linux: `filebeat test output
openssl s_client -connect listener.logz.io:5015
filebeat -e -d publish`,
        mac: "filebeat test output",
        windows: "filebeat test output",
      },
    },
  ]),
  "syslog-ng": troubleshootSteps([
    {
      title: "Syslog-ng config syntax error",
      fix: {
        linux: `sudo syslog-ng --syntax-only -f /etc/syslog-ng/syslog-ng.conf
sudo systemctl status syslog-ng
sudo journalctl -u syslog-ng -n 20`,
        mac: "syslog-ng --syntax-only",
        windows: "syslog-ng --syntax-only",
      },
    },
  ]),
  postman: troubleshootSteps([
    {
      title: "SSL certificate error in requests",
      fix: {
        linux: "# Postman Settings → turn off SSL verification (dev only)\n# Or add CA cert under Settings → Certificates",
        mac: "# Settings → disable SSL verification for local dev",
        windows: "# Settings → disable SSL verification for local dev",
      },
    },
  ]),
  selenium: troubleshootSteps([
    {
      title: "SessionNotCreatedException / chromedriver mismatch",
      fix: {
        linux: `pip install --upgrade selenium webdriver-manager
chromedriver --version
google-chrome --version`,
        mac: "brew upgrade chromedriver\npip install --upgrade selenium",
        windows: "pip install --upgrade selenium webdriver-manager",
      },
    },
  ]),
  slack: troubleshootSteps([
    {
      title: "Webhook returns invalid_payload or 404",
      fix: {
        linux: `curl -X POST -H 'Content-type: application/json' \\
  --data '{"text":"test"}' \\
  https://hooks.slack.com/services/T000/B000/XXXX
# Regenerate webhook in Slack app settings`,
        mac: "# Verify webhook URL in Slack app → Incoming Webhooks",
        windows: "# Verify webhook URL in Slack app settings",
      },
    },
  ]),
  jira: troubleshootSteps([
    {
      title: "401 Unauthorized on REST API",
      fix: {
        linux: `# Use email + API token (not password)
curl -u email@company.com:API_TOKEN https://your-domain.atlassian.net/rest/api/3/myself`,
        mac: "# Create token: id.atlassian.com/manage-profile/security/api-tokens",
        windows: "# Use API token, not account password",
      },
    },
  ]),
  sonarqube: troubleshootSteps([
    {
      title: "SonarQube won't start / Elasticsearch bootstrap",
      fix: {
        linux: `sudo sysctl -w vm.max_map_count=262144
docker logs sonarqube
# Check Java heap in sonar.properties`,
        mac: "docker logs sonarqube",
        windows: "docker logs sonarqube",
      },
    },
  ]),
  "github-actions": troubleshootSteps([
    {
      title: "Workflow not triggering on push",
      fix: {
        linux: `# Check workflow path: .github/workflows/*.yml
# Verify branch filter matches your branch
git branch --show-current
gh run list`,
        mac: "gh run list",
        windows: "gh run list",
      },
    },
    {
      title: "Job failed — permission denied",
      fix: {
        linux: `# Add to workflow:
# permissions:
#   contents: read
# For forks: check Settings → Actions → General`,
        mac: "gh run view --log",
        windows: "gh run view --log",
      },
    },
  ]),
  consul: troubleshootSteps([
    {
      title: "Consul agent not joining cluster",
      fix: {
        linux: `consul members
consul info
# Retry join:
consul join <server-ip>`,
        mac: "consul members",
        windows: "consul members",
      },
    },
  ]),
  istio: troubleshootSteps([
    {
      title: "Sidecar not injected / 503 errors",
      fix: {
        linux: `kubectl label namespace default istio-injection=enabled --overwrite
istioctl analyze
kubectl get pods -o jsonpath='{.items[*].spec.containers[*].name}'`,
        mac: "istioctl analyze",
        windows: "istioctl analyze",
      },
    },
  ]),
  elasticsearch: troubleshootSteps([
    {
      title: "Cluster status yellow or red",
      fix: {
        linux: `curl http://localhost:9200/_cluster/health?pretty
curl http://localhost:9200/_cat/shards?v
# Increase heap or add nodes for red shards`,
        mac: "curl http://localhost:9200/_cluster/health",
        windows: "curl http://localhost:9200/_cluster/health",
      },
    },
  ]),
  nagios: troubleshootSteps([
    {
      title: "Host/service checks showing UNKNOWN",
      fix: {
        linux: `sudo systemctl status nagios
sudo nagios -v /etc/nagios/nagios.cfg
sudo tail -f /var/log/nagios/nagios.log`,
        mac: "docker logs nagios",
        windows: "# Check Nagios service and plugin paths",
      },
    },
  ]),
  zabbix: troubleshootSteps([
    {
      title: "Zabbix agent not reachable",
      fix: {
        linux: `sudo systemctl status zabbix-agent
zabbix_agentd -t agent.ping
sudo ufw allow 10050/tcp`,
        mac: "brew services list | grep zabbix",
        windows: "Get-Service 'Zabbix Agent'",
      },
    },
  ]),
  datadog: troubleshootSteps([
    {
      title: "Datadog agent not reporting",
      fix: {
        linux: `sudo datadog-agent status
sudo datadog-agent flare
sudo tail -f /var/log/datadog/agent.log`,
        mac: "datadog-agent status",
        windows: "& 'C:\\Program Files\\Datadog\\Datadog Agent\\bin\\agent.exe' status",
      },
    },
  ]),
  grafana: troubleshootSteps([
    {
      title: "Grafana can't connect to Prometheus/Loki",
      fix: {
        linux: `curl http://localhost:9090/-/healthy
sudo journalctl -u grafana-server -n 30
# Settings → Data sources → Test connection in UI`,
        mac: "brew services restart grafana",
        windows: "Restart Grafana service",
      },
    },
  ]),
  zookeeper: troubleshootSteps([
    {
      title: "ZooKeeper won't start / port in use",
      fix: {
        linux: `echo stat | nc localhost 2181
sudo lsof -i :2181
tail -f /var/log/zookeeper/zookeeper.log`,
        mac: "echo stat | nc localhost 2181",
        windows: "netstat -ano | findstr :2181",
      },
    },
  ]),
};
