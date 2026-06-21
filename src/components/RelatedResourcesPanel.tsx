import Link from "next/link";
import type { DeploymentRecipe } from "@/lib/types";
import type { RelatedGithubRepo } from "@/lib/related-repos";

interface RelatedResourcesPanelProps {
  toolName: string;
  configs: DeploymentRecipe[];
  repos: RelatedGithubRepo[];
}

export function RelatedResourcesPanel({ toolName, configs, repos }: RelatedResourcesPanelProps) {
  if (configs.length === 0 && repos.length === 0) return null;

  return (
    <section id="related-resources" className="scroll-mt-24 rounded-xl bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-900 p-4 sm:p-5 mb-6 print:hidden">
      <div className="flex items-start gap-3 mb-4">
        <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-violet-100 dark:bg-violet-900 text-lg shrink-0">
          🔗
        </span>
        <div>
          <h2 className="text-sm font-bold text-violet-900 dark:text-violet-100">
            Related configs & repos
          </h2>
          <p className="text-xs text-violet-700/80 dark:text-violet-300/80 mt-0.5">
            Copy-paste templates and production examples for {toolName}.
          </p>
        </div>
      </div>

      {configs.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400 mb-2">
            Config templates ({configs.length})
          </p>
          <ul className="space-y-2">
            {configs.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/deployments/${c.slug}/`}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-white/80 dark:bg-zinc-900/60 border border-violet-200/80 dark:border-violet-800/80 hover:border-violet-400 dark:hover:border-violet-600 transition-colors text-sm"
                >
                  <span>{c.icon}</span>
                  <span className="font-medium text-zinc-900 dark:text-white">{c.name}</span>
                  <span className="text-xs text-violet-500 ml-auto">View →</span>
                </Link>
              </li>
            ))}
          </ul>
          {configs.length > 6 && (
            <a href="#configs" className="text-xs text-violet-600 dark:text-violet-400 hover:underline mt-2 inline-block">
              + {configs.length - 6} more below
            </a>
          )}
        </div>
      )}

      {repos.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400 mb-2">
            GitHub examples
          </p>
          <ul className="space-y-2">
            {repos.map((repo) => (
              <li key={repo.url}>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col gap-0.5 p-2.5 rounded-lg bg-white/80 dark:bg-zinc-900/60 border border-violet-200/80 dark:border-violet-800/80 hover:border-violet-400 dark:hover:border-violet-600 transition-colors"
                >
                  <span className="text-sm font-medium text-zinc-900 dark:text-white flex items-center gap-1">
                    🐙 {repo.name}
                    <span className="text-xs text-zinc-400">↗</span>
                  </span>
                  <span className="text-xs text-zinc-500">{repo.description}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
