import { docker } from "./tools/docker";
import { kubectl } from "./tools/kubectl";
import { kubernetes } from "./tools/kubernetes";
import { helm } from "./tools/helm";
import { jenkins } from "./tools/jenkins";
import { terraform } from "./tools/terraform";
import { ansible } from "./tools/ansible";
import { awsCli } from "./tools/aws-cli";
import { git } from "./tools/git";
import { trivy } from "./tools/trivy";
import { ssh, dns, dhcp, haproxy, ftp } from "./tools/networking";
import { nfs } from "./tools/nfs";
import { kvm, cloudCompute } from "./tools/virtualization";
import { nagios, zabbix, prometheusGrafana } from "./tools/monitoring-extended";
import { ldap, selinux, python, go } from "./tools/directory-security-lang";
import {
  dockerCompose,
  azureCli,
  maven,
  mysql,
  sonarqube,
  eksctl,
  prometheus,
  grafana,
  minikube,
  githubActions,
} from "./tools/extra-tools";
import {
  nginx,
  postgresql,
  redis,
  certbot,
  wireguard,
  podman,
  gitlabCi,
} from "./tools/more-tools";
import {
  argocd,
  flux,
  tekton,
  k3s,
  microk8s,
  kind,
  buildah,
  harbor,
  portainer,
  rancher,
  istio,
  packer,
  pulumi,
  nomad,
  vault,
  falco,
  fail2ban,
  traefik,
  apache,
  consul,
  squid,
  keepalived,
  mongodb,
  mariadb,
  rabbitmq,
  kafka,
  memcached,
  elasticsearch,
  loki,
  jaeger,
  opentelemetry,
  netdata,
  samba,
  postfix,
} from "./tools/devops-catalog";
import {
  gcloud,
  githubCli,
  doctl,
  terragrunt,
  kustomize,
  vagrant,
  direnv,
  circleci,
  droneCi,
  buildkite,
  teamcity,
  travisCi,
  azureDevOps,
  bitbucketPipelines,
  datadog,
  cloudflare,
  tmux,
  nodejs,
  ruby,
  gradle,
  jq,
  preCommit,
  zookeeper,
} from "./tools/bash-tools-guides";
import { php, openvpn, velero } from "./tools/johnbedeir-guides";
import {
  awsCloudformation,
  awsSecretsManager,
  externalSecretsOperator,
  etcd,
  eureka,
  kyverno,
  linkerd,
  cilium,
  calico,
} from "./tools/extended-cloud-k8s";
import {
  elkStack,
  fluentd,
  graylog,
  kibana,
  splunk,
  newRelic,
  logzio,
  syslogNg,
} from "./tools/extended-observability";
import {
  postman,
  selenium,
  slack,
  jira,
  trello,
  confluence,
  vscode,
  sublimeText,
  notepadPlusPlus,
} from "./tools/extended-dev-collab";
import { getDeploymentSearchItems } from "./deployments";
import { getUtilitySearchItems } from "./utilities/catalog";
import { getCheatsheetSearchItems } from "./cheatsheets";
import { getRunbookSearchItems } from "./runbooks";
import { getComparisonSearchItems } from "./comparisons";
import { getErrorFixSearchItems } from "./error-fix-index";
import { getSnippetSearchItems } from "./snippets";
import { getFlowSearchItems } from "./flows";
import type { ToolGuide } from "./types";
import { categories, getCategory } from "./categories";
import type { SearchItem } from "@/components/Search";
import { getToolMeta } from "./search-index";

export const tools: ToolGuide[] = [
  // Networking & Server
  ssh,
  dns,
  dhcp,
  haproxy,
  nginx,
  wireguard,
  openvpn,
  apache,
  traefik,
  consul,
  squid,
  keepalived,
  postfix,
  tmux,
  ftp,
  // Container Platform
  docker,
  dockerCompose,
  podman,
  kubectl,
  kubernetes,
  minikube,
  k3s,
  microk8s,
  kind,
  helm,
  kustomize,
  istio,
  linkerd,
  cilium,
  calico,
  kyverno,
  externalSecretsOperator,
  etcd,
  eureka,
  buildah,
  harbor,
  portainer,
  rancher,
  velero,
  // Virtualization & Cloud
  kvm,
  cloudCompute,
  vagrant,
  // Storage
  nfs,
  samba,
  // Monitoring
  prometheus,
  grafana,
  prometheusGrafana,
  nagios,
  zabbix,
  sonarqube,
  trivy,
  netdata,
  elasticsearch,
  loki,
  jaeger,
  opentelemetry,
  datadog,
  elkStack,
  fluentd,
  graylog,
  kibana,
  splunk,
  newRelic,
  logzio,
  syslogNg,
  // CI/CD & GitOps
  jenkins,
  githubActions,
  gitlabCi,
  argocd,
  flux,
  tekton,
  circleci,
  droneCi,
  buildkite,
  teamcity,
  travisCi,
  azureDevOps,
  bitbucketPipelines,
  slack,
  jira,
  trello,
  confluence,
  // IaC
  terraform,
  ansible,
  terragrunt,
  packer,
  pulumi,
  nomad,
  awsCloudformation,
  // Cloud CLI
  awsCli,
  awsSecretsManager,
  azureCli,
  gcloud,
  githubCli,
  doctl,
  cloudflare,
  eksctl,
  // Directory & Security
  ldap,
  selinux,
  certbot,
  vault,
  falco,
  fail2ban,
  preCommit,
  // VCS
  git,
  // Languages & Build
  python,
  go,
  nodejs,
  ruby,
  php,
  maven,
  gradle,
  jq,
  direnv,
  postman,
  selenium,
  vscode,
  sublimeText,
  notepadPlusPlus,
  // Database
  mysql,
  postgresql,
  mongodb,
  mariadb,
  redis,
  memcached,
  rabbitmq,
  kafka,
  zookeeper,
];

