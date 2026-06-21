import { notFound } from "next/navigation";
import Link from "next/link";
import { getNavigation, getSearchItems } from "@/lib/content";
import { runbooks, getRunbook } from "@/lib/runbooks";
import { runbookToMarkdown } from "@/lib/runbook-export";
import { AppShell, Footer } from "@/components/AppShell";
import { RunbookView } from "@/components/RunbookView";
import { ContentTrustStrip } from "@/components/ContentTrustStrip";
import { RunbookExportButton } from "@/components/RunbookExportButton";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return runbooks.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const runbook = getRunbook(slug);
  if (!runbook) return { title: "Not Found" };
  return {
    title: runbook.title,
    description: runbook.description,
    openGraph: {
      title: runbook.title,
      description: runbook.description,
    },
  };
}

export default async function RunbookPage({ params }: PageProps) {
  const { slug } = await params;
  const runbook = getRunbook(slug);
  if (!runbook) notFound();

  const navigation = getNavigation();
  const searchItems = getSearchItems();

  return (
    <>
      <AppShell navigation={navigation} searchItems={searchItems}>
        <main className="flex-1 p-6 lg:p-8 min-w-0 max-w-4xl">
          <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-6 print:hidden">
            <Link href="/runbooks/" className="hover:text-orange-600 dark:hover:text-orange-400">
              Runbooks
            </Link>
            <span>/</span>
            <span className="text-zinc-700 dark:text-zinc-300">{runbook.title}</span>
          </nav>

          <div className="rounded-2xl border border-orange-200 dark:border-orange-900/50 bg-gradient-to-br from-orange-50 to-white dark:from-orange-950/30 dark:to-zinc-900 p-5 sm:p-6 mb-4">
            <div className="flex items-start gap-4">
              <span className="text-4xl">{runbook.icon}</span>
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{runbook.title}</h1>
                <p className="text-sm text-zinc-500 mt-1">{runbook.description}</p>
                <div className="mt-3">
                  <RunbookExportButton markdown={runbookToMarkdown(runbook)} />
                </div>
              </div>
            </div>
          </div>

          <ContentTrustStrip compact />

          <RunbookView runbook={runbook} />
        </main>
      </AppShell>
      <Footer />
    </>
  );
}
