import Link from "next/link";
import { getNavigation, getSearchItems } from "@/lib/content";
import { standardLayouts } from "@/lib/standards";
import { AppShell, Footer } from "@/components/AppShell";
import { GoldenPathOverview } from "@/components/GoldenPathBanner";

export const metadata = {
  title: "Standard layouts | DevOps World",
  description: "Clone these repos — EKS Terraform, CI templates, K8s manifests. Don't invent from scratch.",
};

export default function StandardsPage() {
  const navigation = getNavigation();
  const searchItems = getSearchItems();

  return (
    <>
      <AppShell navigation={navigation} searchItems={searchItems} showSidebar={false}>
        <main className="flex-1 p-6 lg:p-8 min-w-0 max-w-4xl mx-auto w-full">
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-1">
            Standard layouts
          </h1>
          <p className="text-sm text-zinc-500 mb-8">
            Clone these, don&apos;t invent. Leadership through templates — not policy docs.
          </p>

          <div className="space-y-4 mb-12">
            {standardLayouts.map((s) => (
              <article
                key={s.id}
                className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl shrink-0">{s.icon}</span>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-bold text-zinc-900 dark:text-white">{s.title}</h2>
                    <p className="text-sm text-zinc-500 mt-1">{s.description}</p>
                    <a
                      href={s.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      github.com/krishna-commits/{s.repoName} ↗
                    </a>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {s.configHref && (
                        <Link
                          href={s.configHref}
                          className="text-xs px-2.5 py-1 rounded-lg bg-violet-50 dark:bg-violet-950 text-violet-700 dark:text-violet-300 hover:underline"
                        >
                          Config template →
                        </Link>
                      )}
                      {s.flowHref && (
                        <Link
                          href={s.flowHref}
                          className="text-xs px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 hover:underline"
                        >
                          Ship-it flow →
                        </Link>
                      )}
                      {s.toolHrefs.map((href) => (
                        <Link
                          key={href}
                          href={href}
                          className="text-xs px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:underline"
                        >
                          {href.replace("/tools/", "").replace("/", "")} guide
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <section className="pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-4">
              Golden paths by category
            </h2>
            <GoldenPathOverview />
          </section>

          <div className="mt-8 flex flex-wrap gap-4 text-sm">
            <Link href="/go-live/" className="text-emerald-600 hover:underline">
              Go-live checklist →
            </Link>
            <Link href="/snippets/#trivy-scan-image" className="text-teal-600 hover:underline">
              FinOps snippets →
            </Link>
          </div>
        </main>
      </AppShell>
      <Footer />
    </>
  );
}
