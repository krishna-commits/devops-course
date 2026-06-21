import Link from "next/link";
import { getNavigation, getSearchItems } from "@/lib/content";
import { cheatsheets } from "@/lib/cheatsheets";
import { AppShell, Footer } from "@/components/AppShell";

export default function CheatsheetsIndexPage() {
  const navigation = getNavigation();
  const searchItems = getSearchItems();

  return (
    <>
      <AppShell navigation={navigation} searchItems={searchItems}>
        <main className="flex-1 p-6 lg:p-8 min-w-0 max-w-4xl">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Cheat sheets</h1>
          <p className="text-zinc-500 mb-8">One-page quick references — printable and copy-friendly.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {cheatsheets.map((s) => (
              <Link
                key={s.slug}
                href={`/cheatsheets/${s.slug}/`}
                className="group p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg transition-all"
              >
                <span className="text-3xl">{s.icon}</span>
                <h2 className="font-bold text-zinc-900 dark:text-white mt-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  {s.title}
                </h2>
                <p className="text-sm text-zinc-500 mt-1">{s.description}</p>
              </Link>
            ))}
          </div>
        </main>
      </AppShell>
      <Footer />
    </>
  );
}