export function getTool(slug: string): ToolGuide | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(categoryId: string): ToolGuide[] {
  return tools.filter((t) => t.category === categoryId);
}

export function getNavigation() {
  return categories
    .map((cat) => ({
      ...cat,
      tools: getToolsByCategory(cat.id).map((t) => ({
        slug: t.slug,
        name: t.name,
        icon: t.icon,
      })),
    }))
    .filter((cat) => cat.tools.length > 0);
}

export function getSearchItems(): SearchItem[] {
  const toolItems: SearchItem[] = tools.map((tool) => {
    const meta = getToolMeta(tool.slug);
    return {
      kind: "tool" as const,
      slug: tool.slug,
      name: tool.name,
      description: tool.description,
      icon: tool.icon,
      category: tool.category,
      categoryName: getCategory(tool.category)?.name ?? tool.category,
      simpleTitle: meta.simpleTitle,
      keywords: meta.keywords,
      level: meta.level,
    };
  });

  const deploymentItems: SearchItem[] = getDeploymentSearchItems().map((d) => ({
    kind: "deployment" as const,
    slug: d.slug,
    name: d.name,
    description: d.description,
    icon: d.icon,
    category: d.type,
    categoryName: d.typeName,
    keywords: ["compose", "kubernetes", "yaml", "template", "deploy", "config", d.type],
  }));

  const utilityItems: SearchItem[] = getUtilitySearchItems().map((u) => ({
    kind: "utility" as const,
    slug: u.slug,
    name: u.name,
    description: u.description,
    icon: u.icon,
    category: u.category,
    categoryName: u.categoryName,
    keywords: u.keywords,
  }));

  const cheatsheetItems: SearchItem[] = getCheatsheetSearchItems().map((s) => ({
    kind: "cheatsheet" as const,
    slug: s.slug,
    name: s.name,
    description: s.description,
    icon: s.icon,
    category: "cheatsheet",
    categoryName: "Cheat sheet",
    keywords: s.keywords,
  }));

  const runbookItems: SearchItem[] = getRunbookSearchItems().map((r) => ({
    kind: "runbook" as const,
    slug: r.slug,
    name: r.name,
    description: r.description,
    icon: r.icon,
    category: "runbook",
    categoryName: "Runbook",
    keywords: r.keywords,
  }));

  const comparisonItems: SearchItem[] = getComparisonSearchItems().map((c) => ({
    kind: "compare" as const,
    slug: c.slug,
    name: c.name,
    description: c.description,
    icon: c.icon,
    category: "compare",
    categoryName: "Compare",
    keywords: c.keywords,
  }));

  const errorItems: SearchItem[] = getErrorFixSearchItems().map((e) => ({
    kind: "error" as const,
    slug: e.slug,
    name: e.name,
    description: e.description,
    icon: e.icon,
    category: "error",
    categoryName: "Error fix",
    keywords: e.keywords,
    href: e.href,
  }));

  const snippetItems: SearchItem[] = getSnippetSearchItems().map((s) => ({
    kind: "snippet" as const,
    slug: s.slug,
    name: s.name,
    description: s.description,
    icon: s.icon,
    category: "snippet",
    categoryName: "Snippet",
    keywords: s.keywords,
    href: `/snippets/#${s.slug}`,
  }));

  const flowItems: SearchItem[] = getFlowSearchItems().map((f) => ({
    kind: "flow" as const,
    slug: f.slug,
    name: f.name,
    description: f.description,
    icon: f.icon,
    category: "flow",
    categoryName: "Ship-it flow",
    keywords: f.keywords,
    href: `/flows/${f.slug}/`,
  }));

  return [...toolItems, ...deploymentItems, ...utilityItems, ...cheatsheetItems, ...runbookItems, ...comparisonItems, ...errorItems, ...snippetItems, ...flowItems];
}

export { categories };
