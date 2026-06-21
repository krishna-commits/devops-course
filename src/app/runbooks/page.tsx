import Link from "next/link";
import { getNavigation, getSearchItems } from "@/lib/content";
import { runbooks } from "@/lib/runbooks";
import { AppShell, Footer } from "@/components/AppShell";
import { ContentTrustStrip } from "@/components/ContentTrustStrip";

export default function RunbooksIndexPage() {
  const navigation = getNavigation();
  const searchItems = getSearchItems();

  return (
    <>
      <AppShell navigation={navigation} searchItems={searchItems}>
        <main className="flex-1 p-6 lg:p-8 min-w-0 max-w-4xl">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Scenario runbooks</h1>
          <p className="text-zinc-500 mb-2">
            Incident-style flows — symptom to fix with links to guides, configs, and cheat sheets.
          </p>
          <ContentTrustStrip compact />
          <div className="mb-8" />
          <div className="grid gap-4 sm:grid-cols-2">
            {runbooks.map((r) => (
              <Link
                key={r.slug}
                href={`/runbooks/${r.slug}/`}
                className="group p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-orange-300 dark:hover:border-orange-700 hover:shadow-lg transition-all"
              >
                <span className="text-3xl">{r.icon}</span>
                <h2 className="font-bold text-zinc-900 dark:text-white mt-3 group-hover:text-orange-600 dark:group-hover:text-orange-400">
                  {r.title}
                </h2>
                <p className="text-sm text-zinc-500 mt-1">{r.description}</p>
              </Link>
            ))}
          </div>
        </main>
      </AppShell>
      <Footer />
    </>
  );
}
