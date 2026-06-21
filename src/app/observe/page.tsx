import Link from "next/link";
import { getNavigation, getSearchItems } from "@/lib/content";
import { observeScenarios } from "@/lib/observe-triage";
import { AppShell, Footer } from "@/components/AppShell";
import { ContentTrustStrip } from "@/components/ContentTrustStrip";
import { SnippetLibrary } from "@/components/SnippetLibrary";

export const metadata = {
  title: "Observability triage | DevOps World",
  description: "Alert fired → dashboard → log query → runbook. PromQL, LogQL, and CloudWatch one-liners.",
};

export default function ObservePage() {
  const navigation = getNavigation();
  const searchItems = getSearchItems();

  return (
    <>
      <AppShell navigation={navigation} searchItems={searchItems} showSidebar={false}>
        <main className="flex-1 p-6 lg:p-8 min-w-0 max-w-4xl mx-auto w-full">
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-1">
            Observability triage
          </h1>
          <p className="text-sm text-zinc-500 mb-2">
            Metrics → logs → traces path when the pager fires.
          </p>
          <ContentTrustStrip compact />

          <div className="space-y-4 mb-10">
            {observeScenarios.map((s) => (
              <article
                key={s.id}
                className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden"
              >
                <div className="px-4 py-3 bg-rose-50 dark:bg-rose-950/30 border-b border-rose-100 dark:border-rose-900/50">
                  <p className="font-semibold text-sm text-zinc-900 dark:text-white">
                    {s.icon} {s.alert}
                  </p>
                </div>
                <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-zinc-100 dark:divide-zinc-800">
                  <TriageCell step={s.dashboard} label="1. Dashboard" />
                  <TriageCell step={s.logs} label="2. Logs" />
                  <TriageCell step={s.runbook} label="3. Runbook" />
                </div>
              </article>
            ))}
          </div>

          <section className="mb-10">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-4">
              Query snippets — PromQL / LogQL / CloudWatch
            </h2>
            <SnippetLibrary fixedTag="observe" hideTagFilters />
          </section>

          <section className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-3">
              Multi-cloud kubeconfig
            </h2>
            <div className="flex flex-wrap gap-2 text-sm">
              <Link href="/snippets/#gke-kubeconfig" className="text-indigo-600 hover:underline">
                GKE →
              </Link>
              <Link href="/snippets/#aks-kubeconfig" className="text-indigo-600 hover:underline">
                AKS →
              </Link>
              <Link href="/snippets/#eks-kubeconfig" className="text-indigo-600 hover:underline">
                EKS →
              </Link>
            </div>
          </section>

          <div className="mt-8 flex flex-wrap gap-4 text-sm">
            <Link href="/oncall/" className="text-orange-600 hover:underline">
              On-call hub →
            </Link>
            <Link href="/runbooks/" className="text-orange-600 hover:underline">
              All runbooks →
            </Link>
          </div>
        </main>
      </AppShell>
      <Footer />
    </>
  );
}

function TriageCell({
  step,
  label,
}: {
  step: { label: string; detail: string; href?: string; snippetId?: string };
  label: string;
}) {
  return (
    <div className="p-4">
      <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">{label}</p>
      <p className="font-medium text-sm text-zinc-900 dark:text-white">{step.label}</p>
      <p className="text-xs text-zinc-500 mt-1">{step.detail}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {step.href && (
          <Link href={step.href} className="text-xs text-orange-600 hover:underline">
            Open →
          </Link>
        )}
        {step.snippetId && (
          <Link href={`/snippets/#${step.snippetId}`} className="text-xs text-teal-600 hover:underline">
            Snippet →
          </Link>
        )}
      </div>
    </div>
  );
}
