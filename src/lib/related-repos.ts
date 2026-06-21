export interface RelatedGithubRepo {
  name: string;
  url: string;
  description: string;
}

export const relatedGithubRepos: Record<string, RelatedGithubRepo[]> = {
  "bitbucket-pipelines": [
    {
      name: "automation-bitbucket-to-kubernetes-deployment",
      url: "https://github.com/krishna-commits/automation-bitbucket-to-kubernetes-deployment",
      description: "Bitbucket Pipeline → build image → deploy to Kubernetes",
    },
    {
      name: "Bitbucket-to-Kubernetes-Deployment",
      url: "https://github.com/krishna-commits/Bitbucket-to-Kubernetes-Deployment",
      description: "Dockerfile + K8s manifests for Bitbucket CI/CD flow",
    },
  ],
  "github-actions": [
    {
      name: "automation-bitbucket-to-kubernetes-deployment",
      url: "https://github.com/krishna-commits/automation-bitbucket-to-kubernetes-deployment",
      description: "Reference pipeline patterns adaptable to GitHub Actions",
    },
    {
      name: "ecs_deployment_using_cloudformation_template_from_bitbucket_pipelines",
      url: "https://github.com/krishna-commits/ecs_deployment_using_cloudformation_template_from_bitbucket_pipelines",
      description: "Cloud deploy pipeline patterns (adaptable to GHA)",
    },
  ],
  jenkins: [
    {
      name: "grafana-dashboard",
      url: "https://github.com/krishna-commits/grafana-dashboard",
      description: "Grafana dashboards for monitoring Jenkins and app metrics",
    },
    {
      name: "terraform-eks-cluster",
      url: "https://github.com/krishna-commits/terraform-eks-cluster",
      description: "EKS cluster Terraform — common Jenkins deploy target",
    },
  ],
  docker: [
    {
      name: "docker-password-authentication",
      url: "https://github.com/krishna-commits/docker-password-authentication",
      description: "Private registry auth with Docker",
    },
  ],
  grafana: [
    {
      name: "grafana-dashboard",
      url: "https://github.com/krishna-commits/grafana-dashboard",
      description: "Import-ready Grafana dashboard JSON",
    },
    {
      name: "loki-stack-grafana",
      url: "https://github.com/krishna-commits/loki-stack-grafana",
      description: "Loki + Grafana stack reference",
    },
  ],
  argocd: [
    {
      name: "automation-bitbucket-to-kubernetes-deployment",
      url: "https://github.com/krishna-commits/automation-bitbucket-to-kubernetes-deployment",
      description: "GitOps-style deploy flow — pair with Argo CD sync",
    },
    {
      name: "kubernetes-cheat-sheet",
      url: "https://github.com/krishna-commits/kubernetes-cheat-sheet",
      description: "K8s manifest and kubectl quick reference",
    },
  ],
  terraform: [
    {
      name: "terraform-eks-cluster",
      url: "https://github.com/krishna-commits/terraform-eks-cluster",
      description: "EKS cluster with Terraform",
    },
    {
      name: "terraform-aws-vpc",
      url: "https://github.com/krishna-commits/terraform-aws-vpc",
      description: "VPC module for AWS infrastructure",
    },
    {
      name: "terraform_eks_starter",
      url: "https://github.com/krishna-commits/terraform_eks_starter",
      description: "Starter EKS Terraform layout",
    },
    {
      name: "aws_ecs_using_terraform",
      url: "https://github.com/krishna-commits/aws_ecs_using_terraform",
      description: "ECS deployment with Terraform",
    },
  ],
  helm: [
    {
      name: "kubernetes-cheat-sheet",
      url: "https://github.com/krishna-commits/kubernetes-cheat-sheet",
      description: "K8s YAML patterns to wrap as Helm charts",
    },
    {
      name: "terraform-eks-cluster",
      url: "https://github.com/krishna-commits/terraform-eks-cluster",
      description: "EKS cluster to install Helm releases onto",
    },
  ],
  ansible: [
    {
      name: "terraform-aws-vpc",
      url: "https://github.com/krishna-commits/terraform-aws-vpc",
      description: "Provision infra with Terraform, configure with Ansible",
    },
  ],
  kubernetes: [
    {
      name: "kubernetes-cheat-sheet",
      url: "https://github.com/krishna-commits/kubernetes-cheat-sheet",
      description: "Manifest and kubectl reference repo",
    },
    {
      name: "Bitbucket-to-Kubernetes-Deployment",
      url: "https://github.com/krishna-commits/Bitbucket-to-Kubernetes-Deployment",
      description: "Sample app + K8s deployment manifests",
    },
  ],
};

export function getRelatedGithubRepos(toolSlug: string): RelatedGithubRepo[] {
  return relatedGithubRepos[toolSlug] ?? [];
}
