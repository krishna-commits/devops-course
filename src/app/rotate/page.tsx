import Link from "next/link";
import { getNavigation, getSearchItems } from "@/lib/content";
import { rotationPlaybooks } from "@/lib/secrets-rotation";
import { AppShell, Footer } from "@/components/AppShell";
import { ContentTrustStrip } from "@/components/ContentTrustStrip";

export const metadata = {
  title: "Secrets rotation | DevOps World",
  description: "Rotate DB creds, IRSA, TLS, and API keys without downtime — dual-credential pattern.",
};

export default function RotatePage() {
  const navigation = getNavigation();
  const searchItems = getSearchItems();

  return (
    <>
      <AppShell navigation={navigation} searchItems={searchItems} showSidebar={false}>
        <main className="flex-1 p-6 lg:p-8 min-w-0 max-w-4xl mx-auto w-full">
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-1">
            Secrets rotation
          </h1>
          <p className="text-sm text-zinc-500 mb-2">
            Zero-downtime pattern: new cred → update store → rolling restart → revoke old after soak.
          </p>
          <ContentTrustStrip compact />

          <div className="my-6 rounded-xl border border-violet-200 dark:border-violet-900/50 bg-violet-50/50 dark:bg-violet-950/20 p-4">
            <Link href="/runbooks/secrets-rotation-zero-downtime/" className="text-sm font-medium text-violet-700 dark:text-violet-300 hover:underline">
              Full runbook: rotate without downtime →
            </Link>
          </div>

          <section className="space-y-4 mb-10">
            {rotationPlaybooks.map((p) => (
              <article
                key={p.id}
                className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl">{p.icon}</span>
                  <div>
                    <h2 className="font-bold text-zinc-900 dark:text-white">{p.title}</h2>
                    <p className="text-sm text-zinc-500 mt-0.5">{p.summary}</p>
                  </div>
                </div>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium mb-3">{p.zeroDowntime}</p>
                <ol className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1.5 list-decimal list-inside mb-4">
                  {p.steps.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
                <div className="flex flex-wrap gap-2">
                  {p.snippetIds.map((id) => (
                    <Link
                      key={id}
                      href={`/snippets/#${id}`}
                      className="text-xs px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 hover:underline"
                    >
                      {id} →
                    </Link>
                  ))}
                  {p.toolHref && (
                    <Link href={p.toolHref} className="text-xs text-indigo-600 hover:underline">
                      Guide
                    </Link>
                  )}
                  {p.configHref && (
                    <Link href={p.configHref} className="text-xs text-violet-600 hover:underline">
                      Config
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </section>

          <div className="flex flex-wrap gap-4 text-sm pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <Link href="/go-live/" className="text-emerald-600 hover:underline">
              Go-live checklist →
            </Link>
            <Link href="/tools/vault/" className="text-indigo-600 hover:underline">
              Vault guide →
            </Link>
            <Link href="/deployments/k8s-external-secret/" className="text-violet-600 hover:underline">
              External Secrets template →
            </Link>
          </div>
        </main>
      </AppShell>
      <Footer />
    </>
  );
}
