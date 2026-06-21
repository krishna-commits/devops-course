import { getNavigation, getSearchItems } from "@/lib/content";
import { snippets } from "@/lib/snippets";
import { AppShell, Footer } from "@/components/AppShell";
import { SnippetLibrary } from "@/components/SnippetLibrary";
import { ContentTrustStrip } from "@/components/ContentTrustStrip";

export default function SnippetsPage() {
  const navigation = getNavigation();
  const searchItems = getSearchItems();

  return (
    <>
      <AppShell navigation={navigation} searchItems={searchItems}>
        <main className="flex-1 p-6 lg:p-8 min-w-0 max-w-3xl">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">Command snippets</h1>
          <p className="text-sm text-zinc-500 mb-2">{snippets.length} tagged one-liners — search by task, not tool name.</p>
          <ContentTrustStrip compact />
          <p className="text-xs text-amber-700 dark:text-amber-400 mb-4">
            ⚠️ Snippets marked destructive can cause outages — run in staging first.
          </p>
          <SnippetLibrary />
        </main>
      </AppShell>
      <Footer />
    </>
  );
}
