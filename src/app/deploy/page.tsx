import Link from "next/link";
import { getNavigation, getSearchItems } from "@/lib/content";
import { AppShell, Footer } from "@/components/AppShell";

const ciTools = [
  {
    slug: "github-actions",
    name: "GitHub Actions",
    icon: "⚡",
    config: "github-actions-ci",
    repo: "https://github.com/krishna-commits/automation-bitbucket-to-kubernetes-deployment",
    secrets: ["AWS_ROLE_ARN (OIDC)", "KUBECONFIG_DATA", "GITHUB_TOKEN for GHCR"],
  },
  {
    slug: "bitbucket-pipelines",
    name: "Bitbucket Pipelines",
    icon: "🪣",
    config: null,
    repo: "https://github.com/krishna-commits/Bitbucket-to-Kubernetes-Deployment",
    secrets: ["AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY", "DOCKER_REGISTRY credentials"],
  },
  {
    slug: "gitlab-ci",
    name: "GitLab CI",
    icon: "🦊",
    config: null,
    repo: null,
    secrets: ["CI_REGISTRY_USER", "CI_REGISTRY_PASSWORD", "KUBECONFIG"],
  },
  {
    slug: "jenkins",
    name: "Jenkins",
    icon: "🤖",
    config: "jenkins-eks-python",
    repo: "https://github.com/krishna-commits/terraform-eks-cluster",
    secrets: ["kubeconfig credential", "registry creds", "AWS keys"],
  },
];

const pushFails = [
  "docker login before push in pipeline script",
  "Use OIDC (GHA) instead of long-lived AWS keys",
  "imagePullSecrets on K8s if pull fails after push",
  "Check registry URL matches image tag prefix",
];

export default function DeployHubPage() {
  const navigation = getNavigation();
  const searchItems = getSearchItems();

  return (
    <>
      <AppShell navigation={navigation} searchItems={searchItems}>
        <main className="flex-1 p-6 lg:p-8 min-w-0 max-w-4xl">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">Deploy from CI</h1>
          <p className="text-sm text-zinc-500 mb-8">Real pipeline patterns — YAML templates, secrets, and fix links.</p>

          <div className="grid gap-4 sm:grid-cols-2 mb-10">
            {ciTools.map((tool) => (
              <article key={tool.slug} className="rounded-xl border border-violet-200 dark:border-violet-900/50 p-5 bg-white dark:bg-zinc-900">
                <h2 className="font-bold text-lg text-zinc-900 dark:text-white">
                  <Link href={`/tools/${tool.slug}/`} className="hover:text-violet-600">
                    {tool.icon} {tool.name}
                  </Link>
                </h2>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <Link href={`/tools/${tool.slug}/#configure`} className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-indigo-600">
                    Configure →
                  </Link>
                  {tool.config && (
                    <Link href={`/deployments/${tool.config}/`} className="px-2 py-1 rounded bg-violet-50 dark:bg-violet-950 text-violet-600">
                      YAML template →
                    </Link>
                  )}
                  <Link href={`/cheatsheets/${tool.slug === "github-actions" ? "github-actions" : "docker"}/`} className="px-2 py-1 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-600">
                    Cheat sheet →
                  </Link>
                  {tool.repo && (
                    <a href={tool.repo} target="_blank" rel="noopener noreferrer" className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600">
                      GitHub repo ↗
                    </a>
                  )}
                </div>
                <p className="text-xs text-zinc-500 mt-3">
                  <span className="font-medium text-zinc-600 dark:text-zinc-400">Secrets: </span>
                  {tool.secrets.join(" · ")}
                </p>
              </article>
            ))}
          </div>

          <section className="rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50/30 dark:bg-red-950/20 p-5 mb-8">
            <h2 className="font-bold text-zinc-900 dark:text-white mb-2">If push / deploy fails</h2>
            <ul className="list-disc list-inside text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
              {pushFails.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link href="/runbooks/pipeline-auth-failed/" className="inline-block mt-3 text-sm text-red-600 hover:underline">
              Pipeline auth runbook →
            </Link>
          </section>

          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-3">End-to-end flows</h2>
            <div className="flex flex-wrap gap-2">
              <Link href="/flows/app-to-eks-github-actions/" className="text-sm px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600">
                App → EKS via GHA
              </Link>
              <Link href="/flows/bitbucket-to-eks/" className="text-sm px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600">
                Bitbucket → EKS
              </Link>
              <Link href="/snippets/" className="text-sm px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600">
                CI snippets
              </Link>
            </div>
          </section>
        </main>
      </AppShell>
      <Footer />
    </>
  );
}
