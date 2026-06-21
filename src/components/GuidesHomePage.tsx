import { getNavigation, getSearchItems, tools } from "@/lib/content";
import { AppShell, Footer } from "@/components/AppShell";
import { ToolsGrid } from "@/components/ToolsGrid";

export function GuidesHomePage() {
  const navigation = getNavigation();
  const searchItems = getSearchItems();
  const allTools = searchItems.filter((item) => item.kind === "tool");

  const navigationWithFullTools = navigation.map((cat) => ({
    ...cat,
    tools: allTools.filter((t) => t.category === cat.id),
  }));

  return (
    <>
      <AppShell navigation={navigation} searchItems={searchItems}>
        <main className="flex-1 p-6 lg:p-8 min-w-0">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
              All tools
            </h1>
            <p className="text-zinc-500 mt-2 max-w-xl">
              {tools.length} setup guides — install, configure, verify, and troubleshoot.
              Search below or press <kbd className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-mono">⌘K</kbd>.
            </p>
          </div>

          <ToolsGrid navigation={navigationWithFullTools} allTools={allTools} />
        </main>
      </AppShell>
      <Footer />
    </>
  );
}
