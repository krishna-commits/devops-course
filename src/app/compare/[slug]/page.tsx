import { notFound } from "next/navigation";
import Link from "next/link";
import { getNavigation, getSearchItems } from "@/lib/content";
import { comparisons, getComparison } from "@/lib/comparisons";
import { AppShell, Footer } from "@/components/AppShell";
import { ComparisonView } from "@/components/ComparisonView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const comparison = getComparison(slug);
  if (!comparison) return { title: "Not Found" };
  return {
    title: comparison.title,
    description: comparison.description,
    openGraph: {
      title: comparison.title,
      description: comparison.description,
    },
  };
}

export default async function ComparePage({ params }: PageProps) {
  const { slug } = await params;
  const comparison = getComparison(slug);
  if (!comparison) notFound();

  const navigation = getNavigation();
  const searchItems = getSearchItems();

  return (
    <>
      <AppShell navigation={navigation} searchItems={searchItems}>
        <main className="flex-1 p-6 lg:p-8 min-w-0 max-w-5xl">
          <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-6 print:hidden">
            <Link href="/compare/" className="hover:text-sky-600 dark:hover:text-sky-400">
              Compare
            </Link>
            <span>/</span>
            <span className="text-zinc-700 dark:text-zinc-300">{comparison.title}</span>
          </nav>

          <div className="rounded-2xl border border-sky-200 dark:border-sky-900/50 bg-gradient-to-br from-sky-50 to-white dark:from-sky-950/30 dark:to-zinc-900 p-5 sm:p-6 mb-8">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{comparison.title}</h1>
            <p className="text-sm text-zinc-500 mt-1">{comparison.description}</p>
          </div>

          <ComparisonView comparison={comparison} />
        </main>
      </AppShell>
      <Footer />
    </>
  );
}
