import Link from "next/link";
import { getNavigation, getSearchItems } from "@/lib/content";
import { AppShell, Footer } from "@/components/AppShell";
import { GoLiveChecklistPanel } from "@/components/GoLiveChecklistPanel";
import { GoldenPathOverview } from "@/components/GoldenPathBanner";

export const metadata = {
  title: "Go-live checklist — pre-prod → prod | DevOps World",
  description: "Pre-production checklist with links to prod-delta tables and snippets. Send before every launch.",
};

export default function GoLivePage() {
  const navigation = getNavigation();
  const searchItems = getSearchItems();

  return (
    <>
      <AppShell navigation={navigation} searchItems={searchItems} showSidebar={false}>
        <main className="flex-1 p-6 lg:p-8 min-w-0 max-w-3xl mx-auto w-full">
          <nav className="text-sm text-zinc-400 mb-4">
            <Link href="/" className="hover:text-indigo-600">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-zinc-600 dark:text-zinc-300">Go-live</span>
          </nav>

          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-1">Go-live checklist</h1>
          <p className="text-sm text-zinc-500 mb-2">
            Pre-prod → prod — check each row before launch. Progress saves in your browser.
          </p>
          <p className="text-xs text-zinc-400 mb-8">
            Each item links to prod-delta tables, guides, or snippets — not another install walkthrough.
          </p>

          <GoLiveChecklistPanel />

          <section className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-4">Team golden paths</h2>
            <GoldenPathOverview />
          </section>

          <div className="mt-8 flex flex-wrap gap-4 text-sm">
            <Link href="/templates/" className="text-indigo-600 hover:underline">
              Change request template →
            </Link>
            <Link href="/oncall/" className="text-orange-600 hover:underline">
              On-call hub →
            </Link>
          </div>
        </main>
      </AppShell>
      <Footer />
    </>
  );
}
