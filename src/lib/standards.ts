export interface StandardLayout {
  id: string;
  title: string;
  description: string;
  icon: string;
  repoUrl: string;
  repoName: string;
  configHref?: string;
  flowHref?: string;
  toolHrefs: string[];
}

/** Standard repos — clone these, don't invent */
export const standardLayouts: StandardLayout[] = [
  {
    id: "eks-terraform",
    title: "EKS cluster (Terraform)",
    description: "VPC + EKS starter — foundation before app deploy.",
    icon: "☸️",
    repoUrl: "https://github.com/krishna-commits/terraform-eks-cluster",
    repoName: "terraform-eks-cluster",
    configHref: "/deployments/terraform-aws-ec2/",
    flowHref: "/flows/terraform-eks-from-repo/",
    toolHrefs: ["/tools/terraform/", "/tools/aws-cli/", "/tools/kubectl/"],
  },
  {
    id: "eks-vpc-module",
    title: "AWS VPC module",
    description: "Reusable VPC for EKS or EC2 workloads.",
    icon: "☁️",
    repoUrl: "https://github.com/krishna-commits/terraform-aws-vpc",
    repoName: "terraform-aws-vpc",
    toolHrefs: ["/tools/terraform/"],
  },
  {
    id: "github-actions-ci",
    title: "GitHub Actions CI template",
    description: "Build, scan, push, deploy — copy .github/workflows from site config.",
    icon: "⚡",
    repoUrl: "https://github.com/krishna-commits/automation-bitbucket-to-kubernetes-deployment",
    repoName: "automation-bitbucket-to-kubernetes-deployment",
    configHref: "/deployments/github-actions-ci/",
    flowHref: "/flows/app-to-eks-github-actions/",
    toolHrefs: ["/tools/github-actions/", "/tools/docker/"],
  },
  {
    id: "bitbucket-k8s-app",
    title: "App + K8s manifests (Bitbucket flow)",
    description: "Dockerfile + Kubernetes YAML for pipeline deploy.",
    icon: "🪣",
    repoUrl: "https://github.com/krishna-commits/Bitbucket-to-Kubernetes-Deployment",
    repoName: "Bitbucket-to-Kubernetes-Deployment",
    configHref: "/deployments/k8s-deployment-service/",
    flowHref: "/flows/bitbucket-to-eks/",
    toolHrefs: ["/tools/bitbucket-pipelines/", "/tools/kubernetes/"],
  },
  {
    id: "gitlab-gke-ci",
    title: "GitLab CI → GKE deploy",
    description: "Build, Trivy scan, deploy — with prod-delta for OIDC and branch protection.",
    icon: "🦊",
    repoUrl: "https://github.com/krishna-commits/Bitbucket-to-Kubernetes-Deployment",
    repoName: "Bitbucket-to-Kubernetes-Deployment",
    configHref: "/deployments/gitlab-ci-yml/",
    flowHref: "/flows/app-to-gke-gitlab-ci/",
    toolHrefs: ["/tools/gitlab-ci/", "/tools/kubernetes/"],
  },
  {
    id: "jenkins-eks-ci",
    title: "Jenkins → ECR → EKS",
    description: "Declarative pipeline for enterprise Jenkins with prod-delta.",
    icon: "🤖",
    repoUrl: "https://github.com/krishna-commits/automation-bitbucket-to-kubernetes-deployment",
    repoName: "automation-bitbucket-to-kubernetes-deployment",
    configHref: "/deployments/jenkins-eks-python/",
    flowHref: "/flows/app-to-eks-jenkins/",
    toolHrefs: ["/tools/jenkins/", "/tools/kubernetes/", "/tools/docker/"],
  },
  {
    id: "k8s-manifests",
    title: "Kubernetes cheat sheet repo",
    description: "Manifest patterns and kubectl reference.",
    icon: "📋",
    repoUrl: "https://github.com/krishna-commits/kubernetes-cheat-sheet",
    repoName: "kubernetes-cheat-sheet",
    configHref: "/deployments/k8s-ingress/",
    toolHrefs: ["/tools/kubernetes/", "/tools/helm/"],
  },
  {
    id: "grafana-dashboards",
    title: "Grafana dashboards",
    description: "Import-ready JSON for app and infra monitoring.",
    icon: "📊",
    repoUrl: "https://github.com/krishna-commits/grafana-dashboard",
    repoName: "grafana-dashboard",
    toolHrefs: ["/tools/grafana/", "/tools/prometheus/"],
  },
];
