import Link from "next/link";
import { getNavigation, getSearchItems } from "@/lib/content";
import { comparisons } from "@/lib/comparisons";
import { AppShell, Footer } from "@/components/AppShell";

export default function CompareIndexPage() {
  const navigation = getNavigation();
  const searchItems = getSearchItems();

  return (
    <>
      <AppShell navigation={navigation} searchItems={searchItems}>
        <main className="flex-1 p-6 lg:p-8 min-w-0 max-w-4xl">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Tool comparisons</h1>
          <p className="text-zinc-500 mb-8">Side-by-side picks with links to install guides and config templates.</p>
          <div className="grid gap-4">
            {comparisons.map((c) => (
              <Link
                key={c.slug}
                href={`/compare/${c.slug}/`}
                className="group p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-sky-300 dark:hover:border-sky-700 hover:shadow-lg transition-all flex items-start gap-4"
              >
                <span className="text-3xl">{c.icon}</span>
                <div>
                  <h2 className="font-bold text-zinc-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400">
                    {c.title}
                  </h2>
                  <p className="text-sm text-zinc-500 mt-1">{c.description}</p>
                  <p className="text-xs text-zinc-400 mt-2">
                    {c.tools.map((t) => `${t.icon} ${t.name}`).join(" · ")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </AppShell>
      <Footer />
    </>
  );
}
