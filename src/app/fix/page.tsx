import { getNavigation, getSearchItems } from "@/lib/content";
import { AppShell, Footer } from "@/components/AppShell";
import { ErrorFixSearch } from "@/components/ErrorFixSearch";
import { getAllErrorFixes } from "@/lib/error-fix-index";

export default function FixIndexPage() {
  const navigation = getNavigation();
  const searchItems = getSearchItems();
  const all = getAllErrorFixes();

  return (
    <>
      <AppShell navigation={navigation} searchItems={searchItems}>
        <main className="flex-1 p-6 lg:p-8 min-w-0 max-w-3xl">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">Error → fix lookup</h1>
          <p className="text-sm text-zinc-500 mb-6">{all.length} indexed errors from troubleshoot guides and runbooks.</p>
          <ErrorFixSearch autoFocus />
        </main>
      </AppShell>
      <Footer />
    </>
  );
}
