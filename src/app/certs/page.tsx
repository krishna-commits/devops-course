import Link from "next/link";
import { getNavigation, getSearchItems } from "@/lib/content";
import { certDecisionTree, certScenarios } from "@/lib/cert-lifecycle";
import { AppShell, Footer } from "@/components/AppShell";
import { ContentTrustStrip } from "@/components/ContentTrustStrip";

export const metadata = {
  title: "Certificate lifecycle | DevOps World",
  description: "HTTP-01 vs DNS-01, wildcard certs, internal CA — cert-manager decision tree.",
};

export default function CertsPage() {
  const navigation = getNavigation();
  const searchItems = getSearchItems();

  const recommendations = certDecisionTree.filter((n) => n.recommendation);

  return (
    <>
      <AppShell navigation={navigation} searchItems={searchItems} showSidebar={false}>
        <main className="flex-1 p-6 lg:p-8 min-w-0 max-w-4xl mx-auto w-full">
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-1">
            Certificate lifecycle
          </h1>
          <p className="text-sm text-zinc-500 mb-2">
            Pick the right ACME solver before debugging expired certs at 3am.
          </p>
          <ContentTrustStrip compact />

          <section className="mb-10">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-4">
              Decision tree
            </h2>
            <div className="space-y-3 mb-6">
              {certDecisionTree.filter((n) => n.question && !n.recommendation).map((n) => (
                <div
                  key={n.id}
                  className="rounded-lg border border-sky-200 dark:border-sky-900/50 bg-sky-50/50 dark:bg-sky-950/20 px-4 py-3 text-sm"
                >
                  <p className="font-medium text-sky-900 dark:text-sky-100">{n.question}</p>
                  <p className="text-xs text-sky-700 dark:text-sky-300 mt-1">
                    Yes → {n.yes} · No → {n.no}
                  </p>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {recommendations.map((n) => (
                <div
                  key={n.id}
                  className="rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20 p-4"
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
                    {n.id.replace(/-/g, " ")}
                  </p>
                  <p className="text-sm text-emerald-900 dark:text-emerald-100">{n.recommendation}</p>
                  <div className="flex gap-2 mt-2">
                    {n.snippetId && (
                      <Link href={`/snippets/#${n.snippetId}`} className="text-xs text-teal-600 hover:underline">
                        Snippet →
                      </Link>
                    )}
                    {n.href && (
                      <Link href={n.href} className="text-xs text-indigo-600 hover:underline">
                        Template →
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4 mb-10">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">Scenarios</h2>
            {certScenarios.map((s) => (
              <article
                key={s.id}
                className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{s.icon}</span>
                  <div>
                    <h3 className="font-bold text-zinc-900 dark:text-white">{s.title}</h3>
                    <p className="text-sm text-zinc-500 mt-0.5">{s.description}</p>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2">{s.approach}</p>
                    <p className="text-xs text-zinc-400 mt-1">When: {s.when.join(" · ")}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {s.snippetIds.map((id) => (
                        <Link
                          key={id}
                          href={`/snippets/#${id}`}
                          className="text-xs px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-teal-600 hover:underline"
                        >
                          {id}
                        </Link>
                      ))}
                      {s.href && (
                        <Link href={s.href} className="text-xs text-indigo-600 hover:underline">
                          More →
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <div className="flex flex-wrap gap-4 text-sm pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <Link href="/runbooks/ingress-cert-expired/" className="text-orange-600 hover:underline">
              Cert expired runbook →
            </Link>
            <Link href="/rotate/" className="text-violet-600 hover:underline">
              TLS rotation →
            </Link>
            <Link href="/tools/cert-manager/" className="text-indigo-600 hover:underline">
              cert-manager install →
            </Link>
          </div>
        </main>
      </AppShell>
      <Footer />
    </>
  );
}
