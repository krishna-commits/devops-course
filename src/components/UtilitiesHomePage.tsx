import { getNavigation, getSearchItems } from "@/lib/content";
import { utilities } from "@/lib/utilities/catalog";
import { AppShell, Footer } from "@/components/AppShell";
import { UtilitiesGrid } from "@/components/UtilitiesGrid";

export function UtilitiesHomePage() {
  const navigation = getNavigation();
  const searchItems = getSearchItems();

  return (
    <>
      <AppShell navigation={navigation} searchItems={searchItems}>
        <main className="flex-1 p-6 lg:p-8 min-w-0">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
              IT Utilities
            </h1>
            <p className="text-zinc-500 mt-2 max-w-xl">
              {utilities.length} browser tools — JSON, Base64, JWT, hashes, Docker helpers, and more.
              Search below or press{" "}
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-mono">
                ⌘K
              </kbd>
              .
            </p>
          </div>

          <UtilitiesGrid utilities={utilities} />
        </main>
      </AppShell>
      <Footer />
    </>
  );
}
