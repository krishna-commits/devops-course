import Link from "next/link";
import { getNavigation, getSearchItems } from "@/lib/content";
import { networkLayers, networkSymptoms } from "@/lib/network-triage";
import { AppShell, Footer } from "@/components/AppShell";
import { ContentTrustStrip } from "@/components/ContentTrustStrip";

export const metadata = {
  title: "Network debug | DevOps World",
  description: "DNS → firewall → LB → ingress → pod. Trace connectivity failures in order.",
};

export default function NetworkPage() {
  const navigation = getNavigation();
  const searchItems = getSearchItems();

  return (
    <>
      <AppShell navigation={navigation} searchItems={searchItems} showSidebar={false}>
        <main className="flex-1 p-6 lg:p-8 min-w-0 max-w-4xl mx-auto w-full">
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-1">
            Network debug
          </h1>
          <p className="text-sm text-zinc-500 mb-2">
            Follow layers in order — don&apos;t skip to pods when DNS is wrong.
          </p>
          <ContentTrustStrip compact />

          <section className="mb-10">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-3">
              Start from symptom
            </h2>
            <div className="flex flex-wrap gap-2">
              {networkSymptoms.map((s) => (
                <div
                  key={s.id}
                  className="px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm"
                >
                  <span className="mr-1">{s.icon}</span>
                  <span className="font-medium text-zinc-900 dark:text-white">{s.symptom}</span>
                  <span className="text-xs text-zinc-400 ml-2">→ layer {s.startLayer}</span>
                  <div className="flex gap-2 mt-1.5">
                    {s.runbookHref && (
                      <Link href={s.runbookHref} className="text-xs text-orange-600 hover:underline">
                        Runbook
                      </Link>
                    )}
                    {s.flowHref && (
                      <Link href={s.flowHref} className="text-xs text-indigo-600 hover:underline">
                        Flow
                      </Link>
                    )}
                    {s.snippetId && (
                      <Link href={`/snippets/#${s.snippetId}`} className="text-xs text-teal-600 hover:underline">
                        Snippet
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-3 mb-10">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
              Layer-by-layer checklist
            </h2>
            {networkLayers.map((layer) => (
              <article
                key={layer.order}
                className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden"
              >
                <div className="px-4 py-3 bg-teal-50 dark:bg-teal-950/30 border-b border-teal-100 dark:border-teal-900/50 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center">
                    {layer.order}
                  </span>
                  <span className="text-xl">{layer.icon}</span>
                  <div>
                    <h3 className="font-bold text-sm text-zinc-900 dark:text-white">{layer.layer}</h3>
                    <p className="text-xs text-zinc-500">{layer.question}</p>
                  </div>
                </div>
                <ul className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400 space-y-1 list-disc list-inside">
                  {layer.checks.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
                <div className="px-4 pb-3 flex gap-2">
                  {layer.snippetId && (
                    <Link href={`/snippets/#${layer.snippetId}`} className="text-xs text-teal-600 hover:underline">
                      Snippet →
                    </Link>
                  )}
                  {layer.href && (
                    <Link href={layer.href} className="text-xs text-indigo-600 hover:underline">
                      Guide →
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </section>

          <div className="flex flex-wrap gap-4 text-sm pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <Link href="/flows/debug-502-path/" className="text-indigo-600 hover:underline">
              502 debug flow →
            </Link>
            <Link href="/observe/" className="text-rose-600 hover:underline">
              Observability triage →
            </Link>
            <Link href="/oncall/" className="text-orange-600 hover:underline">
              On-call hub →
            </Link>
          </div>
        </main>
      </AppShell>
      <Footer />
    </>
  );
}
