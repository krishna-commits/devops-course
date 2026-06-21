import Link from "next/link";
import { getNavigation, getSearchItems } from "@/lib/content";
import { runbooks } from "@/lib/runbooks";
import { snippets } from "@/lib/snippets";
import { AppShell, Footer } from "@/components/AppShell";
import { ErrorFixSearch } from "@/components/ErrorFixSearch";
import { SnippetLibrary } from "@/components/SnippetLibrary";

export const metadata = {
  title: "On-call hub | DevOps World",
  description: "One bookmark for whoever has the pager — error search, runbooks, debug snippets.",
};

export default function OncallPage() {
  const navigation = getNavigation();
  const searchItems = getSearchItems();
  const debugCount = snippets.filter((s) => s.tags.includes("debug")).length;

  return (
    <>
      <AppShell navigation={navigation} searchItems={searchItems} showSidebar={false}>
        <main className="flex-1 p-6 lg:p-8 min-w-0 max-w-4xl mx-auto w-full">
          <div className="rounded-2xl border border-orange-200 dark:border-orange-900/50 bg-gradient-to-br from-orange-50 to-white dark:from-orange-950/30 dark:to-zinc-950 p-5 sm:p-6 mb-8">
            <p className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 mb-1">
              On-call mode
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-1">What broke?</h1>
            <p className="text-sm text-zinc-500 mb-5">
              Error search, {runbooks.length} runbooks, {debugCount} debug snippets — no install guides.
            </p>
            <ErrorFixSearch large autoFocus={false} />
          </div>

          <section className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">Runbooks</h2>
              <span className="text-xs text-zinc-400">{runbooks.length} scenarios</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {runbooks.map((r) => (
                <Link
                  key={r.slug}
                  href={`/runbooks/${r.slug}/`}
                  className="group p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-orange-300 dark:hover:border-orange-700 transition-colors"
                >
                  <span className="text-2xl">{r.icon}</span>
                  <p className="font-medium text-sm text-zinc-900 dark:text-white mt-2 group-hover:text-orange-600">
                    {r.title}
                  </p>
                  <p className="text-xs text-zinc-500 mt-0.5 line-clamp-2">{r.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">Debug snippets</h2>
              <Link href="/snippets/" className="text-xs text-teal-600 hover:underline">
                All snippets →
              </Link>
            </div>
            <SnippetLibrary fixedTag="debug" hideTagFilters />
          </section>

          <section className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap gap-4 text-sm">
            <Link href="/templates/" className="text-indigo-600 hover:underline">
              Post-incident + change templates →
            </Link>
            <Link href="/backup/" className="text-lime-600 hover:underline">
              Backup & restore →
            </Link>
            <Link href="/observe/" className="text-rose-600 hover:underline">
              Observability triage →
            </Link>
            <Link href="/go-live/" className="text-emerald-600 hover:underline">
              Go-live checklist →
            </Link>
            <Link href="/fix/" className="text-red-600 hover:underline">
              Full error index →
            </Link>
          </section>
        </main>
      </AppShell>
      <Footer />
    </>
  );
}
