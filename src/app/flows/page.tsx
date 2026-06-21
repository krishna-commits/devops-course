import Link from "next/link";
import { getNavigation, getSearchItems } from "@/lib/content";
import { shipFlows } from "@/lib/flows";
import { ContentTrustStrip } from "@/components/ContentTrustStrip";
import { AppShell, Footer } from "@/components/AppShell";

export default function FlowsIndexPage() {
  const navigation = getNavigation();
  const searchItems = getSearchItems();

  return (
    <>
      <AppShell navigation={navigation} searchItems={searchItems}>
        <main className="flex-1 p-6 lg:p-8 min-w-0 max-w-3xl">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">Ship-it flows</h1>
          <p className="text-sm text-zinc-500 mb-2">End-to-end checkpoints — copy each block in order.</p>
          <ContentTrustStrip compact />
          <div className="mb-6" />
          <div className="space-y-3">
            {shipFlows.map((f) => (
              <Link
                key={f.slug}
                href={`/flows/${f.slug}/`}
                className="block p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-indigo-400 bg-white dark:bg-zinc-900 transition-all"
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{f.icon}</span>
                  <div>
                    <h2 className="font-bold text-zinc-900 dark:text-white">{f.title}</h2>
                    <p className="text-sm text-zinc-500 mt-1">{f.description}</p>
                    <p className="text-xs text-zinc-400 mt-2">{f.checkpoints.length} checkpoints · {f.duration}</p>
                  </div>
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
